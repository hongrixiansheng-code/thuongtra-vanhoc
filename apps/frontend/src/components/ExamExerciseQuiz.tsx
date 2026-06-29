"use client";

import { useState, useMemo } from "react";

type ExamExercise = {
  title: string;
  desc?: string;
  type: string;
  question: string;
  options: string[];
  correct: string;
  explanation?: string;
};

export default function ExamExerciseQuiz({
  exercises,
  accentColor = "blue",
  emptyMessage = "Chưa có bài tập cho phần này.",
}: {
  exercises: ExamExercise[];
  accentColor?: "blue" | "emerald" | "indigo";
  emptyMessage?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });

  const current = exercises[idx];

  const colors = useMemo(() => {
    const map = {
      blue: { bg: "bg-blue-600", bgSoft: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-500" },
      emerald: { bg: "bg-emerald-600", bgSoft: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-500" },
      indigo: { bg: "bg-indigo-600", bgSoft: "bg-indigo-50", text: "text-indigo-600", ring: "ring-indigo-500" },
    };
    return map[accentColor];
  }, [accentColor]);

  if (!exercises || exercises.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 text-gray-400">
        <div className="text-5xl mb-4">📭</div>
        {emptyMessage}
      </div>
    );
  }

  if (!current) {
    return (
      <div className="max-w-md mx-auto animate-fade-in">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center mt-6">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Hoàn thành!</h2>
          <p className="text-gray-500 mb-6">
            Đúng {stats.correct}/{exercises.length} câu
          </p>
          <button
            onClick={() => {
              setIdx(0);
              setSelected(null);
              setStats({ correct: 0, wrong: 0 });
            }}
            className={`px-6 py-3 rounded-xl text-white font-semibold ${colors.bg}`}
          >
            Làm lại
          </button>
        </div>
      </div>
    );
  }

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
    setStats((s) => (opt === current.correct ? { ...s, correct: s.correct + 1 } : { ...s, wrong: s.wrong + 1 }));
  };

  const handleNext = () => {
    setSelected(null);
    setIdx((i) => i + 1);
  };

  return (
    <div className="max-w-xl mx-auto px-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
        <span>{current.title}</span>
        <span>
          {idx + 1}/{exercises.length}
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
        {current.desc && <p className="text-sm text-gray-500 mb-3">{current.desc}</p>}
        <p className="text-lg font-semibold text-gray-800 whitespace-pre-line mb-5">{current.question}</p>

        <div className="space-y-2">
          {current.options.map((opt) => {
            const isCorrect = opt === current.correct;
            const isSelected = opt === selected;
            let style = "border-gray-200 hover:border-gray-300";
            if (selected) {
              if (isCorrect) style = "border-green-500 bg-green-50 text-green-700";
              else if (isSelected) style = "border-red-400 bg-red-50 text-red-600";
              else style = "border-gray-100 text-gray-400";
            }
            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                disabled={!!selected}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-colors ${style}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected && current.explanation && (
          <div className={`mt-4 p-4 rounded-xl text-sm ${colors.bgSoft} ${colors.text}`}>{current.explanation}</div>
        )}

        {selected && (
          <button
            onClick={handleNext}
            className={`mt-5 w-full py-3 rounded-xl text-white font-semibold ${colors.bg}`}
          >
            {idx < exercises.length - 1 ? "Câu tiếp theo →" : "Xem kết quả"}
          </button>
        )}
      </div>
    </div>
  );
}
