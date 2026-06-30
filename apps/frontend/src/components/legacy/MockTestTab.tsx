"use client";

import React, { useState, useEffect, useRef, memo } from 'react';
import { TestEngine } from '@/lib/test-engine';
import { StartersExercises } from './StartersExercises';

const playSoundEffect = (type: 'success' | 'error') => {
    const audio = new Audio(`/audio/${type}.mp3`);
    audio.play().catch(e => console.log('Audio play failed:', e));
};

const playAudio = (text: string, isEnglish: boolean = false) => {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = isEnglish ? 'en-US' : 'zh-CN';
    utt.rate = 0.85;
    window.speechSynthesis.speak(utt);
};

export const MockTestTab = memo(({ vocabData, levelId = 'hsk1', programName }: { vocabData: any[], levelId?: string, programName?: string }) => {
    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);

    // Cambridge Starters → bài thi mô phỏng riêng
    if (levelId === 'en-starters') {
        return <StartersExercises vocabData={vocabData} mode="mock" />;
    }

    const levelNum = levelId.replace('hsk', '');
    const levelTitle = programName || (isEnglish ? 'Starters' : `HSK ${levelNum}`);
    const [phase, setPhase] = useState<'intro' | 'testing' | 'result'>('intro');
    const [questions, setQuestions] = useState<any[]>([]);
    const [idx, setIdx] = useState(0);
    const [selected, setSelected] = useState<any>(null);
    const [answers, setAnswers] = useState<any[]>([]);
    const [timeLeft, setTimeLeft] = useState(40 * 60);
    const timerRef = useRef<any>(null);

    const startMock = () => {
        const qs = TestEngine.generateMockTest(vocabData);
        setQuestions(qs);
        setIdx(0); 
        setSelected(null); 
        setAnswers([]);
        setTimeLeft(isEnglish ? 20 * 60 : 40 * 60);
        setPhase('testing');
    };

    useEffect(() => {
        if (phase !== 'testing') return;
        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) { 
                    clearInterval(timerRef.current); 
                    setPhase('result'); 
                    return 0; 
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [phase]);

    const formatTime = (s: number) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
    const current = questions[idx];

    const handleSelect = (opt: any) => {
        if (selected) return;
        setSelected(opt);
        const isCorrect = opt._uuid === current.word._uuid;
        if (isCorrect) playSoundEffect('success');
        else playSoundEffect('error');
        setAnswers(a => [...a, { correct: isCorrect }]);

        setTimeout(() => {
            setIdx(i => {
                if (i < questions.length - 1) {
                    setSelected(null);
                    return i + 1;
                } else {
                    clearInterval(timerRef.current);
                    setPhase('result');
                    return i;
                }
            });
        }, isCorrect ? 600 : 2000);
    };

    useEffect(() => {
        if (phase === 'testing' && questions[idx]) {
            const curr = questions[idx];
            if (curr.type === 'listening') {
                playAudio(curr.word.hanzi || curr.word.word, !curr.word.hanzi);
            }
        }
    }, [idx, phase, questions]);

    const handleNext = () => {
        if (idx < questions.length - 1) {
            setIdx(i => i + 1); 
            setSelected(null);
        } else {
            clearInterval(timerRef.current);
            setPhase('result');
        }
    };

    if (phase === 'intro') return (
        <div className="max-w-md mx-auto animate-fade-in mt-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-4 relative overflow-hidden">
                <div className="text-center mb-8 relative z-10">
                    <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                        <i className="fa-solid fa-graduation-cap text-4xl"></i>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        Thi Thử {levelTitle}
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">
                        {isEnglish ? `Mô phỏng đề thi ${levelTitle}` : `Mô phỏng đề thi ${levelTitle} thực tế`}
                    </p>
                </div>
                
                <div className="space-y-4 mb-8 relative z-10">
                    {[
                        { icon: 'fa-headphones', color: 'text-blue-500', bg: 'bg-blue-50', label: 'Phần 1: Nghe', desc: isEnglish ? '20 câu — nghe và chọn từ đúng' : '20 câu — nghe và chọn chữ Hán' },
                        { icon: 'fa-book-open', color: 'text-green-500', bg: 'bg-green-50', label: 'Phần 2: Đọc',  desc: isEnglish ? '20 câu — đọc và chọn nghĩa tiếng Việt' : '20 câu — đọc và chọn nghĩa' },
                        { icon: 'fa-clock', color: 'text-orange-500', bg: 'bg-orange-50', label: 'Thời gian',    desc: isEnglish ? '20 phút cho toàn bộ bài thi' : '40 phút cho toàn bộ bài thi' },
                        { icon: 'fa-trophy', color: 'text-yellow-500', bg: 'bg-yellow-50', label: 'Điểm đạt',     desc: isEnglish ? '70% trở lên — Pass' : '180/300 điểm (thang điểm HSK)' },
                    ].map(item => (
                        <div key={item.label} className="flex items-center gap-4 border border-gray-100 rounded-2xl p-4 transition-all hover:shadow-md bg-white">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                                <i className={`fa-solid ${item.icon} text-xl`}></i>
                            </div>
                            <div>
                                <div className="font-bold text-gray-800">{item.label}</div>
                                <div className="text-sm text-gray-500">{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <button onClick={startMock} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-600/30 relative z-10">
                    🚀 Bắt đầu thi thử
                </button>
                
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl pointer-events-none"></div>
            </div>
        </div>
    );

    if (phase === 'result') {
        const correct = answers.filter(a => a.correct).length;
        const hskScore = TestEngine.calcHSKScore(correct, questions.length);
        const correctPct = Math.round((correct / questions.length) * 100);
        const passed = isEnglish ? correctPct >= 70 : hskScore >= 180;
        const listenCorrect = answers.slice(0, 20).filter(a => a.correct).length;
        const readCorrect = answers.slice(20).filter(a => a.correct).length;
        
        return (
            <div className="max-w-md mx-auto animate-fade-in mt-8">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ${passed ? 'bg-green-100 text-green-500' : 'bg-orange-100 text-orange-500'}`}>
                            <i className={`fa-solid ${passed ? 'fa-trophy' : 'fa-dumbbell'} text-5xl`}></i>
                        </div>
                        
                        <div className={`text-6xl font-black mb-2 ${passed ? 'text-green-500' : 'text-orange-500'}`}>
                            {isEnglish ? `${correctPct}%` : hskScore}
                        </div>
                        
                        <div className="text-gray-500 font-medium mb-6">
                            {isEnglish ? `${correct}/${questions.length} câu đúng` : '/ 300 điểm'}
                        </div>
                        
                        <div className={`inline-block px-6 py-2 rounded-full font-bold shadow-sm mb-8
                            ${passed ? 'bg-green-50 border-2 border-green-200 text-green-700' : 'bg-orange-50 border-2 border-orange-200 text-orange-700'}`}>
                            {passed ? (isEnglish ? '✓ ĐẠT — Xuất sắc!' : `✓ ĐẠT — Đủ điều kiện ${levelTitle}`) : '✗ CHƯA ĐẠT — Cần ôn thêm'}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                        {[
                            { label: 'Phần Nghe', icon: 'fa-headphones', correct: listenCorrect, total: 20 },
                            { label: 'Phần Đọc', icon: 'fa-book-open', correct: readCorrect, total: 20 },
                        ].map(part => (
                            <div key={part.label} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                                    <i className={`fa-solid ${part.icon} mr-1`}></i> {part.label}
                                </div>
                                <div className="text-3xl font-black text-indigo-600 mb-2">{part.correct}/{part.total}</div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(part.correct/part.total)*100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex gap-3 relative z-10">
                        <button onClick={() => setPhase('intro')} className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                            Về trang chủ
                        </button>
                        <button onClick={startMock} className="flex-1 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                            Thi lại
                        </button>
                    </div>
                    
                    {passed && (
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-400 rounded-full blur-3xl mix-blend-multiply opacity-10 pointer-events-none"></div>
                    )}
                </div>
            </div>
        );
    }

    if (!current) return null;
    const isListening = current.type === 'listening';
    const section = idx < 20 ? 'Phần 1: Nghe' : 'Phần 2: Đọc';
    
    const theme = isListening ? {
        bg: 'bg-indigo-600',
        bgHover: 'hover:bg-indigo-700',
        bgLight: 'bg-indigo-50',
        bgLightHover: 'hover:bg-indigo-100',
        bgDark: 'bg-indigo-800',
        text: 'text-indigo-600',
        textLight: 'text-indigo-500',
        textLighter: 'text-indigo-100',
        border: 'border-indigo-100',
        borderHover: 'hover:border-indigo-400',
        borderDarkHover: 'hover:border-indigo-200',
        shadow: 'shadow-indigo-600/30',
        closeBg: 'bg-indigo-500',
        closeHover: 'hover:bg-indigo-400'
    } : {
        bg: 'bg-emerald-600',
        bgHover: 'hover:bg-emerald-700',
        bgLight: 'bg-emerald-50',
        bgLightHover: 'hover:bg-emerald-100',
        bgDark: 'bg-emerald-800',
        text: 'text-emerald-600',
        textLight: 'text-emerald-500',
        textLighter: 'text-emerald-100',
        border: 'border-emerald-100',
        borderHover: 'hover:border-emerald-400',
        borderDarkHover: 'hover:border-emerald-200',
        shadow: 'shadow-emerald-600/30',
        closeBg: 'bg-emerald-500',
        closeHover: 'hover:bg-emerald-400'
    };

    return (
        <div className="max-w-lg mx-auto animate-fade-in mt-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`${theme.bg} text-white px-6 py-5 transition-colors duration-500`}>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <button onClick={() => setPhase('intro')} className={`w-8 h-8 rounded-full ${theme.closeBg} ${theme.closeHover} flex items-center justify-center transition-colors mr-2`} title="Thoát">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            <span className="font-bold tracking-wide">{section}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full font-mono font-bold text-sm flex items-center gap-2 ${timeLeft < 120 ? 'bg-red-500 text-white animate-pulse' : `${theme.bgDark} ${theme.textLighter}`}`}>
                            <i className="fa-regular fa-clock"></i> {formatTime(timeLeft)}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`flex-1 h-2 ${theme.bgDark} rounded-full overflow-hidden`}>
                            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${(idx / questions.length) * 100}%` }}></div>
                        </div>
                        <span className="text-xs font-bold w-10 text-right">{idx + 1}/{questions.length}</span>
                    </div>
                </div>
                
                <div className="p-8">
                    <div className={`flex items-center justify-center gap-2 ${theme.textLight} font-medium mb-6 ${theme.bgLight} py-2 px-4 rounded-full w-max mx-auto transition-colors duration-500`}>
                        <i className={`fa-solid ${isListening ? 'fa-headphones' : 'fa-book-open'}`}></i> 
                        {isListening ? 'Nghe và chọn đáp án đúng' : 'Đọc và chọn nghĩa đúng'}
                    </div>
                    
                    <div className="text-center mb-8 min-h-[100px] flex items-center justify-center">
                        {isListening ? (
                            <button onClick={() => {
                                playAudio(current.word.hanzi || current.word.word, !current.word.hanzi);
                            }} className={`w-24 h-24 rounded-full ${theme.bgLight} ${theme.bgLightHover} flex items-center justify-center mx-auto transition-all active:scale-95 border-4 ${theme.border} ${theme.borderDarkHover} shadow-inner`}>
                                <i className={`fa-solid fa-volume-high ${theme.text} text-4xl`}></i>
                            </button>
                        ) : isEnglish ? (
                            <div className="text-5xl font-bold text-emerald-700" style={{fontFamily:'Georgia,serif'}}>{current.word.word}</div>
                        ) : (
                            <div className="text-7xl font-bold text-gray-800">{current.word.hanzi}</div>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                        {current.options.map((opt: any, i: number) => {
                            const label = ['A','B','C','D'][i];
                            let cls = 'flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ';
                            if (!selected) cls += `border-gray-100 ${theme.borderHover} ${theme.bgLightHover} hover:shadow-md cursor-pointer`;
                            else if (opt._uuid === current.word._uuid) cls += 'border-green-500 bg-green-50 shadow-sm';
                            else if (opt._uuid === selected._uuid) cls += 'border-red-400 bg-red-50 shadow-sm';
                            else cls += 'border-gray-50 opacity-40 bg-gray-50';
                            
                            const display = isListening ? (isEnglish ? opt.word : opt.hanzi) : opt.meaning;
                            
                            return (
                                <button key={i} onClick={() => handleSelect(opt)} className={cls} disabled={!!selected}>
                                    <span className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0 transition-colors
                                        ${!selected ? 'bg-gray-100 text-gray-500' : 
                                          opt._uuid === current.word._uuid ? 'bg-green-500 text-white' : 
                                          opt._uuid === selected._uuid ? 'bg-red-400 text-white' : 
                                          'bg-gray-200 text-gray-400'}`}>
                                        {label}
                                    </span>
                                    <span className={`text-lg ${isListening && !isEnglish ? 'font-bold text-2xl' : 'font-medium'} text-gray-700`}>{display}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
});
