"use client";
import React, { useState } from "react";
import { pinyin } from "pinyin-pro";

interface GrammarClientProps {
  grammarData: any[];
  level: string;
}

export default function GrammarClient({ grammarData, level }: GrammarClientProps) {
  const isEN = level.startsWith('en');

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = isEN ? 'en-US' : 'zh-CN';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  };

  // Nhóm theo bài học
  const lessonGroups = grammarData.reduce((acc: any, g: any) => {
    const key = g._lessonId;
    if (!acc[key]) {
      acc[key] = {
        lessonId: g._lessonId,
        lessonTitle: g._lessonTitle,
        lessonOrderIndex: g._lessonOrderIndex,
        grammars: []
      };
    }
    acc[key].grammars.push(g);
    return acc;
  }, {});

  const groups = Object.values(lessonGroups).sort((a: any, b: any) => a.lessonOrderIndex - b.lessonOrderIndex);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(groups[0]?.lessonId || '');
  const selectedGroup = groups.find((g: any) => g.lessonId === selectedLessonId) as any;

  if (!grammarData || grammarData.length === 0) {
    return <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500">Chưa có dữ liệu ngữ pháp.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Cẩm nang Ngữ pháp ({grammarData.length} cấu trúc)
      </h1>
      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar — danh sách bài học */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 self-start md:sticky md:top-24 md:h-[calc(100vh-8rem)] overflow-y-auto">
          <h3 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">
            Danh mục
          </h3>
          <div className="flex flex-col gap-1">
            {groups.map((group: any) => (
              <button
                key={group.lessonId}
                onClick={() => setSelectedLessonId(group.lessonId)}
                className={`text-left px-4 py-3 rounded-lg transition-colors border text-sm
                  ${selectedLessonId === group.lessonId
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium'
                    : 'hover:bg-gray-50 border-transparent text-gray-600'
                  }`}
              >
                <div className="font-medium">{group.lessonTitle}</div>
                <div className="text-xs text-gray-400 mt-0.5">{group.grammars.length} cấu trúc</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content — tất cả grammar của bài được chọn */}
        <div className="flex-1 space-y-6">
          {selectedGroup?.grammars.map((g: any, idx: number) => {
            const isFormulaString = typeof g.formula === 'string';
            const examples = g.practiceList && g.practiceList.length > 0 
              ? g.practiceList 
              : (g.examples || []);

            return (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{g.title}</h2>
              <p className="text-gray-600 mb-6">{g.desc || g.description}</p>

              {/* Công thức */}
              {g.formula && g.formula.length > 0 && (
                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Công thức</div>
                  <div className="flex flex-wrap gap-2 items-center">
                    {isFormulaString ? (
                      <span className="px-3 py-1.5 rounded-lg text-sm font-medium border border-indigo-200 text-indigo-700 bg-indigo-50">
                        {g.formula}
                      </span>
                    ) : (
                      g.formula.map((f: any, fi: number) => (
                        <React.Fragment key={fi}>
                          <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${f.classes}`}>
                            {f.text}
                          </span>
                          {fi < g.formula.length - 1 && (
                            <span className="text-slate-300 font-bold">+</span>
                          )}
                        </React.Fragment>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Ví dụ */}
              {examples && examples.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Câu ví dụ</div>
                  <div className="space-y-2">
                    {examples.map((p: any, pi: number) => (
                      <div
                        key={pi}
                        onClick={() => speak(p.correct || p.chinese)}
                        className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl shadow-sm cursor-pointer hover:bg-gray-50 transition group"
                      >
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                          {pi + 1}
                        </span>
                        <div className="flex flex-col flex-1">
                          <span className="text-gray-800 font-medium text-lg">{p.correct || p.chinese}</span>
                          {!isEN && (
                            <span className="text-indigo-500 text-sm mb-1">{pinyin(p.correct || p.chinese)}</span>
                          )}
                          <span className="text-gray-600 text-sm">{p.meaning || p.vietnamese}</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-300 group-hover:text-indigo-600 transition-colors self-center">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )})}
        </div>
      </div>
    </div>
  );
}
