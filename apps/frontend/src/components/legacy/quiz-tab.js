"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
export const QuizTab = memo(() => {
    const { vocabData } = React.useContext(DataContext);
    // currentLevel được lấy từ App thông qua DataContext mở rộng
    const { currentLevel } = React.useContext(DataContext);
    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);
    const [mode, setMode] = useState('dashboard'); // 'dashboard' | 'srs' | 'free'
    const handleStartReview = useCallback(() => setMode('srs'), []);

    // Chế độ ôn tự do (random) — giữ lại như cũ
    const [currentQ, setCurrentQ] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(() => { try { return parseInt(localStorage.getItem('hsk1_quiz_score') || '0'); } catch { return 0; } });
    const [total, setTotal] = useState(() => { try { return parseInt(localStorage.getItem('hsk1_quiz_total') || '0'); } catch { return 0; } });
    const [selectedOpt, setSelectedOpt] = useState(null);

    useEffect(() => { try { localStorage.setItem('hsk1_quiz_score', score); localStorage.setItem('hsk1_quiz_total', total); } catch {} }, [score, total]);

    const generateFreeQuestion = useCallback(() => {
        const correctWord = vocabData[Math.floor(Math.random() * vocabData.length)];
        const wrong = fisherYatesShuffle(vocabData.filter(w => w.id !== correctWord.id)).slice(0, 3);
        setOptions(fisherYatesShuffle([correctWord, ...wrong]));
        setCurrentQ(correctWord); setSelectedOpt(null);
    }, [vocabData]);

    useEffect(() => { if (mode === 'free') generateFreeQuestion(); }, [mode, generateFreeQuestion]);

    const handleFreeSelect = (opt) => {
        if (selectedOpt) return;
        setSelectedOpt(opt); setTotal(p => p + 1);
        if (opt.id === currentQ.id) { setScore(p => p + 1); playSoundEffect('success'); }
        else playSoundEffect('error');
    };

    // ---- DASHBOARD (màn hình chọn mode) ----
    if (mode === 'dashboard') return (
        <div className="max-w-2xl mx-auto">
            <SRSDashboard levelId={currentLevel} onStartReview={handleStartReview} />
            {/* Nút ôn tự do */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-gray-700 mb-1 flex items-center gap-2">
                    <i className="fa-solid fa-shuffle text-purple-500"></i> Ôn Tự Do
                </h3>
                <p className="text-sm text-gray-500 mb-4">Random từ bất kỳ, không theo lịch — luyện thêm khi rảnh</p>
                <button onClick={() => setMode('free')}
                    className="w-full py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors">
                    <i className="fa-solid fa-play mr-2"></i> Bắt đầu ôn tự do
                </button>
            </div>
        </div>
    );

    // ---- CHẾ ĐỘ ÔN SRS ----
    if (mode === 'srs') return (
        <SRSQuizSession levelId={currentLevel} onFinish={() => setMode('dashboard')} />
    );

    // ---- CHẾ ĐỘ TỰ DO ----
    if (!currentQ) return null;
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div className="flex items-center gap-3">
                    <button onClick={() => setMode('dashboard')} className="text-gray-400 hover:text-gray-600">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <h2 className="text-xl font-bold">Ôn Tự Do</h2>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-indigo-600">{score}/{total}</div>
                    {total > 0 && <button onClick={() => { setScore(0); setTotal(0); }} className="text-xs text-gray-400 hover:text-red-500"><i className="fa-solid fa-rotate-right"></i></button>}
                </div>
            </div>
            <div className="text-center mb-8">
                {isEnglish ? (
                    <div className="text-4xl font-bold text-emerald-700 mb-2">{currentQ.word}</div>
                ) : (
                    <div className="text-7xl font-bold text-gray-800 mb-3">{currentQ.hanzi}</div>
                )}
                {isEnglish && currentQ.ipa && (
                    <div className="text-emerald-500 font-mono text-lg mb-2">{currentQ.ipa}</div>
                )}
                <button onClick={() => {
                    if (isEnglish) {
                        window.speechSynthesis.cancel();
                        const u = new SpeechSynthesisUtterance(currentQ.word);
                        u.lang = 'en-US'; u.rate = 0.85;
                        window.speechSynthesis.speak(u);
                    } else {
                        playAudio(currentQ.hanzi);
                    }
                }} className="text-indigo-400 hover:text-indigo-600">
                    <i className="fa-solid fa-volume-high text-xl"></i>
                </button>
            </div>
            <div className="quiz-options grid grid-cols-1 md:grid-cols-2 gap-4">
                {options.map((opt, i) => {
                    let cls = "p-4 rounded-xl border-2 text-base font-medium text-left transition-all ";
                    if (!selectedOpt) cls += "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50";
                    else if (opt.id === currentQ.id) cls += "border-green-500 bg-green-50 text-green-700";
                    else if (opt.id === selectedOpt.id) cls += "border-red-500 bg-red-50 text-red-700";
                    else cls += "border-gray-200 opacity-40";
                    return <button key={i} onClick={() => handleFreeSelect(opt)} className={cls} disabled={!!selectedOpt}>{opt.meaning}</button>;
                })}
            </div>
            {selectedOpt && (
                <div className="mt-6 text-center animate-fade-in">
                    <button onClick={generateFreeQuestion} className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700">
                        Câu tiếp theo <i className="fa-solid fa-arrow-right ml-1"></i>
                    </button>
                </div>
            )}
        </div>
    );
});
