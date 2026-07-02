"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Users, Trash2, X, Search, Activity } from "lucide-react";
import { createClass, deleteClass } from "./actions";

type StudentOverviewRow = {
  enrollmentId: string;
  studentId: string;
  studentName: string | null;
  studentEmail: string | null;
  classId: string;
  className: string;
  completed: number;
  total: number;
  avgScore: number | null;
  lastActivity: string | Date | null;
};

export default function ClassesClient({ classes, programs, studentOverview }: { classes: any[]; programs: any[]; studentOverview: StudentOverviewRow[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("ALL");

  const filteredStudents = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return studentOverview
      .filter(s => classFilter === "ALL" || s.classId === classFilter)
      .filter(s => !term || (s.studentName || "").toLowerCase().includes(term) || (s.studentEmail || "").toLowerCase().includes(term))
      .sort((a, b) => {
        // Chưa hoạt động lần nào lên đầu, sau đó xếp theo hoạt động lâu nhất chưa quay lại — để giáo viên thấy ngay ai cần chú ý
        const aTime = a.lastActivity ? new Date(a.lastActivity).getTime() : -1;
        const bTime = b.lastActivity ? new Date(b.lastActivity).getTime() : -1;
        return aTime - bTime;
      });
  }, [studentOverview, searchTerm, classFilter]);

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
      <div className="flex justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Lớp học của tôi</h1>
        <button
          onClick={() => { setError(null); setIsModalOpen(true); }}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm flex-shrink-0"
        >
          + Tạo lớp mới
        </button>
      </div>

      {studentOverview.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-5 mb-6">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
            <Activity className="w-4 h-4 text-primary-500" /> Theo dõi hoạt động học sinh (tất cả lớp)
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên hoặc email..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="ALL">Tất cả lớp</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-500 dark:text-slate-400 font-semibold border-b border-gray-100 dark:border-slate-800">
                <tr>
                  <th className="py-2 pr-4">Học sinh</th>
                  <th className="py-2 pr-4">Lớp</th>
                  <th className="py-2 pr-4">Tiến độ</th>
                  <th className="py-2 pr-4">Điểm TB</th>
                  <th className="py-2 pr-4">Hoạt động gần nhất</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {filteredStudents.map((s) => (
                  <tr key={s.enrollmentId} className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 pr-4">
                      <p className="font-medium text-slate-900 dark:text-slate-100">{s.studentName || "Chưa cập nhật"}</p>
                      <p className="text-xs text-gray-400 dark:text-slate-500">{s.studentEmail}</p>
                    </td>
                    <td className="py-2.5 pr-4">
                      <Link href={`/teacher/classes/${s.classId}`} className="text-primary-600 dark:text-primary-400 hover:underline">
                        {s.className}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 text-slate-700 dark:text-slate-300">{s.completed}/{s.total} bài</td>
                    <td className="py-2.5 pr-4 text-slate-700 dark:text-slate-300">{s.avgScore !== null ? `${s.avgScore}%` : "—"}</td>
                    <td className="py-2.5 pr-4 text-gray-500 dark:text-slate-400">
                      {s.lastActivity ? new Date(s.lastActivity).toLocaleDateString('vi-VN') : "Chưa hoạt động"}
                    </td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-400 dark:text-slate-500">Không tìm thấy học sinh phù hợp.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {classes.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-12 text-center text-gray-500 dark:text-slate-400">
          Bạn chưa có lớp học nào. Hãy tạo lớp đầu tiên.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-5">
              <div className="flex justify-between items-start gap-3">
                <div className="min-w-0">
                  <Link href={`/teacher/classes/${cls.id}`} className="font-semibold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 hover:underline">
                    {cls.name}
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                    {cls.program.subject.flag} {cls.program.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {cls._count.enrollments} học sinh
                  </p>
                  {!cls.isActive && (
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400">Đã ngừng hoạt động</span>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(cls.id)}
                  disabled={isDeleting === cls.id}
                  className="text-gray-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex-shrink-0"
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
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-md p-6 border border-transparent dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Tạo lớp mới</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="mb-4 px-3 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm rounded-lg border border-rose-200 dark:border-rose-500/30">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Tên lớp</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                  placeholder="VD: HSK2 - Lớp tối T3T5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Chương trình học</label>
                <select
                  name="programId"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
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
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                  Hủy
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
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
