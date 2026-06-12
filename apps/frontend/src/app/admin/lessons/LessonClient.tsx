"use client";

import { useState } from "react";
import { BookOpen, X, Crown, FileText, Pencil, Trash2 } from "lucide-react";
import { createLesson, updateLesson, deleteLesson } from "./actions";

export default function LessonClient({ lessons, programs }: { lessons: any[], programs: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Filter state
  const [selectedProgramId, setSelectedProgramId] = useState<string>("ALL");

  const filteredLessons = selectedProgramId === "ALL" 
    ? lessons 
    : lessons.filter(l => l.programId === selectedProgramId);

  const openAddModal = () => {
    setEditingLesson(null);
    setError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (lesson: any) => {
    setEditingLesson(lesson);
    setError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLesson(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    // Checkbox is unchecked -> value is null.
    if (!formData.get("isPremium")) {
      formData.set("isPremium", "false");
    }
    
    let res;
    if (editingLesson) {
      formData.append("id", editingLesson.id);
      res = await updateLesson(formData);
    } else {
      res = await createLesson(formData);
    }

    if (res?.error) {
      setError(res.error);
    } else {
      closeModal();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bài học này? Tất cả nội dung bên trong cũng có thể bị ảnh hưởng.")) return;
    
    setIsDeleting(id);
    const formData = new FormData();
    formData.append("id", id);
    const res = await deleteLesson(formData);
    
    if (res?.error) {
      alert(res.error);
    }
    setIsDeleting(null);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Bài học</h1>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            value={selectedProgramId}
            onChange={(e) => setSelectedProgramId(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 sm:flex-none"
          >
            <option value="ALL">Tất cả chương trình</option>
            {programs.map(p => (
              <option key={p.id} value={p.id}>{p.subject?.flag} {p.name}</option>
            ))}
          </select>
          
          <button onClick={openAddModal} className="shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
            + Thêm bài học
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Bài học</th>
                <th className="px-6 py-4">Chủ đề (Theme)</th>
                <th className="px-6 py-4">Chương trình</th>
                <th className="px-6 py-4">Quyền truy cập</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mr-3 shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          <span className="text-gray-400 mr-2">#{lesson.orderIndex}</span>
                          {lesson.title}
                        </div>
                        <div className="text-gray-500 text-xs mt-0.5">{lesson._count?.contents || 0} nội dung</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {lesson.theme || <span className="text-gray-400 italic">Không có</span>}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
                      <span className="text-base leading-none">{lesson.program?.subject?.flag}</span>
                      {lesson.program?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {lesson.isPremium ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <Crown className="w-3.5 h-3.5" /> Premium
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <FileText className="w-3.5 h-3.5" /> Miễn phí
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => openEditModal(lesson)} className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 inline-flex items-center justify-center transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(lesson.id)} 
                        disabled={isDeleting === lesson.id}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 inline-flex items-center justify-center transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredLessons.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Không tìm thấy bài học nào.
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
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-bold text-gray-900">
                {editingLesson ? "Sửa Bài học" : "Thêm Bài học"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên bài học <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="title" 
                  defaultValue={editingLesson?.title || ""} 
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="VD: Bài 1: Xin chào..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề (Theme)</label>
                <input 
                  type="text" 
                  name="theme" 
                  defaultValue={editingLesson?.theme || ""} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="VD: CHỦ ĐỀ I: CHÀO HỎI & LÀM QUEN"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chương trình học</label>
                  <select 
                    name="programId" 
                    defaultValue={editingLesson?.programId || (selectedProgramId !== "ALL" ? selectedProgramId : (programs[0]?.id || ""))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  >
                    {programs.map(p => (
                      <option key={p.id} value={p.id}>{p.subject?.flag} {p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số thứ tự (Index)</label>
                  <input 
                    type="number" 
                    name="orderIndex" 
                    defaultValue={editingLesson?.orderIndex || "1"} 
                    required
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                  <input 
                    type="checkbox" 
                    name="isPremium" 
                    value="true"
                    defaultChecked={editingLesson ? editingLesson.isPremium : false} 
                    className="w-5 h-5 text-amber-500 rounded focus:ring-amber-500"
                  />
                  <div>
                    <span className="block text-sm font-bold text-amber-900">Khóa Premium</span>
                    <span className="block text-xs text-amber-700 mt-0.5">Yêu cầu người dùng nâng cấp để xem bài học này.</span>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                  Hủy
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                  {editingLesson ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
