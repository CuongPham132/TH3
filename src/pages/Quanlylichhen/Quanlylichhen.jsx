import React, { useState, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const Quanlylichhen = () => {
    // Lấy danh sách nhân viên từ localStorage
    const [employees] = useLocalStorage('employees', []);

    // Load danh sách lịch hẹn từ localStorage (nếu có)
    const loadAppointments = () => {
        const savedAppointments = localStorage.getItem('appointments');
        return savedAppointments ? JSON.parse(savedAppointments) : [];
    };

    // State lưu danh sách lịch hẹn
    const [appointments, setAppointments] = useState(loadAppointments);

    // State lưu thông tin đặt lịch mới
    const [newAppointment, setNewAppointment] = useState({
        customer: '',
        employee: '',
        service: '',
        date: '',
        time: '',
    });

    // Cập nhật localStorage mỗi khi danh sách lịch hẹn thay đổi
    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);

    // Hàm chuyển đổi giờ 24h → 12h (AM/PM)
    const convertTo12HourFormat = (time) => {
        let [hour, minute] = time.split(':');
        hour = parseInt(hour);
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12; // 12 giờ trưa & 12 giờ sáng
        return `${hour}:${minute} ${period}`;
    };

    // Hàm cập nhật trạng thái lịch hẹn
    const updateStatus = (id, newStatus) => {
        setAppointments(appointments.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ));
    };

    // Kiểm tra lịch trùng
    const isDuplicateAppointment = (date, time, employee) => {
        return appointments.some(app => app.date === date && app.time === time && app.employee === employee);
    };

    // Hàm đặt lịch hẹn
    const handleAddAppointment = () => {
        const { customer, employee, service, date, time } = newAppointment;
        if (!customer || !employee || !service || !date || !time) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const formattedTime = convertTo12HourFormat(time);
        if (isDuplicateAppointment(date, formattedTime, employee)) {
            alert('❌ Nhân viên này đã có lịch hẹn vào thời gian này!');
            return;
        }

        const newId = appointments.length + 1;
        setAppointments([...appointments, { id: newId, ...newAppointment, time: formattedTime, status: 'Chờ duyệt' }]);
        setNewAppointment({ customer: '', employee: '', service: '', date: '', time: '' });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Quản lý lịch hẹn</h2>

            {/* Form đặt lịch */}
            <h3>Đặt lịch hẹn</h3>
            <input type="text" placeholder="Tên khách hàng" value={newAppointment.customer} onChange={(e) => setNewAppointment({ ...newAppointment, customer: e.target.value })} />
            
            <select value={newAppointment.employee} onChange={(e) => setNewAppointment({ ...newAppointment, employee: e.target.value })}>
                <option value="">Chọn nhân viên</option>
                {employees.length > 0 ? (
                    employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name}</option>)
                ) : (
                    <option disabled>Không có nhân viên</option>
                )}
            </select>

            <input type="text" placeholder="Dịch vụ" value={newAppointment.service} onChange={(e) => setNewAppointment({ ...newAppointment, service: e.target.value })} />
            <input type="date" value={newAppointment.date} onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })} />
            <input type="time" value={newAppointment.time} onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })} />
            <button onClick={handleAddAppointment}>Đặt lịch</button>

            {/* Danh sách lịch hẹn */}
            <table border="1" width="100%" cellPadding="10" style={{ marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>Nhân viên</th>
                        <th>Dịch vụ</th>
                        <th>Ngày</th>
                        <th>Giờ</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(app => (
                        <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.customer}</td>
                            <td>{app.employee}</td>
                            <td>{app.service}</td>
                            <td>{app.date}</td>
                            <td>{app.time}</td>
                            <td>{app.status}</td>
                            <td>
                                {app.status === 'Chờ duyệt' && (
                                    <>
                                        <button onClick={() => updateStatus(app.id, 'Xác nhận')}>Xác nhận</button>
                                        <button onClick={() => updateStatus(app.id, 'Hủy')}>Hủy</button>
                                    </>
                                )}
                                {app.status === 'Xác nhận' && (
                                    <button onClick={() => updateStatus(app.id, 'Hoàn thành')}>Hoàn thành</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Quanlylichhen;
