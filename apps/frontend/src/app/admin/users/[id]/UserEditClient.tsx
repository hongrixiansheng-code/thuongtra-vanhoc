"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";
import { updateUser } from "../actions";

type EditableUser = {
  id: string;
  name: string | null;
  role: string;
  subscriptionStatus: string;
  subscriptionEndDate: Date | string | null;
};

export default function UserEditClient({ user }: { user: EditableUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [statusInForm, setStatusInForm] = useState(user.subscriptionStatus);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const openModal = () => {
    setStatusInForm(user.subscriptionStatus);
    setError(null);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    formData.append("id", user.id);
    formData.append("role", user.role); // giữ nguyên vai trò, trang này không đổi role

    const res = await updateUser(formData);

    if (res?.error) {
      setError(res.error);
    } else {
      setIsOpen(false);
    }
    setIsSaving(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg transition-colors border border-indigo-200 inline-flex items-center gap-2"
      >
        <Pencil className="w-4 h-4" /> Chỉnh sửa thông tin
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Chỉnh sửa thông tin</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={user.name || ""}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Nhập tên người dùng..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  name="subscriptionStatus"
                  value={statusInForm}
                  onChange={(e) => setStatusInForm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                  <option value="FREE">Miễn phí (FREE)</option>
                  <option value="PREMIUM">Premium</option>
                </select>
              </div>

              {statusInForm === "PREMIUM" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gia hạn Premium</label>
                  <select
                    name="premiumDuration"
                    defaultValue={user.subscriptionStatus === "PREMIUM" ? "keep" : "none"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  >
                    {user.subscriptionStatus === "PREMIUM" && (
                      <option value="keep">Giữ nguyên ngày hết hạn hiện tại</option>
                    )}
                    <option value="none">Vĩnh viễn (không hết hạn)</option>
                    <option value="3d">3 ngày · 30.000đ</option>
                    <option value="7d">7 ngày · 50.000đ</option>
                    <option value="15d">15 ngày · 75.000đ</option>
                    <option value="30d">30 ngày · 99.000đ</option>
                    <option value="90d">90 ngày · 249.000đ</option>
                    <option value="180d">180 ngày · 449.000đ</option>
                    <option value="360d">360 ngày · 669.000đ</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Chọn một mức gói sẽ tự ghi nhận giao dịch tương ứng vào lịch sử thanh toán.</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Đặt lại mật khẩu <span className="text-gray-400 font-normal">(bỏ trống nếu không đổi)</span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Mật khẩu mới..."
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  Hủy
                </button>
                <button type="submit" disabled={isSaving} className="flex-1 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50">
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
