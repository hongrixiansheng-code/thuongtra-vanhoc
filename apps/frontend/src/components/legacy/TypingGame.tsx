"use client";

import React, { useState, useEffect, useRef } from 'react';
import { SRS } from '@/lib/srs';
import { ArrowLeft, ArrowRight, Clock, Volume2, Send, SkipForward, AlertTriangle, CheckCircle2 } from 'lucide-react';

// --- HELPERS ---
const fisherYatesShuffle = (arr: any[]) => {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const playAudio = (text: string, isEnglish: boolean = false) => {
    if (!text || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = isEnglish ? 'en-US' : 'zh-CN';
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

const removePinyinTones = (pinyin: string) => {
    return pinyin.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ü/g, 'v').replace(/v/g, 'u');
};

export function TypingGame({ vocabData, levelId = 'hsk1', onBack }: { vocabData: any[], levelId?: string, onBack: () => void }) {
    const [mode, setMode] = useState<'menu' | 'hanzi-to-viet' | 'viet-to-pinyin'>('menu');
    const [queue, setQueue] = useState<any[]>([]);
    const [idx, setIdx] = useState(0);
    const [input, setInput] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [stats, setStats] = useState({ correct: 0, wrong: 0 });
    const [finished, setFinished] = useState(false);
    const [wordCount, setWordCount] = useState(10);
    const [mistakeCount, setMistakeCount] = useState(0);
    const [elapsed, setElapsed] = useState(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const timerRef = useRef<any>(null);

    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);

    const start = (selectedMode: 'hanzi-to-viet' | 'viet-to-pinyin') => {
        setQueue(fisherYatesShuffle([...vocabData]).slice(0, wordCount));
        setIdx(0); setInput(''); setResult(null);
        setStats({ correct: 0, wrong: 0 });
        setFinished(false);
        setMode(selectedMode);
        setTimeout(() => inputRef.current?.focus(), 200);
    };

    const currentWord = queue[idx];

    useEffect(() => {
        if (mode !== 'menu' && !finished && currentWord) {
            setInput(''); setResult(null); setMistakeCount(0);
            setTimeout(() => inputRef.current?.focus(), 100);
            playAudio(currentWord.hanzi || currentWord.word, isEnglish);
        }
    }, [idx, mode, finished, currentWord, isEnglish]);

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

    const formatTime = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${String(sec).padStart(2, '0')}`;
    };

    const normalizeAnswer = (str: string) => {
        return str.trim().toLowerCase()
            .replace(/\bmột\b/g, '1').replace(/\bhai\b/g, '2')
            .replace(/\bba\b/g, '3').replace(/\bbốn\b/g, '4')
            .replace(/\bnăm\b/g, '5').replace(/\bsáu\b/g, '6')
            .replace(/\bbảy\b/g, '7').replace(/\btám\b/g, '8')
            .replace(/\bchín\b/g, '9').replace(/\bmười\b/g, '10');
    };

    const checkVietnamese = (userInput: string, correctMeaning: string) => {
        const userNorm = normalizeAnswer(userInput.trim());
        if (!userNorm) return false;

        const meanings = correctMeaning.split(/[,\/]/).map(m => normalizeAnswer(m.trim())).filter(Boolean);

        return meanings.some(meaning => {
            if (meaning === userNorm) return true;
            const meaningWords = meaning.split(/\s+/);
            const userWords = userNorm.split(/\s+/);
            if (meaningWords.length === 1) return meaning === userNorm;
            const minWords = Math.ceil(meaningWords.length * 0.6);
            if (userWords.length < minWords) return false;
            const meaningStr = meaningWords.join(' ');
            const userStr = userWords.join(' ');
            return meaningStr.startsWith(userStr) || meaningStr.endsWith(userStr) || meaningStr === userStr;
        });
    };

    const check = () => {
        if (!input.trim() || result === 'correct') return;

        const correctAnswer = mode === 'hanzi-to-viet'
            ? currentWord.meaning
            : isEnglish ? currentWord.word : currentWord.pinyin;

        let isCorrect = false;
        if (mode === 'hanzi-to-viet') {
            isCorrect = checkVietnamese(input, correctAnswer);
        } else if (isEnglish) {
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
            SRS.updateCard(levelId, currentWord._uuid || currentWord.id, true);
        } else {
            const newMistakes = mistakeCount + 1;
            setMistakeCount(newMistakes);
            playSoundEffect('error');

            if (newMistakes >= 3) {
                setResult('wrong');
                setStats(s => ({ ...s, wrong: s.wrong + 1 }));
                SRS.updateCard(levelId, currentWord._uuid || currentWord.id, false);
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
        SRS.updateCard(levelId, currentWord._uuid || currentWord.id, false);
        playSoundEffect('error');
        next();
    };

    const next = () => {
        if (idx < queue.length - 1) { setIdx(i => i + 1); }
        else { setFinished(true); }
    };

    useEffect(() => {
        if (result !== 'correct') return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Enter') { e.preventDefault(); next(); }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [result, next]);

    if (finished) {
        const TOTAL = queue.length;
        const pct = Math.round((stats.correct / TOTAL) * 100);
        return (
            <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 text-center animate-fade-in">
                <div className="text-6xl mb-3">{pct >= 80 ? '🎉' : '💪'}</div>
                <h2 className="text-2xl font-bold mb-1 text-slate-800 dark:text-slate-100">Kết quả</h2>
                <div className="grid grid-cols-2 gap-4 my-6">
                    <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.correct}</div>
                        <div className="text-sm text-green-700 dark:text-green-400">Đúng ✓</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4">
                        <div className="text-3xl font-bold text-red-500 dark:text-red-400">{stats.wrong}</div>
                        <div className="text-sm text-red-600 dark:text-red-400">Sai ✗</div>
                    </div>
                </div>
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-6">{pct}%</p>
                <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4 mb-4 text-center">
                    <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 font-mono tabular-nums">{formatTime(elapsed)}</div>
                    <div className="text-sm text-primary-500 dark:text-primary-400">Thời gian hoàn thành</div>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => start(mode as any)}
                        className="flex-1 py-3 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-xl font-bold hover:bg-primary-50 dark:hover:bg-primary-500/10">
                        Chơi lại
                    </button>
                    <button onClick={onBack}
                        className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600">
                        Menu Game
                    </button>
                </div>
            </div>
        );
    }

    if (mode === 'menu') return (
        <div className="max-w-md mx-auto animate-fade-in p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <button onClick={onBack} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 mb-4 flex items-center gap-1.5 text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Chọn trò chơi khác
            </button>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xl mb-6 text-center">⌨️ Trò chơi Gõ từ</h3>
            <div className="space-y-4">
                <div className="mb-6 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Số lượng từ muốn luyện:</p>
                    <div className="flex flex-wrap gap-2">
                        {[5, 10, 15, 20, 30].map(n => (
                            <button key={n} onClick={() => setWordCount(n)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all
                                    ${wordCount === n
                                        ? 'border-primary-500 bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300'
                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-200 dark:hover:border-primary-500/40 bg-white dark:bg-slate-900'}`}>
                                {n} từ
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={() => start('hanzi-to-viet')}
                    className="w-full p-5 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 border-2 border-primary-200 dark:border-primary-500/30 rounded-2xl text-left transition-all active:scale-95 shadow-sm">
                    <div className="font-bold text-primary-700 dark:text-primary-300 text-lg">
                        {isEnglish ? 'Tiếng Anh → Gõ tiếng Việt' : 'Chữ Hán → Gõ tiếng Việt'}
                    </div>
                    <div className="text-sm text-primary-500 dark:text-primary-400 mt-1">
                        {isEnglish ? 'Nhìn "apple" → gõ "quả táo"' : 'Nhìn 爱 → gõ "yêu, thích"'}
                    </div>
                </button>
                <button onClick={() => start('viet-to-pinyin')}
                    className="w-full p-5 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 border-2 border-primary-200 dark:border-primary-500/30 rounded-2xl text-left transition-all active:scale-95 shadow-sm">
                    <div className="font-bold text-primary-700 dark:text-primary-300 text-lg">
                        {isEnglish ? 'Tiếng Việt → Gõ tiếng Anh' : 'Tiếng Việt → Gõ Pinyin'}
                    </div>
                    <div className="text-sm text-primary-500 dark:text-primary-400 mt-1">
                        {isEnglish ? 'Nhìn "quả táo" → gõ "apple"' : 'Nhìn "yêu, thích" → gõ "ai" (không cần dấu)'}
                    </div>
                </button>
            </div>
        </div>
    );

    if (!currentWord) return null;
    const progress = Math.round((idx / queue.length) * 100);

    return (
        <div className="max-w-xl mx-auto animate-fade-in bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center mb-4">
                <button onClick={onBack} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 text-sm font-medium">
                    ← Thoát
                </button>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full">
                    <Clock className="w-4 h-4 text-primary-500" />
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-200 tabular-nums">{formatTime(elapsed)}</span>
                </div>
                <div className="flex gap-3 text-sm bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 rounded-full">
                    <span className="text-green-600 dark:text-green-400 font-bold">✓ {stats.correct}</span>
                    <span className="text-red-500 dark:text-red-400 font-bold">✗ {stats.wrong}</span>
                    <span className="text-slate-400 dark:text-slate-500 ml-2">{idx + 1}/{queue.length}</span>
                </div>
            </div>

            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-500/10 rounded-2xl border-2 border-dashed border-primary-200 dark:border-primary-500/30 p-8 mb-6 text-center">
                {mode === 'hanzi-to-viet' ? (
                    <>
                        {isEnglish ? (
                            <div className="text-5xl font-bold text-primary-700 dark:text-primary-300 mb-2">{currentWord.word}</div>
                        ) : (
                            <div className="text-8xl font-bold text-slate-800 dark:text-slate-100 mb-2">{currentWord.hanzi}</div>
                        )}
                        {!isEnglish && <div className="text-primary-500 dark:text-primary-400 text-xl font-medium mt-2">{currentWord.pinyin}</div>}
                        <button onClick={() => {
                            if (isEnglish) {
                                window.speechSynthesis.cancel();
                                const u = new SpeechSynthesisUtterance(currentWord.word);
                                u.lang = 'en-US'; u.rate = 0.85;
                                window.speechSynthesis.speak(u);
                            } else {
                                playAudio(currentWord.hanzi);
                            }
                        }} className="mt-4 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-500/20 mx-auto transition-colors">
                            <Volume2 className="w-5 h-5" />
                        </button>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 font-medium">Gõ nghĩa tiếng Việt vào ô bên dưới</p>
                    </>
                ) : (
                    <>
                        <div className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-2">{currentWord.meaning}</div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-4 font-medium">
                            {isEnglish ? 'Gõ từ tiếng Anh' : 'Gõ Pinyin (chỉ gõ chữ, không gõ dấu thanh)'}
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
                        : isEnglish ? 'Gõ từ tiếng Anh...' : 'Gõ pinyin (VD: hao, xie)...'}
                    className={`flex-1 border-2 rounded-xl px-5 py-4 text-xl outline-none transition-colors shadow-sm
                        ${result === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300' :
                          result === 'wrong'   ? 'border-red-400 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300'   :
                          'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary-400 text-slate-800 dark:text-slate-100 focus:shadow-md'}`}
                />
                {!result && (
                    <>
                        <button onClick={check}
                            className="px-6 py-4 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 shadow-md">
                            <Send className="w-5 h-5" />
                        </button>
                        <button onClick={skip}
                            className="px-5 py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            title="Bỏ qua từ này">
                            <SkipForward className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>

            <div className="h-10">
                {result && result.startsWith('retry') && (
                    <p className="text-orange-500 dark:text-orange-400 font-medium text-center animate-fade-in mt-2">
                        ✗ Chưa chính xác! Còn {3 - parseInt(result.split('-')[1])} lần thử.
                    </p>
                )}
                {result === 'wrong' && (
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-3 animate-fade-in flex items-center justify-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0" />
                        <p className="text-red-600 dark:text-red-400 font-bold">
                            Đáp án đúng: <span className="text-red-700 dark:text-red-300">{mode === 'hanzi-to-viet' ? currentWord.meaning : isEnglish ? currentWord.word : currentWord.pinyin}</span>
                        </p>
                    </div>
                )}
                {result === 'correct' && (
                    <div className="rounded-xl p-3 animate-fade-in bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 flex items-center justify-between">
                        <p className="font-bold text-green-700 dark:text-green-400 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Chính xác tuyệt đối!</p>
                        <button onClick={next}
                            className="px-4 py-1.5 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 shadow-sm text-sm flex items-center gap-2">
                            {idx < queue.length - 1 ? 'Từ tiếp theo' : 'Xem kết quả'} <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
