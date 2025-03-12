export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	
	
	{
		name: 'Quản lý thực hành 3',
		icon: 'CalendarOutlined',

		routes : [
			{
				path: '/Quanlylichhen',
				name: 'Quản lý lịch hẹn',
				component: './Quanlylichhen/Quanlylichhen',
				icon: 'CalendarOutlined',
			},
			{
				path: '/Quanlynhanvien',
				name: 'Quản lý nhân viên và dịch vụ',
				component: './Quanlynhanvien/Quanlynhanvien',
				icon: 'UserOutlined',
			},
			{
				path: '/Danhgiadichvu',
				name: 'Đánh giá dịch vụ',
				component: './Danhgiadichvu/Danhgiadichvu',
				icon: 'StarOutlined',
			},
			{
				path: '/Thongke',
				name: 'Thống kê',
				component: './Thongke/Thongke',
				icon: 'BarChartOutlined',
			},
		]
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
	
];
