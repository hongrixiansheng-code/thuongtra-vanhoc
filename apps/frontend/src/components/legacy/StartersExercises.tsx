"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { SpeechEngine } from '@/lib/speech-engine';

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
            setTimeout(() => inputRef.current?.focus(), 100);
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


// ==================== LISTENING DẠNG 3: MIÊU TẢ TRANH & TÌM NHÂN VẬT ====================
const pictureCharacters = [
    {
        name: 'Tom',
        audioText: 'Look at Tom. He is flying a red kite. Can you see him? Yes, he is wearing a blue t-shirt.',
        vietnameseText: 'Nhìn Tom kìa. Cậu ấy đang thả một chiếc diều màu đỏ. Bạn có thấy cậu ấy không? Có, cậu ấy đang mặc chiếc áo thun màu xanh dương.',
        x: 22,
        y: 28,
        description: 'Đang thả diều đỏ'
    },
    {
        name: 'Ann',
        audioText: 'Can you see Ann? She is riding a yellow bicycle. She is wearing a helmet.',
        vietnameseText: 'Bạn có thấy Ann không? Cô ấy đang đi một chiếc xe đạp màu vàng. Cô ấy đang đội một chiếc mũ bảo hiểm.',
        x: 18,
        y: 65,
        description: 'Đang đi xe đạp vàng'
    },
    {
        name: 'Ben',
        audioText: 'Look at Ben. He is climbing a green tree. Ben, be careful!',
        vietnameseText: 'Nhìn Ben kìa. Cậu ấy đang leo lên một cái cây màu xanh. Ben ơi, cẩn thận nhé!',
        x: 82,
        y: 38,
        description: 'Đang leo cây xanh'
    },
    {
        name: 'Lucy',
        audioText: 'Where is Lucy? Oh, she is playing with a dog. The dog is brown.',
        vietnameseText: 'Lucy đâu rồi nhỉ? Ồ, cô ấy đang chơi đùa với một chú chó. Chú chó đó màu nâu.',
        x: 52,
        y: 72,
        description: 'Đang chơi với chú chó nâu'
    },
    {
        name: 'Sophie',
        audioText: 'And this is Sophie. She is sitting on a bench. She is reading a storybook.',
        vietnameseText: 'Và đây là Sophie. Cô ấy đang ngồi trên ghế dài. Cô ấy đang đọc một cuốn sách truyện.',
        x: 75,
        y: 82,
        description: 'Đang ngồi ghế đọc sách'
    }
];

function PictureMatchingMode({ voice, rate, onDone }: {
    voice: SpeechSynthesisVoice | null,
    rate: number,
    onDone: (score: number, total: number) => void
}) {
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [matches, setMatches] = useState<Record<string, number>>({});
    const [hint, setHint] = useState<string | null>("Hãy chọn một tên, nghe gợi ý rồi nhấp vào nhân vật tương ứng trong tranh!");
    const [playingName, setPlayingName] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const handleSelectName = (name: string) => {
        if (isSubmitted) return;
        if (matches[name] !== undefined) return;
        setSelectedName(name);
        setHint(`Hãy nhấp vào nhân vật "${name}" trên tranh!`);
        
        const char = pictureCharacters.find(c => c.name === name);
        if (char) {
            setPlayingName(name);
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(char.audioText);
            u.lang = 'en-US';
            u.rate = rate;
            if (voice) u.voice = voice;
            u.onend = () => setPlayingName(null);
            window.speechSynthesis.speak(u);
        }
    };

    const handleMarkerClick = (markerIndex: number) => {
        if (isSubmitted) return;

        if (!selectedName) {
            setHint("❌ Vui lòng chọn một nhãn tên ở danh sách bên dưới trước!");
            playTone('error');
            return;
        }

        const prevMatchedNameForMarker = Object.keys(matches).find(k => matches[k] === markerIndex);

        setMatches(prev => {
            const next = { ...prev };
            delete next[selectedName];
            if (prevMatchedNameForMarker) {
                delete next[prevMatchedNameForMarker];
            }
            next[selectedName] = markerIndex;
            return next;
        });

        setSelectedName(null);
        setHint(`Đã xếp nhãn ${selectedName} vào vị trí chọn. Bạn có thể chọn tiếp nhãn khác.`);
    };

    const isAllMatched = Object.keys(matches).length === pictureCharacters.length;
    const correctCount = pictureCharacters.filter((char, idx) => matches[char.name] === idx).length;

    const handleReset = () => {
        setMatches({});
        setSelectedName(null);
        setPlayingName(null);
        setIsSubmitted(false);
        setHint("Đã làm mới! Hãy chọn một tên để bắt đầu tìm.");
        window.speechSynthesis.cancel();
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        playTone(correctCount >= 4 ? 'success' : 'error');
        setHint(`Đã chấm điểm! Bạn trả lời đúng ${correctCount}/${pictureCharacters.length} nhân vật.`);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in font-sans">
            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                @keyframes scaleUp {
                    0% { transform: scale(0.85); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .animate-shake {
                    animation: shake 0.2s ease-in-out 2;
                }
                .animate-scale-up {
                    animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
            `}</style>
            
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
                <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Bài Tập: Tìm Nhân Vật Trong Tranh</h2>
                        <p className="text-sm text-gray-500 mt-1">Nghe các gợi ý tiếng Anh của AI để nối tên vào đúng nhân vật trong công viên.</p>
                    </div>
                    <button onClick={handleReset} className="px-3 py-1.5 border border-emerald-200 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors shrink-0">
                        <i className="fa-solid fa-rotate-left mr-1"></i> Làm lại
                    </button>
                </div>

                {hint && (
                    <div className={`p-3 rounded-2xl text-sm font-semibold transition-all text-center ${
                        hint.includes('🎉') || hint.includes('Đúng') ? 'bg-green-50 text-green-700' :
                        hint.includes('❌') ? 'bg-red-50 text-red-600 animate-shake' :
                        'bg-emerald-50 text-emerald-700'
                    }`}>
                        {hint}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                {/* Names Panel */}
                <div className="md:col-span-1 bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Danh sách tên</p>
                    {pictureCharacters.map(char => {
                        const isMatched = matches[char.name] !== undefined;
                        const isSelected = selectedName === char.name;
                        const isPlaying = playingName === char.name;

                        return (
                            <button key={char.name} onClick={() => handleSelectName(char.name)}
                                disabled={isSubmitted}
                                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 font-bold text-base transition-all
                                    ${isMatched ? 'bg-emerald-50 border-emerald-200 text-emerald-700 opacity-90' :
                                      isSelected ? 'bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/20 scale-102' :
                                      'bg-white border-gray-200 text-gray-700 hover:border-emerald-400 hover:bg-emerald-50/50'}
                                    ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <span className="flex items-center gap-2">
                                    {isMatched ? <i className="fa-solid fa-circle-check text-emerald-500"></i> : <i className="fa-solid fa-user text-gray-400"></i>}
                                    {char.name}
                                </span>
                                {!isMatched && !isSubmitted && (
                                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-colors ${
                                        isSelected ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                    }`}>
                                        <i className={`fa-solid ${isPlaying ? 'fa-volume-high animate-pulse' : 'fa-play'}`}></i>
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Picture Matching Canvas */}
                <div className="md:col-span-3">
                    <div className="relative border-4 border-emerald-100 rounded-3xl overflow-hidden shadow-lg bg-gray-50 max-w-full">
                        <img src="/starters_park_exercise.png" alt="Starters Park" className="w-full h-auto block select-none pointer-events-none" />
                        
                        {/* Interactive overlay points */}
                        {pictureCharacters.map((char, index) => {
                            const matchedName = Object.keys(matches).find(k => matches[k] === index);
                            
                            return (
                                <div key={index} style={{ top: `${char.y}%`, left: `${char.x}%` }}
                                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10">
                                    {isSubmitted ? (
                                        matchedName ? (
                                            matchedName === char.name ? (
                                                <div className="bg-green-600 text-white font-bold text-xs py-1.5 px-3 rounded-full border-2 border-white shadow-lg flex items-center gap-1.5 animate-scale-up select-none whitespace-nowrap">
                                                    <i className="fa-solid fa-check text-white"></i>
                                                    {matchedName}
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="bg-red-500 text-white font-bold text-xs py-1 px-2.5 rounded-full border border-white shadow-lg flex items-center gap-1 animate-scale-up select-none whitespace-nowrap">
                                                        <i className="fa-solid fa-xmark text-white"></i>
                                                        {matchedName}
                                                    </div>
                                                    <div className="bg-green-600 text-white font-bold text-[10px] py-0.5 px-2 rounded-full border border-white shadow shadow-green-500/20 select-none whitespace-nowrap">
                                                        Đúng: {char.name}
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            <div className="bg-green-600 text-white font-bold text-xs py-1.5 px-3 rounded-full border-2 border-white shadow-lg flex items-center gap-1.5 animate-scale-up select-none whitespace-nowrap">
                                                Đúng: {char.name}
                                            </div>
                                        )
                                    ) : (
                                        matchedName ? (
                                            <button onClick={() => handleMarkerClick(index)}
                                                className="bg-emerald-600 text-white font-bold text-xs py-1.5 px-3 rounded-full border-2 border-white shadow-lg flex items-center gap-1.5 select-none whitespace-nowrap hover:bg-emerald-700 transition-colors">
                                                {matchedName}
                                            </button>
                                        ) : (
                                            <button onClick={() => handleMarkerClick(index)}
                                                className="w-10 h-10 rounded-full bg-emerald-500/90 text-white border-2 border-white shadow-lg flex items-center justify-center hover:scale-115 active:scale-95 transition-all animate-pulse duration-1000">
                                                <i className="fa-solid fa-question text-sm font-black"></i>
                                            </button>
                                        )
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            {!isSubmitted && isAllMatched && (
                <div className="mt-6 text-center">
                    <button onClick={handleSubmit}
                        className="px-8 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all w-full sm:w-auto">
                        Nộp bài & Chấm điểm <i className="fa-solid fa-paper-plane ml-2"></i>
                    </button>
                </div>
            )}

            {/* Results Panel */}
            {isSubmitted && (
                <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-3xl p-8 animate-fade-in">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">{correctCount >= 4 ? '🏆' : correctCount >= 3 ? '🎯' : '📚'}</div>
                        <h3 className="text-2xl font-bold text-emerald-800 mb-1">Kết Quả Đánh Giá</h3>
                        <div className="text-5xl font-black text-emerald-600 mb-2">{Math.round((correctCount / pictureCharacters.length) * 100)}%</div>
                        <p className="text-gray-500 font-bold">{correctCount}/{pictureCharacters.length} nhân vật đúng</p>
                    </div>

                    <h4 className="text-base font-bold text-emerald-800 mb-4">
                        <i className="fa-solid fa-circle-info mr-2"></i>Chi tiết bài nghe (Bản dịch Anh - Việt):
                    </h4>
                    <div className="space-y-4">
                        {pictureCharacters.map((char, index) => {
                            const userMatchedIndex = matches[char.name];
                            const isMatchedCorrectly = userMatchedIndex === index;
                            
                            return (
                                <div key={char.name} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 transition-all ${
                                    isMatchedCorrectly ? 'border-green-500' : 'border-red-400'
                                }`}>
                                    <div className="flex justify-between items-start gap-4 mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${
                                                isMatchedCorrectly ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                                {char.name}
                                            </span>
                                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                                {char.description}
                                            </span>
                                        </div>
                                        <span className={`text-sm font-bold flex items-center gap-1 ${
                                            isMatchedCorrectly ? 'text-green-600' : 'text-red-500'
                                        }`}>
                                            {isMatchedCorrectly ? (
                                                <><i className="fa-solid fa-circle-check"></i> Đúng</>
                                            ) : (
                                                <><i className="fa-solid fa-circle-xmark"></i> Sai</>
                                            )}
                                        </span>
                                    </div>

                                    {/* English & Vietnamese text translation */}
                                    <div className="space-y-2.5 text-sm mt-3">
                                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-100/80">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">English</p>
                                            <p className="text-gray-700 font-medium leading-relaxed">{char.audioText}</p>
                                        </div>
                                        <div className="bg-emerald-50/30 p-3 rounded-xl border border-emerald-100/50">
                                            <p className="text-xs font-bold text-emerald-600/80 uppercase tracking-widest mb-1">Tiếng Việt</p>
                                            <p className="text-emerald-800 font-medium leading-relaxed">{char.vietnameseText}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex gap-4 max-w-md mx-auto mt-8">
                        <button onClick={handleReset} className="flex-1 py-3.5 border border-emerald-200 text-emerald-600 rounded-2xl font-bold hover:bg-emerald-50 transition-all">
                            🔄 Làm lại
                        </button>
                        <button onClick={() => onDone(correctCount, pictureCharacters.length)}
                            className="flex-1 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all">
                            Hoàn thành bài tập <i className="fa-solid fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// ==================== LISTENING MENU (giống HSK) ====================
function ListeningMenu({ vocab, passages }: { vocab: any[], passages: any[] }) {
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [speed, setSpeed] = useState(0.85);
    const [questionCount, setQuestionCount] = useState(10);
    const [activeMode, setActiveMode] = useState<'quiz' | 'type' | 'dialogue' | 'picture' | null>(null);
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

    const startMode = (mode: 'quiz' | 'type' | 'dialogue' | 'picture') => {
        if (mode === 'picture') {
            setActiveMode('picture');
            setResult(null);
            return;
        }
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

    if (activeMode === 'picture') return (
        <div>
            <button onClick={() => { window.speechSynthesis.cancel(); setActiveMode(null); }}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 font-bold mb-6 transition-colors font-sans">
                <i className="fa-solid fa-arrow-left"></i> Quay lại
            </button>
            <PictureMatchingMode voice={selectedVoice} rate={speed} onDone={handleDone} />
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

                <button onClick={() => alert('Tính năng đang phát triển')}
                    className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-gray-100 text-left cursor-not-allowed opacity-60">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-image text-xl text-gray-400"></i>
                    </div>
                    <div>
                        <div className="font-bold text-gray-500 flex items-center gap-2">
                            Tìm Nhân Vật Trong Tranh
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Sắp ra mắt</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-0.5">Nghe gợi ý và xác định vị trí nhân vật trong tranh</div>
                    </div>
                    <i className="fa-solid fa-lock text-gray-300 ml-auto"></i>
                </button>

                <button onClick={() => alert('Tính năng đang phát triển')}
                    className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-gray-100 text-left cursor-not-allowed opacity-60">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-comments text-xl text-gray-400"></i>
                    </div>
                    <div>
                        <div className="font-bold text-gray-500 flex items-center gap-2">
                            Nghe Đoạn Hội Thoại
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Sắp ra mắt</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-0.5">Đắm mình vào những câu chuyện</div>
                    </div>
                    <i className="fa-solid fa-lock text-gray-300 ml-auto"></i>
                </button>
            </div>
        </div>

    );
}

// ==================== HELPER FOR ENGLISH READING EVALUATION ====================
const cleanWord = (w: string) => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim().toLowerCase();

const isWordClose = (w1: string, w2: string): boolean => {
    if (w1 === w2) return true;
    if (!w1 || !w2) return false;
    if (w1 + 's' === w2 || w2 + 's' === w1) return true;
    if (w1 + 'es' === w2 || w2 + 'es' === w1) return true;
    if (Math.abs(w1.length - w2.length) <= 1) {
        let diffs = 0;
        let i = 0, j = 0;
        while (i < w1.length && j < w2.length) {
            if (w1[i] !== w2[j]) {
                diffs++;
                if (w1.length > w2.length) i++;
                else if (w2.length > w1.length) j++;
                else { i++; j++; }
            } else {
                i++;
                j++;
            }
        }
        diffs += (w1.length - i) + (w2.length - j);
        if (diffs <= 1) return true;
    }
    return false;
};

interface WordAlignment {
    word: string;
    correct: boolean;
}

const alignEnglishWords = (target: string, heard: string): WordAlignment[] => {
    const targetWords = target.split(/\s+/).filter(Boolean);
    const heardWords = heard.split(/\s+/).filter(Boolean).map(cleanWord);
    
    let heardIdx = 0;
    return targetWords.map(tWord => {
        const cleanedT = cleanWord(tWord);
        if (!cleanedT) return { word: tWord, correct: true };
        
        let found = false;
        for (let j = heardIdx; j < Math.min(heardIdx + 3, heardWords.length); j++) {
            if (isWordClose(heardWords[j], cleanedT)) {
                heardIdx = j + 1;
                found = true;
                break;
            }
        }
        if (!found) {
            const idx = heardWords.indexOf(cleanedT, heardIdx);
            if (idx !== -1 && idx >= heardIdx) {
                heardIdx = idx + 1;
                found = true;
            }
        }
        return { word: tWord, correct: found };
    });
};

// ==================== MOCK READING — Đọc và chọn đúng/sai (Không dùng mic) ====================
function MockReadingPart({ vocab, onDone }: { vocab: any[], onDone?: (score: number, total: number) => void }) {
    const [pool] = useState(() => {
        const words = shuffle(vocab.filter(v => v.word && v.meaning && v.example_en)).slice(0, 10);
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

    useEffect(() => {
        if (done) {
            onDone?.(score.correct, score.total);
        }
    }, [done, score.correct, score.total, onDone]);

    if (pool.length === 0) return <div className="text-center text-gray-400 py-16">Chưa có dữ liệu.</div>;

    if (done) return (
        <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">📖</div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">{score.correct}/{score.total}</div>
            <p className="text-gray-500 mb-6">Điểm số phần Đọc</p>
            <button onClick={() => { setIdx(0); setSelected(null); setScore({ correct: 0, total: 0 }); setDone(false); }}
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-4 font-medium">Đọc câu — Nghĩa tiếng Việt Đúng hay Sai?</p>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4">
                    <p className="text-base font-semibold text-gray-800 leading-relaxed">{current.sentence}</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-1">Nghĩa của <strong className="text-emerald-600">"{current.word}"</strong> là:</p>
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

// ==================== READING — Đọc và AI chấm điểm phát âm ====================
function ReadingPart({ vocab }: { vocab: any[] }) {
    const [subMode, setSubMode] = useState<'vocab' | 'sentence' | null>(null);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [speed, setSpeed] = useState(0.85);

    const [pool, setPool] = useState<any[]>([]);
    const [idx, setIdx] = useState(0);

    const [speechState, setSpeechState] = useState<'idle' | 'listening' | 'evaluating' | 'done' | 'error'>('idle');
    const [score, setScore] = useState<number | null>(null);
    const [heard, setHeard] = useState('');
    const [alignment, setAlignment] = useState<WordAlignment[]>([]);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const load = () => {
            const list = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
            setAvailableVoices(list);
            const defaultVoice = list.find(v => v.name.includes('Google') || v.name.includes('Natural')) || list[0] || null;
            setSelectedVoice(defaultVoice);
        };
        load();
        window.speechSynthesis.onvoiceschanged = load;
    }, []);

    const startSubMode = (mode: 'vocab' | 'sentence') => {
        let items = [];
        if (mode === 'vocab') {
            items = shuffle(vocab.filter(v => v.word && v.ipa && v.meaning)).slice(0, 10);
        } else {
            items = shuffle(vocab.filter(v => v.example_en && v.example_vi)).slice(0, 10);
        }
        setPool(items);
        setIdx(0);
        setSubMode(mode);
        resetSpeech();
    };

    const resetSpeech = () => {
        setSpeechState('idle');
        setScore(null);
        setHeard('');
        setAlignment([]);
        if (recognitionRef.current) {
            try { recognitionRef.current.stop(); } catch (e) {}
        }
    };

    useEffect(() => {
        resetSpeech();
    }, [idx, subMode]);

    const current = pool[idx];

    const handleListen = () => {
        if (!current) return;
        window.speechSynthesis.cancel();
        const textToSpeak = subMode === 'vocab' ? current.word : current.example_en;
        speakEnglish(textToSpeak, selectedVoice, speed);
    };

    const handleSpeak = () => {
        if (!SpeechEngine.isSupported()) {
            setSpeechState('error');
            setHeard('Trình duyệt không hỗ trợ nhận dạng giọng nói. Hãy dùng Chrome hoặc Edge.');
            return;
        }

        if (speechState === 'listening') {
            try { recognitionRef.current?.stop(); } catch (e) {}
            setSpeechState('idle');
            return;
        }

        setSpeechState('listening');
        setScore(null);
        setHeard('');
        setAlignment([]);

        window.speechSynthesis.cancel();

        const target = subMode === 'vocab' ? current.word : current.example_en;
        recognitionRef.current = SpeechEngine.listen({
            lang: 'en-US',
            onStart: () => {
                setSpeechState('listening');
            },
            onResult: ({ transcript }) => {
                setSpeechState('evaluating');
                setTimeout(() => {
                    const align = alignEnglishWords(target, transcript);
                    const correctCount = align.filter(w => w.correct).length;
                    const calculatedScore = Math.round((correctCount / align.length) * 100);
                    
                    setHeard(transcript);
                    setAlignment(align);
                    setScore(calculatedScore);
                    setSpeechState('done');
                    playTone(calculatedScore >= 80 ? 'success' : 'error');
                }, 400);
            },
            onError: (msg) => {
                setSpeechState('error');
                setHeard(msg);
            }
        });
    };

    if (subMode === null) {
        return (
            <div className="max-w-lg mx-auto animate-fade-in">
                {availableVoices.length > 0 && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                            <i className="fa-solid fa-microphone text-emerald-500"></i> Chọn Giọng Đọc AI (Mẫu):
                        </label>
                        <select value={selectedVoice?.name || ''} onChange={e => {
                            const v = availableVoices.find(v => v.name === e.target.value);
                            setSelectedVoice(v || null);
                        }} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-emerald-400">
                            {availableVoices.map(v => (
                                <option key={v.name} value={v.name}>{v.name}</option>
                            ))}
                        </select>
                        <button onClick={() => selectedVoice && speakEnglish(subMode === 'vocab' ? 'banana' : 'The monkey likes bananas.', selectedVoice, speed)}
                            className="mt-3 flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                            <i className="fa-solid fa-play text-xs"></i> Nghe thử giọng này
                        </button>
                    </div>
                )}

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                        <i className="fa-solid fa-gauge text-emerald-500"></i> Tốc độ đọc mẫu (Speed):
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

                <p className="text-sm font-bold text-gray-700 mb-3">
                    <i className="fa-solid fa-gamepad text-emerald-500 mr-2"></i>Chọn chế độ luyện đọc:
                </p>
                <div className="space-y-4">
                    <button onClick={() => startSubMode('vocab')}
                        className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl border-2 border-gray-100 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-left group">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition-colors">
                            <i className="fa-solid fa-font text-xl text-emerald-600"></i>
                        </div>
                        <div>
                            <div className="font-bold text-gray-800">Luyện Đọc Từ Vựng</div>
                            <div className="text-sm text-gray-500 mt-0.5">Luyện phát âm từng từ tiếng Anh chuẩn IPA</div>
                        </div>
                        <i className="fa-solid fa-chevron-right text-gray-300 ml-auto group-hover:text-emerald-500 transition-colors"></i>
                    </button>

                    <button onClick={() => startSubMode('sentence')}
                        className="w-full flex items-center gap-4 p-5 bg-white rounded-2xl border-2 border-gray-100 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-left group">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-emerald-200 transition-colors">
                            <i className="fa-solid fa-align-left text-xl text-emerald-600"></i>
                        </div>
                        <div>
                            <div className="font-bold text-gray-800">Luyện Đọc Theo Câu</div>
                            <div className="text-sm text-gray-500 mt-0.5">Luyện đọc cả câu dài, ngữ điệu tự nhiên trôi chảy</div>
                        </div>
                        <i className="fa-solid fa-chevron-right text-gray-300 ml-auto group-hover:text-emerald-500 transition-colors"></i>
                    </button>
                </div>
            </div>
        );
    }

    if (pool.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-400">Không tìm thấy từ vựng hợp lệ cho chế độ này.</p>
                <button onClick={() => setSubMode(null)} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold">
                    Quay lại
                </button>
            </div>
        );
    }

    const barColor = score !== null && score >= 80 ? 'bg-green-500' : score !== null && score >= 50 ? 'bg-yellow-400' : 'bg-red-400';
    const scoreLabel = score !== null && score >= 90 ? '🌟 Xuất sắc!' : score !== null && score >= 80 ? '✅ Rất tốt!' : score !== null && score >= 50 ? '🟡 Khá ổn, thử lại!' : '❌ Cần luyện thêm!';

    return (
        <div className="max-w-xl mx-auto animate-fade-in font-sans">
            <div className="flex justify-between items-center mb-6">
                <button onClick={() => { window.speechSynthesis.cancel(); resetSpeech(); setSubMode(null); }}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 font-bold transition-colors">
                    <i className="fa-solid fa-arrow-left"></i> Chọn chế độ khác
                </button>
                <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Câu {idx + 1}/{pool.length}
                </span>
            </div>

            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${((idx + 1) / pool.length) * 100}%` }} />
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center relative overflow-hidden mb-6">
                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 uppercase">
                    {subMode === 'vocab' ? (current.type_short || current.type || 'Từ vựng') : 'Đọc câu'}
                </span>

                <div className="my-8">
                    {subMode === 'vocab' ? (
                        <div className="text-5xl font-extrabold text-emerald-700 leading-none tracking-wide font-serif mb-3">
                            {current.word}
                        </div>
                    ) : (
                        <div className="text-2xl font-bold text-emerald-800 leading-relaxed font-serif mb-4">
                            {current.example_en}
                        </div>
                    )}
                </div>

                <div className="min-h-[48px] flex flex-col items-center justify-center mb-2">
                    {subMode === 'vocab' && current.ipa && (
                        <div className="text-emerald-500 font-mono text-lg font-semibold mb-2 bg-emerald-50/50 px-3 py-1 rounded-lg">
                            {current.ipa}
                        </div>
                    )}
                    <div className="text-gray-600 text-base font-medium">
                        {subMode === 'vocab' ? current.meaning : current.example_vi}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex gap-4 w-full">
                    <button onClick={handleListen} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold hover:bg-emerald-100 hover:text-emerald-700 transition-all active:scale-98">
                        <i className="fa-solid fa-volume-high"></i> Nghe mẫu
                    </button>

                    <button onClick={handleSpeak} disabled={speechState === 'evaluating'}
                        className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all shadow-sm active:scale-98 disabled:opacity-50
                        ${speechState === 'listening' ? 'bg-red-500 text-white animate-pulse shadow-red-500/20' : 
                          speechState === 'done' && score !== null && score >= 80 ? 'bg-green-500 text-white shadow-green-500/20' : 
                          'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/25 hover:-translate-y-0.5'}`}>
                        <i className={`fa-solid ${speechState === 'listening' ? 'fa-stop' : speechState === 'evaluating' ? 'fa-spinner animate-spin' : 'fa-microphone'}`}></i>
                        {speechState === 'listening' ? 'Đang nghe...' : speechState === 'evaluating' ? 'AI chấm điểm...' : 'Đọc thử'}
                    </button>
                </div>
            </div>

            {speechState === 'evaluating' && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-center animate-pulse mb-6">
                    <div className="flex items-center justify-center gap-3 text-emerald-600 font-bold">
                        <i className="fa-solid fa-circle-notch animate-spin text-xl"></i>
                        <span>Đang phân tích phát âm của bạn...</span>
                    </div>
                </div>
            )}

            {speechState === 'done' && score !== null && (
                <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 animate-fade-in relative overflow-hidden mb-6">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-base font-bold text-gray-800">{scoreLabel}</span>
                        <span className={`text-3xl font-black ${score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {score}%
                        </span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-5 relative z-10">
                        <div className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`} style={{ width: `${score}%` }}></div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl mb-4 relative z-10">
                        <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Chi tiết phát âm:</p>
                        <div className="flex flex-wrap gap-2 text-lg font-serif">
                            {alignment.map((item, wIdx) => (
                                <span key={wIdx} className={`px-1.5 py-0.5 rounded transition-all font-bold ${
                                    item.correct ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50 line-through decoration-2'
                                }`}>
                                    {item.word}
                                </span>
                            ))}
                        </div>
                        {heard && (
                            <div className="mt-3 pt-3 border-t border-gray-200/60">
                                <span className="text-xs text-gray-400 font-semibold block mb-0.5">Hệ thống ghi nhận:</span>
                                <p className="text-gray-600 font-medium italic">"{heard}"</p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 relative z-10">
                        <button onClick={handleSpeak} className="flex-1 py-3 text-sm rounded-xl bg-emerald-50 text-emerald-600 font-bold hover:bg-emerald-100 transition-colors">
                            🔄 Đọc lại
                        </button>
                        {score >= 80 && idx < pool.length - 1 && (
                            <button onClick={() => setIdx(i => i + 1)} className="flex-1 py-3 text-sm rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors shadow-sm shadow-green-500/10">
                                Câu tiếp <i className="fa-solid fa-arrow-right ml-1"></i>
                            </button>
                        )}
                    </div>

                    {score >= 80 && (
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-400 rounded-full blur-3xl mix-blend-multiply opacity-20 pointer-events-none"></div>
                    )}
                </div>
            )}

            {speechState === 'error' && heard && (
                <div className="w-full text-center text-sm font-medium text-red-500 bg-red-50 rounded-2xl p-4 border border-red-100 animate-fade-in mb-6">
                    <i className="fa-solid fa-triangle-exclamation mr-2"></i> {heard}
                </div>
            )}

            <div className="flex justify-between items-center bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
                <button onClick={() => setIdx(i => Math.max(i - 1, 0))} disabled={idx <= 0}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button onClick={() => setIdx(Math.floor(Math.random() * pool.length))}
                    className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors" title="Câu ngẫu nhiên">
                    <i className="fa-solid fa-shuffle"></i>
                </button>
                <button onClick={() => setIdx(i => Math.min(i + 1, pool.length - 1))} disabled={idx >= pool.length - 1}
                    className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    );
}

// ==================== WRITING — Sắp xếp câu ====================
function WritingPart({ vocab, onDone }: { vocab: any[], onDone?: (score: number, total: number) => void }) {
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
        if (done) {
            onDone?.(score.correct, score.total);
        }
    }, [done, score.correct, score.total, onDone]);

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
    const [pool10] = useState(() => shuffle(vocab).slice(0, 10));

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
            {section === 'reading' && <MockReadingPart vocab={pool10}
                onDone={(s, t) => setScores(prev => ({ ...prev, reading: Math.round(s / t * 10) }))} />}
            {section === 'writing' && <WritingPart vocab={pool10}
                onDone={(s, t) => setScores(prev => ({ ...prev, writing: Math.round(s / t * 10) }))} />}
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
        reading:   { faIcon: 'fa-book-open',   title: 'Luyện Đọc Phát Âm',          subtitle: 'Luyện phát âm chuẩn từ vựng và câu tiếng Anh với AI' },
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
