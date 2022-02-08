export enum Role {
  nhan_vien = 'Cán bộ, giảng viên',
  sinh_vien = 'Sinh viên',
}

export enum ElementTemplateType {
  TEXT_INPUT = 'Nhập Text 1 dòng',
  TEXT_AREA = 'Nhập Text nhiều dòng',
  INPUT_NUMBER = 'Nhập số',
  DATE_PICKER = 'Chọn ngày tháng',
  UPLOAD_SINGLE = 'Chọn 1 file',
  UPLOAD_MULTI = 'Chọn nhiều file',
  DROP_LIST_SINGLE = 'Lựa chọn một (dạng Droplist)',
  DROP_LIST_MULTI = 'Lựa chọn nhiều (dạng Droplist)',
  RADIO_BUTTON = 'Lựa chọn một (Radio)',
  CHECKLIST = 'Lựa chọn nhiều (Checklist)',
  DON_VI_HANH_CHINH = 'Đơn vị hành chính',
  TABLE = 'Dạng bảng',
  TEXT_BLOCK = 'Đoạn văn bản',
}

export enum EFileType {
  doc = 'Tài liệu (doc, docx)',
  pdf = 'Tài liệu (pdf)',
  excel = 'Excel (xlsx, xls)',
  image = 'Ảnh (png, jpg, jpeg)',
}

export enum LoaiDoiTuongXuLyQuyTrinh {
  DON_VI_CU_THE = 'Đơn vị cụ thể',
  DON_VI_QUAN_LY = 'Đơn vị quản lý',
  // CO_VAN_HOC_TAP = 'Cố vấn học tập',
}

export const LevelDonViHanhChinh = [
  'Tỉnh',
  'Tỉnh, quận',
  'Tỉnh, quận, xã',
  'Tỉnh, quận, xã, số nhà tên đường',
];

export const accessFileUpload = {
  doc: '.doc,.docx',
  excel: '.xlsm, .xls, .xlsx',
  image: '.png, .jpg, .jpeg',
  pdf: '.pdf',
};

export enum TrangThaiDonDVMC {
  OK = 'Đã duyệt',
  NOT_OK = 'Không duyệt',
  PROCESSING = 'Đang xử lý',
}

export enum TrangThaiBuoc {
  OK = 'Đã duyệt',
  NOT_OK = 'Không duyệt',
  PROCESSING = 'Đang xử lý',
}

export enum TrangThaiThaoTac {
  PENDING = 'Chưa duyệt',
  OK = 'Đã duyệt',
  NOT_OK = 'Không duyệt',
}

export enum ColorTrangThaiDonMotCua {
  PENDING = 'gray',
  OK = 'green',
  NOT_OK = '#CC0D00',
  PROCESSING = '#1890ff',
}

export const Setting = {
  navTheme: 'dark',
  primaryColor: '#CC0D00',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Xét tuyển PTIT',
  pwa: false,
  logo: '/favicon.ico',
  iconfontUrl: '',
};
