"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';

// ==================== HELPERS ====================
const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const playTone = (type: 'success' | 'error') => {
    try {
        const ctx = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        if (type === 'success') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
        } else {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(280, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.2);
        }
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(); osc.stop(ctx.currentTime + 0.3);
    } catch {}
};

// Phát âm tiếng Anh có hỗ trợ giọng đọc và tốc độ tùy chọn
const speakEnglish = (text: string, voice: SpeechSynthesisVoice | null, rate: number) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    if (voice) u.voice = voice;
    window.speechSynthesis.speak(u);
};

// ==================== LISTENING MODE 1: TRẮC NGHIỆM ====================
function QuizMode({ pool, allVocab, voice, rate, onDone }: {
    pool: any[], allVocab: any[],
    voice: SpeechSynthesisVoice | null, rate: number,
    onDone: (score: number, total: number) => void
}) {
    const [idx, setIdx] = useState(0);
    const [opts, setOpts] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [correct, setCorrect] = useState(0);

    const current = pool[idx];

    const genOpts = useCallback((word: any) => {
        const wrong = shuffle(allVocab.filter(v => v.word !== word.word)).slice(0, 3);
        return shuffle([word, ...wrong]);
    }, [allVocab]);

    useEffect(() => {
        if (current) {
            setOpts(genOpts(current));
            setSelected(null);
            // Tự động phát âm khi chuyển câu
            setTimeout(() => speakEnglish(current.word, voice, rate), 400);
        }
    }, [idx, current, voice, rate, genOpts]);

    const handleSelect = (opt: any) => {
        if (selected) return;
        setSelected(opt);
        const isCorrect = opt.word === current.word;
        playTone(isCorrect ? 'success' : 'error');
        if (isCorrect) setCorrect(c => c + 1);
        setTimeout(() => {
            if (idx + 1 < pool.length) setIdx(i => i + 1);
            else onDone(correct + (isCorrect ? 1 : 0), pool.length);
        }, 1300);
    };

    if (!current) return null;

    return (
        <div className="animate-fade-in">
            {/* Progress */}
            <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Câu {idx + 1}/{pool.length}</span>
                    <span className="font-bold text-emerald-600">{correct} đúng</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${((idx + 1) / pool.length) * 100}%` }} />
                </div>
            </div>

            {/* Speaker button */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-4 font-medium">Nghe và chọn từ đúng</p>
                <button onClick={() => speakEnglish(current.word, voice, rate)}
                    className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mx-auto hover:bg-emerald-100 hover:scale-105 transition-all active:scale-95 shadow-sm mb-3">
                    <i className="fa-solid fa-volume-high text-4xl text-emerald-600"></i>
                </button>
                <p className="text-sm text-gray-400">Nhấn 🔊 để nghe lại</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
                {opts.map((opt, i) => {
                    let cls = "p-4 rounded-xl border-2 text-left transition-all font-medium ";
                    if (!selected) cls += "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer";
                    else if (opt.word === current.word) cls += "border-emerald-500 bg-emerald-50 text-emerald-700";
                    else if (selected?.word === opt.word) cls += "border-red-400 bg-red-50 text-red-600";
                    else cls += "border-gray-100 opacity-40";
                    return (
                        <button key={i} className={cls} onClick={() => handleSelect(opt)} disabled={!!selected}>
                            <div className="text-base font-bold mb-1">{opt.word}</div>
                            <div className="text-xs text-gray-500 italic">{opt.ipa}</div>
                            <div className="text-xs text-gray-400 mt-1">{opt.meaning}</div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ==================== LISTENING MODE 2: NGHE → GÕ TỪ ====================
function TypeMode({ pool, voice, rate, onDone }: {
    pool: any[], voice: SpeechSynthesisVoice | null, rate: number,
    onDone: (score: number, total: number) => void
}) {
    const [idx, setIdx] = useState(0);
    const [input, setInput] = useState('');
    const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
    const [correct, setCorrect] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const current = pool[idx];

    useEffect(() => {
        if (current) {
            setInput('');
            setResult(null);
            inputRef.current?.focus();
            setTimeout(() => speakEnglish(current.word, voice, rate), 400);
        }
    }, [idx, current, voice, rate]);

    const handleCheck = () => {
        if (!input.trim()) return;
        const isCorrect = input.trim().toLowerCase() === current.word.toLowerCase();
        setResult(isCorrect ? 'correct' : 'wrong');
        playTone(isCorrect ? 'success' : 'error');
        if (isCorrect) setCorrect(c => c + 1);
        setTimeout(() => {
            if (idx + 1 < pool.length) setIdx(i => i + 1);
            else onDone(correct + (isCorrect ? 1 : 0), pool.length);
        }, 1800);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleCheck();
    };

    if (!current) return null;

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Câu {idx + 1}/{pool.length}</span>
                    <span className="font-bold text-orange-500">{correct} đúng</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-400 transition-all" style={{ width: `${((idx + 1) / pool.length) * 100}%` }} />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-4 font-medium">Nghe và gõ từ bạn nghe được</p>
                <button onClick={() => speakEnglish(current.word, voice, rate)}
                    className="w-24 h-24 rounded-full bg-orange-50 border-4 border-orange-200 flex items-center justify-center mx-auto hover:bg-orange-100 hover:scale-105 transition-all active:scale-95 shadow-sm mb-4">
                    <i className="fa-solid fa-volume-high text-4xl text-orange-500"></i>
                </button>

                {/* Hint: meaning */}
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 mb-4 inline-block">
                    <span className="text-sm text-amber-700 font-medium">Nghĩa: {current.meaning}</span>
                </div>

                <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                    disabled={!!result}
                    placeholder="Gõ từ bạn nghe được..."
                    className={`w-full text-center text-xl font-bold border-2 rounded-xl px-4 py-3 outline-none transition-all
                        ${result === 'correct' ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                        : result === 'wrong' ? 'border-red-400 bg-red-50 text-red-600'
                        : 'border-gray-200 focus:border-orange-400'}`} />

                {result && (
                    <div className={`mt-3 text-sm font-semibold animate-fade-in ${result === 'correct' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {result === 'correct' ? '🎉 Chính xác!' : `❌ Đáp án đúng: "${current.word}"`}
                    </div>
                )}
            </div>

            <button onClick={handleCheck} disabled={!input.trim() || !!result}
                className="w-full py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 disabled:opacity-40 transition-all">
                Kiểm tra <i className="fa-solid fa-check ml-2"></i>
            </button>
        </div>
    );
}

// ==================== LISTENING MODE 3: NGHE ĐOẠN HỘI THOẠI ====================
function DialogueMode({ passages, voice, rate, onDone }: {
    passages: any[], voice: SpeechSynthesisVoice | null, rate: number,
    onDone: () => void
}) {
    const [idx, setIdx] = useState(0);
    const [lineIdx, setLineIdx] = useState(-1); // -1 = chưa bắt đầu
    const [playing, setPlaying] = useState(false);
    const [showVietnamese, setShowVietnamese] = useState(false);

    const current = passages[idx];
    if (!current) return <div className="text-center py-8 text-gray-400">Chưa có dữ liệu hội thoại.</div>;

    const lines = current.lines || [];

    const playAll = async () => {
        setPlaying(true);
        setLineIdx(0);
        for (let i = 0; i < lines.length; i++) {
            setLineIdx(i);
            await new Promise<void>(resolve => {
                window.speechSynthesis.cancel();
                const u = new SpeechSynthesisUtterance(lines[i].en);
                u.lang = 'en-US';
                u.rate = rate;
                if (voice) u.voice = voice;
                u.onend = () => resolve();
                window.speechSynthesis.speak(u);
                setTimeout(resolve, 8000); // fallback timeout
            });
            await new Promise(r => setTimeout(r, 400));
        }
        setPlaying(false);
        setLineIdx(-1);
    };

    const stopAll = () => {
        window.speechSynthesis.cancel();
        setPlaying(false);
        setLineIdx(-1);
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Đoạn {idx + 1}/{passages.length}</span>
                    <button onClick={() => setShowVietnamese(v => !v)}
                        className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${showVietnamese ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-500'}`}>
                        {showVietnamese ? '🇻🇳 Ẩn dịch' : '🇻🇳 Xem dịch'}
                    </button>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 transition-all" style={{ width: `${((idx + 1) / passages.length) * 100}%` }} />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm">{current.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{lines.length} câu</p>
                    </div>
                    <button onClick={playing ? stopAll : playAll}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all
                            ${playing ? 'bg-red-50 text-red-500 border-2 border-red-200' : 'bg-teal-600 text-white hover:bg-teal-700'}`}>
                        <i className={`fa-solid ${playing ? 'fa-stop' : 'fa-play'}`}></i>
                        {playing ? 'Dừng' : 'Phát tất cả'}
                    </button>
                </div>

                <div className="p-4 space-y-3">
                    {lines.map((line: any, i: number) => (
                        <div key={i}
                            className={`p-3 rounded-xl border transition-all ${lineIdx === i ? 'border-teal-300 bg-teal-50' : 'border-transparent bg-gray-50'}`}>
                            <div className="flex items-start gap-3">
                                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                                    ${line.speaker === 'A' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                    {line.speaker}
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800 leading-relaxed">{line.en}</p>
                                    {showVietnamese && (
                                        <p className="text-xs text-gray-400 mt-1 italic">{line.vi}</p>
                                    )}
                                </div>
                                <button onClick={() => speakEnglish(line.en, voice, rate)}
                                    className="shrink-0 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-teal-50 hover:border-teal-300 transition-colors">
                                    <i className="fa-solid fa-volume-low text-xs text-gray-400"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-3">
                {idx > 0 && (
                    <button onClick={() => { stopAll(); setIdx(i => i - 1); setShowVietnamese(false); }}
                        className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                        <i className="fa-solid fa-chevron-left mr-2"></i>Trước
                    </button>
                )}
                {idx < passages.length - 1 ? (
                    <button onClick={() => { stopAll(); setIdx(i => i + 1); setShowVietnamese(false); }}
                        className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors">
                        Tiếp theo<i className="fa-solid fa-chevron-right ml-2"></i>
                    </button>
                ) : (
                    <button onClick={() => { stopAll(); onDone(); }}
                        className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-colors">
                        Hoàn thành<i className="fa-solid fa-check ml-2"></i>
                    </button>
                )}
            </div>
        </div>
    );
}

// ==================== LISTENING MENU (giống HSK) ====================
function ListeningMenu({ vocab, passages }: { vocab: any[], passages: any[] }) {
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [speed, setSpeed] = useState(0.85);
    const [questionCount, setQuestionCount] = useState(10);
    const [activeMode, setActiveMode] = useState<'quiz' | 'type' | 'dialogue' | null>(null);
    const [result, setResult] = useState<{ score: number, total: number } | null>(null);
    const [pool, setPool] = useState<any[]>([]);

    // Load English voices
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices().filter(v =>
                v.lang.startsWith('en') && (v.name.includes('Microsoft') || v.name.includes('Google') || v.name.includes('English'))
            );
            if (voices.length > 0) {
                setAvailableVoices(voices);
                setSelectedVoice(voices[0]);
            }
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const startMode = (mode: 'quiz' | 'type' | 'dialogue') => {
        const filtered = vocab.filter(v => v.word && v.meaning);
        setPool(shuffle(filtered).slice(0, questionCount));
        setActiveMode(mode);
        setResult(null);
    };

    const handleDone = (score: number, total: number) => {
        setResult({ score, total });
        setActiveMode(null);
    };

    // Kết quả sau khi làm xong
    if (result) {
        const pct = Math.round((result.score / result.total) * 100);
        return (
            <div className="max-w-md mx-auto text-center py-12 animate-fade-in">
                <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '📚'}</div>
                <div className="text-4xl font-bold mb-1" style={{ color: pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444' }}>
                    {pct}%
                </div>
                <p className="text-gray-500 mb-2">{result.score}/{result.total} câu đúng</p>
                <p className="text-sm text-gray-400 mb-8">{pct >= 80 ? 'Xuất sắc!' : pct >= 60 ? 'Khá tốt!' : 'Cần luyện thêm!'}</p>
                <button onClick={() => setResult(null)}
                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                    Quay về menu
                </button>
            </div>
        );
    }

    // Đang trong 1 chế độ luyện tập
    if (activeMode === 'quiz') return (
        <div>
            <button onClick={() => { window.speechSynthesis.cancel(); setActiveMode(null); }}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                <i className="fa-solid fa-arrow-left"></i> Quay lại
            </button>
            <QuizMode pool={pool} allVocab={vocab} voice={selectedVoice} rate={speed} onDone={handleDone} />
        </div>
    );

    if (activeMode === 'type') return (
        <div>
            <button onClick={() => { window.speechSynthesis.cancel(); setActiveMode(null); }}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                <i className="fa-solid fa-arrow-left"></i> Quay lại
            </button>
            <TypeMode pool={pool} voice={selectedVoice} rate={speed} onDone={handleDone} />
        </div>
    );

    if (activeMode === 'dialogue') return (
        <div>
            <button onClick={() => { window.speechSynthesis.cancel(); setActiveMode(null); }}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                <i className="fa-solid fa-arrow-left"></i> Quay lại
            </button>
            <DialogueMode passages={passages} voice={selectedVoice} rate={speed} onDone={() => setResult({ score: 0, total: 0 })} />
        </div>
    );

    // MENU CHÍNH — giống giao diện HSK
    return (
        <div className="max-w-lg mx-auto animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-3xl mb-4 shadow-inner">
                    <i className="fa-solid fa-headphones"></i>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Luyện Nghe Tiếng Anh</h1>
                <p className="text-gray-500 mt-1 text-sm">Rèn luyện phản xạ nghe với giọng đọc AI</p>
            </div>

            {/* Voice selection */}
            {availableVoices.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                        <i className="fa-solid fa-microphone text-emerald-500"></i> Chọn Giọng Đọc AI:
                    </label>
                    <select value={selectedVoice?.name || ''} onChange={e => {
                        const v = availableVoices.find(v => v.name === e.target.value);
                        setSelectedVoice(v || null);
                    }} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-emerald-400">
                        {availableVoices.map(v => (
                            <option key={v.name} value={v.name}>{v.name}</option>
                        ))}
                    </select>
                    <button onClick={() => selectedVoice && speakEnglish('Hello! This is a test.', selectedVoice, speed)}
                        className="mt-3 flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                        <i className="fa-solid fa-play text-xs"></i> Nghe thử giọng này
                    </button>
                </div>
            )}

            {/* Speed */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <i className="fa-solid fa-gauge text-emerald-500"></i> Tốc độ đọc (Speed):
                </label>
                <div className="flex gap-2">
                    {[
                        { label: '🐢 Rất chậm', val: 0.55 },
                        { label: '🚶 Chậm', val: 0.7 },
                        { label: '✅ Vừa', val: 0.85 },
                        { label: '🚴 Nhanh', val: 1.0 },
                        { label: '🚀 Rất nhanh', val: 1.2 },
                    ].map(s => (
                        <button key={s.val} onClick={() => setSpeed(s.val)}
                            className={`flex-1 py-2 px-1 rounded-xl text-xs font-bold border-2 transition-all text-center
                                ${speed === s.val ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-emerald-300'}`}>
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Question count */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                    <i className="fa-solid fa-list-ol text-emerald-500"></i> Số lượng câu hỏi:
                </label>
                <div className="flex gap-2">
                    {[5, 10, 15, 20, 30].map(n => (
                        <button key={n} onClick={() => setQuestionCount(n)}
                            className={`flex-1 py-2.5 rounded-xl font-bold text-sm border-2 transition-all
                                ${questionCount === n ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300'}`}>
                            {n}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mode selection */}
            <p className="text-sm font-bold text-gray-700 mb-3">
                <i className="fa-solid fa-gamepad text-emerald-500 mr-2"></i>Chọn chế độ luyện:
            </p>
            <div className="space-y-3">
                <button onClick={() => startMode('quiz')}
                    className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-emerald-400 hover:bg-emerald-50 transition-all text-left group">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition-colors">
                        <i className="fa-solid fa-list-check text-xl text-emerald-600"></i>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800">Nghe → Trắc Nghiệm</div>
                        <div className="text-sm text-gray-500 mt-0.5">Nghe từ, chọn đáp án đúng trong 4 lựa chọn</div>
                    </div>
                    <i className="fa-solid fa-chevron-right text-gray-300 ml-auto group-hover:text-emerald-500 transition-colors"></i>
                </button>

                <button onClick={() => startMode('type')}
                    className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-orange-400 hover:bg-orange-50 transition-all text-left group">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-orange-200 transition-colors">
                        <i className="fa-solid fa-keyboard text-xl text-orange-500"></i>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800">Nghe → Gõ Từ</div>
                        <div className="text-sm text-gray-500 mt-0.5">Nghe và tự gõ từ vừa nghe được</div>
                    </div>
                    <i className="fa-solid fa-chevron-right text-gray-300 ml-auto group-hover:text-orange-400 transition-colors"></i>
                </button>

                <button onClick={() => startMode('dialogue')}
                    className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-teal-400 hover:bg-teal-50 transition-all text-left group"
                    disabled={passages.length === 0}>
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-teal-200 transition-colors">
                        <i className="fa-solid fa-comments text-xl text-teal-600"></i>
                    </div>
                    <div>
                        <div className="font-bold text-gray-800">Nghe Đoạn Hội Thoại</div>
                        <div className="text-sm text-gray-500 mt-0.5">Đắm mình vào những câu chuyện {passages.length > 0 ? `(${passages.length} đoạn)` : '(chưa có dữ liệu)'}</div>
                    </div>
                    <i className="fa-solid fa-chevron-right text-gray-300 ml-auto group-hover:text-teal-500 transition-colors"></i>
                </button>
            </div>
        </div>
    );
}

// ==================== READING — Đọc và chọn đúng/sai ====================
function ReadingPart({ vocab }: { vocab: any[] }) {
    const [pool] = useState(() => {
        const words = shuffle(vocab.filter(v => v.word && v.meaning && v.example_en)).slice(0, 12);
        return words.map(w => {
            const isTrue = Math.random() > 0.5;
            const question = isTrue ? w.meaning : (words.find(x => x.word !== w.word)?.meaning || w.meaning + '?');
            return { word: w.word, sentence: w.example_en, exampleVi: w.example_vi, question, isTrue };
        });
    });
    const [idx, setIdx] = useState(0);
    const [selected, setSelected] = useState<boolean | null>(null);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [done, setDone] = useState(false);

    const current = pool[idx];

    const handleAnswer = (answer: boolean) => {
        if (selected !== null) return;
        setSelected(answer);
        const isCorrect = answer === current.isTrue;
        playTone(isCorrect ? 'success' : 'error');
        setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
        setTimeout(() => {
            if (idx + 1 < pool.length) { setIdx(i => i + 1); setSelected(null); }
            else setDone(true);
        }, 1500);
    };

    if (pool.length === 0) return <div className="text-center text-gray-400 py-16">Chưa có dữ liệu.</div>;

    if (done) return (
        <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">📖</div>
            <div className="text-4xl font-bold text-blue-600 mb-2">{score.correct}/{score.total}</div>
            <p className="text-gray-500 mb-6">Điểm số bài Luyện Đọc</p>
            <button onClick={() => { setIdx(0); setSelected(null); setScore({ correct: 0, total: 0 }); setDone(false); }}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">Làm lại</button>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto animate-fade-in">
            <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Câu {idx + 1}/{pool.length}</span>
                    <span className="font-bold text-blue-600">{score.correct} đúng</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all" style={{ width: `${((idx + 1) / pool.length) * 100}%` }} />
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-4 font-medium">Đọc câu — Nghĩa tiếng Việt Đúng hay Sai?</p>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                    <p className="text-base font-semibold text-gray-800 leading-relaxed">{current.sentence}</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Nghĩa của <strong className="text-blue-600">"{current.word}"</strong> là:</p>
                    <p className="text-sm font-bold text-gray-800">"{current.question}"</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: '✅ Đúng', value: true },
                    { label: '❌ Sai', value: false },
                ].map(btn => {
                    let cls = "py-4 rounded-xl border-2 text-lg font-bold transition-all ";
                    if (selected === null) cls += btn.value ? "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50" : "border-gray-200 hover:border-red-400 hover:bg-red-50";
                    else if (btn.value === current.isTrue) cls += "border-emerald-500 bg-emerald-50 text-emerald-700";
                    else if (selected === btn.value) cls += "border-red-400 bg-red-50 text-red-600";
                    else cls += "border-gray-100 opacity-40";
                    return (
                        <button key={String(btn.value)} onClick={() => handleAnswer(btn.value)} disabled={selected !== null} className={cls}>
                            {btn.label}
                        </button>
                    );
                })}
            </div>
            {selected !== null && (
                <div className={`mt-4 p-3 rounded-xl text-center font-semibold animate-fade-in ${selected === current.isTrue ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                    {selected === current.isTrue ? '🎉 Chính xác!' : `❌ Sai! Nghĩa đúng: "${current.isTrue ? current.question : vocab.find(v => v.word === current.word)?.meaning}"`}
                </div>
            )}
        </div>
    );
}

// ==================== WRITING — Sắp xếp câu ====================
function WritingPart({ vocab }: { vocab: any[] }) {
    const [pool] = useState(() =>
        shuffle(vocab.filter(v => v.example_en && v.example_en.split(' ').length >= 4)).slice(0, 10)
    );
    const [idx, setIdx] = useState(0);
    const [wordBag, setWordBag] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string[]>([]);
    const [checked, setChecked] = useState<'correct' | 'wrong' | null>(null);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [done, setDone] = useState(false);
    const current = pool[idx];

    useEffect(() => {
        if (!current) return;
        const words = current.example_en.replace(/[.!?]$/, '').split(' ');
        setWordBag(shuffle([...words]));
        setAnswer([]);
        setChecked(null);
    }, [idx, current]);

    const addWord = (word: string, i: number) => {
        if (checked) return;
        setWordBag(b => b.filter((_, j) => j !== i));
        setAnswer(a => [...a, word]);
    };

    const removeWord = (word: string, i: number) => {
        if (checked) return;
        setAnswer(a => a.filter((_, j) => j !== i));
        setWordBag(b => [...b, word]);
    };

    const handleCheck = () => {
        const correct = current.example_en.replace(/[.!?]$/, '');
        const isCorrect = answer.join(' ').toLowerCase() === correct.toLowerCase();
        setChecked(isCorrect ? 'correct' : 'wrong');
        playTone(isCorrect ? 'success' : 'error');
        setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
        setTimeout(() => {
            if (idx + 1 < pool.length) setIdx(i => i + 1);
            else setDone(true);
        }, 2000);
    };

    if (pool.length === 0) return <div className="text-center text-gray-400 py-16">Chưa có dữ liệu.</div>;

    if (done) return (
        <div className="text-center py-16 animate-fade-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-4xl mb-4 shadow-inner">
                <i className="fa-solid fa-pen-nib"></i>
            </div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">{score.correct}/{score.total}</div>
            <p className="text-gray-500 mb-6">Điểm số bài Luyện Viết</p>
            <button onClick={() => { setIdx(0); setScore({ correct: 0, total: 0 }); setDone(false); }}
                className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">Làm lại</button>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto animate-fade-in">
            <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Câu {idx + 1}/{pool.length}</span>
                    <span className="font-bold text-emerald-600">{score.correct} đúng</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all" style={{ width: `${((idx + 1) / pool.length) * 100}%` }} />
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-medium">Sắp xếp các từ thành câu hoàn chỉnh</p>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 mb-3">
                    <p className="text-xs text-gray-500 mb-1">Nghĩa tiếng Việt:</p>
                    <p className="text-sm font-semibold text-emerald-800">{current.example_vi}</p>
                </div>
                <div className="min-h-[52px] bg-gray-50 border-2 border-dashed border-emerald-200 rounded-xl p-3 mb-3 flex flex-wrap gap-2">
                    {answer.length === 0 && <span className="text-gray-300 text-xs self-center">Nhấn vào từ bên dưới...</span>}
                    {answer.map((w, i) => (
                        <button key={i} onClick={() => { speakEnglish(w, null, 0.85); removeWord(w, i); }}
                            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                            {w}
                        </button>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2">
                    {wordBag.map((w, i) => (
                        <button key={i} onClick={() => { speakEnglish(w, null, 0.85); addWord(w, i); }}
                            className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium hover:border-emerald-400 hover:bg-emerald-50 transition-colors">
                            {w}
                        </button>
                    ))}
                </div>
            </div>
            {checked && (
                <div className={`p-3 rounded-xl text-center font-semibold animate-fade-in mb-3 ${checked === 'correct' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                    {checked === 'correct' ? '🎉 Chính xác!' : `❌ Đáp án đúng: "${current.example_en}"`}
                </div>
            )}
            <button onClick={handleCheck} disabled={answer.length === 0 || !!checked}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 disabled:opacity-40 transition-all">
                Kiểm tra <i className="fa-solid fa-check ml-1"></i>
            </button>
        </div>
    );
}

// ==================== MOCK TEST ====================
function MockTestPart({ vocab, passages }: { vocab: any[], passages: any[] }) {
    const [section, setSection] = useState<'listening' | 'reading' | 'writing'>('listening');
    const [scores, setScores] = useState<Record<string, number>>({});
    const [done, setDone] = useState(false);
    const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

    useEffect(() => {
        const load = () => {
            const v = window.speechSynthesis.getVoices().find(v => v.lang.startsWith('en'));
            if (v) setVoice(v);
        };
        load();
        window.speechSynthesis.onvoiceschanged = load;
    }, []);

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const maxScore = 30;

    if (done) {
        const pct = Math.round((totalScore / maxScore) * 100);
        return (
            <div className="max-w-md mx-auto text-center py-8 animate-fade-in">
                <div className="text-6xl mb-4">{pct >= 70 ? '🏆' : '📚'}</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Kết quả Thi Thử</h2>
                <div className="text-5xl font-bold mb-1" style={{ color: pct >= 70 ? '#10b981' : '#f59e0b' }}>{pct}%</div>
                <p className="text-gray-500 mb-6">{totalScore}/{maxScore} điểm</p>
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[{ label: '🎧 Nghe', key: 'listening', max: 10 }, { label: '📖 Đọc', key: 'reading', max: 10 }, { label: '✍️ Viết', key: 'writing', max: 10 }].map(s => (
                        <div key={s.key} className="bg-white rounded-xl border border-gray-100 p-3">
                            <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                            <div className="text-2xl font-bold">{scores[s.key] ?? 0}<span className="text-xs text-gray-400">/{s.max}</span></div>
                        </div>
                    ))}
                </div>
                <button onClick={() => { setScores({}); setSection('listening'); setDone(false); }}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">Thi lại</button>
            </div>
        );
    }

    const pool10 = shuffle(vocab).slice(0, 10);
    return (
        <div className="max-w-xl mx-auto">
            <div className="flex gap-2 mb-6">
                {[{ id: 'listening', label: '🎧 Nghe' }, { id: 'reading', label: '📖 Đọc' }, { id: 'writing', label: '✍️ Viết' }].map(s => (
                    <button key={s.id} onClick={() => setSection(s.id as any)}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all
                            ${section === s.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-500 border-gray-200'}
                            ${scores[s.id] !== undefined ? 'ring-2 ring-green-400 ring-offset-1' : ''}`}>
                        {s.label} {scores[s.id] !== undefined ? '✓' : ''}
                    </button>
                ))}
            </div>
            {section === 'listening' && <QuizMode pool={pool10} allVocab={vocab} voice={voice} rate={0.85}
                onDone={(s, t) => setScores(prev => ({ ...prev, listening: Math.round(s / t * 10) }))} />}
            {section === 'reading' && <ReadingPart vocab={pool10} />}
            {section === 'writing' && <WritingPart vocab={pool10} />}
            <button onClick={() => setDone(true)} disabled={Object.keys(scores).length < 3}
                className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-40 transition-all">
                {Object.keys(scores).length < 3 ? `Còn ${3 - Object.keys(scores).length} phần nữa` : 'Xem kết quả'}
            </button>
        </div>
    );
}

// ==================== MAIN EXPORT ====================
type Mode = 'listening' | 'reading' | 'writing' | 'mock';

export function StartersExercises({ vocabData, passagesData = [], mode = 'listening' }: {
    vocabData: any[], passagesData?: any[], mode?: Mode
}) {
    if (!vocabData || vocabData.length === 0) {
        return <div className="text-center py-16 text-gray-400">Chưa có dữ liệu từ vựng Starters.</div>;
    }

    // Icon + title config cho từng mode
    const modeConfig: Record<Mode, { faIcon: string, title: string, subtitle: string }> = {
        listening: { faIcon: 'fa-headphones',  title: 'Luyện Nghe Tiếng Anh',       subtitle: 'Rèn luyện phản xạ nghe với giọng đọc AI' },
        reading:   { faIcon: 'fa-book-open',   title: 'Luyện Đọc',                  subtitle: 'Đọc câu và xác định nghĩa đúng hay sai' },
        writing:   { faIcon: 'fa-pen-nib',     title: 'Luyện Viết',                 subtitle: 'Sắp xếp các từ thành câu hoàn chỉnh' },
        mock:      { faIcon: 'fa-graduation-cap', title: 'Thi Thử Cambridge Starters', subtitle: 'Bài thi mô phỏng gồm 3 phần: Nghe, Đọc, Viết' },
    };

    // Listening dùng menu riêng — không cần header chung
    if (mode === 'listening') {
        return (
            <div className="max-w-2xl mx-auto px-4 py-8">
                <ListeningMenu vocab={vocabData} passages={passagesData} />
            </div>
        );
    }

    const h = modeConfig[mode];
    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto text-3xl mb-4 shadow-inner">
                    <i className={`fa-solid ${h.faIcon}`}></i>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{h.title}</h1>
                <p className="text-gray-500 text-sm">{h.subtitle}</p>
                <div className="mt-3 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                    <i className="fa-solid fa-flag"></i> Cambridge Starters
                </div>
            </div>
            {mode === 'reading' && <ReadingPart vocab={vocabData} />}
            {mode === 'writing' && <WritingPart vocab={vocabData} />}
            {mode === 'mock'    && <MockTestPart vocab={vocabData} passages={passagesData} />}
        </div>
    );
}
