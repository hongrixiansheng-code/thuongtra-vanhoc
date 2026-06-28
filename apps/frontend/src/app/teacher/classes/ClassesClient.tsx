"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, Trash2, X } from "lucide-react";
import { createClass, deleteClass } from "./actions";

export default function ClassesClient({ classes, programs }: { classes: any[]; programs: any[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const res = await createClass(formData);
    if (res?.error) {
      setError(res.error);
    } else {
      setIsModalOpen(false);
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa lớp học này? Toàn bộ học sinh sẽ bị gỡ khỏi lớp.")) return;
    setIsDeleting(id);
    const formData = new FormData();
    formData.append("classId", id);
    const res = await deleteClass(formData);
    if (res?.error) alert(res.error);
    else router.refresh();
    setIsDeleting(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Lớp học của tôi</h1>
        <button
          onClick={() => { setError(null); setIsModalOpen(true); }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          + Tạo lớp mới
        </button>
      </div>

      {classes.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
          Bạn chưa có lớp học nào. Hãy tạo lớp đầu tiên.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <Link href={`/teacher/classes/${cls.id}`} className="font-semibold text-gray-900 hover:text-indigo-600 hover:underline">
                    {cls.name}
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    {cls.program.subject.flag} {cls.program.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {cls._count.enrollments} học sinh
                  </p>
                  {!cls.isActive && (
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500">Đã ngừng hoạt động</span>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(cls.id)}
                  disabled={isDeleting === cls.id}
                  className="text-gray-400 hover:text-rose-600 transition-colors"
                  title="Xóa lớp"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Tạo lớp mới</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 px-3 py-2 bg-rose-50 text-rose-700 text-sm rounded-lg border border-rose-200">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên lớp</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="VD: HSK2 - Lớp tối T3T5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chương trình học</label>
                <select
                  name="programId"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                  <option value="">-- Chọn chương trình --</option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.subject.flag} {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  Hủy
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                  Tạo lớp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
