"use client";

import React, { useState } from 'react';
import { Gamepad2, Keyboard, LayoutGrid, ChevronRight } from 'lucide-react';
import { MatchingGame } from './MatchingGame';
import { TypingGame } from './TypingGame';

export function GameTab({ vocabData, levelId = 'hsk1' }: { vocabData: any[], levelId?: string }) {
    const [game, setGame] = useState<'menu' | 'typing' | 'matching'>('menu');

    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);

    if (game === 'typing') return <TypingGame vocabData={vocabData} levelId={levelId} onBack={() => setGame('menu')} />;
    if (game === 'matching') return <MatchingGame vocabData={vocabData} onBack={() => setGame('menu')} />;

    return (
        <div className="max-w-xl mx-auto animate-fade-in p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center rounded-xl">
                    <Gamepad2 className="w-5 h-5" />
                </div>
                Kho Tàng Trò Chơi
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 text-center">Chọn trò chơi để luyện tập từ vựng</p>

            <div className="space-y-4">
                <button onClick={() => setGame('typing')}
                    className="w-full p-6 bg-white dark:bg-slate-900 hover:bg-primary-50 dark:hover:bg-primary-500/10 border-2 border-slate-100 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-500/40 rounded-3xl text-left transition-all active:scale-95 shadow-sm hover:shadow-md group">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Keyboard className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="font-bold text-primary-700 dark:text-primary-300 text-xl mb-1">Trò chơi Gõ từ (Typing)</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                {isEnglish ? 'Luyện gõ tiếng Việt từ tiếng Anh.' : 'Luyện gõ nghĩa tiếng Việt từ Hán tự.'}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                Điểm số được cộng thẳng vào tiến độ thẻ nhớ SRS!
                            </div>
                        </div>
                        <div className="ml-auto text-primary-300 dark:text-primary-500/60 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </div>
                </button>

                <button onClick={() => setGame('matching')}
                    className="w-full p-6 bg-white dark:bg-slate-900 hover:bg-primary-50 dark:hover:bg-primary-500/10 border-2 border-slate-100 dark:border-slate-800 hover:border-primary-300 dark:hover:border-primary-500/40 rounded-3xl text-left transition-all active:scale-95 shadow-sm hover:shadow-md group">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <LayoutGrid className="w-7 h-7" />
                        </div>
                        <div>
                            <div className="font-bold text-primary-700 dark:text-primary-300 text-xl mb-1">Trò chơi Lật thẻ (Matching)</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                Lật thẻ tìm cặp ghép đôi.
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                {isEnglish ? 'Ghép Tiếng Anh ↔ Nghĩa tiếng Việt' : 'Ghép Hán tự ↔ Nghĩa hoặc Pinyin'}
                            </div>
                        </div>
                        <div className="ml-auto text-primary-300 dark:text-primary-500/60 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}
