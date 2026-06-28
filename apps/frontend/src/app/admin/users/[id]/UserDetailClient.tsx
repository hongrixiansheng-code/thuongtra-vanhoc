"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { forceLogout } from "../actions";

export default function UserDetailClient({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <button
      onClick={handleForceLogout}
      disabled={isLoading}
      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-sm font-medium rounded-lg transition-colors border border-rose-200 inline-flex items-center gap-2 disabled:opacity-50"
    >
      <LogOut className="w-4 h-4" /> Đăng xuất tất cả thiết bị
    </button>
  );
}
