"use client";
import React, { useState, useRef, useEffect } from "react";
import { pinyin } from 'pinyin-pro';
import { Volume2, Pause } from 'lucide-react';

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

  const groups = Object.values(lessonGroups as any).sort((a: any, b: any) => a.lessonOrderIndex - b.lessonOrderIndex);

  const [openLesson, setOpenLesson] = useState<string | null>((groups[0] as any)?.lessonId || null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const playbackTokenRef = useRef(0);

  const selectedGroup = groups.find((g: any) => g.lessonId === openLesson) as any || groups[0] as any || null;

  // Đổi bài học ở sidebar -> dừng phát đang chạy, vô hiệu hoá chuỗi onend cũ
  useEffect(() => {
    playbackTokenRef.current++;
    window.speechSynthesis.cancel();
    setPlayingId(null);
  }, [openLesson]);

  // Đổi chương trình/level (props mới nhưng component không remount) -> dừng phát
  useEffect(() => {
    playbackTokenRef.current++;
    window.speechSynthesis.cancel();
    setPlayingId(null);
  }, [dialogueData]);

  // Rời trang -> dừng phát
  useEffect(() => {
    return () => {
      playbackTokenRef.current++;
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text: string) => {
    playbackTokenRef.current++;
    window.speechSynthesis.cancel();
    setPlayingId(null);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = isEN ? 'en-US' : 'zh-CN';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  };

  const playAll = (lines: any[], dialogueId: string) => {
    window.speechSynthesis.cancel();
    if (playingId === dialogueId) {
      playbackTokenRef.current++;
      setPlayingId(null);
      return;
    }
    const token = ++playbackTokenRef.current;
    setPlayingId(dialogueId);

    const playLineAt = (index: number) => {
      if (playbackTokenRef.current !== token) return;
      if (index >= lines.length) {
        setPlayingId(null);
        return;
      }
      const text = lines[index].en || lines[index].zh;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = isEN ? 'en-US' : 'zh-CN';
      u.rate = 0.85;
      u.onend = () => playLineAt(index + 1);
      u.onerror = () => playLineAt(index + 1);
      window.speechSynthesis.speak(u);
    };
    playLineAt(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero panel */}
      <div className="relative overflow-hidden rounded-3xl border border-primary-100/70 dark:border-primary-500/10 bg-gradient-to-br from-primary-50 via-white to-white dark:from-primary-500/10 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-8 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Hội thoại
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{dialogueData.length} đoạn đã mở khóa</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">

        {/* Sidebar trái — danh sách bài */}
        <div className="w-full md:w-1/3 lg:w-1/4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 self-start md:sticky md:top-24 max-h-[35vh] md:max-h-none md:h-[calc(100vh-8rem)] overflow-y-auto">
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-lg border-b border-slate-100 dark:border-slate-800 pb-2">
            Danh mục
          </h3>
          <div className="flex flex-col gap-1">
            {groups.map((group: any) => (
              <button
                key={group.lessonId}
                onClick={() => setOpenLesson(group.lessonId)}
                className={`text-left px-4 py-3 rounded-lg transition-colors border text-sm
                  ${openLesson === group.lessonId
                    ? 'bg-primary-50 dark:bg-primary-500/10 border-primary-200 dark:border-primary-500/30 text-primary-700 dark:text-primary-400 font-medium'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border-transparent text-slate-600 dark:text-slate-300'
                  }`}
              >
                <div>{group.lessonTitle}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{group.dialogues.length} đoạn</div>
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
                  <div key={di} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                      <h3 className="font-bold text-slate-800 dark:text-slate-100">{d.title}</h3>
                      <button
                        onClick={() => playAll(d.lines, dialogueId)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors
                          ${isPlaying ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-primary-500 hover:bg-primary-600 text-white'}`}
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
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
                                ${isA
                                  ? 'bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 rounded-tl-sm'
                                  : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-tr-sm'}`}
                            >
                              <div className={`text-xs font-bold mb-1 ${isA ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500'}`}>
                                {line.speaker && line.speaker !== 'A' && line.speaker !== 'B'
                                  ? <span>{line.speaker} {!isEN && <span className="font-normal opacity-80 text-[10px]">({pinyin(line.speaker)})</span>}</span>
                                  : (isA ? 'Nhân vật A' : 'Nhân vật B')}
                              </div>
                              <div className="text-slate-800 dark:text-slate-100 font-medium text-lg">{line.en || line.zh}</div>
                              {line.py && (
                                <div className="text-primary-500 dark:text-primary-400 text-sm mb-1">{line.py}</div>
                              )}
                              {line.vi && (
                                <div className={`text-sm mt-1 ${isA ? 'text-primary-700 dark:text-primary-300' : 'text-slate-500 dark:text-slate-400'}`}>{line.vi}</div>
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
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 text-center text-slate-400 dark:text-slate-500">
              Chọn bài học để xem hội thoại
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
