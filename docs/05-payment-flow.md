User xem trang Premium → /pricing
│
├── Hiện các gói
│   ├── FREE (miễn phí)
│   ├── PREMIUM tháng (79,000 VND · promo 49,000)
│   └── PREMIUM năm (659,000 VND · promo 449,000)
│
└── Nhấn "Nâng cấp" → Chọn cổng thanh toán
    ├── MoMo
    └── VNPay

LUỒNG THANH TOÁN
│
├── Frontend gọi API → /api/payment/create
│   ├── Tạo order trong DB (status: PENDING)
│   ├── Gọi MoMo/VNPay API tạo giao dịch
│   └── Nhận payment URL → redirect user
│
├── User thực hiện thanh toán
│   ├── Thành công → redirect về /payment/success
│   └── Thất bại / Huỷ → redirect về /payment/failed
│
├── Webhook callback → /api/payment/webhook
│   ├── Xác thực chữ ký (signature) từ MoMo/VNPay
│   ├── Thất bại xác thực → bỏ qua (log lỗi)
│   └── Thành công xác thực
│       ├── Cập nhật order (status: COMPLETED)
│       ├── Cập nhật user
│       │   ├── subscriptionStatus = PREMIUM
│       │   ├── subscriptionStart = now
│       │   └── subscriptionEnd = now + 30/365 ngày
│       └── Gửi email xác nhận (tùy chọn)
│
├── /payment/success
│   ├── Hiện thông báo thành công
│   ├── Reload session (cập nhật quyền Premium)
│   └── Redirect về Dashboard
│
└── /payment/failed
    ├── Hiện thông báo thất bại
    └── Nút thử lại → quay lại /pricing

GIA HẠN / HẾT HẠN
│
├── Cron job chạy hàng ngày
│   ├── Tìm user có subscriptionEnd < now
│   ├── Cập nhật subscriptionStatus = FREE
│   └── Gửi email thông báo hết hạn
│
├── User gia hạn
│   └── Lặp lại luồng thanh toán
│
└── Admin gia hạn thủ công
    └── Vào Admin Dashboard → Quản lý gói → Gia hạn

BẢO MẬT
├── Verify webhook signature trước khi xử lý
├── Idempotency: check orderId đã xử lý chưa
├── Log tất cả giao dịch vào DB
└── Không lưu thông tin thẻ / tài khoản ngân hàng