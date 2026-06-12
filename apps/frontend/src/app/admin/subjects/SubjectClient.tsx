"use client";

import { useState } from "react";
import { BookMarked, X, Pencil, Trash2 } from "lucide-react";
import { createSubject, updateSubject, deleteSubject } from "./actions";

export default function SubjectClient({ subjects }: { subjects: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingSubject(null);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (subject: any) => {
    setEditingSubject(subject);
    setError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubject(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    let res;
    if (editingSubject) {
      formData.append("id", editingSubject.id);
      res = await updateSubject(formData);
    } else {
      res = await createSubject(formData);
    }

    if (res?.error) {
      setError(res.error);
    } else {
      closeModal();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa môn học này? Sẽ lỗi nếu môn học đang chứa chương trình học.")) return;
    
    setIsDeleting(id);
    const formData = new FormData();
    formData.append("id", id);
    const res = await deleteSubject(formData);
    
    if (res?.error) {
      alert(res.error);
    }
    setIsDeleting(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Môn học</h1>
        <button onClick={openAddModal} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
          + Thêm môn học
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Môn học</th>
                <th className="px-6 py-4">Mã (Code)</th>
                <th className="px-6 py-4">Số lượng chương trình</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-xl ${subject.color || 'bg-blue-500'} text-white flex items-center justify-center font-bold mr-3 shrink-0 shadow-sm`}>
                        {subject.flag || <BookMarked className="w-5 h-5" />}
                      </div>
                      <div className="font-medium text-gray-900">{subject.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded text-xs">
                      {subject.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {subject._count?.programs || 0} chương trình
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEditModal(subject)} className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 inline-flex items-center justify-center transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(subject.id)} 
                        disabled={isDeleting === subject.id}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 inline-flex items-center justify-center transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {subjects.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Chưa có môn học nào.
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
                {editingSubject ? "Sửa Môn học" : "Thêm Môn học"}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên môn học <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={editingSubject?.name || ""} 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="VD: Tiếng Trung..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã (Code) <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="code" 
                  defaultValue={editingSubject?.code || ""} 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono text-sm"
                  placeholder="VD: zh, en..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Biểu tượng (Emoji)</label>
                  <input 
                    type="text" 
                    name="flag" 
                    defaultValue={editingSubject?.flag || ""} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="VD: 🇨🇳, 🇬🇧..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Màu sắc (Tailwind Class)</label>
                  <input 
                    type="text" 
                    name="color" 
                    defaultValue={editingSubject?.color || "bg-blue-500"} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="VD: bg-red-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  Hủy
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                  {editingSubject ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
