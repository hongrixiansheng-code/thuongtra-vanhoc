"use client";

import React, { useState, useEffect, useRef } from 'react';

// --- HELPERS ---
const fisherYatesShuffle = (arr: any[]) => {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const playAudio = (text: string) => {
    if (!text || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'zh-CN';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
};

const playSoundEffect = (type: 'success' | 'error') => {
    try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'success') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.5, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.2);
        } else {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.5, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.3);
        }
    } catch (e) { }
};

const CARD_COLORS = [
    'text-red-500', 'text-blue-500', 'text-green-500',
    'text-purple-500', 'text-orange-500', 'text-pink-500',
    'text-teal-500', 'text-indigo-500', 'text-yellow-500',
    'text-rose-500', 'text-cyan-500', 'text-emerald-500',
    'text-violet-500', 'text-amber-500', 'text-lime-500',
];

export function MatchingGame({ vocabData, onBack }: { vocabData: any[], onBack: () => void }) {
    const [phase, setPhase] = useState<'menu' | 'playing' | 'done'>('menu');
    const [pairCount, setPairCount] = useState(5);
    const [pairType, setPairType] = useState('hanzi-meaning');
    const [cards, setCards] = useState<any[]>([]);
    const [flipped, setFlipped] = useState<any[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [mistakes, setMistakes] = useState(0);
    const [checking, setChecking] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const timerRef = useRef<any>(null);

    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);

    const startGame = () => {
        const words = fisherYatesShuffle([...vocabData]).slice(0, pairCount);
        const cardList: any[] = [];
        words.forEach((w, i) => {
            if (isEnglish) {
                cardList.push({ id: `h${i}`, pairId: i, type: 'word', content: w.word, word: w });
                cardList.push({ id: `v${i}`, pairId: i, type: 'meaning', content: w.meaning, word: w });
            } else {
                cardList.push({ id: `h${i}`, pairId: i, type: 'hanzi', content: w.hanzi, word: w });
                cardList.push({
                    id: `v${i}`, pairId: i,
                    type: pairType === 'hanzi-meaning' ? 'meaning' : 'pinyin',
                    content: pairType === 'hanzi-meaning' ? w.meaning : w.pinyin,
                    word: w
                });
            }
        });
        setCards(fisherYatesShuffle(cardList));
        setFlipped([]); setMatched([]); setMistakes(0); setChecking(false);
        setPhase('playing');
    };

    useEffect(() => {
        if (phase !== 'playing') {
            clearInterval(timerRef.current);
            return;
        }
        setElapsed(0);
        timerRef.current = setInterval(() => {
            setElapsed(e => e + 1);
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [phase]);

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${String(sec).padStart(2, '0')}`;
    };

    const handleFlip = (card: any) => {
        if (checking) return;
        if (matched.includes(card.pairId)) return;
        if (flipped.find(f => f.id === card.id)) return;
        if (flipped.length === 1 && flipped[0].id === card.id) return;

        const newFlipped = [...flipped, card];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setChecking(true);
            const [a, b] = newFlipped;
            if (a.pairId === b.pairId && a.type !== b.type) {
                playSoundEffect('success');
                if (a.word.hanzi) {
                    playAudio(a.word.hanzi);
                } else if (a.word.word) {
                    window.speechSynthesis.cancel();
                    const u = new SpeechSynthesisUtterance(a.word.word);
                    u.lang = 'en-US'; u.rate = 0.85;
                    window.speechSynthesis.speak(u);
                }
                setMatched(m => [...m, a.pairId]);
                setFlipped([]);
                setChecking(false);
                if (matched.length + 1 === pairCount) {
                    setTimeout(() => setPhase('done'), 500);
                }
            } else {
                playSoundEffect('error');
                setMistakes(m => m + 1);
                setTimeout(() => { setFlipped([]); setChecking(false); }, 1000);
            }
        }
    };

    if (phase === 'menu') return (
        <div className="max-w-md mx-auto animate-fade-in p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <button onClick={onBack} className="text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1 text-sm">
                <i className="fa-solid fa-arrow-left"></i> Chọn trò chơi khác
            </button>
            <h3 className="font-bold text-gray-800 text-xl mb-4 text-center">🃏 Trò chơi Lật thẻ</h3>
            
            <p className="text-sm font-medium text-gray-600 mb-3">Chọn loại ghép đôi:</p>
            <div className="flex gap-2 mb-5">
                {isEnglish ? (
                    <div className="text-sm bg-emerald-50 border border-emerald-200
                        rounded-xl px-4 py-3 text-center font-medium text-emerald-700 w-full">
                        🇬🇧 Tiếng Anh ↔ Nghĩa tiếng Việt
                    </div>
                ) : (
                    <>
                        <button onClick={() => setPairType('hanzi-meaning')}
                            className={`flex-1 py-2 rounded-xl border-2 text-sm font-medium transition
                                ${pairType === 'hanzi-meaning'
                                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                                    : 'border-gray-200 text-gray-600 hover:border-purple-200'}`}>
                            Hán ↔ Nghĩa
                        </button>
                        <button onClick={() => setPairType('hanzi-pinyin')}
                            className={`flex-1 py-2 rounded-xl border-2 text-sm font-medium transition
                                ${pairType === 'hanzi-pinyin'
                                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                                    : 'border-gray-200 text-gray-600 hover:border-purple-200'}`}>
                            Hán ↔ Pinyin
                        </button>
                    </>
                )}
            </div>
            
            <p className="text-sm font-medium text-gray-600 mb-3">Chọn số cặp thẻ:</p>
            <div className="flex gap-2 mb-6">
                {[5, 10, 15].map(n => (
                    <button key={n} onClick={() => setPairCount(n)}
                        className={`flex-1 py-3 rounded-xl text-lg font-bold border-2 transition-all
                            ${pairCount === n
                                ? 'border-purple-500 bg-purple-50 text-purple-700'
                                : 'border-gray-200 text-gray-600 hover:border-purple-200'}`}>
                        {n} cặp
                    </button>
                ))}
            </div>
            
            <button onClick={startGame}
                className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold text-lg hover:bg-purple-700 active:scale-95 transition-all shadow-md">
                Bắt đầu chơi
            </button>
        </div>
    );

    if (phase === 'done') return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center animate-fade-in">
            <div className="text-6xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Hoàn thành!</h2>
            <p className="text-gray-500 mb-4">Ghép đúng {pairCount} cặp thẻ</p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-center">
                <div className="text-2xl font-bold text-blue-600 font-mono">{formatTime(elapsed)}</div>
                <div className="text-sm text-blue-500">Thời gian hoàn thành</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <div className="text-3xl font-bold text-orange-500">{mistakes}</div>
                <div className="text-sm text-orange-600">lần lật sai</div>
            </div>
            <div className="flex gap-3">
                <button onClick={startGame}
                    className="flex-1 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-bold hover:bg-purple-50">
                    Chơi lại
                </button>
                <button onClick={onBack}
                    className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700">
                    Menu
                </button>
            </div>
        </div>
    );

    const cols = pairCount <= 5 ? 'grid-cols-4' : pairCount <= 10 ? 'grid-cols-4' : 'grid-cols-5';
    return (
        <div className="max-w-2xl mx-auto animate-fade-in bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1 font-medium">
                    <i className="fa-solid fa-arrow-left"></i> Thoát
                </button>

                <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full">
                    <i className="fa-solid fa-clock text-indigo-500 text-sm"></i>
                    <span className="font-mono font-bold text-gray-700">{formatTime(elapsed)}</span>
                </div>

                <div className="flex gap-4 text-sm bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
                    <span className="text-green-600 font-bold">✓ {matched.length}/{pairCount}</span>
                    <span className="text-red-500 font-bold">✗ {mistakes}</span>
                </div>
            </div>

            <div className={`grid ${cols} gap-3`}>
                {cards.map(card => {
                    const isFlipped = !!flipped.find(f => f.id === card.id);
                    const isMatched = matched.includes(card.pairId);
                    const isHanzi = card.type === 'hanzi';
                    let cls = 'h-24 sm:h-32 rounded-2xl border-2 flex items-center justify-center text-center p-2 cursor-pointer transition-all duration-300 select-none shadow-sm ';
                    if (isMatched) cls += 'border-green-300 bg-green-50 opacity-40 cursor-default scale-95 ';
                    else if (isFlipped) cls += (isHanzi ? 'border-indigo-500 bg-indigo-50 shadow-inner ' : 'border-purple-400 bg-purple-50 shadow-inner ');
                    else cls += 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 hover:-translate-y-1 hover:shadow-md ';
                    
                    return (
                        <div key={card.id} onClick={() => handleFlip(card)} className={cls}>
                            {(isFlipped || isMatched) ? (
                                <span className={`font-bold leading-tight animate-fade-in
                                    ${card.type === 'hanzi' ? 'text-4xl text-gray-800' :
                                      card.type === 'word' ? 'text-2xl text-emerald-700' :
                                      card.type === 'meaning' ? 'text-sm text-gray-700' :
                                      'text-base text-indigo-600'}`}>
                                    {card.content}
                                </span>
                            ) : (() => {
                                const cardIndex = cards.findIndex(c => c.id === card.id);
                                const colorClass = CARD_COLORS[cardIndex % CARD_COLORS.length];
                                return (
                                    <span className={`text-4xl font-black ${colorClass} opacity-80`}>
                                        {cardIndex + 1}
                                    </span>
                                );
                            })()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
