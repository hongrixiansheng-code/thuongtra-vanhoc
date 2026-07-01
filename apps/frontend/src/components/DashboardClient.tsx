"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Check, Gem, Lock,
  MessageCircle, Users, Hash, Calendar, MapPin, Utensils, CloudSun, ShoppingBag, Clock, Heart,
  BookOpen, PenSquare, MessagesSquare, Dumbbell,
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

interface DashboardClientProps {
  lessons: Lesson[];
  programName: string;
  programCode?: string;
  isPremiumUser?: boolean;
  isAdmin?: boolean;
  progressMap: Record<string, boolean>;
  scoreMap?: Record<string, number>;
}

const THEME_ICONS = [MessageCircle, Users, Hash, Calendar, MapPin, Utensils, CloudSun, ShoppingBag, Clock, Heart];

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

export default function DashboardClient({ lessons, programName, programCode, isPremiumUser, isAdmin, progressMap, scoreMap }: DashboardClientProps) {
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
      {/* Hero panel: tiêu đề + tiến độ + CTA */}
      <div className="relative overflow-hidden rounded-3xl border border-primary-100/70 dark:border-primary-500/10 bg-gradient-to-br from-primary-50 via-white to-white dark:from-primary-500/10 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-8 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">{programName}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {completedCount}/{totalCount} bài đã hoàn thành
        </p>
        <div className="h-1.5 rounded-full bg-white/70 dark:bg-slate-800 overflow-hidden mb-5 max-w-md">
          <div
            className="h-full rounded-full bg-primary-500 transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {nextLesson ? (
          <button
            onClick={() => setActiveLessonId(nextLesson.id)}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors active:scale-[0.98]"
          >
            Tiếp tục: {nextLesson.title}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        ) : allCompleted ? (
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 dark:text-primary-300">
            <Check className="w-4 h-4 flex-shrink-0" />
            Bạn đã hoàn thành tất cả bài học của chương trình này.
          </div>
        ) : null}
      </div>

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
                    ? 'border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 opacity-60 cursor-not-allowed'
                    : isNext
                      ? 'border-primary-300 dark:border-primary-500/50 bg-primary-50/50 dark:bg-primary-500/5 hover:border-primary-400 dark:hover:border-primary-500/70 hover:shadow-sm cursor-pointer active:scale-[0.98]'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm cursor-pointer active:scale-[0.98]'
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
