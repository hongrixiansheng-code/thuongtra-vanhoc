"use client";

import React, { useState, useCallback } from 'react';

// ==================== HELPERS ====================
const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const speak = (text: string) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
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

// ==================== PART 1: LISTENING — Nghe và chọn từ ====================
function ListeningPart({ vocab }: { vocab: any[] }) {
    const [pool] = useState(() => shuffle(vocab.filter(v => v.word && v.meaning)).slice(0, 20));
    const [idx, setIdx] = useState(0);
    const [opts, setOpts] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [done, setDone] = useState(false);

    const current = pool[idx];

    const genOptions = useCallback((word: any, allVocab: any[]) => {
        const wrong = shuffle(allVocab.filter(v => v.word !== word.word)).slice(0, 3);
        return shuffle([word, ...wrong]);
    }, []);

    useState(() => {
        if (pool.length > 0) setOpts(genOptions(pool[0], vocab));
    });

    React.useEffect(() => {
        if (current) setOpts(genOptions(current, vocab));
    }, [idx, current, vocab, genOptions]);

    const handleSpeak = () => speak(current.word);

    const handleSelect = (opt: any) => {
        if (selected) return;
        setSelected(opt);
        const correct = opt.word === current.word;
        playTone(correct ? 'success' : 'error');
        setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
        setTimeout(() => {
            if (idx + 1 < pool.length) { setIdx(i => i + 1); setSelected(null); }
            else setDone(true);
        }, 1200);
    };

    if (pool.length === 0) return <div className="text-center text-gray-400 py-16">Chưa có dữ liệu từ vựng.</div>;

    if (done) return (
        <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-4">🎉</div>
            <div className="text-4xl font-bold text-emerald-600 mb-2">{score.correct}/{score.total}</div>
            <p className="text-gray-500 mb-6">Điểm số bài Luyện Nghe</p>
            <button onClick={() => { setIdx(0); setSelected(null); setScore({ correct: 0, total: 0 }); setDone(false); }}
                className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">
                Làm lại
            </button>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto animate-fade-in">
            {/* Progress */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Câu {idx + 1}/{pool.length}</span>
                    <span className="font-bold text-emerald-600">{score.correct} đúng</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 transition-all" style={{ width: `${((idx + 1) / pool.length) * 100}%` }} />
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 text-center">
                <p className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-wider">Nghe và chọn từ đúng</p>
                <button onClick={handleSpeak}
                    className="w-24 h-24 rounded-full bg-emerald-50 border-4 border-emerald-200 flex items-center justify-center mx-auto hover:bg-emerald-100 hover:scale-105 transition-all active:scale-95 shadow-sm mb-4">
                    <i className="fa-solid fa-volume-high text-4xl text-emerald-600"></i>
                </button>
                <p className="text-sm text-gray-400">Nhấn để nghe từ, sau đó chọn đáp án</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3">
                {opts.map((opt, i) => {
                    let cls = "p-4 rounded-xl border-2 text-left transition-all font-medium ";
                    if (!selected) cls += "border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 cursor-pointer";
                    else if (opt.word === current.word) cls += "border-emerald-500 bg-emerald-50 text-emerald-700";
                    else if (selected?.word === opt.word) cls += "border-red-400 bg-red-50 text-red-600";
                    else cls += "border-gray-100 opacity-50";
                    return (
                        <button key={i} className={cls} onClick={() => handleSelect(opt)} disabled={!!selected}>
                            <div className="text-lg font-bold mb-1">{opt.word}</div>
                            <div className="text-xs text-gray-500">{opt.ipa}</div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ==================== PART 2: READING — Đọc và chọn đúng/sai ====================
function ReadingPart({ vocab }: { vocab: any[] }) {
    const [pool] = useState(() => {
        const words = shuffle(vocab.filter(v => v.word && v.meaning && v.example_en)).slice(0, 12);
        return words.map(w => {
            const isTrue = Math.random() > 0.5;
            let sentence = w.example_en;
            let question = w.meaning;
            if (!isTrue) {
                const other = words.find(x => x.word !== w.word);
                question = other ? other.meaning : w.meaning + ' (không đúng)';
            }
            return { word: w.word, sentence, question, isTrue };
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
        const correct = answer === current.isTrue;
        playTone(correct ? 'success' : 'error');
        setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
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

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-4 font-medium">Đọc câu, kiểm tra nghĩa tiếng Việt đúng hay sai</p>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                    <p className="text-lg font-semibold text-gray-800 leading-relaxed">{current.sentence}</p>
                    <button onClick={() => speak(current.sentence)} className="mt-2 text-blue-400 hover:text-blue-600">
                        <i className="fa-solid fa-volume-high text-sm"></i>
                    </button>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                    <p className="text-sm text-gray-500 mb-1">Nghĩa tiếng Việt của từ <strong className="text-blue-600">"{current.word}"</strong> là:</p>
                    <p className="text-base font-semibold text-gray-800">"{current.question}"</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: '✅ Đúng', value: true, color: selected === true ? (current.isTrue ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-red-400 text-white border-red-400') : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50' },
                    { label: '❌ Sai', value: false, color: selected === false ? (!current.isTrue ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-red-400 text-white border-red-400') : 'border-gray-200 hover:border-red-400 hover:bg-red-50' },
                ].map(btn => (
                    <button key={String(btn.value)} onClick={() => handleAnswer(btn.value)}
                        disabled={selected !== null}
                        className={`py-4 rounded-xl border-2 text-lg font-bold transition-all ${btn.color}`}>
                        {btn.label}
                    </button>
                ))}
            </div>
            {selected !== null && (
                <div className={`mt-4 p-3 rounded-xl text-center font-semibold animate-fade-in ${selected === current.isTrue ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                    {selected === current.isTrue ? '🎉 Chính xác!' : `❌ Sai rồi! Nghĩa đúng là: "${current.isTrue ? current.question : vocab.find(v => v.word === current.word)?.meaning}"`}
                </div>
            )}
        </div>
    );
}

// ==================== PART 3: WRITING — Sắp xếp câu ====================
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

    React.useEffect(() => {
        if (!current) return;
        const words = current.example_en.replace(/[.!?]$/, '').split(' ');
        setWordBag(shuffle([...words]));
        setAnswer([]);
        setChecked(null);
    }, [idx, current]);

    const addWord = (word: string, bagIdx: number) => {
        if (checked) return;
        setWordBag(b => b.filter((_, i) => i !== bagIdx));
        setAnswer(a => [...a, word]);
    };

    const removeWord = (word: string, ansIdx: number) => {
        if (checked) return;
        setAnswer(a => a.filter((_, i) => i !== ansIdx));
        setWordBag(b => [...b, word]);
    };

    const handleCheck = () => {
        if (answer.length === 0) return;
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
            <div className="text-6xl mb-4">✍️</div>
            <div className="text-4xl font-bold text-purple-600 mb-2">{score.correct}/{score.total}</div>
            <p className="text-gray-500 mb-6">Điểm số bài Luyện Viết</p>
            <button onClick={() => { setIdx(0); setScore({ correct: 0, total: 0 }); setDone(false); }}
                className="px-8 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors">Làm lại</button>
        </div>
    );

    return (
        <div className="max-w-xl mx-auto animate-fade-in">
            <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>Câu {idx + 1}/{pool.length}</span>
                    <span className="font-bold text-purple-600">{score.correct} đúng</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all" style={{ width: `${((idx + 1) / pool.length) * 100}%` }} />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-3 font-medium">Sắp xếp các từ thành câu hoàn chỉnh</p>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 mb-2">
                    <p className="text-sm text-gray-500 mb-1">Nghĩa tiếng Việt:</p>
                    <p className="text-base font-semibold text-purple-800">{current.example_vi}</p>
                </div>

                {/* Answer zone */}
                <div className="min-h-[56px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-3 mb-4 flex flex-wrap gap-2">
                    {answer.length === 0 && <span className="text-gray-300 text-sm self-center">Nhấn vào từ bên dưới để thêm vào đây...</span>}
                    {answer.map((w, i) => (
                        <button key={i} onClick={() => removeWord(w, i)}
                            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                            {w}
                        </button>
                    ))}
                </div>

                {/* Word bag */}
                <div className="flex flex-wrap gap-2">
                    {wordBag.map((w, i) => (
                        <button key={i} onClick={() => addWord(w, i)}
                            className="px-3 py-1.5 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium hover:border-purple-400 hover:bg-purple-50 transition-colors">
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
                className="w-full py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-40 transition-all">
                Kiểm tra
            </button>
        </div>
    );
}

// ==================== PART 4: MOCK TEST — Thi thử tổng hợp ====================
function MockTestPart({ vocab }: { vocab: any[] }) {
    const [section, setSection] = useState<'listening' | 'reading' | 'writing'>('listening');
    const [scores, setScores] = useState<{ listening?: number, reading?: number, writing?: number }>({});
    const [done, setDone] = useState(false);

    const totalScore = Object.values(scores).reduce((a, b) => a + (b || 0), 0);
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
                    {[
                        { label: '🎧 Nghe', score: scores.listening, max: 10 },
                        { label: '📖 Đọc', score: scores.reading, max: 10 },
                        { label: '✍️ Viết', score: scores.writing, max: 10 },
                    ].map(s => (
                        <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3">
                            <div className="text-sm text-gray-500 mb-1">{s.label}</div>
                            <div className="text-2xl font-bold text-gray-800">{s.score ?? 0}<span className="text-sm text-gray-400">/{s.max}</span></div>
                        </div>
                    ))}
                </div>
                <button onClick={() => { setScores({}); setSection('listening'); setDone(false); }}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                    Thi lại
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto">
            {/* Section tabs */}
            <div className="flex gap-2 mb-6">
                {[
                    { id: 'listening', label: '🎧 Nghe', color: 'emerald' },
                    { id: 'reading', label: '📖 Đọc', color: 'blue' },
                    { id: 'writing', label: '✍️ Viết', color: 'purple' },
                ].map(s => (
                    <button key={s.id}
                        className={`flex-1 py-2 rounded-xl text-sm font-bold border-2 transition-all
                            ${section === s.id ? `bg-${s.color}-600 text-white border-${s.color}-600` : 'bg-white text-gray-500 border-gray-200'}
                            ${scores[s.id as keyof typeof scores] !== undefined ? 'ring-2 ring-offset-1 ring-green-400' : ''}`}
                        onClick={() => setSection(s.id as any)}>
                        {s.label} {scores[s.id as keyof typeof scores] !== undefined ? '✓' : ''}
                    </button>
                ))}
            </div>

            <p className="text-xs text-gray-400 text-center mb-4">Hoàn thành cả 3 phần để xem kết quả tổng</p>

            {/* Render section */}
            {section === 'listening' && <ListeningPart vocab={shuffle(vocab).slice(0, 10)} />}
            {section === 'reading' && <ReadingPart vocab={shuffle(vocab).slice(0, 10)} />}
            {section === 'writing' && <WritingPart vocab={shuffle(vocab).slice(0, 10)} />}

            {/* Done button */}
            <button onClick={() => setDone(true)}
                disabled={Object.keys(scores).length < 3}
                className="w-full mt-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-40 transition-all">
                {Object.keys(scores).length < 3 ? `Hoàn thành thêm ${3 - Object.keys(scores).length} phần nữa` : 'Xem kết quả tổng'}
            </button>
        </div>
    );
}

// ==================== MAIN EXPORT ====================
type Mode = 'listening' | 'reading' | 'writing' | 'mock';

export function StartersExercises({ vocabData, mode = 'listening' }: { vocabData: any[], mode?: Mode }) {
    if (!vocabData || vocabData.length === 0) {
        return <div className="text-center py-16 text-gray-400">Chưa có dữ liệu từ vựng Starters.</div>;
    }

    const header = {
        listening: { icon: '🎧', title: 'Luyện Nghe', subtitle: 'Nghe từ tiếng Anh và chọn đáp án đúng', color: 'emerald' },
        reading:   { icon: '📖', title: 'Luyện Đọc',  subtitle: 'Đọc câu và xác định nghĩa đúng hay sai', color: 'blue' },
        writing:   { icon: '✍️', title: 'Luyện Viết', subtitle: 'Sắp xếp các từ thành câu có nghĩa', color: 'purple' },
        mock:      { icon: '🏆', title: 'Thi Thử Cambridge Starters', subtitle: 'Bài thi mô phỏng gồm 3 phần: Nghe, Đọc, Viết', color: 'indigo' },
    }[mode];

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">{header.icon}</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{header.title}</h1>
                <p className="text-gray-500 text-sm">{header.subtitle}</p>
                <div className="mt-3 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                    <i className="fa-solid fa-flag"></i> Cambridge Starters
                </div>
            </div>

            {/* Content */}
            {mode === 'listening' && <ListeningPart vocab={vocabData} />}
            {mode === 'reading'   && <ReadingPart vocab={vocabData} />}
            {mode === 'writing'   && <WritingPart vocab={vocabData} />}
            {mode === 'mock'      && <MockTestPart vocab={vocabData} />}
        </div>
    );
}
