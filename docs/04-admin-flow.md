Admin đăng nhập
└── role = ADMIN → Admin Dashboard (/admin)

Admin Dashboard
│
├── QUẢN LÝ NỘI DUNG
│   ├── Xem tất cả chương trình
│   │   └── Chọn chương trình → xem bài học
│   ├── Xem/Sửa từ vựng · ngữ pháp · hội thoại
│   ├── Seed / Reset chương trình
│   └── Bypass tất cả lock (bài học + premium)
│
├── QUẢN LÝ USER
│   ├── Danh sách user
│   │   ├── Tìm kiếm theo email / tên
│   │   ├── Lọc theo role (ADMIN / USER)
│   │   └── Lọc theo gói (FREE / PREMIUM)
│   ├── Xem chi tiết user
│   │   ├── Thông tin tài khoản
│   │   ├── Lịch sử học tập (progress)
│   │   └── Lịch sử thanh toán
│   ├── Phân quyền
│   │   ├── Nâng lên ADMIN
│   │   └── Hạ xuống USER
│   └── Reset mật khẩu
│       └── Gửi email đặt lại mật khẩu
│
├── QUẢN LÝ GÓI
│   ├── Danh sách gói (FREE · PREMIUM · ADMIN)
│   ├── Nâng cấp gói user thủ công
│   │   ├── Chọn user
│   │   ├── Chọn gói + thời hạn
│   │   └── Xác nhận → cập nhật DB
│   ├── Thu hồi Premium
│   └── Gia hạn / Điều chỉnh ngày hết hạn
│
├── THỐNG KÊ
│   ├── Tổng user · user active hôm nay
│   ├── Số bài học hoàn thành (theo ngày/tuần/tháng)
│   ├── Chương trình phổ biến nhất
│   ├── Tỉ lệ chuyển đổi FREE → PREMIUM
│   └── Doanh thu (theo ngày/tuần/tháng)
│
└── CÀI ĐẶT HỆ THỐNG
    ├── Cấu hình giá gói Premium
    ├── Cấu hình cổng thanh toán (MoMo/VNPay)
    └── Thông báo hệ thống (banner/popup)

Bảo vệ Admin
├── Middleware kiểm tra role = ADMIN
├── Tất cả route /admin/* đều redirect nếu không phải ADMIN
└── API /api/admin/* đều verify session + role