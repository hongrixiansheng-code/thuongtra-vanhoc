"use client";

import React, { useState } from "react";
import LessonStepFlow from "@/components/LessonStepFlow";

interface Lesson {
  id: string;
  title: string;
  theme: string;
  isPremium: boolean;
  vocab: any[];
  grammar: any[];
  dialogues: any[];
  exercises: any[];
}

interface DashboardClientProps {
  lessons: Lesson[];
  programName: string;
  isPremiumUser?: boolean;
  isAdmin?: boolean;
  progressMap: Record<string, boolean>;
}

export default function DashboardClient({ lessons, programName, isPremiumUser, isAdmin, progressMap }: DashboardClientProps) {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const activeLesson = lessons.find(l => l.id === activeLessonId);

  // Group lessons by theme
  const themes = Array.from(new Set(lessons.map(l => l.theme)));

  // Đang học bài → hiện Step Flow full screen
  if (activeLesson) {
    return (
      <LessonStepFlow
        vocabItems={activeLesson.vocab || []}
        grammarItems={activeLesson.grammar || []}
        dialogueItems={activeLesson.dialogues || []}
        exerciseItems={activeLesson.exercises || []}
        lessonTitle={activeLesson.title}
        lessonId={activeLesson.id}
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">{programName}</h1>
        <p className="text-slate-500 mt-1">{lessons.length} bài học • Chọn bài để bắt đầu</p>
      </div>

      {/* Danh sách bài theo theme */}
      <div className="space-y-8">
        {themes.map(theme => (
          <div key={theme}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 pl-1">
              {theme}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lessons.filter(l => l.theme === theme).map((lesson, idx) => {
                const lessonIndex = lessons.indexOf(lesson);
                const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
                // Bài đầu tiên luôn mở
                // Bài thứ 2 mở nếu: bài đầu có 0 từ (bài mở đầu/giới thiệu) HOẶC bài đầu đã hoàn thành
                const firstLesson = lessons[0];
                const firstLessonIsIntro = (firstLesson?.vocab?.length || 0) === 0;
                const isProgressLocked = isAdmin ? false : lessonIndex === 0
                  ? false
                  : lessonIndex === 1
                    ? !firstLessonIsIntro && !progressMap[prevLesson!.id]
                    : !progressMap[prevLesson!.id];
                const isPremiumLocked = isAdmin ? false : lesson.isPremium && !isPremiumUser;
                const isLocked = isProgressLocked || isPremiumLocked;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => !isLocked && setActiveLessonId(lesson.id)}
                    disabled={isLocked}
                    className={`text-left p-5 rounded-2xl border-2 transition-all
                      ${isLocked
                        ? 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed'
                        : 'border-blue-100 bg-white hover:border-blue-400 hover:shadow-md cursor-pointer active:scale-[0.98]'
                      }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-slate-800 text-sm">{lesson.title}</span>
                        </div>
                        <div className="flex gap-3 text-xs text-slate-400 pl-8">
                          <span>{lesson.vocab?.length || 0} từ</span>
                          <span>{lesson.grammar?.length || 0} ngữ pháp</span>
                          <span>{lesson.dialogues?.length || 0} hội thoại</span>
                        </div>
                      </div>
                      {isProgressLocked ? (
                        <span className="text-slate-400 flex-shrink-0 text-lg">🔒</span>
                      ) : isPremiumLocked ? (
                        <span className="text-amber-400 flex-shrink-0">💎</span>
                      ) : (
                        <span className="text-blue-400 flex-shrink-0 text-lg">→</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
