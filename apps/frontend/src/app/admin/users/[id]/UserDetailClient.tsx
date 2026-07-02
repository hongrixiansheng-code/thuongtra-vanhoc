"use client";

import { useState } from "react";
import { LogOut, Ban, ShieldCheck } from "lucide-react";
import { forceLogout, banUser, unbanUser } from "../actions";

export default function UserDetailClient({ userId, isBanned }: { userId: string; isBanned: boolean }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isBanLoading, setIsBanLoading] = useState(false);

  const handleForceLogout = async () => {
    if (!confirm("Buộc người dùng này đăng xuất khỏi tất cả thiết bị?")) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("id", userId);
    const res = await forceLogout(formData);

    if (res?.error) {
      alert(res.error);
    } else {
      alert("Đã đăng xuất người dùng khỏi tất cả thiết bị.");
    }
    setIsLoading(false);
  };

  const handleToggleBan = async () => {
    const willBan = !isBanned;
    if (!confirm(willBan ? "Khóa tài khoản này? Người dùng sẽ không thể đăng nhập." : "Mở khóa tài khoản này?")) return;

    setIsBanLoading(true);
    const formData = new FormData();
    formData.append("id", userId);
    const res = willBan ? await banUser(formData) : await unbanUser(formData);

    if (res?.error) alert(res.error);
    setIsBanLoading(false);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleToggleBan}
        disabled={isBanLoading}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border inline-flex items-center gap-2 disabled:opacity-50 ${
          isBanned
            ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
            : "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200"
        }`}
      >
        {isBanned ? <ShieldCheck className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
        {isBanned ? "Mở khóa tài khoản" : "Khóa tài khoản"}
      </button>
      <button
        onClick={handleForceLogout}
        disabled={isLoading}
        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-sm font-medium rounded-lg transition-colors border border-rose-200 inline-flex items-center gap-2 disabled:opacity-50"
      >
        <LogOut className="w-4 h-4" /> Đăng xuất tất cả thiết bị
      </button>
    </div>
  );
}
