import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, TimePicker, message } from 'antd';
import useLocalStorage from '../../hooks/useLocalStorage';
import dayjs from 'dayjs';

const { Option } = Select;
const format = "HH:mm"; // Định dạng giờ làm việc

const Quanlynhanvien = () => {
    const [employees, setEmployees] = useLocalStorage('employees', []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [form] = Form.useForm();

    // Hàm mở modal
    const showAddModal = () => {
        setIsEdit(false);
        setIsModalOpen(true);
        form.resetFields();
    };

    // Mở modal chỉnh sửa
    const showEditModal = (record) => {
        setIsEdit(true);
        setSelectedEmployee(record);
        setIsModalOpen(true);
        form.setFieldsValue({
            ...record,
            workingHours: Object.entries(record.workSchedule || {}).map(([day, time]) => ({
                day,
                time: time.split('-').map(t => dayjs(t, format))
            }))
        });
    };

    // Đóng modal
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    // Xử lý thêm hoặc cập nhật nhân viên
    const handleSave = (values) => {
        const { name, position, maxCustomersPerDay, workingHours } = values;

        // Chuyển đổi thời gian làm việc thành object
        const workSchedule = workingHours.reduce((acc, { day, time }) => {
            acc[day] = time ? `${time[0].format(format)}-${time[1].format(format)}` : "Chưa có giờ";
            return acc;
        }, {});

        const updatedEmployee = {
            id: isEdit ? selectedEmployee.id : employees.length + 1,
            name,
            position,
            maxCustomersPerDay: Number(maxCustomersPerDay),
            workSchedule
        };

        if (isEdit) {
            setEmployees(employees.map(emp => (emp.id === selectedEmployee.id ? updatedEmployee : emp)));
            message.success('Cập nhật nhân viên thành công!');
        } else {
            setEmployees([...employees, updatedEmployee]);
            message.success('Thêm nhân viên thành công!');
        }

        setIsModalOpen(false);
    };

    // Xóa nhân viên
    const handleDelete = (id) => {
        setEmployees(employees.filter(emp => emp.id !== id));
        message.success('Xóa nhân viên thành công!');
    };

    // Cấu hình bảng
    const columns = [
        { title: 'Tên nhân viên', dataIndex: 'name', key: 'name' },
        { title: 'Vị trí', dataIndex: 'position', key: 'position' },
        { title: 'Số khách/ngày', dataIndex: 'maxCustomersPerDay', key: 'maxCustomersPerDay' },
        {
            title: 'Lịch làm việc',
            dataIndex: 'workSchedule',
            key: 'workSchedule',
            render: (schedule) => schedule ? Object.entries(schedule).map(([day, time]) => (
                <div key={day}>{day}: {time}</div>
            )) : 'Chưa có lịch'
        },
        {
            title: 'Hành động',
            render: (_, record) => (
                <>
                    <Button onClick={() => showEditModal(record)} style={{ marginRight: 8 }}>Sửa</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Xóa</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Quản lý nhân viên</h2>
            <Button type="primary" onClick={showAddModal} style={{ marginBottom: 16 }}>
                + Thêm nhân viên
            </Button>

            <Table dataSource={employees} columns={columns} rowKey="id" />

            <Modal 
                title={isEdit ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"} 
                visible={isModalOpen} 
                onCancel={handleCancel} 
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="name" label="Tên nhân viên" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="position" label="Vị trí công việc" rules={[{ required: true, message: 'Vui lòng nhập vị trí' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="maxCustomersPerDay" label="Số khách tối đa/ngày" rules={[{ required: true, message: 'Vui lòng nhập số khách/ngày' }]}>
                        <Input type="number" min={1} />
                    </Form.Item>

                    {/* Chọn ngày & giờ làm việc */}
                    <Form.Item label="Lịch làm việc">
                        <Form.List name="workingHours">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name }) => (
                                        <div key={key} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                                            <Form.Item name={[name, 'day']} noStyle>
                                                <Select placeholder="Chọn ngày" style={{ width: '120px' }}>
                                                    {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map(day => (
                                                        <Option key={day} value={day}>{day}</Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>

                                            <Form.Item name={[name, 'time']} noStyle>
                                                <TimePicker.RangePicker format={format} />
                                            </Form.Item>

                                            <Button onClick={() => remove(name)} danger>Xóa</Button>
                                        </div>
                                    ))}
                                    <Button type="dashed" onClick={() => add()} block>+ Thêm giờ làm việc</Button>
                                </>
                            )}
                        </Form.List>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">{isEdit ? "Cập nhật" : "Thêm mới"}</Button>
                        <Button style={{ marginLeft: 8 }} onClick={handleCancel}>Hủy</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Quanlynhanvien;
