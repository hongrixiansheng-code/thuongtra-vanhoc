"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SRS } from '@/lib/srs';
import { StartersExercises } from './StartersExercises';
import ExamExerciseQuiz from '@/components/ExamExerciseQuiz';
import { Headphones, Mic, Play, Square, ArrowLeft, ArrowRight, Volume2, Send, AlertTriangle, CheckCircle2, FolderOpen } from 'lucide-react';

// --- HELPERS ---
const fisherYatesShuffle = (arr: any[]) => {
    let array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    if (!pinyin) return '';
    return pinyin.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ü/g, 'v').replace(/v/g, 'u');
};

export function ListeningTab({ vocabData, passagesData, levelId = 'hsk1' }: { vocabData: any[], passagesData: any[], levelId?: string }) {
    // Chương trình Tiếng Anh → hiển thị bài tập Cambridge Starters
    if (levelId === 'en-starters') {
        return <StartersExercises vocabData={vocabData} passagesData={passagesData} mode="listening" />;
    }

    if (levelId === 'en-ket') {
        const examExercises = (passagesData || []).filter((p: any) => p.skillTag === 'listening' || p.skillTag === 'mock');
        return (
            <ExamExerciseQuiz
                exercises={examExercises}
                accentColor="indigo"
                emptyMessage="Chưa có bài nghe đúng định dạng đề thi KET cho các bài đã hoàn thành."
            />
        );
    }

    const [mode, setMode] = useState<'menu' | 'choose' | 'pinyin' | 'passage'>('menu');
    const [speed, setSpeed] = useState(1.0);
    const speedRef = useRef(1.0);
    useEffect(() => { speedRef.current = speed; }, [speed]);
    const [selectedVoice, setSelectedVoice] = useState<any>(null);
    const [availableVoices, setAvailableVoices] = useState<any[]>([]);

    // Quiz state
    const [queue, setQueue] = useState<any[]>([]);
    const [idx, setIdx] = useState(0);
    const [options, setOptions] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [pinyinInput, setPinyinInput] = useState('');
    const [inputResult, setInputResult] = useState<string | null>(null);
    const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });
    const [hasPlayed, setHasPlayed] = useState(false);
    const [mistakeCount, setMistakeCount] = useState(0);
    const [finished, setFinished] = useState(false);
    const [TOTAL, setTOTAL] = useState(10);

    // Passage state
    const [activePassage, setActivePassage] = useState(0);
    const [playingLine, setPlayingLine] = useState<number | null>(null);
    const [activeCharIndex, setActiveCharIndex] = useState<number | null>(null);
    const [activeCharLength, setActiveCharLength] = useState<number>(1);
    const [showPinyinPassage, setShowPinyinPassage] = useState(true);
    const [showViPassage, setShowViPassage] = useState(true);
    const [jumpTarget, setJumpTarget] = useState<'zh' | 'py' | 'both'>('zh');

    const inputRef = useRef<HTMLInputElement>(null);
    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);
    const currentWord = queue[idx];

    useEffect(() => {
        const loadVoices = () => {
            const langPrefix = isEnglish ? 'en' : 'zh';
            const voices = window.speechSynthesis.getVoices()
                .filter(v => v.lang.startsWith(langPrefix) && v.localService === true)
                .map(v => ({ name: v.name, lang: v.lang, voice: v }));

            const finalVoices = voices.length > 0
                ? voices
                : window.speechSynthesis.getVoices()
                    .filter(v => v.lang.startsWith(langPrefix))
                    .map(v => ({ name: v.name, lang: v.lang, voice: v }));

            setAvailableVoices(finalVoices);
            if (finalVoices.length > 0 && !selectedVoice) setSelectedVoice(finalVoices[0]);
        };

        loadVoices();
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, [isEnglish, selectedVoice]);

    const startSession = useCallback((selectedMode: 'choose' | 'pinyin', totalVal?: number) => {
        const t = totalVal || TOTAL;
        const q = fisherYatesShuffle([...vocabData]).slice(0, t);
        setQueue(q);
        setIdx(0);
        setSelected(null);
        setPinyinInput('');
        setInputResult(null);
        setSessionStats({ correct: 0, wrong: 0 });
        setHasPlayed(false);
        setFinished(false);
        setMistakeCount(0);
        setMode(selectedMode);
    }, [vocabData, TOTAL]);

    useEffect(() => {
        if (mode !== 'choose' || !currentWord) return;
        const wrong = fisherYatesShuffle(vocabData.filter(w => (w.hanzi || w.word) !== (currentWord.hanzi || currentWord.word))).slice(0, 3);
        setOptions(fisherYatesShuffle([currentWord, ...wrong]));
        setSelected(null);
        setHasPlayed(false);
    }, [idx, mode, currentWord, vocabData]);

    useEffect(() => {
        if (mode === 'pinyin' && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [idx, mode]);

    const playWord = useCallback(() => {
        if (!currentWord) return;
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(currentWord.hanzi || currentWord.word);
        if (selectedVoice?.voice) {
            utt.voice = selectedVoice.voice;
            utt.lang = selectedVoice.lang;
        } else {
            utt.lang = isEnglish ? 'en-US' : 'zh-CN';
        }
        utt.rate = speed;
        window.speechSynthesis.speak(utt);
        setHasPlayed(true);
    }, [currentWord, speed, selectedVoice, isEnglish]);

    useEffect(() => {
        if ((mode === 'choose' || mode === 'pinyin') && currentWord) {
            const timer = setTimeout(() => playWord(), 300);
            return () => clearTimeout(timer);
        }
    }, [idx, mode, currentWord, playWord]);

    const handleChoose = (opt: any) => {
        if (selected) return;
        setSelected(opt);
        const isCorrect = (opt.hanzi || opt.word) === (currentWord.hanzi || currentWord.word);
        if (isCorrect) {
            playSoundEffect('success');
            setSessionStats(s => ({ ...s, correct: s.correct + 1 }));
            SRS.updateCard(levelId, currentWord._uuid || currentWord.id, true);
        } else {
            playSoundEffect('error');
            setSessionStats(s => ({ ...s, wrong: s.wrong + 1 }));
            SRS.updateCard(levelId, currentWord._uuid || currentWord.id, false);
        }
    };

    const handleCheckPinyin = () => {
        if (!pinyinInput.trim() || inputResult === 'correct' || inputResult === 'wrong') return;

        const correctAnswer = isEnglish
            ? (currentWord.word || '').toLowerCase()
            : removePinyinTones((currentWord.pinyin || '').toLowerCase());
        const answer = isEnglish
            ? pinyinInput.trim().toLowerCase()
            : removePinyinTones(pinyinInput.trim().toLowerCase());

        const isCorrect = answer === correctAnswer;

        if (isCorrect) {
            setInputResult('correct');
            playSoundEffect('success');
            setSessionStats(s => ({ ...s, correct: s.correct + 1 }));
            SRS.updateCard(levelId, currentWord._uuid || currentWord.id, true);
        } else {
            const newMistakes = mistakeCount + 1;
            setMistakeCount(newMistakes);

            if (newMistakes >= 3) {
                setInputResult('wrong');
                playSoundEffect('error');
                setSessionStats(s => ({ ...s, wrong: s.wrong + 1 }));
                SRS.updateCard(levelId, currentWord._uuid || currentWord.id, false);
            } else {
                setInputResult('retry');
                playSoundEffect('error');
                setTimeout(() => {
                    setInputResult(null);
                    setPinyinInput('');
                }, 800);
            }
        }
    };

    const handleNext = useCallback(() => {
        if (idx < queue.length - 1) {
            setIdx(i => i + 1);
            setSelected(null);
            setPinyinInput('');
            setInputResult(null);
            setMistakeCount(0);
            setHasPlayed(false);
        } else {
            setFinished(true);
        }
    }, [idx, queue.length]);

    useEffect(() => {
        if (!(selected || inputResult === 'correct' || inputResult === 'wrong')) return;

        let handleKey: (e: KeyboardEvent) => void;

        const timer = setTimeout(() => {
            handleKey = (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleNext();
                }
            };
            window.addEventListener('keydown', handleKey);
        }, 500);

        return () => {
            clearTimeout(timer);
            if (handleKey) window.removeEventListener('keydown', handleKey);
        };
    }, [selected, inputResult, handleNext]);

    // --- PASSAGE PLAYER LOGIC ---
    const playPassageLine = useCallback((text: string, lineIdx: number) => {
        window.speechSynthesis.cancel();
        setPlayingLine(lineIdx);
        setActiveCharIndex(0);
        setActiveCharLength(1);
        const utt = new SpeechSynthesisUtterance(text);
        if (selectedVoice?.voice) {
            utt.voice = selectedVoice.voice;
            utt.lang = selectedVoice.lang;
        } else {
            utt.lang = isEnglish ? 'en-US' : 'zh-CN';
        }
        utt.rate = speedRef.current;
        utt.onboundary = (e) => {
            if (e.name === 'word') {
                setActiveCharIndex(e.charIndex);
                setActiveCharLength(e.charLength || 1);
            }
        };
        utt.onend = () => {
            setPlayingLine(null);
            setActiveCharIndex(null);
        };
        window.speechSynthesis.speak(utt);
    }, [speed, selectedVoice, isEnglish]);

    const playPassageAll = useCallback((lines: any[]) => {
        window.speechSynthesis.cancel();
        setPlayingLine(0);
        setActiveCharIndex(0);
        setActiveCharLength(1);

        const doPlay = (i: number) => {
            if (i >= lines.length) {
                setPlayingLine(null);
                setActiveCharIndex(null);
                return;
            }
            setPlayingLine(i);
            setActiveCharIndex(0);
            setActiveCharLength(1);
            const utt = new SpeechSynthesisUtterance(lines[i].zh);
            if (selectedVoice?.voice) {
                utt.voice = selectedVoice.voice;
                utt.lang = selectedVoice.lang;
            } else {
                utt.lang = isEnglish ? 'en-US' : 'zh-CN';
            }
            utt.rate = speedRef.current;
            utt.onboundary = (e) => {
                if (e.name === 'word') {
                    setActiveCharIndex(e.charIndex);
                    setActiveCharLength(e.charLength || 1);
                }
            };
            utt.onend = () => doPlay(i + 1);
            window.speechSynthesis.speak(utt);
        };

        doPlay(0);
    }, [speed, selectedVoice, isEnglish]);


    // --- RENDERS ---
    if (finished) {
        const total = sessionStats.correct + sessionStats.wrong;
        const pct = Math.round((sessionStats.correct / total) * 100);
        return (
            <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 text-center animate-fade-in mt-6">
                <div className="text-6xl mb-4">{pct >= 80 ? '🎧' : pct >= 50 ? '💪' : '📚'}</div>
                <h2 className="text-2xl font-bold mb-1 text-slate-800 dark:text-slate-100">Hoàn thành!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Bạn vừa luyện nghe {total} từ</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-4">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">{sessionStats.correct}</div>
                        <div className="text-sm text-green-700 dark:text-green-400">Đúng ✓</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4">
                        <div className="text-3xl font-bold text-red-500 dark:text-red-400">{sessionStats.wrong}</div>
                        <div className="text-sm text-red-600 dark:text-red-400">Sai ✗</div>
                    </div>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full mb-4 overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                </div>
                <p className="text-primary-600 dark:text-primary-400 font-bold text-xl mb-6">{pct}% chính xác</p>
                <div className="flex gap-3">
                    <button onClick={() => startSession(mode as any)}
                        className="flex-1 py-3 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-xl font-bold hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors">
                        Làm lại
                    </button>
                    <button onClick={() => { setFinished(false); setMode('menu'); }}
                        className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-colors">
                        Chọn chế độ
                    </button>
                </div>
            </div>
        );
    }

    if (mode === 'menu') return (
        <div className="max-w-md mx-auto animate-fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center justify-center rounded-xl">
                        <Headphones className="w-5 h-5" />
                    </div>
                    Đôi Tai Thẩm Âm
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 text-center">
                    Rèn luyện phản xạ nghe với giáo viên AI
                </p>

                {availableVoices.length > 0 && (
                    <div className="mb-6 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl">
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                            <Mic className="w-4 h-4 text-primary-500" /> Chọn Giọng đọc AI:
                        </p>
                        <select
                            value={selectedVoice?.name || ''}
                            onChange={e => {
                                const v = availableVoices.find(v => v.name === e.target.value);
                                setSelectedVoice(v);
                            }}
                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-primary-400 bg-white dark:bg-slate-800 cursor-pointer transition-colors">
                            {availableVoices.map((v, i) => (
                                <option key={i} value={v.name}>{v.name} ({v.lang})</option>
                            ))}
                        </select>
                        <button
                            onClick={() => {
                                if (!selectedVoice) return;
                                window.speechSynthesis.cancel();
                                const utt = new SpeechSynthesisUtterance(isEnglish ? 'Hello, this is a test.' : '你好，这是测试。');
                                utt.voice = selectedVoice.voice;
                                utt.lang = selectedVoice.lang;
                                utt.rate = speed;
                                window.speechSynthesis.speak(utt);
                            }}
                            className="mt-3 px-3 py-1.5 bg-white dark:bg-slate-800 border border-primary-200 dark:border-primary-500/30 rounded-lg text-xs font-bold text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors flex items-center gap-2 shadow-sm w-max">
                            <Play className="w-3 h-3" /> Nghe thử giọng này
                        </button>
                    </div>
                )}

                <div className="mb-6">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">🎚️ Tốc độ đọc (Speed):</p>
                    <div className="flex gap-2">
                        {[
                            { label: '🐢 Rất chậm', value: 0.5 },
                            { label: '🐌 Chậm', value: 0.75 },
                            { label: '🚶 Vừa', value: 1.0 },
                            { label: '🏃 Nhanh', value: 1.25 },
                            { label: '🚀 Rất nhanh', value: 1.5 },
                        ].map(s => (
                            <button key={s.value}
                                onClick={() => setSpeed(s.value)}
                                className={`flex-1 py-2.5 px-2 rounded-xl text-sm font-bold border-2 transition-all
                                    ${speed === s.value
                                        ? 'border-primary-500 bg-primary-500 text-white shadow-md'
                                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-500/40 bg-white dark:bg-slate-900'}`}>
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">🔢 Số lượng câu hỏi:</p>
                    <div className="flex gap-2 flex-wrap">
                        {[5, 10, 15, 20, 30].map(n => (
                            <button key={n}
                                onClick={() => setTOTAL(n)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all
                                    ${TOTAL === n
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300'
                                        : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-primary-200 dark:hover:border-primary-500/40 bg-white dark:bg-slate-900'}`}>
                                {n}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 border-t border-slate-100 dark:border-slate-800 pt-4">🎯 Chọn chế độ luyện:</p>

                    <button onClick={() => startSession('choose')}
                        className="w-full p-4 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 border-2 border-primary-200 dark:border-primary-500/30 rounded-2xl text-left transition-all active:scale-95 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-xl shadow-sm text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                                🔤
                            </div>
                            <div>
                                <div className="font-bold text-primary-800 dark:text-primary-200 text-lg">
                                    {isEnglish ? 'Nghe → Chọn Tiếng Anh' : 'Nghe → Chọn Chữ Hán'}
                                </div>
                                <div className="text-sm text-primary-600 dark:text-primary-400 opacity-80 mt-0.5">
                                    Luyện kỹ năng nghe nhận diện từ.
                                </div>
                            </div>
                        </div>
                    </button>

                    <button onClick={() => startSession('pinyin')}
                        className="w-full p-4 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 border-2 border-primary-200 dark:border-primary-500/30 rounded-2xl text-left transition-all active:scale-95 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-xl shadow-sm text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                                ✍️
                            </div>
                            <div>
                                <div className="font-bold text-primary-800 dark:text-primary-200 text-lg">
                                    {isEnglish ? 'Nghe → Gõ Tiếng Anh' : 'Nghe → Gõ Pinyin'}
                                </div>
                                <div className="text-sm text-primary-600 dark:text-primary-400 opacity-80 mt-0.5">
                                    Luyện nghe chép chính tả cấp tốc.
                                </div>
                            </div>
                        </div>
                    </button>

                    <button onClick={() => setMode('passage')}
                        className="w-full p-4 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 border-2 border-primary-200 dark:border-primary-500/30 rounded-2xl text-left transition-all active:scale-95 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-xl shadow-sm text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                                📖
                            </div>
                            <div>
                                <div className="font-bold text-primary-800 dark:text-primary-200 text-lg">Nghe đoạn văn</div>
                                <div className="text-sm text-primary-600 dark:text-primary-400 opacity-80 mt-0.5">
                                    Thả mình vào những câu chuyện.
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );

    if (mode === 'passage') {
        let filteredPassages = passagesData.filter(p => p.level === levelId);
        if (filteredPassages.length === 0) filteredPassages = passagesData; // fallback
        const passage = filteredPassages[activePassage] || filteredPassages[0];
        const lines = passage?.lines || [];

        return (
            <div className="max-w-2xl mx-auto animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => { window.speechSynthesis.cancel(); setMode('menu'); setPlayingLine(null); }}
                        className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1.5 text-sm font-medium">
                        <ArrowLeft className="w-4 h-4" /> Thoát Luyện Nghe
                    </button>
                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 px-3 py-1 rounded-full">
                        📖 Nghe Đoạn Văn
                    </span>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 mb-5">
                    <div className="mb-5">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-2 block">Chọn đoạn văn:</label>
                        <select value={activePassage}
                            onChange={e => { setActivePassage(Number(e.target.value)); window.speechSynthesis.cancel(); setPlayingLine(null); }}
                            className="w-full border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 focus:border-primary-400 outline-none transition-colors">
                            {filteredPassages.map((p, i) => (
                                <option key={i} value={i}>{p.title} — {p.topic}</option>
                            ))}
                        </select>
                    </div>

                    {passage && (
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <button onClick={() => playPassageAll(lines)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-bold hover:bg-primary-600 transition shadow-sm">
                                    <Play className="w-4 h-4" /> Nghe cả đoạn
                                </button>
                                <button onClick={() => { window.speechSynthesis.cancel(); setPlayingLine(null); }}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                                    <Square className="w-4 h-4" /> Dừng
                                </button>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex gap-1 border border-slate-200 dark:border-slate-700 rounded-xl p-1 bg-slate-50 dark:bg-slate-800/60">
                                    {[{label:'🐢',value:0.5},{label:'🐌',value:0.75},{label:'🚶',value:1.0},{label:'🏃',value:1.25},{label:'🚀',value:1.5}].map(s => (
                                        <button key={s.value} onClick={() => {
                                            setSpeed(s.value);
                                            // Nếu đang phát cả đoạn, khởi động lại từ câu hiện tại với tốc độ mới
                                            if (playingLine !== null && activeCharIndex !== null) {
                                                window.speechSynthesis.cancel();
                                                setTimeout(() => playPassageLine(lines[playingLine].zh, playingLine), 50);
                                            }
                                        }}
                                            className={`w-9 h-8 rounded-lg text-sm font-bold transition-all ${speed === s.value ? 'bg-primary-500 shadow-md text-white scale-105' : 'text-slate-600 dark:text-slate-300 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:text-primary-700 dark:hover:text-primary-300'}`}
                                            title={s.value.toString() + 'x'}>
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                                {!isEnglish && (
                                    <>
                                        <button onClick={() => setJumpTarget(v => v === 'zh' ? 'py' : v === 'py' ? 'both' : 'zh')}
                                            className={`text-xs px-3 py-2 rounded-xl font-bold transition bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700`}>
                                            Nhảy chữ: {jumpTarget === 'zh' ? 'Hán' : jumpTarget === 'py' ? 'Pinyin' : 'Cả hai'}
                                        </button>
                                        <button onClick={() => setShowPinyinPassage(v => !v)}
                                            className={`text-xs px-3 py-2 rounded-xl font-bold transition ${showPinyinPassage ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                            {showPinyinPassage ? 'Bật Pinyin' : 'Tắt Pinyin'}
                                        </button>
                                    </>
                                )}
                                <button onClick={() => setShowViPassage(v => !v)}
                                    className={`text-xs px-3 py-2 rounded-xl font-bold transition ${showViPassage ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                                    {showViPassage ? 'Bật Nghĩa' : 'Tắt Nghĩa'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {passage && (
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-10">
                        <div className="bg-primary-50 dark:bg-primary-500/10 px-6 py-4 border-b border-primary-100 dark:border-primary-500/20 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-primary-800 dark:text-primary-200 text-xl">{passage.zh_title}</h3>
                                <p className="text-sm font-medium text-primary-600 dark:text-primary-400 mt-0.5">{passage.title}</p>
                            </div>
                            <span className="text-xs bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 px-3 py-1.5 rounded-full font-bold shadow-sm">
                                {passage.level?.toUpperCase() || 'N/A'} · {lines.length} câu
                            </span>
                        </div>
                        <div className="divide-y divide-slate-50 dark:divide-slate-800">
                            {lines.map((line: any, li: number) => (
                                <div key={li}
                                    onClick={() => playPassageLine(line.zh, li)}
                                    className={`flex gap-5 px-6 py-5 cursor-pointer transition-all duration-300
                                        ${playingLine === li
                                            ? 'bg-primary-50 dark:bg-primary-500/10 border-l-4 border-primary-500 shadow-inner'
                                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border-l-4 border-transparent'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-1 transition-colors
                                        ${playingLine === li ? 'bg-primary-500 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
                                        {li + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-3">
                                            <div className="flex-1 min-w-0">
                                                {playingLine === li ? (
                                                    <div className="flex flex-wrap leading-loose">
                                                        {line.zh.split('').map((char: string, i: number) => {
                                                            const isCurrent = activeCharIndex !== null && i >= activeCharIndex && i < activeCharIndex + activeCharLength;
                                                            const isFuture = activeCharIndex !== null && i >= activeCharIndex + activeCharLength;
                                                            return (
                                                                <span key={i} className={`inline-block transition-all duration-200 ${
                                                                    isCurrent && (jumpTarget === 'zh' || jumpTarget === 'both') ? 'text-primary-600 dark:text-primary-400 scale-125 -translate-y-1 font-black drop-shadow-md z-10' :
                                                                    isCurrent ? 'text-primary-600 dark:text-primary-400 font-black z-10' :
                                                                    isFuture ? 'text-slate-300 dark:text-slate-600 opacity-50 font-medium' :
                                                                    'text-primary-900 dark:text-primary-100 opacity-100 font-bold'
                                                                } text-xl`}>
                                                                    {char === ' ' ? ' ' : char}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <span className="text-xl font-bold leading-relaxed text-slate-800 dark:text-slate-100">
                                                        {line.zh}
                                                    </span>
                                                )}
                                            </div>
                                            {playingLine === li && (
                                                <span className="flex gap-1 mt-2 shrink-0">
                                                    <span className="w-1.5 h-4 bg-primary-500 rounded-full animate-bounce" style={{animationDelay:'0ms'}}></span>
                                                    <span className="w-1.5 h-4 bg-primary-500 rounded-full animate-bounce" style={{animationDelay:'150ms'}}></span>
                                                    <span className="w-1.5 h-4 bg-primary-500 rounded-full animate-bounce" style={{animationDelay:'300ms'}}></span>
                                                </span>
                                            )}
                                        </div>
                                        {!isEnglish && showPinyinPassage && line.py && (
                                            <div className="text-base mt-1.5 font-medium leading-relaxed">
                                                {playingLine === li ? (
                                                    (() => {
                                                        let pyStartIdx: number | null = null;
                                                        let pyEndIdx: number | null = null;
                                                        if (activeCharIndex !== null && line.zh && line.py) {
                                                            const centerZh = activeCharIndex + (activeCharLength || 1) / 2;
                                                            let centerPy = Math.floor((centerZh / line.zh.length) * line.py.length);
                                                            let search = centerPy;
                                                            while (search < line.py.length && /[\s\.,\?!，。？！]/.test(line.py[search])) search++;
                                                            if (search >= line.py.length) {
                                                                search = centerPy;
                                                                while (search >= 0 && /[\s\.,\?!，。？！]/.test(line.py[search])) search--;
                                                            }
                                                            centerPy = search >= 0 && search < line.py.length ? search : centerPy;
                                                            let s = centerPy;
                                                            let e = centerPy;
                                                            while (s > 0 && !/[\s\.,\?!，。？！]/.test(line.py[s - 1])) s--;
                                                            while (e < line.py.length - 1 && !/[\s\.,\?!，。？！]/.test(line.py[e + 1])) e++;
                                                            pyStartIdx = s;
                                                            pyEndIdx = e;
                                                        }
                                                        return line.py.split('').map((char: string, i: number) => {
                                                            const isCurrent = pyStartIdx !== null && pyEndIdx !== null && i >= pyStartIdx && i <= pyEndIdx;
                                                            const isFuture = pyEndIdx !== null && i > pyEndIdx;
                                                            return (
                                                                <span key={i} className={`inline-block transition-all duration-300 ${
                                                                    isCurrent && (jumpTarget === 'py' || jumpTarget === 'both') ? 'text-primary-600 dark:text-primary-400 scale-125 -translate-y-1 font-bold z-10' :
                                                                    isFuture ? 'text-slate-300 dark:text-slate-600 opacity-50' : 'text-primary-600 dark:text-primary-400 opacity-100 font-bold'
                                                                }`}>
                                                                    {char === ' ' ? ' ' : char}
                                                                </span>
                                                            );
                                                        });
                                                    })()
                                                ) : (
                                                    <span className="text-primary-600 dark:text-primary-400">{line.py}</span>
                                                )}
                                            </div>
                                        )}
                                        {showViPassage && <div className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">{line.vi}</div>}
                                    </div>
                                    <button
                                        onClick={e => { e.stopPropagation(); playPassageLine(line.zh, li); }}
                                        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center self-center transition-all
                                            ${playingLine === li ? 'bg-primary-500 text-white shadow-md scale-110' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                                        <Volume2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {passagesData.length === 0 && (
                    <div className="text-center text-slate-400 dark:text-slate-500 py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                        <FolderOpen className="w-10 h-10 mb-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        <p className="font-medium">Không có đoạn văn mẫu nào được tải.</p>
                    </div>
                )}
            </div>
        );
    }

    if (!currentWord) return null;
    const progress = Math.round((idx / queue.length) * 100);

    return (
        <div className="max-w-xl mx-auto animate-fade-in bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => setMode('menu')}
                    className="text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 flex items-center gap-1.5 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" /> Dừng
                </button>
                <div className="flex gap-3 text-sm bg-slate-50 dark:bg-slate-800/60 px-4 py-1.5 rounded-full font-bold">
                    <span className="text-green-600 dark:text-green-400">✓ {sessionStats.correct}</span>
                    <span className="text-red-500 dark:text-red-400">✗ {sessionStats.wrong}</span>
                    <span className="text-slate-400 dark:text-slate-500 ml-2">{idx + 1}/{queue.length}</span>
                </div>
            </div>

            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="bg-primary-50 dark:bg-primary-500/10 rounded-3xl border-2 border-dashed border-primary-200 dark:border-primary-500/30 p-8 mb-6 text-center shadow-inner">
                <button onClick={playWord}
                    className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg active:scale-95 transition-all
                        ${hasPlayed ? 'bg-primary-600 hover:bg-primary-700' : 'bg-primary-500 hover:bg-primary-600 animate-pulse'}`}>
                    <Volume2 className="w-12 h-12 text-white" />
                </button>
                <p className="text-primary-600 dark:text-primary-400 font-bold mb-1">{hasPlayed ? 'Nhấn loa để nghe lại' : 'Nhấn loa để nghe'}</p>
                {hasPlayed && (
                    <div className="mt-4 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl inline-block shadow-sm animate-fade-in border border-primary-100 dark:border-primary-500/20">
                        <span className="text-primary-800 dark:text-primary-300 font-medium text-sm">💡 Nghĩa là: </span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">{currentWord.meaning}</span>
                    </div>
                )}
            </div>

            {mode === 'choose' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {options.map((opt, i) => {
                        let cls = 'w-full p-5 rounded-2xl border-2 text-4xl font-bold transition-all flex items-center justify-center shadow-sm ';
                        if (!selected) {
                            cls += 'border-slate-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-500/50 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:-translate-y-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100';
                        } else if ((opt.hanzi || opt.word) === (currentWord.hanzi || currentWord.word)) {
                            cls += 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 shadow-none';
                        } else if ((opt.hanzi || opt.word) === (selected.hanzi || selected.word)) {
                            cls += 'border-red-400 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 shadow-none scale-95';
                        } else {
                            cls += 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-300 dark:text-slate-600 shadow-none';
                        }
                        return (
                            <button key={i} onClick={() => handleChoose(opt)} className={cls} disabled={!!selected}>
                                <span>{opt.hanzi || opt.word}</span>
                            </button>
                        );
                    })}
                </div>
            )}

            {mode === 'pinyin' && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-sm p-6 mb-6">
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-4">Gõ pinyin bạn vừa nghe (chỉ gõ chữ, không gõ dấu thanh):</p>
                    <div className="flex gap-2 mb-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={pinyinInput}
                            onChange={e => setPinyinInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    if (inputResult === 'correct' || inputResult === 'wrong') handleNext();
                                    else if (pinyinInput.trim()) handleCheckPinyin();
                                }
                            }}
                            disabled={inputResult === 'correct' || inputResult === 'wrong'}
                            placeholder={isEnglish ? 'Gõ từ tiếng Anh...' : 'Ví dụ: nihao'}
                            className={`flex-1 border-2 rounded-xl px-5 py-4 text-xl outline-none transition-colors font-mono
                                ${inputResult === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-300' :
                                  inputResult === 'wrong' ? 'border-red-400 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300' :
                                  inputResult === 'retry' ? 'border-orange-400 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300' :
                                  'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary-400 text-slate-800 dark:text-slate-100'}`}
                        />
                        {(inputResult !== 'correct' && inputResult !== 'wrong') && (
                            <button onClick={handleCheckPinyin}
                                className="px-6 py-4 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-md">
                                <Send className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <div className="h-14 mt-3">
                        {inputResult === 'retry' && (
                            <div className="text-center animate-fade-in text-orange-600 dark:text-orange-400 font-bold bg-orange-50 dark:bg-orange-500/10 py-2 rounded-lg">
                                ✗ Chưa đúng! Thử lại xem?
                            </div>
                        )}
                        {inputResult === 'wrong' && (
                            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-3 animate-fade-in flex items-center justify-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400" />
                                <p className="text-red-700 dark:text-red-400 font-bold">
                                    Đáp án đúng: <span className="text-xl mx-2">{isEnglish ? currentWord.word : currentWord.pinyin}</span> ({currentWord.hanzi})
                                </p>
                            </div>
                        )}
                        {inputResult === 'correct' && (
                            <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl p-3 animate-fade-in flex items-center justify-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
                                <p className="text-green-700 dark:text-green-400 font-bold">
                                    Chính xác! <span className="text-slate-500 dark:text-slate-400 ml-2 font-normal">({currentWord.hanzi})</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {(selected || inputResult === 'correct' || inputResult === 'wrong') && (
                <button onClick={handleNext}
                    className="w-full py-4 bg-primary-500 text-white rounded-2xl font-bold text-lg hover:bg-primary-600 active:scale-95 transition-all animate-fade-in shadow-md flex justify-center items-center gap-2">
                    {idx < queue.length - 1 ? 'Chuyển câu tiếp theo' : 'Hoàn thành bài tập'} <ArrowRight className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
