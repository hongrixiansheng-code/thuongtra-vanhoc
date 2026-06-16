"use client";
import React, { useState } from "react";
import { pinyin } from 'pinyin-pro';

export default function DialogueClient({ dialogueData, level }: { dialogueData: any[], level: string }) {
  const isEN = level.startsWith('en');

  // Gom nhóm theo bài học
  const lessonGroups = dialogueData.reduce((acc: any, d: any) => {
    const key = d.lessonId;
    if (!acc[key]) {
      acc[key] = {
        lessonId: d.lessonId,
        lessonTitle: d.lessonTitle,
        lessonOrderIndex: d.lessonOrderIndex,
        dialogues: []
      };
    }
    acc[key].dialogues.push(d);
    return acc;
  }, {});

  const groups = Object.values(lessonGroups).sort((a: any, b: any) => a.lessonOrderIndex - b.lessonOrderIndex);

  const [openLesson, setOpenLesson] = useState<string | null>(groups[0]?.lessonId || null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const selectedGroup = groups.find((g: any) => g.lessonId === openLesson) || groups[0] || null;

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = isEN ? 'en-US' : 'zh-CN';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  };

  const playAll = (lines: any[], dialogueId: string) => {
    if (playingId === dialogueId) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    setPlayingId(dialogueId);
    let delay = 0;
    lines.forEach(line => {
      setTimeout(() => speak(line.en || line.zh), delay);
      delay += 2500;
    });
    setTimeout(() => setPlayingId(null), delay);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Hội thoại ({dialogueData.length} đoạn)
      </h1>
      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar trái — danh sách bài */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 self-start md:sticky md:top-24 max-h-[35vh] md:max-h-none md:h-[calc(100vh-8rem)] overflow-y-auto">
          <h3 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">
            Danh mục
          </h3>
          <div className="flex flex-col gap-1">
            {groups.map((group: any) => (
              <button
                key={group.lessonId}
                onClick={() => setOpenLesson(group.lessonId)}
                className={`text-left px-4 py-3 rounded-lg transition-colors border text-sm
                  ${openLesson === group.lessonId
                    ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                    : 'hover:bg-gray-50 border-transparent text-gray-600'
                  }`}
              >
                <div>{group.lessonTitle}</div>
                <div className="text-xs text-gray-400 mt-0.5">{group.dialogues.length} đoạn</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content phải — hội thoại của bài được chọn */}
        <div className="flex-1">
          {selectedGroup ? (
            <div className="space-y-6">
              {selectedGroup.dialogues.map((d: any, di: number) => {
                const dialogueId = `${selectedGroup.lessonId}-${di}`;
                const isPlaying = playingId === dialogueId;
                return (
                  <div key={di} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                      <h3 className="font-bold text-slate-800">{d.title}</h3>
                      <button
                        onClick={() => playAll(d.lines, dialogueId)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors
                          ${isPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {isPlaying
                            ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                            : <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></>
                          }
                        </svg>
                        {isPlaying ? 'Dừng' : 'Nghe toàn bài'}
                      </button>
                    </div>
                    <div className="p-6 space-y-4">
                      {d.lines?.map((line: any, li: number) => {
                        const firstSpeaker = d.lines[0]?.speaker;
                        const isA = line.speaker === firstSpeaker || line.speaker === 'A';
                        return (
                          <div key={li} className={`flex ${isA ? 'justify-start' : 'justify-end'}`}>
                            <div
                              onClick={() => speak(line.en || line.zh)}
                              className={`max-w-[80%] rounded-2xl p-4 cursor-pointer hover:opacity-90 transition-opacity
                                ${isA ? 'bg-blue-50 border border-blue-100 rounded-tl-sm' : 'bg-slate-100 border border-slate-200 rounded-tr-sm'}`}
                            >
                              <div className={`text-xs font-bold mb-1 ${isA ? 'text-blue-500' : 'text-slate-400'}`}>
                                {line.speaker && line.speaker !== 'A' && line.speaker !== 'B' 
                                  ? <span>{line.speaker} {!isEN && <span className="font-normal opacity-80 text-[10px]">({pinyin(line.speaker)})</span>}</span>
                                  : (isA ? 'Nhân vật A' : 'Nhân vật B')}
                              </div>
                              <div className="text-slate-800 font-medium text-lg">{line.en || line.zh}</div>
                              {line.py && (
                                <div className="text-indigo-500 text-sm mb-1">{line.py}</div>
                              )}
                              {line.vi && (
                                <div className={`text-sm mt-1 ${isA ? 'text-blue-600' : 'text-slate-500'}`}>{line.vi}</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
              Chọn bài học để xem hội thoại
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
