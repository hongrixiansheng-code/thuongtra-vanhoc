"use client";

import { useState } from "react";
import { GraduationCap, X, Check, XCircle, Pencil, Trash2 } from "lucide-react";
import { createProgram, updateProgram, deleteProgram } from "./actions";

export default function ProgramClient({ programs, subjects }: { programs: any[], subjects: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingProgram(null);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (program: any) => {
    setEditingProgram(program);
    setError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProgram(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    // Checkbox is unchecked -> value is null. Let's fix that
    if (!formData.get("isAvailable")) {
      formData.set("isAvailable", "false");
    }
    
    let res;
    if (editingProgram) {
      formData.append("id", editingProgram.id);
      res = await updateProgram(formData);
    } else {
      res = await createProgram(formData);
    }

    if (res?.error) {
      setError(res.error);
    } else {
      closeModal();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa chương trình này? Sẽ lỗi nếu chương trình đang có bài học.")) return;
    
    setIsDeleting(id);
    const formData = new FormData();
    formData.append("id", id);
    const res = await deleteProgram(formData);
    
    if (res?.error) {
      alert(res.error);
    }
    setIsDeleting(null);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Chương trình học</h1>
        <button onClick={openAddModal} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
          + Thêm chương trình
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Chương trình</th>
                <th className="px-6 py-4">Môn học</th>
                <th className="px-6 py-4">Cấp độ (Level)</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {programs.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold mr-3 shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{program.name}</div>
                        <div className="text-gray-500 font-mono text-xs mt-0.5">Mã: {program.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-xl">{program.subject?.flag}</span>
                      <span className="font-medium text-gray-700">{program.subject?.name}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-bold border border-gray-200">
                      {program.level}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {program.isAvailable ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> Mở
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        <XCircle className="w-3.5 h-3.5" /> Ẩn
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEditModal(program)} className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 inline-flex items-center justify-center transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(program.id)} 
                        disabled={isDeleting === program.id}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 inline-flex items-center justify-center transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {programs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Chưa có chương trình học nào.
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
                {editingProgram ? "Sửa Chương trình" : "Thêm Chương trình"}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name" 
                  defaultValue={editingProgram?.name || ""} 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="VD: HSK 1 - Cơ bản..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã (Code) <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="code" 
                  defaultValue={editingProgram?.code || ""} 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-mono text-sm"
                  placeholder="VD: hsk1"
                />
                <p className="text-xs text-gray-500 mt-1">Mã dùng làm URL, không nên có dấu cách.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
                  <select 
                    name="subjectId" 
                    defaultValue={editingProgram?.subjectId || (subjects[0]?.id || "")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.id}>{s.flag} {s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cấp độ (Level)</label>
                  <input 
                    type="number" 
                    name="level" 
                    defaultValue={editingProgram?.level || "1"} 
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="isAvailable" 
                    value="true"
                    defaultChecked={editingProgram ? editingProgram.isAvailable : true} 
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Công khai (Hiển thị trên web)</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  Hủy
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                  {editingProgram ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
