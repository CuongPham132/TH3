import React, { useState, useEffect } from 'react';
import { Table, Card, Statistic, Row, Col } from 'antd';
import { DollarCircleOutlined, CalendarOutlined } from '@ant-design/icons';

const Thongke = () => {
    const [appointments, setAppointments] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [totalAppointments, setTotalAppointments] = useState(0);

    useEffect(() => {
        // Giả lập dữ liệu thống kê (có thể thay bằng API sau này)
        const fakeData = [
            { id: 1, customer: 'Nguyễn Văn A', service: 'Cắt tóc', employee: 'Thợ A', price: 100000, date: '2025-03-10' },
            { id: 2, customer: 'Trần Thị B', service: 'Spa', employee: 'Thợ B', price: 200000, date: '2025-03-10' },
            { id: 3, customer: 'Lê Văn C', service: 'Gội đầu', employee: 'Thợ A', price: 50000, date: '2025-03-11' },
        ];

        setAppointments(fakeData);
        setTotalAppointments(fakeData.length);
        setRevenue(fakeData.reduce((acc, item) => acc + item.price, 0));
    }, []);

    const columns = [
        { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
        { title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
        { title: 'Nhân viên', dataIndex: 'employee', key: 'employee' },
        { title: 'Giá (VNĐ)', dataIndex: 'price', key: 'price', render: (text) => text.toLocaleString() },
        { title: 'Ngày', dataIndex: 'date', key: 'date' },
    ];

    return (
        <div>
            <h2>Thống kê doanh thu & lịch hẹn</h2>
            <Row gutter={16}>
                <Col span={12}>
                    <Card>
                        <Statistic title="Tổng số lịch hẹn" value={totalAppointments} prefix={<CalendarOutlined />} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="Tổng doanh thu"
                            value={revenue}
                            prefix={<DollarCircleOutlined />}
                            suffix="VNĐ"
                        />
                    </Card>
                </Col>
            </Row>

            <h3 style={{ marginTop: 20 }}>Chi tiết lịch hẹn</h3>
            <Table dataSource={appointments} columns={columns} rowKey="id" />
        </div>
    );
};

export default Thongke;
