"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
export const MockTestTab = memo(() => {
    const { vocabData, currentLevel } = React.useContext(DataContext);
    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);
    const [phase, setPhase]     = useState('intro');
    const [questions, setQuestions] = useState([]);
    const [idx, setIdx]         = useState(0);
    const [selected, setSelected]   = useState(null);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft]   = useState(40 * 60); // 40 phút
    const timerRef = useRef(null);

    const startMock = () => {
        const qs = TestEngine.generateMockTest(vocabData);
        setQuestions(qs);
        setIdx(0); setSelected(null); setAnswers([]);
        setTimeLeft(isEnglish ? 20 * 60 : 40 * 60);
        setPhase('testing');
    };

    useEffect(() => {
        if (phase !== 'testing') return;
        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) { clearInterval(timerRef.current); setPhase('result'); return 0; }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [phase]);

    const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
    const current    = questions[idx];

    const handleSelect = (opt) => {
        if (selected) return;
        setSelected(opt);
        const isCorrect = opt.id === current.word.id;
        if (isCorrect) playSoundEffect('success');
        else playSoundEffect('error');
        setAnswers(a => [...a, { correct: isCorrect }]);
    };

    const handleNext = () => {
        if (idx < questions.length - 1) {
            setIdx(i => i + 1); setSelected(null);
        } else {
            clearInterval(timerRef.current);
            setPhase('result');
        }
    };

    if (phase === 'intro') return (
        <div className="max-w-md mx-auto animate-fade-in">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
                <div className="text-center mb-6">
                    <div className="text-5xl mb-3">🎓</div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEnglish ? 'Thi Thử Starters' : 'Thi Thử HSK 1'}
                    </h2>
                    <p className="text-gray-500 mt-2">
                        {isEnglish ? 'Mô phỏng bài thi Cambridge YLE Starters' : 'Mô phỏng đề thi HSK 1 thực tế'}
                    </p>
                </div>
                <div className="space-y-3 mb-6">
                    {[
                        { icon: '🎧', label: 'Phần 1: Nghe', desc: isEnglish ? '20 câu — nghe và chọn từ đúng' : '20 câu — nghe và chọn chữ Hán' },
                        { icon: '📖', label: 'Phần 2: Đọc',  desc: isEnglish ? '20 câu — đọc và chọn nghĩa tiếng Việt' : '20 câu — đọc và chọn nghĩa' },
                        { icon: '⏱',  label: 'Thời gian',    desc: isEnglish ? '20 phút cho toàn bộ bài thi' : '40 phút cho toàn bộ bài thi' },
                        { icon: '🏆', label: 'Điểm đạt',     desc: isEnglish ? '70% trở lên — Pass' : '180/300 điểm (thang điểm HSK)' },
                    ].map(item => (
                        <div key={item.label} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                                <div className="font-medium text-gray-700 text-sm">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={startMock}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-md">
                    🚀 Bắt đầu thi thử
                </button>
            </div>
        </div>
    );

    if (phase === 'result') {
        const correct   = answers.filter(a => a.correct).length;
        const hskScore  = TestEngine.calcHSKScore(correct, questions.length);
        const correctPct = Math.round((correct / questions.length) * 100);
        const passed    = isEnglish ? correctPct >= 70 : hskScore >= 180;
        const listenCorrect = answers.slice(0, 20).filter(a => a.correct).length;
        const readCorrect   = answers.slice(20).filter(a => a.correct).length;
        return (
            <div className="max-w-md mx-auto animate-fade-in">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="text-center mb-6">
                        <div className="text-5xl mb-3">{passed ? '🏆' : '💪'}</div>
                        <div className={`text-5xl font-bold mb-1 ${passed ? 'text-green-600' : 'text-orange-500'}`}>
                            {isEnglish ? `${correctPct}%` : hskScore}
                        </div>
                        <div className="text-gray-500 text-sm">
                            {isEnglish ? `${correct}/${questions.length} câu đúng` : '/ 300 điểm'}
                        </div>
                        <div className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-bold ${passed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {passed
                                ? (isEnglish ? '✓ ĐẠT — Xuất sắc!' : '✓ ĐẠT — Đủ điều kiện thi HSK 1')
                                : '✗ CHƯA ĐẠT — Cần ôn thêm'}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        {[
                            { label: '🎧 Phần Nghe', correct: listenCorrect, total: 20 },
                            { label: '📖 Phần Đọc',  correct: readCorrect,   total: 20 },
                        ].map(part => (
                            <div key={part.label} className="bg-gray-50 rounded-xl p-4 text-center">
                                <div className="text-sm text-gray-500 mb-2">{part.label}</div>
                                <div className="text-2xl font-bold text-indigo-600">{part.correct}/{part.total}</div>
                                <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(part.correct/part.total)*100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setPhase('intro')}
                            className="flex-1 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50">
                            Về trang chủ
                        </button>
                        <button onClick={startMock}
                            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
                            Thi lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!current) return null;
    const isListening = current.type === 'listening';
    const section     = idx < 20 ? 'Phần 1: Nghe' : 'Phần 2: Đọc';
    return (
        <div className="max-w-lg mx-auto animate-fade-in">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-indigo-600 text-white px-6 py-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-indigo-200">{section}</span>
                        <span className={`text-sm font-mono font-bold ${timeLeft < 120 ? 'text-red-300 animate-pulse' : 'text-indigo-200'}`}>⏱ {formatTime(timeLeft)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-indigo-400 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%` }}></div>
                        </div>
                        <span className="text-xs text-indigo-200">{idx + 1}/{questions.length}</span>
                    </div>
                </div>
                <div className="p-6">
                    <p className="text-gray-500 text-sm mb-4">{isListening ? '🎧 Nghe và chọn chữ Hán đúng:' : '📖 Chữ Hán sau có nghĩa là gì?'}</p>
                    <div className="text-center mb-6">
                        {isListening ? (
                            <button onClick={() => {
                                if (isEnglish) {
                                    window.speechSynthesis.cancel();
                                    const u = new SpeechSynthesisUtterance(current.word.word);
                                    u.lang = 'en-US'; u.rate = 0.85;
                                    window.speechSynthesis.speak(u);
                                } else {
                                    playAudio(current.word.hanzi);
                                }
                            }} className="w-20 h-20 rounded-full bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center mx-auto transition-all active:scale-95">
                                <i className="fa-solid fa-volume-high text-indigo-600 text-3xl"></i>
                            </button>
                        ) : isEnglish ? (
                            <div className="text-4xl font-bold text-emerald-700">{current.word.word}</div>
                        ) : (
                            <div className="text-7xl font-bold text-gray-800">{current.word.hanzi}</div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {current.options.map((opt, i) => {
                            const label = ['A','B','C','D'][i];
                            let cls = 'flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ';
                            if (!selected) cls += 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer';
                            else if (opt.id === current.word.id) cls += 'border-green-500 bg-green-50';
                            else if (opt.id === selected.id)     cls += 'border-red-400 bg-red-50';
                            else                                 cls += 'border-gray-100 opacity-40';
                            const display = isListening
                                ? (isEnglish ? opt.word : opt.hanzi)
                                : opt.meaning;
                            return (
                                <button key={i} onClick={() => handleSelect(opt)} className={cls} disabled={!!selected}>
                                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${!selected ? 'bg-gray-100 text-gray-600' : opt.id === current.word.id ? 'bg-green-500 text-white' : opt.id === selected.id ? 'bg-red-400 text-white' : 'bg-gray-100 text-gray-400'}`}>{label}</span>
                                    <span className="font-medium text-gray-700">{display}</span>
                                </button>
                            );
                        })}
                    </div>
                    {selected && (
                        <button onClick={handleNext} className="w-full mt-4 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 animate-fade-in">
                            {idx < questions.length - 1 ? 'Câu tiếp →' : 'Xem kết quả 🎉'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
});
