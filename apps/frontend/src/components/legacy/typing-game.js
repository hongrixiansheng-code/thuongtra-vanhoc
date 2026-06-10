"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
export const TypingGame = memo(({ onBack }) => {
    const { vocabData, currentLevel } = React.useContext(DataContext);
    const [mode, setMode]       = useState('menu');
    const [queue, setQueue]     = useState([]);
    const [idx, setIdx]         = useState(0);
    const [input, setInput]     = useState('');
    const [result, setResult]   = useState(null);
    const [stats, setStats]     = useState({ correct: 0, wrong: 0 });
    const [finished, setFinished] = useState(false);
    const [wordCount, setWordCount] = useState(10);
    const [mistakeCount, setMistakeCount] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const inputRef = useRef(null);
    const timerRef = useRef(null);
    const TOTAL = 10;

    const start = (selectedMode) => {
        setQueue(fisherYatesShuffle([...vocabData]).slice(0, wordCount));
        setIdx(0); setInput(''); setResult(null);
        setStats({ correct: 0, wrong: 0 });
        setFinished(false);
        setMode(selectedMode);
        setTimeout(() => inputRef.current?.focus(), 200);
    };

    const currentWord = queue[idx];
    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);

    useEffect(() => {
        if (mode !== 'menu' && !finished) {
            setInput(''); setResult(null); setMistakeCount(0);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [idx, mode]);

    useEffect(() => {
        if (mode === 'menu' || finished) {
            clearInterval(timerRef.current);
            return;
        }
        setElapsed(0);
        timerRef.current = setInterval(() => {
            setElapsed(e => e + 1);
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [mode, finished]);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${String(sec).padStart(2, '0')}`;
    };

    const normalizeAnswer = (str) => {
        return str.trim().toLowerCase()
            .replace(/\bmột\b/g, '1').replace(/\bhai\b/g, '2')
            .replace(/\bba\b/g, '3').replace(/\bbốn\b/g, '4')
            .replace(/\bnăm\b/g, '5').replace(/\bsáu\b/g, '6')
            .replace(/\bbảy\b/g, '7').replace(/\btám\b/g, '8')
            .replace(/\bchín\b/g, '9').replace(/\bmười\b/g, '10')
            .replace(/\b1\b/g, 'một').replace(/\b2\b/g, 'hai')
            .replace(/\b3\b/g, 'ba').replace(/\b4\b/g, 'bốn')
            .replace(/\b5\b/g, 'năm').replace(/\b6\b/g, 'sáu')
            .replace(/\b7\b/g, 'bảy').replace(/\b8\b/g, 'tám')
            .replace(/\b9\b/g, 'chín').replace(/\b10\b/g, 'mười');
    };

    const checkVietnamese = (userInput, correctMeaning) => {
        const userNorm = normalizeAnswer(userInput.trim());
        if (!userNorm) return false;

        // Tách các nghĩa theo dấu , và /
        const meanings = correctMeaning.split(/[,\/]/).map(m => normalizeAnswer(m.trim())).filter(Boolean);

        return meanings.some(meaning => {
            // Khớp chính xác hoàn toàn
            if (meaning === userNorm) return true;

            // Tách từng từ trong nghĩa — user phải gõ ít nhất 1 cụm từ có nghĩa
            // Ví dụ: "anh em trai" → user gõ "anh em" hoặc "em trai" → đúng
            // Nhưng chỉ gõ "anh" → sai (vì "anh" không đủ nghĩa)
            const meaningWords = meaning.split(/\s+/);
            const userWords = userNorm.split(/\s+/);

            // Nếu nghĩa chỉ có 1 từ → phải khớp chính xác
            if (meaningWords.length === 1) return meaning === userNorm;

            // Nếu nghĩa có 2+ từ → user phải gõ ít nhất 60% số từ liên tiếp
            const minWords = Math.ceil(meaningWords.length * 0.6);
            if (userWords.length < minWords) return false;

            // Kiểm tra user gõ có phải là subsequence của nghĩa không
            const meaningStr = meaningWords.join(' ');
            const userStr = userWords.join(' ');
            return meaningStr.startsWith(userStr) || meaningStr.endsWith(userStr) || meaningStr === userStr;
        });
    };

    const check = () => {
        if (!input.trim()) return;
        if (result === 'correct') return;

        const isEngMode = !!(vocabData[0]?.word && !vocabData[0]?.hanzi);
        const correctAnswer = mode === 'hanzi-to-viet'
            ? currentWord.meaning
            : isEngMode ? currentWord.word : currentWord.pinyin;

        let isCorrect = false;
        if (mode === 'hanzi-to-viet') {
            isCorrect = checkVietnamese(input, correctAnswer);
        } else if (isEngMode) {
            isCorrect = input.trim().toLowerCase() === (correctAnswer || '').toLowerCase();
        } else {
            const normInput = removePinyinTones(input.trim()).replace(/\s+/g, '');
            const normCorrect = removePinyinTones(correctAnswer).replace(/\s+/g, '');
            isCorrect = normInput === normCorrect;
        }

        if (isCorrect) {
            setResult('correct');
            playSoundEffect('success');
            setStats(s => ({ ...s, correct: s.correct + 1 }));
            SRS.updateCard(currentLevel, currentWord.id, true);
        } else {
            const newMistakes = mistakeCount + 1;
            setMistakeCount(newMistakes);
            playSoundEffect('error');

            if (newMistakes >= 3) {
                setResult('wrong');
                setStats(s => ({ ...s, wrong: s.wrong + 1 }));
                SRS.updateCard(currentLevel, currentWord.id, false);
                setTimeout(() => next(), 1500);
            } else {
                setInput('');
                setResult(`retry-${newMistakes}`);
                setTimeout(() => setResult(null), 800);
            }
        }
    };

    const skip = () => {
        setStats(s => ({ ...s, wrong: s.wrong + 1 }));
        SRS.updateCard(currentLevel, currentWord.id, false);
        playSoundEffect('error');
        next();
    };

    const next = () => {
        if (idx < queue.length - 1) { setIdx(i => i + 1); }
        else { setFinished(true); StudyTracker.logActivity(TOTAL, 10); }
    };

    useEffect(() => {
        if (result !== 'correct') return;
        const handleKey = (e) => {
            if (e.key === 'Enter') { e.preventDefault(); next(); }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [result, next]);

    if (finished) {
        const pct = Math.round((stats.correct / TOTAL) * 100);
        return (
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center animate-fade-in">
                <div className="text-6xl mb-3">{pct >= 80 ? '🎉' : '💪'}</div>
                <h2 className="text-2xl font-bold mb-1">Kết quả</h2>
                <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="text-3xl font-bold text-green-600">{stats.correct}</div>
                        <div className="text-sm text-green-700">Đúng ✓</div>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="text-3xl font-bold text-red-500">{stats.wrong}</div>
                        <div className="text-sm text-red-600">Sai ✗</div>
                    </div>
                </div>
                <p className="text-2xl font-bold text-indigo-600 mb-6">{pct}%</p>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 font-mono">{formatTime(elapsed)}</div>
                    <div className="text-sm text-blue-500">Thời gian hoàn thành</div>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => start(mode)}
                        className="flex-1 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold">
                        Chơi lại
                    </button>
                    <button onClick={onBack}
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold">
                        Chọn trò chơi
                    </button>
                </div>
            </div>
        );
    }

    if (mode === 'menu') return (
        <div className="max-w-md mx-auto animate-fade-in">
            <button onClick={onBack} className="text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1 text-sm">
                <i className="fa-solid fa-arrow-left"></i> Chọn trò chơi khác
            </button>
            <h3 className="font-bold text-gray-800 text-lg mb-4">⌨️ Trò chơi Gõ từ</h3>
            <div className="space-y-3">
                <div className="mb-5">
                    <p className="text-sm font-medium text-gray-600 mb-3">Số lượng từ:</p>
                    <div className="flex flex-wrap gap-2">
                        {[5, 10, 15, 20, 30, 50].map(n => (
                            <button key={n} onClick={() => setWordCount(n)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all
                                    ${wordCount === n
                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                        : 'border-gray-200 text-gray-600 hover:border-indigo-200'}`}>
                                {n} từ
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={() => start('hanzi-to-viet')}
                    className="w-full p-4 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 rounded-2xl text-left transition-all">
                    <div className="font-bold text-indigo-700">
                        {isEnglish ? 'Tiếng Anh → Gõ tiếng Việt' : 'Chữ Hán → Gõ tiếng Việt'}
                    </div>
                    <div className="text-sm text-indigo-500 mt-1">
                        {isEnglish ? 'Nhìn "apple" → gõ "quả táo"' : 'Nhìn 爱 → gõ "yêu, thích"'}
                    </div>
                </button>
                <button onClick={() => start('viet-to-pinyin')}
                    className="w-full p-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-2xl text-left transition-all">
                    <div className="font-bold text-blue-700">
                        {isEnglish ? 'Tiếng Việt → Gõ tiếng Anh' : 'Tiếng Việt → Gõ Pinyin'}
                    </div>
                    <div className="text-sm text-blue-500 mt-1">
                        {isEnglish ? 'Nhìn "quả táo" → gõ "apple"' : 'Nhìn "yêu, thích" → gõ "ai" hoặc "ài"'}
                    </div>
                </button>
            </div>
        </div>
    );

    if (!currentWord) return null;
    const progress = Math.round((idx / TOTAL) * 100);

    return (
        <div className="max-w-lg mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-3">
                <button onClick={onBack} className="text-gray-400 hover:text-gray-600 text-sm">
                    ← Thoát
                </button>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-1.5 rounded-full">
                    <i className="fa-solid fa-clock text-indigo-500 text-sm"></i>
                    <span className="font-mono font-bold text-gray-700">{formatTime(elapsed)}</span>
                </div>
                <div className="flex gap-3 text-sm">
                    <span className="text-green-600 font-medium">✓ {stats.correct}</span>
                    <span className="text-red-500 font-medium">✗ {stats.wrong}</span>
                    <span className="text-gray-400">{idx + 1}/{queue.length}</span>
                </div>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mb-5 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-4 text-center">
                {mode === 'hanzi-to-viet' ? (
                    <>
                        {isEnglish ? (
                            <div className="text-4xl font-bold text-emerald-700 mb-2">{currentWord.word}</div>
                        ) : (
                            <div className="text-7xl font-bold text-gray-800 mb-2">{currentWord.hanzi}</div>
                        )}
                        {!isEnglish && <div className="text-indigo-500 text-lg">{currentWord.pinyin}</div>}
                        {isEnglish && <div className="text-emerald-500 font-mono">{currentWord.ipa}</div>}
                        <button onClick={() => {
                            if (isEnglish) {
                                window.speechSynthesis.cancel();
                                const u = new SpeechSynthesisUtterance(currentWord.word);
                                u.lang = 'en-US'; u.rate = 0.85;
                                window.speechSynthesis.speak(u);
                            } else {
                                playAudio(currentWord.hanzi);
                            }
                        }} className="mt-3 text-indigo-400 hover:text-indigo-600">
                            <i className="fa-solid fa-volume-high text-xl"></i>
                        </button>
                        <p className="text-gray-400 text-sm mt-3">Nghĩa tiếng Việt là gì?</p>
                    </>
                ) : (
                    <>
                        <div className="text-3xl font-bold text-gray-700 mb-2">{currentWord.meaning}</div>
                        <p className="text-gray-400 text-sm mt-3">
                            {isEnglish ? 'Gõ từ tiếng Anh' : 'Gõ Pinyin (không cần dấu thanh)'}
                        </p>
                    </>
                )}
            </div>
            <div className="flex gap-2 mb-3">
                <input ref={inputRef} type="text" value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (result === 'correct') {
                                next();
                            } else if (!result || result.startsWith('retry')) {
                                check();
                            }
                        }
                    }}
                    disabled={result === 'correct' || result === 'wrong'}
                    placeholder={mode === 'hanzi-to-viet'
                        ? 'Gõ nghĩa tiếng Việt...'
                        : isEnglish ? 'Gõ từ tiếng Anh...' : 'Gõ pinyin...'}
                    className={`flex-1 border-2 rounded-xl px-4 py-3 text-lg outline-none transition-colors
                        ${result === 'correct' ? 'border-green-500 bg-green-50' :
                          result === 'wrong'   ? 'border-red-400 bg-red-50'   :
                          'border-gray-200 focus:border-indigo-400'}`}
                />
                {!result && (
                    <>
                        <button onClick={check}
                            className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
                            OK
                        </button>
                        <button onClick={skip}
                            className="px-4 py-3 bg-gray-100 text-gray-500 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                            title="Bỏ qua từ này">
                            <i className="fa-solid fa-forward-step"></i>
                        </button>
                    </>
                )}
            </div>
            {result && result.startsWith('retry') && (
                <p className="text-orange-500 text-sm text-center animate-fade-in mt-2">
                    ✗ Chưa đúng! Còn {3 - parseInt(result.split('-')[1])} lần thử
                </p>
            )}
            {result === 'wrong' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mt-2 animate-fade-in">
                    <p className="text-red-600 font-bold text-center">
                        Đáp án: {mode === 'hanzi-to-viet'
                            ? currentWord.meaning
                            : isEnglish ? currentWord.word : currentWord.pinyin}
                    </p>
                </div>
            )}
            {result === 'correct' && (
                <div className="rounded-xl p-4 animate-fade-in bg-green-50 border border-green-200">
                    <p className="font-bold text-green-700">✓ Chính xác!</p>
                    <button onClick={next}
                        className="mt-3 w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
                        {idx < queue.length - 1 ? 'Từ tiếp theo →' : 'Xem kết quả 🎉'}
                    </button>
                </div>
            )}
        </div>
    );
});
