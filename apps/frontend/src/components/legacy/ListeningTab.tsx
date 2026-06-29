"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SRS } from '@/lib/srs';
import { StartersExercises } from './StartersExercises';
import ExamExerciseQuiz from '@/components/ExamExerciseQuiz';

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
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center animate-fade-in mt-6">
                <div className="text-6xl mb-4">{pct >= 80 ? '🎧' : pct >= 50 ? '💪' : '📚'}</div>
                <h2 className="text-2xl font-bold mb-1">Hoàn thành!</h2>
                <p className="text-gray-500 mb-6">Bạn vừa luyện nghe {total} từ</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="text-3xl font-bold text-green-600">{sessionStats.correct}</div>
                        <div className="text-sm text-green-700">Đúng ✓</div>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="text-3xl font-bold text-red-500">{sessionStats.wrong}</div>
                        <div className="text-sm text-red-600">Sai ✗</div>
                    </div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full mb-4 overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                </div>
                <p className="text-indigo-600 font-bold text-xl mb-6">{pct}% chính xác</p>
                <div className="flex gap-3">
                    <button onClick={() => startSession(mode as any)}
                        className="flex-1 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                        Làm lại
                    </button>
                    <button onClick={() => { setFinished(false); setMode('menu'); }}
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                        Chọn chế độ
                    </button>
                </div>
            </div>
        );
    }

    if (mode === 'menu') return (
        <div className="max-w-md mx-auto animate-fade-in">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-xl">
                        <i className="fa-solid fa-headphones"></i>
                    </div>
                    Đôi Tai Thẩm Âm
                </h2>
                <p className="text-gray-500 text-sm mb-6 text-center">
                    Rèn luyện phản xạ nghe với giáo viên AI
                </p>

                {availableVoices.length > 0 && (
                    <div className="mb-6 bg-gray-50 p-4 rounded-2xl">
                        <p className="text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <i className="fa-solid fa-microphone text-indigo-500"></i> Chọn Giọng đọc AI:
                        </p>
                        <select
                            value={selectedVoice?.name || ''}
                            onChange={e => {
                                const v = availableVoices.find(v => v.name === e.target.value);
                                setSelectedVoice(v);
                            }}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:border-indigo-400 bg-white cursor-pointer transition-colors">
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
                            className="mt-3 px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-sm w-max">
                            <i className="fa-solid fa-play"></i> Nghe thử giọng này
                        </button>
                    </div>
                )}

                <div className="mb-6">
                    <p className="text-sm font-bold text-gray-700 mb-3">🎚️ Tốc độ đọc (Speed):</p>
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
                                        ? 'border-indigo-600 bg-indigo-600 text-white shadow-md'
                                        : 'border-gray-200 text-gray-600 hover:border-indigo-300 bg-white'}`}>
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-sm font-bold text-gray-700 mb-3">🔢 Số lượng câu hỏi:</p>
                    <div className="flex gap-2 flex-wrap">
                        {[5, 10, 15, 20, 30].map(n => (
                            <button key={n}
                                onClick={() => setTOTAL(n)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all
                                    ${TOTAL === n
                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                        : 'border-gray-200 text-gray-500 hover:border-indigo-200 bg-white'}`}>
                                {n}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-sm font-bold text-gray-700 mb-2 border-t pt-4">🎯 Chọn chế độ luyện:</p>
                    
                    <button onClick={() => startSession('choose')}
                        className="w-full p-4 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 rounded-2xl text-left transition-all active:scale-95 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                                🔤
                            </div>
                            <div>
                                <div className="font-bold text-indigo-800 text-lg">
                                    {isEnglish ? 'Nghe → Chọn Tiếng Anh' : 'Nghe → Chọn Chữ Hán'}
                                </div>
                                <div className="text-sm text-indigo-600 opacity-80 mt-0.5">
                                    Luyện kỹ năng nghe nhận diện từ.
                                </div>
                            </div>
                        </div>
                    </button>
                    
                    <button onClick={() => startSession('pinyin')}
                        className="w-full p-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-2xl text-left transition-all active:scale-95 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-sm text-purple-600 group-hover:scale-110 transition-transform">
                                ✍️
                            </div>
                            <div>
                                <div className="font-bold text-purple-800 text-lg">
                                    {isEnglish ? 'Nghe → Gõ Tiếng Anh' : 'Nghe → Gõ Pinyin'}
                                </div>
                                <div className="text-sm text-purple-600 opacity-80 mt-0.5">
                                    Luyện nghe chép chính tả cấp tốc.
                                </div>
                            </div>
                        </div>
                    </button>
                    
                    <button onClick={() => setMode('passage')}
                        className="w-full p-4 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 rounded-2xl text-left transition-all active:scale-95 group">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-sm text-emerald-600 group-hover:scale-110 transition-transform">
                                📖
                            </div>
                            <div>
                                <div className="font-bold text-emerald-800 text-lg">Nghe đoạn văn</div>
                                <div className="text-sm text-emerald-600 opacity-80 mt-0.5">
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
                        className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm font-medium">
                        <i className="fa-solid fa-arrow-left"></i> Thoát Luyện Nghe
                    </button>
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        📖 Nghe Đoạn Văn
                    </span>
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-5">
                    <div className="mb-5">
                        <label className="text-sm font-bold text-gray-700 mb-2 block">Chọn đoạn văn:</label>
                        <select value={activePassage}
                            onChange={e => { setActivePassage(Number(e.target.value)); window.speechSynthesis.cancel(); setPlayingLine(null); }}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-800 focus:border-emerald-400 outline-none transition-colors">
                            {filteredPassages.map((p, i) => (
                                <option key={i} value={i}>{p.title} — {p.topic}</option>
                            ))}
                        </select>
                    </div>

                    {passage && (
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                                <button onClick={() => playPassageAll(lines)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition shadow-sm">
                                    <i className="fa-solid fa-play"></i> Nghe cả đoạn
                                </button>
                                <button onClick={() => { window.speechSynthesis.cancel(); setPlayingLine(null); }}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-200 transition">
                                    <i className="fa-solid fa-stop"></i> Dừng
                                </button>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex gap-1 border border-gray-200 rounded-xl p-1 bg-gray-50">
                                    {[{label:'🐢',value:0.5},{label:'🐌',value:0.75},{label:'🚶',value:1.0},{label:'🏃',value:1.25},{label:'🚀',value:1.5}].map(s => (
                                        <button key={s.value} onClick={() => {
                                            setSpeed(s.value);
                                            // Nếu đang phát cả đoạn, khởi động lại từ câu hiện tại với tốc độ mới
                                            if (playingLine !== null && activeCharIndex !== null) {
                                                window.speechSynthesis.cancel();
                                                setTimeout(() => playPassageLine(lines[playingLine].zh, playingLine), 50);
                                            }
                                        }}
                                            className={`w-9 h-8 rounded-lg text-sm font-bold transition-all ${speed === s.value ? 'bg-emerald-500 shadow-md text-white scale-105' : 'text-gray-600 hover:bg-emerald-100 hover:text-emerald-700'}`}
                                            title={s.value.toString() + 'x'}>
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                                {!isEnglish && (
                                    <>
                                        <button onClick={() => setJumpTarget(v => v === 'zh' ? 'py' : v === 'py' ? 'both' : 'zh')}
                                            className={`text-xs px-3 py-2 rounded-xl font-bold transition bg-gray-100 text-gray-600 hover:bg-gray-200`}>
                                            Nhảy chữ: {jumpTarget === 'zh' ? 'Hán' : jumpTarget === 'py' ? 'Pinyin' : 'Cả hai'}
                                        </button>
                                        <button onClick={() => setShowPinyinPassage(v => !v)}
                                            className={`text-xs px-3 py-2 rounded-xl font-bold transition ${showPinyinPassage ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {showPinyinPassage ? 'Bật Pinyin' : 'Tắt Pinyin'}
                                        </button>
                                    </>
                                )}
                                <button onClick={() => setShowViPassage(v => !v)}
                                    className={`text-xs px-3 py-2 rounded-xl font-bold transition ${showViPassage ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {showViPassage ? 'Bật Nghĩa' : 'Tắt Nghĩa'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {passage && (
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-10">
                        <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-emerald-800 text-xl">{passage.zh_title}</h3>
                                <p className="text-sm font-medium text-emerald-600 mt-0.5">{passage.title}</p>
                            </div>
                            <span className="text-xs bg-white text-emerald-600 px-3 py-1.5 rounded-full font-bold shadow-sm">
                                {passage.level?.toUpperCase() || 'N/A'} · {lines.length} câu
                            </span>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {lines.map((line: any, li: number) => (
                                <div key={li}
                                    onClick={() => playPassageLine(line.zh, li)}
                                    className={`flex gap-5 px-6 py-5 cursor-pointer transition-all duration-300
                                        ${playingLine === li
                                            ? 'bg-emerald-50 border-l-4 border-emerald-500 shadow-inner'
                                            : 'hover:bg-gray-50 border-l-4 border-transparent'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-1 transition-colors
                                        ${playingLine === li ? 'bg-emerald-500 text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>
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
                                                                    isCurrent && (jumpTarget === 'zh' || jumpTarget === 'both') ? 'text-emerald-600 scale-125 -translate-y-1 font-black shadow-emerald-200 drop-shadow-md z-10' :
                                                                    isCurrent ? 'text-emerald-600 font-black z-10' :
                                                                    isFuture ? 'text-gray-300 opacity-50 font-medium' :
                                                                    'text-emerald-900 opacity-100 font-bold'
                                                                } text-xl`}>
                                                                    {char === ' ' ? '\u00A0' : char}
                                                                </span>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <span className="text-xl font-bold leading-relaxed text-gray-800">
                                                        {line.zh}
                                                    </span>
                                                )}
                                            </div>
                                            {playingLine === li && (
                                                <span className="flex gap-1 mt-2 shrink-0">
                                                    <span className="w-1.5 h-4 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay:'0ms'}}></span>
                                                    <span className="w-1.5 h-4 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay:'150ms'}}></span>
                                                    <span className="w-1.5 h-4 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay:'300ms'}}></span>
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
                                                                    isCurrent && (jumpTarget === 'py' || jumpTarget === 'both') ? 'text-emerald-600 scale-125 -translate-y-1 font-bold z-10' :
                                                                    isFuture ? 'text-gray-300 opacity-50' : 'text-emerald-600 opacity-100 font-bold'
                                                                }`}>
                                                                    {char === ' ' ? '\u00A0' : char}
                                                                </span>
                                                            );
                                                        });
                                                    })()
                                                ) : (
                                                    <span className="text-emerald-600">{line.py}</span>
                                                )}
                                            </div>
                                        )}
                                        {showViPassage && <div className="text-sm text-gray-500 mt-1.5">{line.vi}</div>}
                                    </div>
                                    <button
                                        onClick={e => { e.stopPropagation(); playPassageLine(line.zh, li); }}
                                        className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center self-center transition-all
                                            ${playingLine === li ? 'bg-emerald-500 text-white shadow-md scale-110' : 'bg-gray-50 text-gray-400 hover:bg-emerald-100 hover:text-emerald-600'}`}>
                                        <i className="fa-solid fa-volume-high text-sm"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {passagesData.length === 0 && (
                    <div className="text-center text-gray-400 py-12 bg-white rounded-3xl border">
                        <i className="fa-solid fa-folder-open text-4xl mb-4 text-gray-300"></i>
                        <p className="font-medium">Không có đoạn văn mẫu nào được tải.</p>
                    </div>
                )}
            </div>
        );
    }

    if (!currentWord) return null;
    const progress = Math.round((idx / queue.length) * 100);

    return (
        <div className="max-w-xl mx-auto animate-fade-in bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => setMode('menu')}
                    className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm font-medium">
                    <i className="fa-solid fa-arrow-left"></i> Dừng
                </button>
                <div className="flex gap-3 text-sm bg-gray-50 px-4 py-1.5 rounded-full font-bold">
                    <span className="text-green-600">✓ {sessionStats.correct}</span>
                    <span className="text-red-500">✗ {sessionStats.wrong}</span>
                    <span className="text-gray-400 ml-2">{idx + 1}/{queue.length}</span>
                </div>
            </div>
            
            <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            
            <div className="bg-indigo-50 rounded-3xl border-2 border-dashed border-indigo-200 p-8 mb-6 text-center shadow-inner">
                <button onClick={playWord}
                    className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg active:scale-95 transition-all
                        ${hasPlayed ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600 animate-pulse'}`}>
                    <i className="fa-solid fa-volume-high text-white text-5xl"></i>
                </button>
                <p className="text-indigo-600 font-bold mb-1">{hasPlayed ? 'Nhấn loa để nghe lại' : 'Nhấn loa để nghe'}</p>
                {hasPlayed && (
                    <div className="mt-4 px-4 py-2 bg-white rounded-xl inline-block shadow-sm animate-fade-in border border-indigo-100">
                        <span className="text-indigo-800 font-medium text-sm">💡 Nghĩa là: </span>
                        <span className="font-bold text-gray-800">{currentWord.meaning}</span>
                    </div>
                )}
            </div>

            {mode === 'choose' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {options.map((opt, i) => {
                        let cls = 'w-full p-5 rounded-2xl border-2 text-4xl font-bold transition-all flex items-center justify-center shadow-sm ';
                        if (!selected) {
                            cls += 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 hover:-translate-y-1 bg-white text-gray-800';
                        } else if ((opt.hanzi || opt.word) === (currentWord.hanzi || currentWord.word)) {
                            cls += 'border-green-500 bg-green-50 text-green-700 shadow-none';
                        } else if ((opt.hanzi || opt.word) === (selected.hanzi || selected.word)) {
                            cls += 'border-red-400 bg-red-50 text-red-600 shadow-none scale-95';
                        } else {
                            cls += 'border-gray-100 bg-gray-50 text-gray-300 shadow-none';
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
                <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-6 mb-6">
                    <p className="text-sm font-bold text-gray-600 mb-4">Gõ pinyin bạn vừa nghe (chỉ gõ chữ, không gõ dấu thanh):</p>
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
                                ${inputResult === 'correct' ? 'border-green-500 bg-green-50 text-green-700' :
                                  inputResult === 'wrong' ? 'border-red-400 bg-red-50 text-red-700' :
                                  inputResult === 'retry' ? 'border-orange-400 bg-orange-50 text-orange-700' :
                                  'border-gray-200 focus:border-indigo-400 text-gray-800'}`}
                        />
                        {(inputResult !== 'correct' && inputResult !== 'wrong') && (
                            <button onClick={handleCheckPinyin}
                                className="px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-md">
                                <i className="fa-solid fa-paper-plane text-xl"></i>
                            </button>
                        )}
                    </div>
                    
                    <div className="h-14 mt-3">
                        {inputResult === 'retry' && (
                            <div className="text-center animate-fade-in text-orange-600 font-bold bg-orange-50 py-2 rounded-lg">
                                ✗ Chưa đúng! Thử lại xem?
                            </div>
                        )}
                        {inputResult === 'wrong' && (
                            <div className="bg-red-50 border border-red-200 rounded-xl p-3 animate-fade-in flex items-center justify-center gap-2">
                                <i className="fa-solid fa-triangle-exclamation text-red-500"></i>
                                <p className="text-red-700 font-bold">
                                    Đáp án đúng: <span className="text-xl mx-2">{isEnglish ? currentWord.word : currentWord.pinyin}</span> ({currentWord.hanzi})
                                </p>
                            </div>
                        )}
                        {inputResult === 'correct' && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-3 animate-fade-in flex items-center justify-center gap-2">
                                <i className="fa-solid fa-check-circle text-green-600"></i>
                                <p className="text-green-700 font-bold">
                                    Chính xác! <span className="text-gray-500 ml-2 font-normal">({currentWord.hanzi})</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {(selected || inputResult === 'correct' || inputResult === 'wrong') && (
                <button onClick={handleNext}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all animate-fade-in shadow-md flex justify-center items-center gap-2">
                    {idx < queue.length - 1 ? 'Chuyển câu tiếp theo' : 'Hoàn thành bài tập'} <i className="fa-solid fa-arrow-right"></i>
                </button>
            )}
        </div>
    );
}
