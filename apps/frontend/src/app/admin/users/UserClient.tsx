"use client";

import { useState } from "react";
import Link from "next/link";
import { UserCog, ShieldAlert, BadgeCheck, X, Pencil, Trash2, Search } from "lucide-react";
import { createUser, updateUser, deleteUser } from "./actions";

export default function UserClient({ users }: { users: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [statusInForm, setStatusInForm] = useState("FREE");

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch = !term ||
      (user.name || "").toLowerCase().includes(term) ||
      (user.email || "").toLowerCase().includes(term);
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
    const matchesStatus = statusFilter === "ALL" || user.subscriptionStatus === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const openAddModal = () => {
    setEditingUser(null);
    setError(null);
    setStatusInForm("FREE");
    setIsModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setError(null);
    setStatusInForm(user.subscriptionStatus || "FREE");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    let res;
    if (editingUser) {
      formData.append("id", editingUser.id);
      res = await updateUser(formData);
    } else {
      res = await createUser(formData);
    }

    if (res?.error) {
      setError(res.error);
    } else {
      closeModal();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;
    
    setIsDeleting(id);
    const formData = new FormData();
    formData.append("id", id);
    const res = await deleteUser(formData);
    
    if (res?.error) {
      alert(res.error);
    }
    setIsDeleting(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
        <button onClick={openAddModal} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
          + Thêm người dùng
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        >
          <option value="ALL">Tất cả vai trò</option>
          <option value="USER">Học viên</option>
          <option value="TEACHER">Giáo viên</option>
          <option value="ADMIN">Quản trị viên</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="FREE">Miễn phí</option>
          <option value="PREMIUM">Premium</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Người dùng</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Ngày đăng ký</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/admin/users/${user.id}`} className="flex items-center group">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3 shrink-0">
                        {(user.name || user.email || "U")[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-indigo-600 group-hover:underline">{user.name || "Chưa cập nhật"}</div>
                        <div className="text-gray-500">{user.email}</div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "ADMIN" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        <ShieldAlert className="w-3.5 h-3.5" /> Quản trị viên
                      </span>
                    ) : user.role === "TEACHER" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <UserCog className="w-3.5 h-3.5" /> Giáo viên
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        <UserCog className="w-3.5 h-3.5" /> Học viên
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.subscriptionStatus === "PREMIUM" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <BadgeCheck className="w-3.5 h-3.5" />
                        {user.subscriptionEndDate
                          ? `Premium · hết hạn ${new Date(user.subscriptionEndDate).toLocaleDateString('vi-VN')}`
                          : "Premium vĩnh viễn"}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        Miễn phí
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEditModal(user)} className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 inline-flex items-center justify-center transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)} 
                        disabled={isDeleting === user.id}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 inline-flex items-center justify-center transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {users.length === 0 ? "Chưa có người dùng nào trong hệ thống." : "Không tìm thấy người dùng phù hợp."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingUser ? "Sửa Người dùng" : "Thêm Người dùng"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
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
                  defaultValue={editingUser?.name || ""} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Nhập tên người dùng..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email" 
                  defaultValue={editingUser?.email || ""} 
                  readOnly={!!editingUser}
                  required
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all ${editingUser ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'}`}
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu {editingUser ? <span className="text-gray-400 font-normal">(Bỏ trống nếu không đổi)</span> : <span className="text-red-500">*</span>}
                </label>
                <input 
                  type="password" 
                  name="password" 
                  required={!editingUser}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Nhập mật khẩu..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                  <select 
                    name="role" 
                    defaultValue={editingUser?.role || "USER"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  >
                    <option value="USER">Học viên (USER)</option>
                    <option value="TEACHER">Giáo viên (TEACHER)</option>
                    <option value="ADMIN">Quản trị viên (ADMIN)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                  <select
                    name="subscriptionStatus"
                    defaultValue={editingUser?.subscriptionStatus || "FREE"}
                    onChange={(e) => setStatusInForm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  >
                    <option value="FREE">Miễn phí (FREE)</option>
                    <option value="PREMIUM">Premium</option>
                  </select>
                </div>
              </div>

              {statusInForm === "PREMIUM" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingUser ? "Gia hạn Premium" : "Thời hạn Premium"}
                  </label>
                  <select
                    name="premiumDuration"
                    defaultValue={editingUser && editingUser.subscriptionStatus === "PREMIUM" ? "keep" : "none"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  >
                    {editingUser && editingUser.subscriptionStatus === "PREMIUM" && (
                      <option value="keep">Giữ nguyên ngày hết hạn hiện tại</option>
                    )}
                    <option value="none">Vĩnh viễn (không hết hạn)</option>
                    <option value="3d">3 ngày · 25.000đ</option>
                    <option value="7d">7 ngày · 50.000đ</option>
                    <option value="15d">15 ngày · 75.000đ</option>
                    <option value="30d">30 ngày · 99.000đ</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Chọn một mức gói sẽ tự ghi nhận giao dịch tương ứng vào lịch sử thanh toán.</p>
                </div>
              )}

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  Hủy
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                  {editingUser ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
