"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SRS } from '@/lib/srs';
import {
    Brain, Settings, Star, RotateCcw, BookOpen, CheckCircle2, Play, Check,
    ArrowLeft, ArrowRight, MousePointerClick, Volume2, X, Shuffle,
    type LucideIcon,
} from 'lucide-react';

// --- HELPERS ---
const fisherYatesShuffle = (arr: any[]) => {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Hàm phát âm tạm
const playAudio = (text: string) => {
    if (!text || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = /[a-zA-Z]/.test(text) && !/[\u4e00-\u9fa5]/.test(text) ? 'en-US' : 'zh-CN';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
};

// Hàm phát tiếng động Ting/Tè (Optional)
const playSoundEffect = (type: 'success' | 'error') => {
    // Để cho nhẹ, chúng ta tạo một âm thanh bằng Web Audio API
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
    } catch (e) {
        // Fallback or ignore
    }
};

// --- BOX DISTRIBUTION CHART ---
const BoxDistribution = ({ levelId, vocabData }: { levelId: string, vocabData: any[] }) => {
    const all = SRS.load(levelId);
    const boxes = [0, 0, 0, 0, 0];
    let newCount = 0;
    vocabData.forEach(w => {
        const id = w._uuid || w.id;
        const card = all[id];
        if (!card || !card.lastSeen) { newCount++; }
        else { boxes[card.box - 1]++; }
    });

    // Màu hộp Leitner: mới → đỏ → cam → vàng → xanh dương → xanh lá (tiến trình ghi nhớ) — data-viz cố ý đa sắc
    const boxColors = ['#9ca3af', '#f87171', '#fb923c', '#facc15', '#60a5fa', '#22c55e'];
    const labels = ['Mới', 'H1', 'H2', 'H3', 'H4', 'H5'];
    const allVals = [newCount, ...boxes];

    return (
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex gap-2 items-end h-16">
                {allVals.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full h-16 rounded-3xl flex items-center justify-center transition-all hover:-translate-y-1"
                            style={{ backgroundColor: boxColors[i], opacity: val === 0 ? 0.3 : 1 }}>
                            <span className="text-[11px] font-bold text-white drop-shadow">{val}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{labels[i]}</span>
                    </div>
                ))}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-3 text-center">Phân bố từ theo hộp ôn tập</p>
        </div>
    );
};

// --- DASHBOARD COMPONENT ---
const SRSDashboard = ({ levelId, vocabData, onStartReview }: { levelId: string, vocabData: any[], onStartReview: () => void }) => {
    const [stats, setStats] = useState<any>(null);
    const [showReset, setShowReset] = useState(false);

    useEffect(() => {
        setStats(SRS.getStats(levelId, vocabData));
    }, [levelId, vocabData]);

    if (!stats) return null;

    const total = stats.total;
    const studied = total - stats.new;
    const pct = total > 0 ? Math.round((studied / total) * 100) : 0;
    const dueCount = stats.due + stats.new;

    // Màu các ô là màu trạng thái SRS (mới/cần ôn/đang học/đã nhớ), giữ ngữ nghĩa
    const statCards: { label: string; value: number; box: string; text: string; icon: LucideIcon }[] = [
        { label: 'Từ mới', value: stats.new, box: 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700', text: 'text-slate-600 dark:text-slate-300', icon: Star },
        { label: 'Cần ôn', value: stats.due, box: 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30', text: 'text-orange-600 dark:text-orange-400', icon: RotateCcw },
        { label: 'Đang học', value: stats.learning, box: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30', text: 'text-blue-600 dark:text-blue-400', icon: BookOpen },
        { label: 'Đã nhớ', value: stats.known, box: 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30', text: 'text-green-600 dark:text-green-400', icon: CheckCircle2 },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary-500" /> Ôn Tập Thông Minh (SRS)
                </h2>
                <button onClick={() => setShowReset(v => !v)}
                    className="text-slate-400 dark:text-slate-500 hover:text-red-400 transition-colors">
                    <Settings className="w-4 h-4" />
                </button>
            </div>

            {/* Thanh tiến độ tổng */}
            <div className="mb-5">
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400 mb-1">
                    <span>Tiến độ tổng thể</span>
                    <span className="font-bold text-primary-600 dark:text-primary-400">{pct}% ({studied}/{total} từ)</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}></div>
                </div>
            </div>

            {/* 4 ô thống kê */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {statCards.map(s => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className={`${s.box} border rounded-xl p-3 text-center`}>
                            <Icon className={`w-4 h-4 mx-auto ${s.text} mb-1`} />
                            <div className={`text-2xl font-bold ${s.text}`}>{s.value}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* Nút bắt đầu ôn */}
            <button
                onClick={onStartReview}
                disabled={dueCount === 0}
                className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-sm
                    ${dueCount > 0 ? 'bg-primary-500 hover:bg-primary-600 active:scale-95' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'}`}>
                {dueCount > 0
                    ? <><Play className="w-4 h-4" /> Ôn {dueCount} từ hôm nay</>
                    : <><Check className="w-4 h-4" /> Đã ôn xong hôm nay!</>}
            </button>

            {/* Phân bố theo hộp */}
            <BoxDistribution levelId={levelId} vocabData={vocabData} />

            {/* Reset */}
            {showReset && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/30 animate-fade-in">
                    <p className="text-sm text-red-600 dark:text-red-400 mb-2">⚠️ Reset sẽ xóa toàn bộ tiến độ SRS của cấp này.</p>
                    <button onClick={() => { SRS.reset(levelId); setStats(SRS.getStats(levelId, vocabData)); setShowReset(false); }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">
                        Xác nhận Reset
                    </button>
                </div>
            )}
        </div>
    );
};

// --- SRS QUIZ SESSION ---
const SRSQuizSession = ({ levelId, vocabData, onFinish }: { levelId: string, vocabData: any[], onFinish: () => void }) => {
    const [dueWords, setDueWords] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });
    const [isFinished, setIsFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const [mistakeCount, setMistakeCount] = useState(0);
    const [inputResult, setInputResult] = useState<'correct' | 'wrong' | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Lấy danh sách trộn ngẫu nhiên
        const due = fisherYatesShuffle(SRS.getDueWords(levelId, vocabData));
        setDueWords(due);
        setLoading(false);
    }, [levelId, vocabData]);

    useEffect(() => {
        if (!isFlipped && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [currentIndex, isFlipped]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-slate-500 dark:text-slate-400 animate-pulse">Đang tải dữ liệu...</div>
        </div>
    );

    if (dueWords.length === 0) return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 text-center animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-green-500 dark:text-green-400 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-3">Tuyệt vời!</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Không có từ cần ôn hôm nay.</p>
            <button onClick={onFinish} className="px-8 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Quay lại
            </button>
        </div>
    );

    if (isFinished) return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 text-center animate-fade-in">
            <div className="mb-8">
                <div className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-2">{sessionStats.correct + sessionStats.wrong}</div>
                <p className="text-slate-600 dark:text-slate-400">từ đã ôn</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">{sessionStats.correct}</div>
                    <div className="text-sm text-green-700 dark:text-green-400">Nhớ được</div>
                </div>
                <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4">
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">{sessionStats.wrong}</div>
                    <div className="text-sm text-red-700 dark:text-red-400">Quên mất</div>
                </div>
            </div>
            <button onClick={onFinish} className="w-full px-8 py-3 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
                <Check className="w-4 h-4" /> Hoàn thành
            </button>
        </div>
    );

    const currentWord = dueWords[currentIndex];
    const progress = currentIndex + 1;
    const total = dueWords.length;

    const handleNext = (isCorrect: boolean) => {
        SRS.updateCard(levelId, currentWord._uuid || currentWord.id, isCorrect);
        setSessionStats(prev => ({
            ...prev,
            correct: prev.correct + (isCorrect ? 1 : 0),
            wrong: prev.wrong + (isCorrect ? 0 : 1)
        }));
        if (currentIndex + 1 < dueWords.length) {
            setCurrentIndex(currentIndex + 1);
            setIsFlipped(false);
            setInput('');
            setMistakeCount(0);
            setInputResult(null);
        } else {
            setIsFinished(true);
        }
    };

    const handleFlipToMeaning = () => {
        setIsFlipped(true);
        playSoundEffect('error');
        setSessionStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        SRS.updateCard(levelId, currentWord._uuid || currentWord.id, false);
        setTimeout(() => {
            if (currentIndex + 1 < dueWords.length) {
                setCurrentIndex(currentIndex + 1);
                setIsFlipped(false);
                setInput('');
                setMistakeCount(0);
                setInputResult(null);
            } else {
                setIsFinished(true);
            }
        }, 3000);
    };

    const handleCheckInput = () => {
        if (!input.trim() || inputResult === 'correct') return;
        const answer = input.trim().toLowerCase();
        const correct = currentWord.meaning.toLowerCase();

        const checkAnswer = (userInput: string, correctMeaning: string) => {
            const userNorm = userInput.trim().toLowerCase();
            if (!userNorm) return false;

            const meanings = correctMeaning.split(/[,\/]/).map(m => m.trim().toLowerCase()).filter(Boolean);

            return meanings.some(meaning => {
                if (meaning === userNorm) return true;
                const meaningWords = meaning.split(/\s+/);
                const userWords = userNorm.split(/\s+/);
                if (meaningWords.length === 1) return meaning === userNorm;
                const minWords = Math.ceil(meaningWords.length * 0.6);
                if (userWords.length < minWords) return false;
                const meaningStr = meaningWords.join(' ');
                const userStr = userWords.join(' ');
                return meaningStr === userStr || meaningStr.startsWith(userStr + ' ') || meaningStr.endsWith(' ' + userStr);
            });
        };

        const isCorrect = checkAnswer(answer, correct);

        if (isCorrect) {
            setInputResult('correct');
            playSoundEffect('success');
            setTimeout(() => handleNext(true), 800);
        } else {
            const newMistakes = mistakeCount + 1;
            setMistakeCount(newMistakes);
            setInputResult('wrong');
            playSoundEffect('error');
            if (newMistakes >= 3) {
                setTimeout(() => {
                    setIsFlipped(true);
                    setInputResult(null);
                    SRS.updateCard(levelId, currentWord._uuid || currentWord.id, false);
                    setSessionStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
                    setTimeout(() => {
                        if (currentIndex + 1 < dueWords.length) {
                            setCurrentIndex(currentIndex + 1);
                            setIsFlipped(false);
                            setInput('');
                            setMistakeCount(0);
                            setInputResult(null);
                        } else {
                            setIsFinished(true);
                        }
                    }, 3000);
                }, 800);
            } else {
                setTimeout(() => {
                    setInputResult(null);
                    setInput('');
                }, 600);
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="mb-6">
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <span>Từ {progress}/{total}</span>
                    <span className="font-bold text-primary-600 dark:text-primary-400">{Math.round((progress / total) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 transition-all duration-300"
                        style={{ width: `${(progress / total) * 100}%` }}></div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 mb-6">
                {!isFlipped ? (
                    <>
                        <div onClick={handleFlipToMeaning}
                            className="cursor-pointer text-center mb-6 p-6 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/10 dark:to-primary-500/5 rounded-xl border-2 border-dashed border-primary-200 dark:border-primary-500/30 hover:border-primary-400 dark:hover:border-primary-500/50 transition-all">
                            <div className="text-6xl font-bold text-slate-800 dark:text-slate-100 mb-3">{currentWord.hanzi || currentWord.word}</div>
                            {currentWord.pinyin && (
                                <div className="text-lg text-primary-600 dark:text-primary-400 mb-2">{currentWord.pinyin}</div>
                            )}
                            {currentWord.ipa && (
                                <div className="text-lg text-primary-600 dark:text-primary-400 mb-2">{currentWord.ipa}</div>
                            )}
                            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
                                <MousePointerClick className="w-3 h-3" /> Nhấn để xem nghĩa
                            </p>
                        </div>

                        <div className="space-y-3">
                            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                                Nhập nghĩa tiếng Việt
                                {mistakeCount > 0 && <span className="text-red-400 dark:text-red-400 font-bold ml-2">({mistakeCount}/3 lần sai)</span>}
                            </p>
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleCheckInput()}
                                    placeholder="Gõ nghĩa tiếng Việt..."
                                    className={`flex-1 px-4 py-3 rounded-xl border-2 outline-none transition-all
                                        ${inputResult === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300' :
                                          inputResult === 'wrong' ? 'border-red-400 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300' :
                                          'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:border-primary-400'}`}
                                />
                                <button onClick={handleCheckInput}
                                    className="px-4 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                                    <Check className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center animate-fade-in">
                        <div className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-2">{currentWord.hanzi || currentWord.word}</div>
                        {currentWord.pinyin && (
                            <div className="text-lg text-primary-600 dark:text-primary-400 mb-2">{currentWord.pinyin}</div>
                        )}
                        {currentWord.ipa && (
                            <div className="text-lg text-primary-600 dark:text-primary-400 mb-2">{currentWord.ipa}</div>
                        )}
                        <button onClick={() => playAudio(currentWord.hanzi || currentWord.word)} className="text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 mb-4 mx-auto block">
                            <Volume2 className="w-5 h-5" />
                        </button>
                        <div className="text-2xl font-semibold text-slate-800 dark:text-slate-100 p-4 bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-200 dark:border-primary-500/30 mb-3">
                            {currentWord.meaning}
                        </div>
                        <p className="text-sm text-red-500 dark:text-red-400 animate-pulse">Tự động chuyển sau 3 giây...</p>
                    </div>
                )}
            </div>

            <div className="text-center">
                <button onClick={onFinish}
                    className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex items-center justify-center gap-2 mx-auto">
                    <X className="w-4 h-4" /> Thoát
                </button>
            </div>
        </div>
    );
};

// --- MAIN TAB EXPORT ---
export function QuizTab({ vocabData, levelId = 'hsk1' }: { vocabData: any[], levelId?: string }) {
    const [mode, setMode] = useState<'dashboard' | 'srs' | 'free'>('dashboard');

    // Chế độ ôn tự do
    const [currentQ, setCurrentQ] = useState<any>(null);
    const [options, setOptions] = useState<any[]>([]);
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedOpt, setSelectedOpt] = useState<any>(null);

    // Load score from localStorage when mount
    useEffect(() => {
        try {
            setScore(parseInt(localStorage.getItem(`${levelId}_quiz_score`) || '0'));
            setTotal(parseInt(localStorage.getItem(`${levelId}_quiz_total`) || '0'));
        } catch {}
    }, [levelId]);

    useEffect(() => {
        try {
            localStorage.setItem(`${levelId}_quiz_score`, score.toString());
            localStorage.setItem(`${levelId}_quiz_total`, total.toString());
        } catch {}
    }, [score, total, levelId]);

    const generateFreeQuestion = useCallback(() => {
        if (!vocabData || vocabData.length === 0) return;
        const correctWord = vocabData[Math.floor(Math.random() * vocabData.length)];
        const wrong = fisherYatesShuffle(vocabData.filter(w => w.id !== correctWord.id)).slice(0, 3);
        setOptions(fisherYatesShuffle([correctWord, ...wrong]));
        setCurrentQ(correctWord);
        setSelectedOpt(null);
    }, [vocabData]);

    useEffect(() => {
        if (mode === 'free') generateFreeQuestion();
    }, [mode, generateFreeQuestion]);

    // Tự động phát âm thanh khi hiển thị câu hỏi mới trong phần Ôn tự do
    useEffect(() => {
        if (mode === 'free' && currentQ) {
            playAudio(currentQ.hanzi || currentQ.word);
        }
    }, [currentQ, mode]);

    const handleFreeSelect = (opt: any) => {
        if (selectedOpt) return;
        setSelectedOpt(opt);
        setTotal(p => p + 1);
        if (opt.id === currentQ.id) {
            setScore(p => p + 1);
            playSoundEffect('success');
        } else {
            playSoundEffect('error');
        }
    };

    if (!vocabData || vocabData.length === 0) {
        return <div className="text-center p-8 text-slate-500 dark:text-slate-400">Chưa có dữ liệu từ vựng.</div>;
    }

    if (mode === 'dashboard') {
        return (
            <div className="max-w-2xl mx-auto px-4 py-8">
                <SRSDashboard levelId={levelId} vocabData={vocabData} onStartReview={() => setMode('srs')} />

                {/* Nút ôn tự do */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                    <h3 className="font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center gap-2">
                        <Shuffle className="w-4 h-4 text-primary-500" /> Ôn Tự Do
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Random từ bất kỳ, không theo lịch — luyện thêm khi rảnh</p>
                    <button onClick={() => setMode('free')}
                        className="w-full py-2.5 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors inline-flex items-center justify-center gap-2">
                        <Play className="w-4 h-4" /> Bắt đầu ôn tự do
                    </button>
                </div>
            </div>
        );
    }

    if (mode === 'srs') {
        return (
            <div className="px-4 py-8">
                <SRSQuizSession levelId={levelId} vocabData={vocabData} onFinish={() => setMode('dashboard')} />
            </div>
        );
    }

    // Chế độ tự do
    if (!currentQ) return null;

    return (
        <div className="px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 animate-fade-in">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setMode('dashboard')} className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Ôn Tự Do</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{score}/{total}</div>
                        {total > 0 && <button onClick={() => { setScore(0); setTotal(0); }} className="text-slate-400 dark:text-slate-500 hover:text-red-500"><RotateCcw className="w-4 h-4" /></button>}
                    </div>
                </div>

                <div className="text-center mb-8">
                    <div className="text-7xl font-bold text-slate-800 dark:text-slate-100 mb-3">{currentQ.hanzi || currentQ.word}</div>
                    <button onClick={() => playAudio(currentQ.hanzi || currentQ.word)} className="text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 mx-auto block">
                        <Volume2 className="w-5 h-5" />
                    </button>
                </div>

                <div className="quiz-options grid grid-cols-1 md:grid-cols-2 gap-4">
                    {options.map((opt, i) => {
                        let cls = "p-4 rounded-xl border-2 text-base font-medium text-left transition-all ";
                        if (!selectedOpt) cls += "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10";
                        else if (opt.id === currentQ.id) cls += "border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300";
                        else if (selectedOpt && opt.id === selectedOpt.id) cls += "border-red-500 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300";
                        else cls += "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 opacity-40";

                        return (
                            <button key={i} onClick={() => handleFreeSelect(opt)} className={cls} disabled={!!selectedOpt}>
                                {opt.meaning}
                            </button>
                        );
                    })}
                </div>

                {selectedOpt && (
                    <div className="mt-6 text-center animate-fade-in">
                        <button onClick={generateFreeQuestion} className="bg-primary-500 text-white px-8 py-3 rounded-full hover:bg-primary-600 inline-flex items-center gap-2">
                            Câu tiếp theo <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
