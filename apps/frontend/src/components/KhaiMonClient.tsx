"use client";

// 🤖 CLAUDE CODE
// File: apps/frontend/src/components/KhaiMonClient.tsx
// Mục đích: Render nội dung bài Khai môn theo Scroll Layout
// Không thay đổi gì khác.

import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SoundTableRow {
  tone: string;
  pinyin: string;
  hanzi: string;
  meaning: string;
}

interface Section {
  type: "text" | "sound_table" | "note" | "comparison";
  body?: string;
  label?: string;
  rows?: SoundTableRow[];
  vietnamese?: string;
  difference?: string;
}

interface TheoryContent {
  title: string;
  sections: Section[];
}

interface Word {
  pinyin: string;
  hanzi: string;
  meaning: string;
}

interface WordGroup {
  sound: string;
  label: string;
  words: Word[];
}

interface ExerciseContent {
  title: string;
  instruction?: string;
  groups: WordGroup[];
}

interface KhaiMonLesson {
  id: string;
  title: string;
  vocab: TheoryContent[];    // contentType THEORY
  exercises: ExerciseContent[]; // contentType EXERCISE
}

interface KhaiMonClientProps {
  lesson: KhaiMonLesson;
  lessonId: string;
  programName: string;
  onComplete: (score: number) => void;
  onBack: () => void;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RenderText({ body }: { body: string }) {
  // Render **bold** và \n
  const parts = body.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

function SoundTable({ rows }: { rows: SoundTableRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 my-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">Thanh</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">Pinyin</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">Chữ Hán</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-500 dark:text-slate-400">Nghĩa</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b last:border-0 border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{row.tone}</td>
              <td className="px-4 py-3 font-mono text-lg text-primary-600 dark:text-primary-400 font-semibold">{row.pinyin}</td>
              <td className="px-4 py-3 text-xl text-slate-800 dark:text-white">{row.hanzi}</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{row.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NoteBox({ label, body }: { label?: string; body: string }) {
  return (
    <div className="my-4 flex gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
      <span className="text-amber-500 text-lg flex-shrink-0">⚠️</span>
      <div>
        {label && (
          <p className="font-semibold text-amber-800 dark:text-amber-300 text-sm mb-1">{label}</p>
        )}
        <p className="text-amber-700 dark:text-amber-300 text-sm leading-relaxed whitespace-pre-line">{body}</p>
      </div>
    </div>
  );
}

function ComparisonBox({ vietnamese, difference }: { vietnamese: string; difference: string }) {
  return (
    <div className="my-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-blue-500">🇻🇳</span>
        <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">So sánh tiếng Việt</p>
      </div>
      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">{vietnamese}</p>
      <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed whitespace-pre-line">{difference}</p>
    </div>
  );
}

function TheoryBlock({ content }: { content: TheoryContent }) {
  return (
    <div className="space-y-2">
      {content.sections.map((section, i) => {
        if (section.type === "text" && section.body) {
          return <RenderText key={i} body={section.body} />;
        }
        if (section.type === "sound_table" && section.rows) {
          return <SoundTable key={i} rows={section.rows} />;
        }
        if (section.type === "note" && section.body) {
          return <NoteBox key={i} label={section.label} body={section.body} />;
        }
        if (section.type === "comparison" && section.vietnamese && section.difference) {
          return <ComparisonBox key={i} vietnamese={section.vietnamese} difference={section.difference} />;
        }
        return null;
      })}
    </div>
  );
}

function ExerciseBlock({ content }: { content: ExerciseContent }) {
  const [playingIdx, setPlayingIdx] = useState<string | null>(null);

  const speak = (text: string, key: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "zh-CN";
      utterance.rate = 0.8;
      utterance.onstart = () => setPlayingIdx(key);
      utterance.onend = () => setPlayingIdx(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {content.instruction && (
        <p className="text-sm text-slate-500 dark:text-slate-400 italic">{content.instruction}</p>
      )}
      {content.groups.map((group, gi) => (
        <div key={gi}>
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            {group.label}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {group.words.map((word, wi) => {
              const key = `${gi}-${wi}`;
              const isPlaying = playingIdx === key;
              return (
                <button
                  key={wi}
                  onClick={() => speak(word.hanzi, key)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all
                    ${isPlaying
                      ? "border-primary-400 bg-primary-50 dark:bg-primary-900/30 dark:border-primary-600"
                      : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-sm"
                    }`}
                >
                  {/* Số thứ tự */}
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {wi + 1}
                  </span>
                  {/* Nội dung */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg text-slate-800 dark:text-white font-medium">{word.hanzi}</span>
                      <span className="text-sm text-primary-600 dark:text-primary-400 font-mono">{word.pinyin}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{word.meaning}</p>
                  </div>
                  {/* Icon loa */}
                  <span className={`text-base flex-shrink-0 transition-transform ${isPlaying ? "scale-125" : ""}`}>
                    {isPlaying ? "🔊" : "🔈"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function KhaiMonClient({
  lesson,
  lessonId,
  programName,
  onComplete,
  onBack,
}: KhaiMonClientProps) {
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);

  const theory = lesson.vocab?.[0] as TheoryContent | undefined;
  const exercise = lesson.exercises?.[0] as ExerciseContent | undefined;

  const handleComplete = async () => {
    setSaving(true);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, score: 100 }),
      });
      setCompleted(true);
      setTimeout(() => onComplete(10), 1200);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header cố định */}
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{programName}</p>
          <p className="font-semibold text-slate-800 dark:text-white text-sm truncate">{lesson.title}</p>
        </div>
      </div>

      {/* Nội dung cuộn */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-10">

        {/* ── Block Lý thuyết ── */}
        {theory && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 flex items-center justify-center text-base">📖</span>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Lý thuyết</h2>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <TheoryBlock content={theory} />
            </div>
          </section>
        )}

        {/* ── Block Luyện đọc ── */}
        {exercise && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center text-base">🔊</span>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">Luyện đọc</h2>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <ExerciseBlock content={exercise} />
            </div>
          </section>
        )}

        {/* ── Nút hoàn thành ── */}
        <div className="pb-8">
          {completed ? (
            <div className="flex flex-col items-center gap-2 py-6">
              <span className="text-4xl">🎉</span>
              <p className="font-semibold text-slate-700 dark:text-slate-300">Hoàn thành bài học!</p>
            </div>
          ) : (
            <button
              onClick={handleComplete}
              disabled={saving}
              className="w-full py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white font-semibold text-base transition-all disabled:opacity-60"
            >
              {saving ? "Đang lưu..." : "✓ Đánh dấu hoàn thành"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
