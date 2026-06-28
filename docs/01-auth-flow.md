Truy cập app
│
├── Đã có session?
│   ├── Có → Vào Dashboard
│   └── Chưa → Trang Landing
│
├── [Đăng nhập]
│   ├── Nhập email + mật khẩu
│   ├── NextAuth xác thực
│   ├── Thất bại → Hiện lỗi → Thử lại
│   └── Thành công → Kiểm tra role
│
├── [Đăng ký]
│   ├── Nhập email + mật khẩu
│   ├── Tạo tài khoản mới (role: USER)
│   └── Thành công → Kiểm tra role
│
└── Kiểm tra role
    ├── ADMIN → Admin Dashboard (bypass tất cả)
    └── USER  → User Dashboard