"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Trash2, Pencil, Presentation, CalendarClock, X, ChevronDown, ChevronUp, CheckCircle2, Circle, Users, BookOpen } from "lucide-react";
import { addStudentToClass, removeStudentFromClass, updateClass, upsertAssignment, removeAssignment } from "../actions";

type StudentStats = Record<string, { completed: number; total: number; avgScore: number | null }>;
type CompletionByLesson = Record<string, string[]>;
type FilterMode = "all" | "done" | "pending";
type Tab = "students" | "lessons";

export default function ClassDetailClient({ cls, studentStats, completionByLesson }: { cls: any; studentStats: StudentStats; completionByLesson: CompletionByLesson }) {
  const router = useRouter();
  const [addError, setAddError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [assigningLessonId, setAssigningLessonId] = useState<string | null>(null);
  const [isSavingAssignment, setIsSavingAssignment] = useState(false);
  const [detailLessonId, setDetailLessonId] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [tab, setTab] = useState<Tab>("students");

  const assignmentByLessonId = new Map(cls.assignments.map((a: any) => [a.lessonId, a]));

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

  const handleAssignSubmit = async (e: React.FormEvent<HTMLFormElement>, lessonId: string) => {
    e.preventDefault();
    setIsSavingAssignment(true);
    const formData = new FormData(e.currentTarget);
    formData.append("classId", cls.id);
    formData.append("lessonId", lessonId);
    const res = await upsertAssignment(formData);
    if (res?.error) alert(res.error);
    else {
      setAssigningLessonId(null);
      router.refresh();
    }
    setIsSavingAssignment(false);
  };

  const handleRemoveAssignment = async (assignmentId: string) => {
    if (!confirm("Hủy giao bài tập này?")) return;
    const formData = new FormData();
    formData.append("classId", cls.id);
    formData.append("assignmentId", assignmentId);
    const res = await removeAssignment(formData);
    if (res?.error) alert(res.error);
    else router.refresh();
  };

  const tabs: { key: Tab; label: string; count: number; icon: typeof Users }[] = [
    { key: "students", label: "Học sinh", count: cls.enrollments.length, icon: Users },
    { key: "lessons", label: "Bài học", count: cls.program.lessons.length, icon: BookOpen },
  ];

  return (
    <>
      <Link href="/teacher/classes" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 mb-4">
        <ArrowLeft className="w-4 h-4" /> Quay lại danh sách lớp
      </Link>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 mb-6">
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            {editError && (
              <div className="px-3 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm rounded-lg border border-rose-200 dark:border-rose-500/30">{editError}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Tên lớp</label>
              <input
                type="text"
                name="name"
                defaultValue={cls.name}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300">
              <input type="checkbox" name="isActive" defaultChecked={cls.isActive} className="rounded" />
              Lớp đang hoạt động
            </label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                Hủy
              </button>
              <button type="submit" className="flex-1 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
                Lưu
              </button>
            </div>
          </form>
        ) : (
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{cls.name}</h1>
              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{cls.program.subject.flag} {cls.program.name}</p>
              {!cls.isActive && (
                <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400">Đã ngừng hoạt động</span>
              )}
            </div>
            <button onClick={() => setIsEditing(true)} className="text-gray-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex-shrink-0" title="Sửa lớp">
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Tab bar — tách quản lý học sinh và bài học cho gọn */}
      <div className="flex gap-1 mb-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-1">
        {tabs.map(({ key, label, count, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              tab === key
                ? "bg-primary-600 text-white"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === key ? "bg-white/20" : "bg-slate-100 dark:bg-slate-800"}`}>{count}</span>
          </button>
        ))}
      </div>

      {tab === "lessons" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-4 sm:p-6">
          {cls.program.lessons.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-slate-400 text-center py-4">Chương trình này chưa có bài học nào.</p>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {cls.program.lessons.map((lesson: any) => {
                const assignment = assignmentByLessonId.get(lesson.id) as any;
                const isAssigning = assigningLessonId === lesson.id;
                const isOverdue = !!assignment?.dueDate && new Date(assignment.dueDate).getTime() < Date.now();
                const isShowingDetail = detailLessonId === lesson.id;

                const completedIds = new Set(completionByLesson[lesson.id] || []);
                const doneStudents = cls.enrollments.filter((e: any) => completedIds.has(e.studentId));
                const pendingStudents = cls.enrollments.filter((e: any) => !completedIds.has(e.studentId));
                const visibleStudents = filterMode === "done" ? doneStudents : filterMode === "pending" ? pendingStudents : cls.enrollments;

                return (
                  <div key={lesson.id} className="py-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{lesson.title}</p>
                        {assignment && !isAssigning && (
                          <p className={`text-xs mt-1 flex items-center gap-1 flex-wrap ${isOverdue ? "text-rose-600 dark:text-rose-400" : "text-amber-600 dark:text-amber-400"}`}>
                            <CalendarClock className="w-3 h-3" />
                            {isOverdue ? "Quá hạn" : "Đã giao"}
                            {assignment.dueDate ? ` · hạn ${new Date(assignment.dueDate).toLocaleDateString('vi-VN')}` : ""}
                            {assignment.note ? ` · ${assignment.note}` : ""}
                            <button onClick={() => handleRemoveAssignment(assignment.id)} className="text-gray-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 ml-1">
                              <X className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => { setDetailLessonId(isShowingDetail ? null : lesson.id); setFilterMode("all"); }}
                              className="ml-1 inline-flex items-center gap-0.5 text-primary-600 dark:text-primary-400 hover:underline font-medium"
                            >
                              {doneStudents.length}/{cls.enrollments.length} hoàn thành
                              {isShowingDetail ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                            </button>
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setAssigningLessonId(isAssigning ? null : lesson.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-lg transition-colors"
                          title="Giao bài tập"
                        >
                          <CalendarClock className="w-3.5 h-3.5" /> {assignment ? "Sửa hạn" : "Giao bài"}
                        </button>
                        <Link
                          href={`/teacher/classes/${cls.id}/present/${lesson.id}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 text-primary-700 dark:text-primary-400 text-xs font-semibold rounded-lg transition-colors"
                          title="Trình chiếu bài học này"
                        >
                          <Presentation className="w-3.5 h-3.5" /> Trình chiếu
                        </Link>
                      </div>
                    </div>

                    {isAssigning && (
                      <form
                        onSubmit={(e) => handleAssignSubmit(e, lesson.id)}
                        className="mt-3 flex flex-wrap items-center gap-2 bg-amber-50/60 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/30 rounded-lg p-3"
                      >
                        <input
                          type="date"
                          name="dueDate"
                          defaultValue={assignment?.dueDate ? new Date(assignment.dueDate).toISOString().slice(0, 10) : ""}
                          className="px-3 py-1.5 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          name="note"
                          defaultValue={assignment?.note || ""}
                          placeholder="Ghi chú (không bắt buộc)"
                          className="flex-1 min-w-[140px] px-3 py-1.5 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg text-xs"
                        />
                        <button type="submit" disabled={isSavingAssignment} className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-lg disabled:opacity-50">
                          Lưu
                        </button>
                        <button type="button" onClick={() => setAssigningLessonId(null)} className="px-3 py-1.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 text-xs font-medium rounded-lg">
                          Hủy
                        </button>
                      </form>
                    )}

                    {isShowingDetail && assignment && (
                      <div className="mt-3 bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800 rounded-lg p-3">
                        <div className="flex gap-1.5 mb-3 flex-wrap">
                          {([
                            ["all", `Tất cả (${cls.enrollments.length})`],
                            ["done", `Đã hoàn thành (${doneStudents.length})`],
                            ["pending", `Chưa hoàn thành (${pendingStudents.length})`]
                          ] as [FilterMode, string][]).map(([mode, label]) => (
                            <button
                              key={mode}
                              onClick={() => setFilterMode(mode)}
                              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                                filterMode === mode ? "bg-primary-600 text-white" : "bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                              }`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                        {visibleStudents.length === 0 ? (
                          <p className="text-xs text-gray-400 dark:text-slate-500 text-center py-3">Không có học sinh nào ở nhóm này.</p>
                        ) : (
                          <ul className="space-y-1.5">
                            {visibleStudents.map((e: any) => {
                              const isDone = completedIds.has(e.studentId);
                              return (
                                <li key={e.id} className="flex items-center gap-2 text-xs">
                                  {isDone ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                  ) : (
                                    <Circle className="w-3.5 h-3.5 text-gray-300 dark:text-slate-600 flex-shrink-0" />
                                  )}
                                  <span className={isDone ? "text-gray-700 dark:text-slate-200" : "text-gray-500 dark:text-slate-400"}>
                                    {e.student.name || e.student.email}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "students" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-4 sm:p-6">
          <form onSubmit={handleAddStudent} className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="email"
              name="email"
              required
              placeholder="Nhập email học sinh đã đăng ký..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all text-sm"
            />
            <button
              type="submit"
              disabled={isAdding}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 shrink-0"
            >
              <UserPlus className="w-4 h-4" /> Thêm
            </button>
          </form>
          {addError && (
            <div className="mb-4 px-3 py-2 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm rounded-lg border border-rose-200 dark:border-rose-500/30">{addError}</div>
          )}

          {cls.enrollments.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-slate-400 text-center py-8">Chưa có học sinh nào trong lớp.</p>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {cls.enrollments.map((enr: any) => {
                const stats = studentStats[enr.studentId];
                return (
                  <div key={enr.id} className="flex justify-between items-center py-3 gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{enr.student.name || "Chưa cập nhật"}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400 truncate">{enr.student.email}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      {stats && (
                        <div className="text-right">
                          <p className="text-xs font-semibold text-gray-700 dark:text-slate-200">{stats.completed}/{stats.total} bài</p>
                          <p className="text-xs text-gray-400 dark:text-slate-500">
                            {stats.avgScore !== null ? `TB ${stats.avgScore}%` : "Chưa có điểm"}
                          </p>
                        </div>
                      )}
                      <button
                        onClick={() => handleRemoveStudent(enr.id)}
                        disabled={isRemoving === enr.id}
                        className="text-gray-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                        title="Xóa khỏi lớp"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
