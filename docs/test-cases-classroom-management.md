# Test Case — Tính năng Quản lý Lớp học

Phạm vi: role TEACHER, `Class`/`ClassEnrollment`, trang `/teacher/classes` + `/teacher/classes/[id]`, logic khóa chương trình trong `apps/frontend/src/lib/getProgressIds.ts`.

Quy ước: **Loại** = Happy path (HP) / Edge case (EC) / Security (SEC).

## 1. Phân quyền vai trò TEACHER

| ID | Mô tả | Bước thực hiện | Dữ liệu test | Kết quả mong đợi | Loại |
|---|---|---|---|---|---|
| ROLE-01 | Admin gán role TEACHER cho user | Đăng nhập ADMIN → `/admin/users` → sửa 1 user → chọn vai trò "Giáo viên (TEACHER)" → Cập nhật | User USER thường có email đã biết | User đổi thành TEACHER, badge màu vàng "Giáo viên" hiện trong danh sách | HP |
| ROLE-02 | Lọc danh sách user theo role TEACHER | `/admin/users` → chọn filter "Giáo viên" | — | Chỉ hiển thị user có role TEACHER | HP |
| ROLE-03 | User thường (chưa đăng nhập ADMIN) gọi server action đổi role | Gọi trực tiếp `updateUser` qua devtools/console với session không phải ADMIN | — | Action throw lỗi "Không có quyền thực hiện hành động này.", role không đổi | SEC |
| ROLE-04 | TEACHER tự sửa role của mình thành ADMIN qua admin UI | Đăng nhập TEACHER → cố truy cập `/admin/users` | — | Middleware redirect về `/dashboard`, không vào được trang admin | SEC |

## 2. CRUD lớp học

| ID | Mô tả | Bước thực hiện | Dữ liệu test | Kết quả mong đợi | Loại |
|---|---|---|---|---|---|
| CLS-01 | Giáo viên tạo lớp mới | Đăng nhập TEACHER → `/teacher/classes` → "+ Tạo lớp mới" → nhập tên + chọn program | Tên: "HSK1 - Lớp tối T2T4", Program: HSK 1 | Lớp xuất hiện ngay trong danh sách, không cần reload | HP |
| CLS-02 | Tạo lớp thiếu tên | Mở modal tạo lớp, bỏ trống tên, chọn program, bấm "Tạo lớp" | — | Form chặn submit (required), hoặc nếu bypass: action trả lỗi "Vui lòng nhập tên lớp và chọn chương trình." | EC |
| CLS-03 | Tạo lớp thiếu program | Nhập tên, không chọn program | — | Tương tự CLS-02 | EC |
| CLS-04 | Sửa tên lớp | Vào `/teacher/classes/[id]` → bấm icon sửa → đổi tên → Lưu | Tên mới: "HSK1 - Đã đổi tên" | Tên cập nhật ngay trên trang, không cần reload | HP |
| CLS-05 | Đổi trạng thái lớp thành ngừng hoạt động | Trong form sửa lớp, bỏ check "Lớp đang hoạt động" → Lưu | — | Badge "Đã ngừng hoạt động" hiện ra; học sinh trong lớp **không còn** được full quyền program đó (xem ACCESS-06) | EC |
| CLS-06 | Xóa lớp học | `/teacher/classes` → bấm icon thùng rác trên 1 lớp → xác nhận | — | Lớp biến mất khỏi danh sách ngay, toàn bộ `ClassEnrollment` của lớp đó bị xóa theo (cascade), `UserProgress` của học sinh không bị ảnh hưởng | HP |
| CLS-07 | Hủy hộp thoại xác nhận khi xóa lớp | Bấm thùng rác → hộp thoại confirm hiện ra → bấm Cancel | — | Lớp **không** bị xóa | EC |
| CLS-08 | Giáo viên B sửa/xóa lớp của giáo viên A | Đăng nhập TEACHER B, gọi `updateClass`/`deleteClass` với `classId` thuộc giáo viên A (qua devtools hoặc URL trực tiếp `/teacher/classes/[id-cua-A]`) | — | Action trả lỗi "Bạn không phải giáo viên phụ trách lớp này."; nếu truy cập trang chi tiết qua URL, bị `redirect("/teacher/classes")` | SEC |
| CLS-09 | Admin truy cập trang chi tiết lớp của bất kỳ giáo viên nào | Đăng nhập ADMIN → mở URL `/teacher/classes/[id]` của 1 lớp không do admin tạo | — | Vẫn xem được (admin bypass ownership check) | EC |

## 3. Quản lý học sinh trong lớp

| ID | Mô tả | Bước thực hiện | Dữ liệu test | Kết quả mong đợi | Loại |
|---|---|---|---|---|---|
| STU-01 | Thêm học sinh đã đăng ký vào lớp | Vào chi tiết lớp → nhập email học sinh đã có tài khoản → "Thêm" | Email user USER có sẵn | Học sinh xuất hiện ngay trong danh sách, đếm số học sinh +1, input tự reset | HP |
| STU-02 | Thêm email chưa đăng ký trên web | Nhập email không tồn tại trong DB → "Thêm" | `khong-ton-tai@test.com` | Báo lỗi "Không tìm thấy học sinh đã đăng ký với email này.", không tạo enrollment | EC |
| STU-03 | Thêm trùng học sinh đã có trong lớp | Thêm lại đúng email học sinh đã ở trong lớp | — | Không lỗi, không tạo dòng trùng (upsert), số học sinh không tăng thêm | EC |
| STU-04 | Thêm học sinh bằng email rỗng | Bỏ trống ô email, bấm "Thêm" | — | Form chặn submit (required) hoặc action trả lỗi "Vui lòng nhập email học sinh." | EC |
| STU-05 | Xóa học sinh khỏi lớp | Bấm icon thùng rác cạnh tên học sinh → xác nhận | — | Học sinh biến mất khỏi danh sách ngay, `ClassEnrollment` bị xóa, `UserProgress` của học sinh giữ nguyên | HP |
| STU-06 | Một học sinh thuộc nhiều lớp ở nhiều program khác nhau | Thêm cùng 1 học sinh vào lớp HSK1 (giáo viên A) và lớp Starters (giáo viên B) | — | Học sinh full quyền cả `hsk1` và `en-starters`, các program khác vẫn bị khóa | HP |
| STU-07 | Giáo viên B thêm/xóa học sinh trong lớp của giáo viên A | Gọi `addStudentToClass`/`removeStudentFromClass` với `classId` của giáo viên A | — | Action trả lỗi quyền, không thực hiện được | SEC |

## 4. Logic khóa nội dung theo lớp học

| ID | Mô tả | Bước thực hiện | Dữ liệu test | Kết quả mong đợi | Loại |
|---|---|---|---|---|---|
| ACCESS-01 | Học sinh trong lớp truy cập đúng program của lớp | Đăng nhập học sinh đã được thêm vào lớp HSK1 → `/dashboard?level=hsk1` | — | Hiện danh sách bài học đầy đủ, **không** cần đạt 7/10 để mở bài tiếp theo (full unlock) | HP |
| ACCESS-02 | Học sinh trong lớp truy cập program khác (không thuộc lớp) | Cùng học sinh trên → `/dashboard?level=hsk2` | — | Hiện màn hình khóa "Chương trình này không thuộc lớp học của bạn" (component `ProgramLocked`) | HP |
| ACCESS-03 | Lặp lại kiểm tra khóa trên các trang nội dung khác | Học sinh trên → `/vocab?level=hsk2`, `/grammar?level=hsk2`, `/dialogue?level=hsk2`, `/games?level=hsk2`, `/practice?level=hsk2`, `/mock-test?level=hsk2`, `/reading?level=hsk2`, `/listening?level=hsk2`, `/writing?level=hsk2` | — | Tất cả đều hiện màn hình khóa, không lộ nội dung | HP |
| ACCESS-04 | Truy cập trực tiếp route bài học của program bị khóa | Lấy 1 `lessonId` thuộc `hsk2`, mở `/lessons/zh/hsk2/[lessonId]` | — | Hiện màn hình khóa, không render `LessonStepFlow` (chặn bypass qua route chi tiết) | SEC |
| ACCESS-05 | Học sinh chưa thuộc lớp nào | Đăng nhập user USER thường, chưa được thêm vào lớp nào → `/dashboard?level=hsk1` | — | Hành vi Free/Premium như cũ (không bị khóa, không tự động full quyền — vẫn theo điều kiện điểm 7/10–8/10) | HP |
| ACCESS-06 | Giáo viên đổi lớp thành "ngừng hoạt động" | Sau CLS-05, học sinh trong lớp đó truy cập lại program tương ứng | — | Không còn full quyền tự động; nếu học sinh không thuộc lớp active nào khác, quay về hành vi Free/Premium thông thường | EC |
| ACCESS-07 | Học sinh bị gỡ khỏi lớp (STU-05) | Sau khi xóa khỏi lớp, học sinh truy cập lại program đã từng full quyền | — | Quay lại hành vi Free/Premium bình thường, không còn bị khóa cứng (vì không còn enrollment nào), tiến độ bài học cũ vẫn còn | HP |
| ACCESS-08 | Bộ chọn chương trình (`Header`/Navigation) khi học sinh thuộc lớp | Học sinh thuộc lớp HSK1 → mở dropdown chọn chương trình ở menu trên | — | Chỉ hiện chương trình HSK1 (program của lớp), không hiện HSK2/HSK3/Starters... (do `/api/subjects` đã lọc) | HP |
| ACCESS-09 | Admin truy cập program bất kỳ | Đăng nhập ADMIN → thử mọi `level=` | — | Luôn full quyền, không bao giờ bị `ProgramLocked`, không phụ thuộc lớp học | HP |

## 5. Bảo mật route `/teacher/*`

| ID | Mô tả | Bước thực hiện | Dữ liệu test | Kết quả mong đợi | Loại |
|---|---|---|---|---|---|
| SEC-01 | User thường (role USER) truy cập `/teacher/classes` | Đăng nhập USER → gõ URL `/teacher/classes` | — | Middleware redirect về `/dashboard` | SEC |
| SEC-02 | Chưa đăng nhập truy cập `/teacher/classes` | Mở `/teacher/classes` ở trạng thái chưa login | — | Redirect về `/login?from=/teacher/classes` | SEC |
| SEC-03 | TEACHER truy cập `/teacher/classes/[id]` không tồn tại | Sửa URL với `id` ngẫu nhiên không có trong DB | — | Trang trả `notFound()` (404), không lỗi 500 | EC |
| SEC-04 | Gọi `createClass` với `programId` không tồn tại | Devtools gọi action với `programId` giả | — | Lỗi DB foreign key được bắt trong try/catch, trả về "Đã xảy ra lỗi khi tạo lớp học." | EC |

## 6. Hồi quy (regression) liên quan

| ID | Mô tả | Bước thực hiện | Kết quả mong đợi | Loại |
|---|---|---|---|---|
| REG-01 | Trang `/admin/users` các action cũ (create/delete/forceLogout user) vẫn hoạt động sau khi thêm `requireAdmin()` | Thực hiện tạo, xóa, force-logout 1 user test với tài khoản ADMIN | Hoạt động bình thường như trước, không bị chặn nhầm | HP |
| REG-02 | User KHÔNG thuộc lớp nào dùng các trang nội dung như cũ | USER thường chưa từng được thêm vào lớp, dùng `/vocab`, `/grammar`, `/practice`... | Hành vi giữ nguyên 100% so với trước khi có tính năng lớp học (không có `programLocked`) | HP |

---

**Dữ liệu test gợi ý (tạo & xóa sau khi test xong, không để lại trên DB production):**
- 1 tài khoản TEACHER, 2 tài khoản USER (1 làm học sinh chính, 1 để test STU-06 đa lớp)
- Ít nhất 2 program khác nhau (vd: `hsk1`, `hsk2`) đã có sẵn lesson để kiểm tra ACCESS-01 → ACCESS-03
