import React, { useState, useEffect } from 'react';
import { Modal, Button, Select, Table, message, Calendar ,Rate,Input } from 'antd';
import useLocalStorage from '../../hooks/useLocalStorage';
import './calendar.css';
import { useHistory } from 'react-router-dom';
const { Option } = Select;
const { TextArea } = Input;

const Quanlylichhen = () => {
	const history = useHistory();
	const [employees] = useLocalStorage('employees', []);

	const [reviews, setReviews] = useLocalStorage('reviews', {});
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const [reviewData, setReviewData] = useState({ id: null, rating: 0, comment: '' });

	const loadAppointments = () => {
		const savedAppointments = localStorage.getItem('appointments');
		return savedAppointments ? JSON.parse(savedAppointments) : [];
	};

	const [appointments, setAppointments] = useState(loadAppointments);
	const [newAppointment, setNewAppointment] = useState({
		customer: '',
		employee: '',
		service: '',
		date: new Date(),
		time: '09:00',
	});

	const handleSaveReview = () => {
        setAppointments((prevAppointments) => {
            const updatedAppointments = prevAppointments.map((app) =>
                app.id === reviewData.id && app.customer === reviewData.customer // Chắc chắn đúng khách hàng
                    ? { ...app, rating: reviewData.rating, comment: reviewData.comment }
                    : app
            );
    
            localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
            return updatedAppointments;
        });
    
        message.success(`Đánh giá đã được lưu cho khách hàng: ${reviewData.customer}`);
        setIsReviewModalOpen(false);
    };
    
    const showReviewModal = (appointment) => {
        setReviewData({
            id: appointment.id,
            customer: appointment.customer, // Đảm bảo hiển thị đúng khách hàng
            rating: appointment.rating || 0,
            comment: appointment.comment || '',
        });
        setIsReviewModalOpen(true);
    };
	useEffect(() => {
		localStorage.setItem('appointments', JSON.stringify(appointments));
	}, [appointments]);

	const updateStatus = (id, newStatus) => {
		const updatedAppointments = appointments.map((app) => (app.id === id ? { ...app, status: newStatus } : app));
		setAppointments(updatedAppointments);
		localStorage.setItem('appointments', JSON.stringify(updatedAppointments));

		if (newStatus === 'Xác nhận') {
			const confirmedApp = appointments.find((app) => app.id === id);
			const serviceData = services.find((service) => service.name === confirmedApp.service);
			if (confirmedApp && serviceData) {
				const bookingInfo = {
					...confirmedApp,
					price: serviceData.price,
				};
				localStorage.setItem('confirmedBooking', JSON.stringify(bookingInfo));
			}
		}
	};

	const isDuplicateAppointment = (date, time, employee) => {
		return appointments.some((app) => app.date === date && app.time === time && app.employee === employee);
	};

	const [isModalOpen, setIsModalOpen] = useState(false);
	const generateTimeSlots = () => {
		const slots = [];
		for (let hour = 0; hour < 24; hour += 2) {
			let start = hour.toString().padStart(2, '0') + ':00';
			let end = ((hour + 2) % 24).toString().padStart(2, '0') + ':00';
			slots.push(`${start} - ${end}`);
		}
		return slots;
	};
	const [services] = useLocalStorage('services', []);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setNewAppointment({ customer: '', employee: '', service: '', date: new Date(), time: '09:00' });
	};

	const handleAddAppointment = () => {
        const { customer, employee, service, date, time } = newAppointment;
        if (!customer || !employee || !service || !date || !time) {
            message.error('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
    
        const formattedDate = date.toISOString().split('T')[0];
    
        const selectedService = services.find((s) => s.name === service);
        if (!selectedService) {
            message.error('Dịch vụ không hợp lệ!');
            return;
        }
    
        const selectedEmployee = employees.find((emp) => emp.name === employee);
        if (!selectedEmployee) {
            message.error('Nhân viên không hợp lệ!');
            return;
        }
    
        const employeeAppointments = appointments.filter((app) => app.date === formattedDate && app.employee === employee);
    
        if (employeeAppointments.length >= selectedEmployee.maxCustomersPerDay) {
            message.error(`Nhân viên ${employee} đã đạt giới hạn ${selectedEmployee.maxCustomersPerDay} khách/ngày!`);
            return;
        }
    
        if (isDuplicateAppointment(formattedDate, time, employee)) {
            message.error('Nhân viên này đã có lịch hẹn vào thời gian này!');
            return;
        }
    
        const newId = appointments.length + 1;
        setAppointments([
            ...appointments,
            { id: newId, ...newAppointment, date: formattedDate, status: 'Chờ duyệt', price: selectedService.price },
        ]);
        handleCancel();
        message.success('Đặt lịch thành công!');
    };
    
	const columns = [
		{ title: 'ID', dataIndex: 'id', key: 'id' },
		{ title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
		{ title: 'Nhân viên', dataIndex: 'employee', key: 'employee' },
		{ title: 'Dịch vụ', dataIndex: 'service', key: 'service' },
        { title: 'Giá', dataIndex: 'price', key: 'price', render: (price) => `${price?.toLocaleString()}đ` }, // Hiển thị giá
		{ title: 'Ngày', dataIndex: 'date', key: 'date' },
		{ title: 'Giờ', dataIndex: 'time', key: 'time' },
		{ title: 'Trạng thái', dataIndex: 'status', key: 'status' },
		{
			title: 'Hành động',
			key: 'actions',
			render: (_, app) => (
				<>
					{app.status === 'Chờ duyệt' && (
						<>
							<Button onClick={() => updateStatus(app.id, 'Xác nhận')}>Xác nhận</Button>
							<Button danger onClick={() => updateStatus(app.id, 'Hủy')}>
								Hủy
							</Button>
						</>
					)}
					{app.status === 'Xác nhận' && <Button onClick={() => updateStatus(app.id, 'Hoàn thành')}>Hoàn thành</Button>}
					{app.status === 'Hoàn thành' && (
						<Button type='primary' onClick={() => showReviewModal(app)}>
							Đánh giá
						</Button>
					)}
				</>
			),
		},
	];

	return (
		<div style={{ padding: '20px' }}>
			<h2>Quản lý lịch hẹn</h2>
			<Button type='primary' onClick={showModal}>
				Đặt lịch hẹn
			</Button>

			<Modal title='Đặt lịch hẹn' visible={isModalOpen} onOk={handleAddAppointment} onCancel={handleCancel}>
				<b>Tên khách hàng:</b>
				<input
					placeholder='Tên khách hàng'
					value={newAppointment.customer}
					onChange={(e) => setNewAppointment({ ...newAppointment, customer: e.target.value })}
					style={{ width: '100%', marginBottom: 10 }}
				/>

				<b>Nhân viên:</b>
				<Select
					placeholder='Chọn nhân viên'
					value={newAppointment.employee}
					style={{ width: '100%', marginBottom: 10 }}
					onChange={(value) => setNewAppointment({ ...newAppointment, employee: value })}
				>
					{employees.length > 0 ? (
						employees.map((emp) => (
							<Option key={emp.id} value={emp.name}>
								{emp.name}
							</Option>
						))
					) : (
						<Option disabled>Không có nhân viên</Option>
					)}
				</Select>

				<b>Dịch vụ:</b>
				<Select
					placeholder='Chọn dịch vụ'
					value={newAppointment.service}
					style={{ width: '100%', marginBottom: 10 }}
					onChange={(value) => setNewAppointment({ ...newAppointment, service: value })}
				>
					{services.length > 0 ? (
						services.map((service) => (
							<Option key={service.id} value={service.name}>
								{' '}
								{`${service.name} - ${service.price}đ - ${service.duration} phút`}
							</Option>
						))
					) : (
						<Option disabled>Không có dịch vụ</Option>
					)}
				</Select>

				<b>Chọn ngày:</b>
				<Calendar
					fullscreen={false}
					className='custom-calendar'
					onSelect={(date) => setNewAppointment({ ...newAppointment, date })}
				/>

				<b>Chọn giờ:</b>
				<Select
					placeholder='Chọn ca'
					value={newAppointment.time}
					style={{ width: '100%', marginTop: 10 }}
					onChange={(value) => setNewAppointment({ ...newAppointment, time: value })}
				>
					{generateTimeSlots().map((slot) => (
						<Option key={slot} value={slot}>
							{slot}
						</Option>
					))}
				</Select>
			</Modal>
			<Modal
				title='Đánh giá dịch vụ'
				visible={isReviewModalOpen}
				onOk={handleSaveReview}
				onCancel={() => setIsReviewModalOpen(false)}
			>
				<b>Chọn số sao:</b>
				<Rate value={reviewData.rating} onChange={(value) => setReviewData({ ...reviewData, rating: value })} />

				<b>Nhận xét:</b>
				<TextArea
					rows={4}
					value={reviewData.comment}
					onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
					placeholder='Nhập nhận xét của bạn...'
				/>
			</Modal>

			<Table dataSource={appointments} columns={columns} rowKey='id' style={{ marginTop: '20px' }} />
		</div>
	);
};

export default Quanlylichhen;
