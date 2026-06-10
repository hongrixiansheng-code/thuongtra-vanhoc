"use client";

import React, { useState } from 'react';
import { MatchingGame } from './MatchingGame';
import { TypingGame } from './TypingGame';

export function GameTab({ vocabData, levelId = 'hsk1' }: { vocabData: any[], levelId?: string }) {
    const [game, setGame] = useState<'menu' | 'typing' | 'matching'>('menu');
    
    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);

    if (game === 'typing') return <TypingGame vocabData={vocabData} levelId={levelId} onBack={() => setGame('menu')} />;
    if (game === 'matching') return <MatchingGame vocabData={vocabData} onBack={() => setGame('menu')} />;
    
    return (
        <div className="max-w-xl mx-auto animate-fade-in p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-xl">
                    <i className="fa-solid fa-gamepad"></i>
                </div>
                Kho Tàng Trò Chơi
            </h2>
            <p className="text-gray-500 text-sm mb-8 text-center">Chọn trò chơi để luyện tập từ vựng</p>
            
            <div className="space-y-4">
                <button onClick={() => setGame('typing')}
                    className="w-full p-6 bg-white hover:bg-indigo-50 border-2 border-indigo-100 hover:border-indigo-300 rounded-3xl text-left transition-all active:scale-95 shadow-sm hover:shadow-md group">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            ⌨️
                        </div>
                        <div>
                            <div className="font-bold text-indigo-700 text-xl mb-1">Trò chơi Gõ từ (Typing)</div>
                            <div className="text-sm text-gray-500">
                                {isEnglish ? 'Luyện gõ tiếng Việt từ tiếng Anh.' : 'Luyện gõ nghĩa tiếng Việt từ Hán tự.'}
                            </div>
                            <div className="text-sm text-gray-500 mt-0.5">
                                Điểm số được cộng thẳng vào tiến độ thẻ nhớ SRS!
                            </div>
                        </div>
                        <div className="ml-auto text-indigo-300 group-hover:text-indigo-500 transition-colors">
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </button>

                <button onClick={() => setGame('matching')}
                    className="w-full p-6 bg-white hover:bg-purple-50 border-2 border-purple-100 hover:border-purple-300 rounded-3xl text-left transition-all active:scale-95 shadow-sm hover:shadow-md group">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            🃏
                        </div>
                        <div>
                            <div className="font-bold text-purple-700 text-xl mb-1">Trò chơi Lật thẻ (Matching)</div>
                            <div className="text-sm text-gray-500">
                                Lật thẻ tìm cặp ghép đôi.
                            </div>
                            <div className="text-sm text-gray-500 mt-0.5">
                                {isEnglish ? 'Ghép Tiếng Anh ↔ Nghĩa tiếng Việt' : 'Ghép Hán tự ↔ Nghĩa hoặc Pinyin'}
                            </div>
                        </div>
                        <div className="ml-auto text-purple-300 group-hover:text-purple-500 transition-colors">
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}
