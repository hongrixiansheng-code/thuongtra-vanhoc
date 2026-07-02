"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Check, Gem, Lock,
  MessageCircle, Users, Hash, Calendar, MapPin, Utensils, CloudSun, ShoppingBag, Clock, Heart,
  BookOpen, PenSquare, MessagesSquare, Dumbbell, CalendarClock,
} from "lucide-react";
import LessonStepFlow from "@/components/LessonStepFlow";
import KhaiMonClient from "@/components/KhaiMonClient";

interface Lesson {
  id: string;
  title: string;
  theme: string;
  isPremium: boolean;
  vocab: any[];
  grammar: any[];
  dialogues: any[];
  exercises: any[];
  reading?: any[];
  listening?: any[];
  writing?: any[];
  speaking?: any[];
}

interface ActiveAssignment {
  id: string;
  lessonId: string;
  lessonTitle: string;
  className: string;
  dueDate: string | Date | null;
  note: string | null;
}

interface DashboardClientProps {
  lessons: Lesson[];
  programName: string;
  programCode?: string;
  isPremiumUser?: boolean;
  isAdmin?: boolean;
  progressMap: Record<string, boolean>;
  scoreMap?: Record<string, number>;
  assignments?: ActiveAssignment[];
}

const THEME_ICONS = [MessageCircle, Users, Hash, Calendar, MapPin, Utensils, CloudSun, ShoppingBag, Clock, Heart];

// Nhãn thời hạn theo độ gấp: quá hạn / sắp hết hạn (<=3 ngày) → tone gấp, còn lại bình thường
function dueInfo(due: string | Date | null): { text: string; tone: "over" | "urgent" | "normal" } | null {
  if (!due) return null;
  const days = Math.ceil((new Date(due).getTime() - Date.now()) / 86400000);
  if (days < 0) return { text: `Quá hạn ${Math.abs(days)} ngày`, tone: "over" };
  if (days === 0) return { text: "Hạn hôm nay", tone: "urgent" };
  if (days <= 3) return { text: `Còn ${days} ngày`, tone: "urgent" };
  return { text: `Còn ${days} ngày`, tone: "normal" };
}

function ProgressRing({ percent }: { percent: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, percent)) / 100) * circumference;
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="flex-shrink-0 -rotate-90">
      <circle cx="28" cy="28" r={radius} strokeWidth="5" fill="none" className="stroke-slate-100 dark:stroke-slate-800" />
      <circle
        cx="28" cy="28" r={radius} strokeWidth="5" fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="stroke-primary-500 transition-all duration-500 ease-out"
      />
    </svg>
  );
}

export default function DashboardClient({ lessons, programName, programCode, isPremiumUser, isAdmin, progressMap, scoreMap, assignments }: DashboardClientProps) {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const activeLesson = lessons.find(l => l.id === activeLessonId);

  // Group lessons by theme
  const themes = Array.from(new Set(lessons.map(l => l.theme)));

  // Tính trạng thái khoá/hoàn thành cho từng bài 1 lần, dùng chung cho progress bar + danh sách
  const lessonStatuses = useMemo(() => {
    const firstLesson = lessons[0];
    const firstLessonIsIntro = (firstLesson?.vocab?.length || 0) === 0;
    return lessons.map((lesson, index) => {
      const prevLesson = index > 0 ? lessons[index - 1] : null;
      const isProgressLocked = isAdmin ? false : index === 0
        ? false
        : index === 1
          ? !firstLessonIsIntro && !progressMap[prevLesson!.id]
          : !progressMap[prevLesson!.id];
      const isPremiumLocked = isAdmin ? false : lesson.isPremium && !isPremiumUser;
      return {
        lessonId: lesson.id,
        isProgressLocked,
        isPremiumLocked,
        isLocked: isProgressLocked || isPremiumLocked,
        isCompleted: !!progressMap[lesson.id],
      };
    });
  }, [lessons, isAdmin, isPremiumUser, progressMap]);

  const statusById = useMemo(
    () => new Map(lessonStatuses.map(s => [s.lessonId, s])),
    [lessonStatuses]
  );

  // Hiện TẤT CẢ bài tập được giao chưa hoàn thành (kể cả bài học sinh chưa mở khóa tới, để học sinh biết mục tiêu cần đạt)
  // — nhưng bài chưa mở khóa thì không cho bấm vào học thẳng, vẫn phải mở khóa tuần tự bình thường.
  const visibleAssignments = useMemo(() => {
    if (!assignments || assignments.length === 0) return [];
    const rank = (a: { isCompleted: boolean; isLocked: boolean }) =>
      a.isCompleted ? 2 : a.isLocked ? 1 : 0; // đang cần làm lên đầu, khóa ở giữa, hoàn thành xuống cuối
    return assignments
      .map(a => {
        const status = statusById.get(a.lessonId);
        return { ...a, isLocked: status ? status.isLocked : true, isCompleted: status ? status.isCompleted : false };
      })
      .sort((x, y) => rank(x) - rank(y));
  }, [assignments, statusById]);

  const completedCount = lessonStatuses.filter(s => s.isCompleted).length;
  const totalCount = lessons.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const nextLesson = lessons.find(l => {
    const s = statusById.get(l.id);
    return s && !s.isCompleted && !s.isLocked;
  });
  const allCompleted = totalCount > 0 && completedCount === totalCount;

  // Icon riêng cho mỗi theme (xoay vòng qua bộ icon cố định) để các card không trông y hệt nhau
  const themeIconByName = useMemo(() => {
    const map = new Map<string, typeof MessageCircle>();
    themes.forEach((theme, i) => map.set(theme, THEME_ICONS[i % THEME_ICONS.length]));
    return map;
  }, [themes]);

  const levelQuery = programCode || "";
  const quickLinks = [
    { label: "Từ vựng", href: `/vocab?level=${levelQuery}`, icon: BookOpen },
    { label: "Ngữ pháp", href: `/grammar?level=${levelQuery}`, icon: PenSquare },
    { label: "Hội thoại", href: `/dialogue?level=${levelQuery}`, icon: MessagesSquare },
    { label: "Luyện tập", href: `/practice?level=${levelQuery}`, icon: Dumbbell },
  ];

  // Đang học bài → hiện Step Flow full screen
  if (activeLesson) {
    if (programCode === 'khai-mon') {
      return (
        <KhaiMonClient
          lesson={activeLesson}
          lessonId={activeLesson.id}
          programName={programName}
          onComplete={async () => { setActiveLessonId(null); window.location.reload(); }}
          onBack={() => setActiveLessonId(null)}
        />
      );
    }
    return (
      <LessonStepFlow
        vocabItems={activeLesson.vocab || []}
        grammarItems={activeLesson.grammar || []}
        dialogueItems={activeLesson.dialogues || []}
        exerciseItems={activeLesson.exercises || []}
        readingItems={activeLesson.reading || []}
        listeningItems={activeLesson.listening || []}
        writingItems={activeLesson.writing || []}
        speakingItems={activeLesson.speaking || []}
        lessonTitle={activeLesson.title}
        lessonId={activeLesson.id}
        programName={programName}
        programCode={programCode}
        onComplete={async (score) => {
          setActiveLessonId(null);
          // Reload trang để đọc progress mới từ DB
          window.location.reload();
        }}
        onBack={() => setActiveLessonId(null)}
      />
    );
  }

  // Màn hình chọn bài
  return (
    <div className="w-full py-2">


      {/* Bài tập được giáo viên giao — khung LED chạy sáng khi chưa hoàn thành, xanh đứng yên khi xong */}
      {/* Bài tập được giáo viên giao — Bản siêu nổi bật */}
      {visibleAssignments.length > 0 && (
        <div className="mb-8 bg-white dark:bg-slate-800/40 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-none">
          <div className="mb-5 flex items-center gap-3">
            <div className="bg-rose-500 p-2.5 rounded-xl text-white shadow-lg shadow-rose-200 dark:shadow-rose-900/20">
              <CalendarClock className="w-5 h-5" />
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Nhiệm Vụ Khẩn
            </h2>
          </div>
          <div className="space-y-4">
            {visibleAssignments.map(a => {
              const due = dueInfo(a.dueDate);
              const dueClass = !due
                ? "bg-white text-slate-800"
                : due.tone === "normal"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-white text-rose-600 animate-pulse";

              // Đã hoàn thành
              if (a.isCompleted) {
                return (
                  <div key={a.id} className="flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-500/50 bg-emerald-50 dark:bg-emerald-900/20 shadow-sm">
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-slate-600 dark:text-slate-300 truncate line-through decoration-emerald-500/70">{a.lessonTitle}</p>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">Đã hoàn thành</p>
                    </div>
                    <span className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-emerald-300">
                      <Check className="w-5 h-5" />
                    </span>
                  </div>
                );
              }

              // Chưa mở khóa
              if (a.isLocked) {
                return (
                  <div key={a.id} className="flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 shadow-sm">
                    <div className="min-w-0">
                      <p className="text-base font-semibold text-slate-700 dark:text-slate-300 truncate">{a.lessonTitle}</p>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1.5 flex flex-wrap items-center gap-1.5">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md text-xs">{a.className}</span>
                        {due ? <span className="text-rose-500">{`· ${due.text}`}</span> : ""}
                        <span>· Cần hoàn thành bài trước để mở khóa</span>
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    </div>
                  </div>
                );
              }

              // Chưa hoàn thành + đã mở khóa (ACTIVE)
              return (
                <div key={a.id} className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500 via-rose-500 to-red-600 text-white shadow-xl shadow-rose-500/30 transform transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-500/40 border border-rose-400/30 group">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
                  <button
                    onClick={() => setActiveLessonId(a.lessonId)}
                    className="relative w-full text-left p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-5 focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm ${dueClass}`}>
                          <CalendarClock className="w-3.5 h-3.5" /> {due ? due.text : "Chưa đặt hạn"}
                        </span>
                        <span className="bg-black/20 text-white text-[11px] px-2 py-1 rounded-md font-medium border border-white/20">
                          {a.className}
                        </span>
                      </div>
                      <p className="text-xl sm:text-2xl font-black truncate drop-shadow-md tracking-tight mb-2">{a.lessonTitle}</p>
                      
                      {/* Lời dặn dò - Được làm to và cực kỳ nổi bật */}
                      {a.note && (
                        <div className="mt-3 bg-white/20 p-3.5 rounded-xl border border-white/40 backdrop-blur-md shadow-inner">
                          <p className="flex items-start gap-2.5 text-base sm:text-lg text-white font-bold drop-shadow-md">
                            <PenSquare className="w-5 h-5 mt-0.5 text-yellow-300 flex-shrink-0" />
                            <span className="italic leading-snug">"{a.note}"</span>
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <span className="flex-shrink-0 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-black text-rose-600 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all group-hover:scale-105 mt-2 sm:mt-0">
                      THỰC HIỆN NGAY <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Lối tắt luyện tập — hàng chip cuộn ngang, chỉ hiện trên mobile (desktop dùng sidebar bên phải) */}
      <div className="lg:hidden flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1 pb-1 mb-4">
        {quickLinks.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-600 dark:text-slate-300 active:scale-[0.98] transition-transform"
          >
            <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
            {label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        {/* Danh sách bài học — lưới dày, không tách section theo theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 content-start">
          {lessons.map((lesson, idx) => {
            const status = statusById.get(lesson.id)!;
            const { isProgressLocked, isPremiumLocked, isLocked, isCompleted } = status;
            const isNext = nextLesson?.id === lesson.id;
            const ThemeIcon = themeIconByName.get(lesson.theme) || MessageCircle;
            const score = scoreMap?.[lesson.id];
            return (
              <button
                key={lesson.id}
                onClick={() => !isLocked && setActiveLessonId(lesson.id)}
                disabled={isLocked}
                className={`group relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200
                  ${isLocked
                    ? 'border-stone-300 dark:border-slate-800 bg-stone-200 dark:bg-slate-900/40 opacity-70 cursor-not-allowed shadow-sm shadow-stone-300/50 dark:shadow-none'
                    : isNext
                      ? 'border-orange-400 dark:border-primary-500/50 bg-orange-100 dark:bg-primary-500/5 shadow-md shadow-orange-300/50 dark:shadow-none hover:border-orange-500 dark:hover:border-primary-500/70 hover:shadow-lg cursor-pointer active:scale-[0.98]'
                      : 'border-stone-300 dark:border-slate-800 bg-orange-50 dark:bg-slate-900 shadow-md shadow-stone-300/50 dark:shadow-none hover:border-stone-400 dark:hover:border-slate-700 hover:shadow-lg cursor-pointer active:scale-[0.98]'
                  }`}
              >
                {isNext && (
                  <span className="absolute -top-2 left-4 px-2 py-0.5 rounded-full bg-primary-500 text-white text-[10px] font-semibold tracking-wide">
                    Tiếp theo
                  </span>
                )}
                <div className="flex items-center gap-1.5 mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  <ThemeIcon className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{lesson.theme}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
                        ${isCompleted
                          ? 'bg-primary-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                        {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm whitespace-pre-line leading-relaxed">{lesson.title}</span>
                    </div>
                    <div className="hidden sm:flex gap-3 text-xs text-slate-400 dark:text-slate-500 pl-8">
                      {programCode === 'khai-mon' ? (
                        <>
                          {(lesson.vocab?.length || 0) > 0 && <span>Lý thuyết</span>}
                          {(lesson.exercises?.length || 0) > 0 && <span>Luyện đọc</span>}
                        </>
                      ) : (
                        <>
                          <span>{lesson.vocab?.length || 0} từ</span>
                          <span>{lesson.grammar?.length || 0} ngữ pháp</span>
                          <span>{lesson.dialogues?.length || 0} hội thoại</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="flex-shrink-0 mt-0.5">
                    {isProgressLocked ? (
                      <Lock className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                    ) : isPremiumLocked ? (
                      <Gem className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-primary-400 dark:text-primary-500 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </span>
                </div>
                {isCompleted && typeof score === 'number' && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold tabular-nums text-primary-600 dark:text-primary-400">{score}/10</span>
                    điểm
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar: tiến độ tổng quan + lối tắt luyện tập */}
        <aside className="hidden lg:block lg:sticky lg:top-24 h-fit space-y-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 flex items-center gap-4">
            <ProgressRing percent={progressPercent} />
            <div>
              <p className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white leading-none">{progressPercent}%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{completedCount}/{totalCount} bài</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <p className="px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Luyện tập thêm
            </p>
            <nav className="flex flex-col pb-1">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}
