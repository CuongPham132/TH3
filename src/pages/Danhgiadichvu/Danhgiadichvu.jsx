import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Input, Rate, message } from 'antd';

const { TextArea } = Input;

const Danhgiadichvu = () => {
    const [appointments, setAppointments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(storedAppointments);
    }, []);

    const showReplyModal = (appointment) => {
        setSelectedCustomer(appointment.customer); // Ghi nhận khách hàng cần phản hồi
        setReplyText(appointment.reply || ''); // Lấy phản hồi cũ (nếu có)
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setReplyText('');
    };

    const handleReplySubmit = () => {
        if (!selectedCustomer) return;

        const updatedAppointments = appointments.map((appt) =>
            appt.customer === selectedCustomer
                ? { ...appt, reply: replyText } // Cập nhật phản hồi cho đúng khách hàng
                : appt
        );

        setAppointments(updatedAppointments);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

        message.success(`Phản hồi đã gửi đến khách hàng: ${selectedCustomer}`);
        setIsModalOpen(false);
    };

    const columns = [
        { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
        { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
        { title: 'Nhân viên phục vụ', dataIndex: 'employee', key: 'employee' },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating) => <Rate disabled defaultValue={rating} />,
        },
        {
            title: 'Nhận xét',
            dataIndex: 'comment',
            key: 'comment',
            render: (comment) => comment || '❌ Chưa có nhận xét',
        },
        {
            title: 'Phản hồi của nhân viên',
            dataIndex: 'reply',
            key: 'reply',
            render: (_, record) => record.reply ? `✅ ${record.reply}` : `⏳ Chưa có phản hồi`,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" onClick={() => showReplyModal(record)}>Phản hồi</Button>
            ),
        },
    ];

    return (
        <div>
            <h2>Đánh giá dịch vụ</h2>
            <Table dataSource={appointments} columns={columns} rowKey="id" />

            <Modal
                title={`Phản hồi khách hàng: ${selectedCustomer}`}
                visible={isModalOpen}
                onCancel={handleCancel}
                onOk={handleReplySubmit}
            >
                <TextArea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Nhập phản hồi cho khách hàng: ${selectedCustomer}`}
                />
            </Modal>
        </div>
    );
};

export default Danhgiadichvu;
