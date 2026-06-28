"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Trash2, Pencil } from "lucide-react";
import { addStudentToClass, removeStudentFromClass, updateClass } from "../actions";

export default function ClassDetailClient({ cls }: { cls: any }) {
  const router = useRouter();
  const [addError, setAddError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const handleAddStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setAddError(null);
    setIsAdding(true);
    const formData = new FormData(form);
    formData.append("classId", cls.id);
    const res = await addStudentToClass(formData);
    if (res?.error) {
      setAddError(res.error);
    } else {
      form.reset();
      router.refresh();
    }
    setIsAdding(false);
  };

  const handleRemoveStudent = async (enrollmentId: string) => {
    if (!confirm("Xóa học sinh này khỏi lớp?")) return;
    setIsRemoving(enrollmentId);
    const formData = new FormData();
    formData.append("classId", cls.id);
    formData.append("enrollmentId", enrollmentId);
    const res = await removeStudentFromClass(formData);
    if (res?.error) alert(res.error);
    else router.refresh();
    setIsRemoving(null);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditError(null);
    const formData = new FormData(e.currentTarget);
    formData.append("classId", cls.id);
    formData.set("isActive", (formData.get("isActive") === "on").toString());
    const res = await updateClass(formData);
    if (res?.error) {
      setEditError(res.error);
    } else {
      setIsEditing(false);
      router.refresh();
    }
  };

  return (
    <>
      <Link href="/teacher/classes" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Quay lại danh sách lớp
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            {editError && (
              <div className="px-3 py-2 bg-rose-50 text-rose-700 text-sm rounded-lg border border-rose-200">{editError}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên lớp</label>
              <input
                type="text"
                name="name"
                defaultValue={cls.name}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" name="isActive" defaultChecked={cls.isActive} className="rounded" />
              Lớp đang hoạt động
            </label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                Hủy
              </button>
              <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                Lưu
              </button>
            </div>
          </form>
        ) : (
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{cls.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{cls.program.subject.flag} {cls.program.name}</p>
              {!cls.isActive && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-500">Đã ngừng hoạt động</span>
              )}
            </div>
            <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-indigo-600 transition-colors" title="Sửa lớp">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Học sinh trong lớp ({cls.enrollments.length})</h2>

        <form onSubmit={handleAddStudent} className="flex gap-2 mb-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Nhập email học sinh đã đăng ký..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
          />
          <button
            type="submit"
            disabled={isAdding}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <UserPlus className="w-4 h-4" /> Thêm
          </button>
        </form>
        {addError && (
          <div className="mb-4 px-3 py-2 bg-rose-50 text-rose-700 text-sm rounded-lg border border-rose-200">{addError}</div>
        )}

        {cls.enrollments.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">Chưa có học sinh nào trong lớp.</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {cls.enrollments.map((enr: any) => (
              <div key={enr.id} className="flex justify-between items-center py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{enr.student.name || "Chưa cập nhật"}</p>
                  <p className="text-xs text-gray-500">{enr.student.email}</p>
                </div>
                <button
                  onClick={() => handleRemoveStudent(enr.id)}
                  disabled={isRemoving === enr.id}
                  className="text-gray-400 hover:text-rose-600 transition-colors"
                  title="Xóa khỏi lớp"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
