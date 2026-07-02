"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { UserCog, ShieldAlert, BadgeCheck, X, Pencil, Trash2, Search, Ban, ShieldCheck, Download, Users as UsersIcon, Clock3, TrendingUp } from "lucide-react";
import { createUser, updateUser, deleteUser, banUser, unbanUser, bulkGrantPremium, bulkBanUsers } from "./actions";

const PAGE_SIZE = 50;

type Stats = {
  total: number;
  free: number;
  premium: number;
  newLast7Days: number;
  newLast30Days: number;
  expiringSoon: { id: string; name: string | null; email: string | null; subscriptionEndDate: string | Date | null }[];
};

export default function UserClient({ users, stats }: { users: any[]; stats: Stats }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isBanToggling, setIsBanToggling] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [statusInForm, setStatusInForm] = useState("FREE");

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [bannedFilter, setBannedFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDuration, setBulkDuration] = useState("30d");
  const [isBulkRunning, setIsBulkRunning] = useState(false);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return users.filter((user) => {
      const matchesSearch = !term ||
        (user.name || "").toLowerCase().includes(term) ||
        (user.email || "").toLowerCase().includes(term);
      const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
      const matchesStatus = statusFilter === "ALL" || user.subscriptionStatus === statusFilter;
      const matchesBanned = bannedFilter === "ALL" ||
        (bannedFilter === "BANNED" ? user.isBanned : !user.isBanned);
      return matchesSearch && matchesRole && matchesStatus && matchesBanned;
    });
  }, [users, searchTerm, roleFilter, statusFilter, bannedFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedUsers = filteredUsers.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetPageAnd<T extends (...args: any[]) => void>(setter: T) {
    return (...args: Parameters<T>) => {
      setter(...args);
      setPage(1);
    };
  }

  const toggleSelected = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAllOnPage = () => {
    setSelectedIds(prev => {
      const allSelected = pagedUsers.every(u => prev.has(u.id));
      const next = new Set(prev);
      if (allSelected) {
        pagedUsers.forEach(u => next.delete(u.id));
      } else {
        pagedUsers.forEach(u => next.add(u.id));
      }
      return next;
    });
  };

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
    if (!confirm("Bạn có chắc chắn muốn xóa người dùng này? Hành động không thể hoàn tác.")) return;

    setIsDeleting(id);
    const formData = new FormData();
    formData.append("id", id);
    const res = await deleteUser(formData);

    if (res?.error) {
      alert(res.error);
    }
    setIsDeleting(null);
  };

  const handleToggleBan = async (user: any) => {
    const willBan = !user.isBanned;
    if (!confirm(willBan ? `Khóa tài khoản ${user.email}? Người dùng sẽ không thể đăng nhập.` : `Mở khóa tài khoản ${user.email}?`)) return;

    setIsBanToggling(user.id);
    const formData = new FormData();
    formData.append("id", user.id);
    const res = willBan ? await banUser(formData) : await unbanUser(formData);

    if (res?.error) alert(res.error);
    setIsBanToggling(null);
  };

  const handleBulkGrantPremium = async () => {
    if (!confirm(`Cấp Premium (${bulkDuration === "none" ? "vĩnh viễn" : bulkDuration}) cho ${selectedIds.size} người dùng đã chọn?`)) return;
    setIsBulkRunning(true);
    const formData = new FormData();
    formData.append("ids", Array.from(selectedIds).join(","));
    formData.append("premiumDuration", bulkDuration);
    const res = await bulkGrantPremium(formData);
    if (res?.error) alert(res.error);
    setSelectedIds(new Set());
    setIsBulkRunning(false);
  };

  const handleBulkBan = async () => {
    if (!confirm(`Khóa ${selectedIds.size} tài khoản đã chọn? (Tài khoản quản trị viên sẽ được bỏ qua)`)) return;
    setIsBulkRunning(true);
    const formData = new FormData();
    formData.append("ids", Array.from(selectedIds).join(","));
    const res = await bulkBanUsers(formData);
    if (res?.error) alert(res.error);
    setSelectedIds(new Set());
    setIsBulkRunning(false);
  };

  const handleExportCsv = () => {
    const header = ["Tên", "Email", "Vai trò", "Trạng thái", "Ngày hết hạn", "Bị khóa", "Ngày đăng ký"];
    const rows = filteredUsers.map(u => [
      u.name || "",
      u.email || "",
      u.role,
      u.subscriptionStatus,
      u.subscriptionEndDate ? new Date(u.subscriptionEndDate).toLocaleDateString('vi-VN') : "",
      u.isBanned ? "Có" : "Không",
      new Date(u.createdAt).toLocaleDateString('vi-VN')
    ]);
    const csv = [header, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
        <div className="flex gap-2">
          <button onClick={handleExportCsv} className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors inline-flex items-center gap-2">
            <Download className="w-4 h-4" /> Xuất CSV
          </button>
          <button onClick={openAddModal} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
            + Thêm người dùng
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1"><UsersIcon className="w-3.5 h-3.5" /> Tổng người dùng</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-400 mt-1">{stats.free} miễn phí · {stats.premium} Premium</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1"><TrendingUp className="w-3.5 h-3.5" /> Mới trong 7 ngày</div>
          <div className="text-2xl font-bold text-gray-900">{stats.newLast7Days}</div>
          <div className="text-xs text-gray-400 mt-1">{stats.newLast30Days} trong 30 ngày</div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 col-span-2">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-1"><Clock3 className="w-3.5 h-3.5" /> Premium sắp hết hạn (7 ngày tới)</div>
          {stats.expiringSoon.length === 0 ? (
            <div className="text-sm text-gray-400 mt-1">Không có tài khoản nào sắp hết hạn.</div>
          ) : (
            <ul className="mt-1 space-y-0.5 max-h-20 overflow-y-auto">
              {stats.expiringSoon.map(u => (
                <li key={u.id} className="text-xs text-gray-600 flex justify-between">
                  <span>{u.name || u.email}</span>
                  <span className="text-amber-600 font-medium">{new Date(u.subscriptionEndDate as string).toLocaleDateString('vi-VN')}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => resetPageAnd(setSearchTerm)(e.target.value)}
            placeholder="Tìm theo tên hoặc email..."
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => resetPageAnd(setRoleFilter)(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        >
          <option value="ALL">Tất cả vai trò</option>
          <option value="USER">Học viên</option>
          <option value="TEACHER">Giáo viên</option>
          <option value="ADMIN">Quản trị viên</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => resetPageAnd(setStatusFilter)(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="FREE">Miễn phí</option>
          <option value="PREMIUM">Premium</option>
        </select>
        <select
          value={bannedFilter}
          onChange={(e) => resetPageAnd(setBannedFilter)(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
        >
          <option value="ALL">Đã khóa & đang hoạt động</option>
          <option value="ACTIVE">Đang hoạt động</option>
          <option value="BANNED">Đã khóa</option>
        </select>
      </div>

      {selectedIds.size > 0 && (
        <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-indigo-900">Đã chọn {selectedIds.size} người dùng</span>
          <select
            value={bulkDuration}
            onChange={(e) => setBulkDuration(e.target.value)}
            className="px-3 py-1.5 border border-indigo-200 rounded-lg text-sm bg-white"
          >
            <option value="none">Vĩnh viễn</option>
            <option value="3d">3 ngày</option>
            <option value="7d">7 ngày</option>
            <option value="15d">15 ngày</option>
            <option value="30d">30 ngày</option>
            <option value="90d">90 ngày</option>
            <option value="180d">180 ngày</option>
            <option value="360d">360 ngày</option>
          </select>
          <button
            onClick={handleBulkGrantPremium}
            disabled={isBulkRunning}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg disabled:opacity-50"
          >
            Cấp Premium hàng loạt
          </button>
          <button
            onClick={handleBulkBan}
            disabled={isBulkRunning}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-lg disabled:opacity-50"
          >
            Khóa hàng loạt
          </button>
          <button onClick={() => setSelectedIds(new Set())} className="text-sm text-indigo-600 hover:underline ml-auto">
            Bỏ chọn
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-4 py-4 w-10">
                  <input
                    type="checkbox"
                    checked={pagedUsers.length > 0 && pagedUsers.every(u => selectedIds.has(u.id))}
                    onChange={toggleSelectAllOnPage}
                  />
                </th>
                <th className="px-6 py-4">Người dùng</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Đăng nhập gần nhất</th>
                <th className="px-6 py-4">Ngày đăng ký</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pagedUsers.map((user) => (
                <tr key={user.id} className={`hover:bg-gray-50/50 transition-colors ${user.isBanned ? "bg-rose-50/40" : ""}`}>
                  <td className="px-4 py-4">
                    <input type="checkbox" checked={selectedIds.has(user.id)} onChange={() => toggleSelected(user.id)} />
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/users/${user.id}`} className="flex items-center group">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3 shrink-0">
                        {(user.name || user.email || "U")[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-indigo-600 group-hover:underline flex items-center gap-1.5">
                          {user.name || "Chưa cập nhật"}
                          {user.isBanned && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-100 text-rose-700">
                              <Ban className="w-3 h-3" /> ĐÃ KHÓA
                            </span>
                          )}
                        </div>
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
                    {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString('vi-VN') : "Chưa từng"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleToggleBan(user)}
                        disabled={isBanToggling === user.id || user.role === "ADMIN"}
                        title={user.role === "ADMIN" ? "Không thể khóa quản trị viên" : user.isBanned ? "Mở khóa" : "Khóa tài khoản"}
                        className={`w-8 h-8 rounded-lg inline-flex items-center justify-center transition-colors disabled:opacity-30 ${user.isBanned ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-amber-50 text-amber-600 hover:bg-amber-100"}`}
                      >
                        {user.isBanned ? <ShieldCheck className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      </button>
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

              {pagedUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    {users.length === 0 ? "Chưa có người dùng nào trong hệ thống." : "Không tìm thấy người dùng phù hợp."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 text-sm text-gray-500">
            <span>Trang {currentPage}/{totalPages} · {filteredUsers.length} người dùng</span>
            <div className="flex gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                Trước
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                Sau
              </button>
            </div>
          </div>
        )}
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
                {editingUser && (
                  <p className="text-xs text-gray-400 mt-1">Đổi email ở trang chi tiết người dùng.</p>
                )}
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
