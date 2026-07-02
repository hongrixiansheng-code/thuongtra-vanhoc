"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { changeEmail } from "../actions";

export default function EmailChangeClient({ userId, currentEmail }: { userId: string; currentEmail: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(currentEmail);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === currentEmail) {
      setIsEditing(false);
      return;
    }
    if (!confirm(`Đổi email của người dùng thành ${email}?`)) return;

    setIsLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("id", userId);
    formData.append("email", email);
    const res = await changeEmail(formData);

    if (res?.error) {
      setError(res.error);
    } else {
      setIsEditing(false);
    }
    setIsLoading(false);
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1"
      >
        <Pencil className="w-3 h-3" /> Đổi email
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-2 py-1 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none"
        required
      />
      <button type="submit" disabled={isLoading} className="text-xs text-indigo-600 font-medium disabled:opacity-50">
        Lưu
      </button>
      <button type="button" onClick={() => { setIsEditing(false); setEmail(currentEmail); setError(null); }} className="text-xs text-gray-400">
        Hủy
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </form>
  );
}
