"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
export const GameTab = memo(() => {
    const [game, setGame] = useState('menu');
    const { vocabData } = React.useContext(DataContext);
    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);
    if (game === 'typing')    return <TypingGame    onBack={() => setGame('menu')} />;
    if (game === 'matching')  return <MatchingGame  onBack={() => setGame('menu')} />;
    return (
        <div className="max-w-md mx-auto animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-gamepad text-indigo-500"></i> Trò Chơi Học Từ
            </h2>
            <p className="text-gray-500 text-sm mb-6">Chọn trò chơi để luyện từ vựng</p>
            <div className="space-y-4">
                <button onClick={() => setGame('typing')}
                    className="w-full p-5 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 rounded-2xl text-left transition-all active:scale-95">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">⌨️</span>
                        <div>
                            <div className="font-bold text-indigo-700 text-lg">Trò chơi Gõ từ</div>
                            <div className="text-sm text-indigo-500 mt-1">
                                {isEnglish ? 'Xem tiếng Anh → gõ tiếng Việt' : 'Xem chữ Hán → gõ nghĩa tiếng Việt'}
                            </div>
                            <div className="text-sm text-indigo-500">
                                {isEnglish ? 'hoặc xem tiếng Việt → gõ tiếng Anh' : 'hoặc xem nghĩa → gõ pinyin'}
                            </div>
                        </div>
                    </div>
                </button>
                <button onClick={() => setGame('matching')}
                    className="w-full p-5 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-2xl text-left transition-all active:scale-95">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">🃏</span>
                        <div>
                            <div className="font-bold text-purple-700 text-lg">Trò chơi Lật thẻ</div>
                            <div className="text-sm text-purple-500 mt-1">Lật thẻ tìm cặp ghép đôi</div>
                            <div className="text-sm text-purple-500">
                                {isEnglish ? 'Tiếng Anh ↔ Nghĩa tiếng Việt' : 'Hán tự ↔ Nghĩa hoặc Pinyin'}
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
});
