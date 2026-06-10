"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
export const MatchingGame = memo(({ onBack }) => {
    const { vocabData } = React.useContext(DataContext);
    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);
    const [phase, setPhase]   = useState('menu');
    const [pairCount, setPairCount] = useState(5);
    const [pairType, setPairType]   = useState('hanzi-meaning');
    const [cards, setCards]   = useState([]);
    const [flipped, setFlipped]     = useState([]);
    const [matched, setMatched]     = useState([]);
    const [mistakes, setMistakes]   = useState(0);
    const [checking, setChecking]   = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const timerRef = useRef(null);

    const CARD_COLORS = [
        'text-red-500', 'text-blue-500', 'text-green-500',
        'text-purple-500', 'text-orange-500', 'text-pink-500',
        'text-teal-500', 'text-indigo-500', 'text-yellow-500',
        'text-rose-500', 'text-cyan-500', 'text-emerald-500',
        'text-violet-500', 'text-amber-500', 'text-lime-500',
    ];

    const startGame = () => {
        const words = fisherYatesShuffle([...vocabData]).slice(0, pairCount);
        const cardList = [];
        words.forEach((w, i) => {
            if (isEnglish) {
                cardList.push({ id: `h${i}`, pairId: i, type: 'word', content: w.word, word: w });
                cardList.push({ id: `v${i}`, pairId: i, type: 'meaning', content: w.meaning, word: w });
            } else {
                cardList.push({ id: `h${i}`, pairId: i, type: 'hanzi', content: w.hanzi, word: w });
                cardList.push({ id: `v${i}`, pairId: i,
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

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${String(sec).padStart(2, '0')}`;
    };

    const handleFlip = (card) => {
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
        <div className="max-w-md mx-auto animate-fade-in">
            <button onClick={onBack} className="text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1 text-sm">
                <i className="fa-solid fa-arrow-left"></i> Chọn trò chơi khác
            </button>
            <h3 className="font-bold text-gray-800 text-lg mb-4">🃏 Trò chơi Lật thẻ</h3>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
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
                                className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition
                                    ${pairType === 'hanzi-meaning'
                                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                                        : 'border-gray-200 text-gray-600 hover:border-purple-200'}`}>
                                汉 ↔ Nghĩa
                            </button>
                            <button onClick={() => setPairType('hanzi-pinyin')}
                                className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition
                                    ${pairType === 'hanzi-pinyin'
                                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                                        : 'border-gray-200 text-gray-600 hover:border-purple-200'}`}>
                                汉 ↔ Pinyin
                            </button>
                        </>
                    )}
                </div>
                <p className="text-sm font-medium text-gray-600 mb-3">Chọn số cặp thẻ:</p>
                <div className="flex gap-2 mb-5">
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
                    className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold text-lg hover:bg-purple-700 active:scale-95 transition-all">
                    🃏 Bắt đầu
                </button>
            </div>
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
                    className="flex-1 py-3 border-2 border-purple-600 text-purple-600 rounded-xl font-bold">
                    Chơi lại
                </button>
                <button onClick={onBack}
                    className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-bold">
                    Menu
                </button>
            </div>
        </div>
    );

    const cols = pairCount <= 5 ? 'grid-cols-4' : pairCount <= 10 ? 'grid-cols-4' : 'grid-cols-5';
    return (
        <div className="max-w-lg mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1">
                    <i className="fa-solid fa-arrow-left"></i> Thoát
                </button>

                <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full">
                    <i className="fa-solid fa-clock text-indigo-500 text-sm"></i>
                    <span className="font-mono font-bold text-gray-700">{formatTime(elapsed)}</span>
                </div>

                <div className="flex gap-4 text-sm">
                    <span className="text-green-600 font-medium">✓ {matched.length}/{pairCount}</span>
                    <span className="text-red-500 font-medium">✗ {mistakes} lần sai</span>
                </div>
            </div>
            <div className={`grid ${cols} gap-2`}>
                {cards.map(card => {
                    const isFlipped  = !!flipped.find(f => f.id === card.id);
                    const isMatched  = matched.includes(card.pairId);
                    const isHanzi    = card.type === 'hanzi';
                    let cls = 'min-h-[70px] rounded-xl border-2 flex items-center justify-center text-center p-2 cursor-pointer transition-all select-none ';
                    if (isMatched)     cls += 'border-green-300 bg-green-50 opacity-60 cursor-default ';
                    else if (isFlipped) cls += (isHanzi ? 'border-indigo-500 bg-indigo-50 ' : 'border-purple-400 bg-purple-50 ');
                    else               cls += 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 ';
                    return (
                        <div key={card.id} onClick={() => handleFlip(card)} className={cls}>
                            {(isFlipped || isMatched) ? (
                                <span className={`font-bold leading-tight
                                    ${card.type === 'hanzi' ? 'text-3xl text-gray-800' :
                                      card.type === 'word'  ? 'text-xl text-emerald-700' :
                                      card.type === 'meaning' ? 'text-sm text-gray-700' :
                                      'text-sm text-indigo-600'}`}>
                                    {card.content}
                                </span>
                            ) : (() => {
                                const cardIndex = cards.findIndex(c => c.id === card.id);
                                const colorClass = CARD_COLORS[cardIndex % CARD_COLORS.length];
                                return (
                                    <span className={`text-3xl font-black ${colorClass}`}>
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
});
