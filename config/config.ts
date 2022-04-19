// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 220,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // enable: true,
    default: 'vi-VN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: false,
    // baseSeparator: '_',
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/admin/login',
      layout: false,
      hideInMenu: true,
      name: 'login',
      component: './user/Login/adminlogin',
    },
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
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      hideInMenu: true,
      name: 'account',
      icon: 'user',
      path: '/account',
      routes: [
        {
          name: 'center',
          icon: 'smile',
          path: '/account/center',
          component: './account/center',
        },
      ],
    },
    {
      layout: false,
      path: '/phuongthucxettuyen',
      component: './ChonPhuongThuc',
      access: 'thiSinh',
    },
    {
      layout: false,
      path: '/dotxettuyen',
      component: './ChonDot',
      access: 'thiSinh',
    },
    {
      layout: false,
      path: '/kichhoattaikhoan',
      component: './KichHoatTaiKhoan',
      hideInMenu: true,
      access: 'thiSinhChuaKichHoat',
    },
    {
      layout: false,
      path: '/verifycccd',
      component: './VerifyCCCD',
      hideInMenu: true,
      access: 'thiSinhChuaKichHoat',
    },
    {
      path: '/hosothisinh/phuongthucxettuyen/chitiet',
      hideInMenu: true,
      layout: false,
      component: './ChonPhuongThuc/ChiTietPhuongThuc.tsx',
      access: 'thiSinh',
    },
    {
      name: 'DangKyXetTuyen',
      path: '/dangkyxettuyen',
      icon: 'FormOutlined',
      component: './HoSoThiSinh/DangKyXetTuyen',
      access: 'thiSinh',
    },
    {
      name: 'KetQuaXetTuyen',
      path: '/ketquaxettuyen',
      icon: 'CheckSquareOutlined',
      component: './HoSoThiSinh/XacNhanNhapHoc',
      access: 'thiSinh',
    },
    // {
    //   name: 'KhaoSatTrucTuyen',
    //   path: '/khaosattructuyen',
    //   icon: 'CheckSquareOutlined',
    //   component: './HoSoThiSinh/KhaoSatTrucTuyen',
    //   access: 'thiSinh',
    // },
    {
      name: 'NhapHoc',
      path: '/nhaphoc',
      icon: 'BankOutlined',
      component: './HoSoThiSinh/NhapHoc',
      access: 'thiSinh',
    },
    {
      name: 'ThanhToan',
      path: '/thanhtoan',
      icon: 'DollarOutlined',
      component: './HoSoThiSinh/ThanhToan',
      access: 'thiSinh',
    },
    {
      name: 'HuongDan',
      path: '/huongdan',
      icon: 'FileTextOutlined',
      component: './HoSoThiSinh/HuongDan',
      access: 'thiSinh',
    },

    {
      name: 'QuanTriXetTuyen',
      path: '/quantrixettuyen',
      icon: 'FormOutlined',
      access: 'admin',
      routes: [
        {
          name: 'DotTuyenSinh',
          path: './dottuyensinh',
          component: './DotTuyenSinh',
          access: 'admin',
        },
        {
          name: 'TiepNhanHoSoXetTuyen',
          path: './tiepnhanhoso',
          access: 'admin',
          routes: [
            {
              name: 'TatCaHoSo',
              path: './tatcahoso',
              component: './TiepNhanHoSo/TatCa.tsx',
              access: 'admin',
            },
            {
              name: 'HoSoChuaKhoa',
              path: './hosochuakhoa',
              component: './TiepNhanHoSo/ChuaKhoa.tsx',
              access: 'admin',
            },
            {
              name: 'HoSoDaKhoa',
              path: './hosodakhoa',
              component: './TiepNhanHoSo/DaKhoa.tsx',
              access: 'admin',
            },
            {
              name: 'HoSoDaTiepNhan',
              path: './hosodatiepnhan',
              component: './TiepNhanHoSo/DaTiepNhan.tsx',
              access: 'admin',
            },
            {
              name: 'HoSoKhongTiepNhan',
              path: './hosokhongtiepnhan',
              component: './TiepNhanHoSo/KhongTiepNhan.tsx',
              access: 'admin',
            },
          ],
        },
        {
          name: 'ChiTieuVaGiaLap',
          path: './chitieuvagialap',
          access: 'admin',
          routes: [
            {
              name: 'ChiTieuXetTuyen',
              path: './chitieuxettuyen',
              access: 'admin',
              // component: './ChiTieu',
            },
            {
              name: 'DanhSachTrungTuyen',
              path: './danhSachTrungTuyen',
              component: './KetQuaXetTuyen',
              access: 'admin',
            },
          ],
        },
      ],
    },

    {
      name: 'QuanTriNhapHoc',
      path: '/quantrinhaphoc',
      icon: 'BankOutlined',
      access: 'admin',
      routes: [
        { name: 'DotNhapHoc', path: './dotnhaphoc', access: 'admin' },
        {
          name: 'TiepNhanHoSoNhapHoc',
          path: './tiepnhanhosonhaphoc',
          access: 'admin',
          routes: [
            {
              name: 'DanhSachChuaXacNhanNhapHoc',
              path: './danhsachchuaxacnhannhaphoc',
              access: 'admin',
            },
            {
              name: 'DanhSachDaXacNhanNhapHoc',
              path: './danhsachdaxacnhannhaphoc',
              access: 'admin',
            },
            {
              name: 'DanhSachHoanThienHoSoNhapHoc',
              path: './danhsachdahoanthienhosonhaphoc',
              access: 'admin',
            },
            {
              name: 'DanhSachDuDieuKienNhapHoc',
              path: './danhsachdudieukiennhaphoc',
              access: 'admin',
            },
          ],
        },
      ],
    },
    {
      name: 'QuanTriThanhToan',
      path: '/quantrithanhtoan',
      icon: 'DollarOutlined',
      access: 'admin',
      routes: [
        {
          name: 'LoaiLePhi',
          path: './loailephi',
          access: 'admin',
        },
        {
          name: 'ThongTinCongNo',
          path: './thongtincongno',
          access: 'admin',
        },
      ],
    },
    {
      name: 'TuongTac',
      path: '/tuongtac',
      access: 'admin',
      icon: 'AppstoreAddOutlined',
      routes: [
        {
          name: 'Email',
          path: './sendemail',
          component: './SendEmail/index.tsx',
          access: 'admin',
        },
        {
          name: 'BieuMau',
          path: './quanlybieumau',
          component: './QuanLyBieuMau',
          access: 'admin',
        },
        {
          name: 'ThongBao',
          path: './quanlythongbao',
          component: './QuanLyThongBao',
          access: 'admin',
        },
        {
          name: 'HuongDanSuDung',
          path: './huongdansudung',
        },
      ],
    },
    {
      name: 'ThongKeBaoCao',
      path: '/thongkebaocao',
      icon: 'PieChartOutlined',
      access: 'admin',
      routes: [
        {
          name: 'TuyenSinh',
          path: './tuyensinh',
          access: 'admin',
        },
        {
          name: 'NhapHoc',
          path: './nhaphoc',
          access: 'admin',
        },
      ],
    },
    {
      name: 'CauHinhHeThong',
      path: './cauhinhhethong',
      access: 'admin',
      icon: 'SettingOutlined',
      routes: [
        {
          name: 'QuanLyTaiKhoan',
          path: './quanlytaikhoan',
          routes: [
            {
              name: 'TaiKhoanThiSinh',
              path: './taikhoanthisinh',
              component: './QuanLyTaiKhoan/TaiKhoanThiSinh',
            },
            {
              name: 'TaiKhoanChuyenVien',
              path: './taikhoanchuyenvien',
              component: './QuanLyTaiKhoan/TaiKhoanChuyenVien',
            },
          ],
        },
        {
          name: 'QuanLyNamTuyenSinh',
          path: './quanlynamtuyensinh',
          component: './NamTuyenSinh',
        },
        {
          name: 'QuanLyPhuongThucXetTuyen',
          path: './quanlyphuongthucxettuyen',
          component: './PhuongThucTuyenSinh',
        },

        {
          name: 'QuanLyCoSoDaoTao',
          path: './quanlycosodaotao',
          component: './CoSoDaoTao',
        },
        {
          name: 'QuanLyNganhChuyenNganh',
          path: './quanlynganhchuyennganh',
          component: './NganhChuyenNganh',
        },
        {
          name: 'QuanLyDoiTuongTuyenSinh',
          path: './quanlydoituongtuyensinh',
          component: './DoiTuongTuyenSinh',
        },
        {
          name: 'HinhThucDaoTao',
          path: './hinhthucdaotao',
          component: './HinhThucDaoTao',
        },

        // {
        //   name: 'PhanQuyen',
        //   icon: 'DeploymentUnitOutlined',
        //   path: './phanquyen',
        //   access: 'admin',
        //   routes: [
        //     {
        //       name: 'NhomVaiTro',
        //       path: './nhomvaitro',
        //       access: 'admin',
        //       component: './PhanQuyen/NhomVaiTro',
        //     },
        //     {
        //       name: 'ChucNang',
        //       path: './phanchucnang',
        //       access: 'admin',
        //       component: './PhanQuyen',
        //     },
        //     {
        //       name: 'PhanNhom',
        //       path: './phannhom',
        //       access: 'admin',
        //       component: './PhanQuyen/UserQLDT',
        //     },
        //   ],
        // },
      ],
    },
    {
      path: '/',
      redirect: '/user/login',
    },
    {
      component: '404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},

  nodeModulesTransform: {
    type: 'none',
  },
  // mfsu: {},
  webpack5: {},
  exportStatic: {},
});
