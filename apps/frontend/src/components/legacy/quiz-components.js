"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
export const SRSDashboard = memo(({ levelId, onStartReview }) => {
    const { vocabData } = React.useContext(DataContext);
    const [stats, setStats] = useState(null);
    const [showReset, setShowReset] = useState(false);

    useEffect(() => {
        setStats(SRS.getStats(levelId, vocabData));
    }, [levelId, vocabData]);

    if (!stats) return null;

    const total = stats.total;
    const studied = total - stats.new;
    const pct = total > 0 ? Math.round((studied / total) * 100) : 0;
    const dueCount = stats.due + stats.new;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <i className="fa-solid fa-brain text-indigo-500"></i> Ôn Tập Thông Minh (SRS)
                </h2>
                <button onClick={() => setShowReset(v => !v)}
                    className="text-xs text-gray-400 hover:text-red-400 transition-colors">
                    <i className="fa-solid fa-gear"></i>
                </button>
            </div>

            {/* Thanh tiến độ tổng */}
            <div className="mb-5">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Tiến độ tổng thể</span>
                    <span className="font-bold text-indigo-600">{pct}% ({studied}/{total} từ)</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}></div>
                </div>
            </div>

            {/* 4 ô thống kê */}
            <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                    { label: 'Từ mới', value: stats.new, color: 'bg-gray-50 border-gray-200', text: 'text-gray-600', icon: 'fa-star' },
                    { label: 'Cần ôn', value: stats.due, color: 'bg-orange-50 border-orange-200', text: 'text-orange-600', icon: 'fa-rotate-right' },
                    { label: 'Đang học', value: stats.learning, color: 'bg-blue-50 border-blue-200', text: 'text-blue-600', icon: 'fa-book-open' },
                    { label: 'Đã nhớ', value: stats.known, color: 'bg-green-50 border-green-200', text: 'text-green-600', icon: 'fa-check-circle' },
                ].map(s => (
                    <div key={s.label} className={`${s.color} border rounded-xl p-3 text-center`}>
                        <i className={`fa-solid ${s.icon} ${s.text} text-sm mb-1`}></i>
                        <div className={`text-2xl font-bold ${s.text}`}>{s.value}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Nút bắt đầu ôn */}
            <button
                onClick={() => onStartReview?.()}
                disabled={dueCount === 0}
                className={`w-full py-3 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-sm
                    ${dueCount > 0 ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                {dueCount > 0
                    ? <><i className="fa-solid fa-play"></i> Ôn {dueCount} từ hôm nay</>
                    : <><i className="fa-solid fa-check"></i> Đã ôn xong hôm nay!</>}
            </button>

            {/* Phân bố theo hộp */}
            <BoxDistribution levelId={levelId} vocabData={vocabData} />

            {/* Reset */}
            {showReset && (
                <div className="mt-4 p-3 bg-red-50 rounded-xl border border-red-200 animate-fade-in">
                    <p className="text-sm text-red-600 mb-2">⚠️ Reset sẽ xóa toàn bộ tiến độ SRS của cấp này.</p>
                    <button onClick={() => { SRS.reset(levelId); setStats(SRS.getStats(levelId, vocabData)); setShowReset(false); }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600">
                        Xác nhận Reset
                    </button>
                </div>
            )}
        </div>
    );
});

// Biểu đồ phân bố từ theo hộp
export const BoxDistribution = memo(({ levelId, vocabData }) => {
    const all = SRS.load(levelId);
    const boxes = [0, 0, 0, 0, 0];
    let newCount = 0;
    vocabData.forEach(w => {
        const card = all[w.id];
        if (!card || !card.lastSeen) { newCount++; }
        else { boxes[card.box - 1]++; }
    });

    const boxColors = ['#9ca3af', '#f87171', '#fb923c', '#facc15', '#60a5fa', '#22c55e'];
    const labels = ['Mới', 'H1', 'H2', 'H3', 'H4', 'H5'];
    const allVals = [newCount, ...boxes];

    return (
        <div className="mt-5 pt-4 border-t border-gray-100">
            <div className="flex gap-2 items-end h-16">
                {allVals.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full h-16 rounded-3xl flex items-center justify-center"
                            style={{ backgroundColor: boxColors[i] }}>
                            <span className="text-[11px] font-bold text-white drop-shadow">{val}</span>
                        </div>
                        <span className="text-[10px] text-gray-400">{labels[i]}</span>
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-400 font-medium mt-3 text-center">Phân bố từ theo hộp ôn tập</p>
        </div>
    );
});

export const SentencePractice = memo(({ practiceList }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState([]);
    const [available, setAvailable] = useState([]);
    const [status, setStatus] = useState(null);

    const practice = practiceList?.[currentIndex];

    useEffect(() => {
        if (!practice) return;
        setSelected([]); setAvailable(practice.scrambled.map((text, id) => ({ id, text }))); setStatus(null);
    }, [practice, currentIndex]);

    if (!practiceList || practiceList.length === 0) return null;

    const checkAnswer = () => {
    if (selected.length !== practice.scrambled.length) { setStatus('error'); return playSoundEffect('error'); }
    const userAnswer = selected.map(w => w.text).join(' ').replace(/\s([.,!?])/g, '$1').trim();
    const correctAnswer = practice.correct.replace(/\s([.,!?])/g, '$1').trim();
    if (userAnswer === correctAnswer) { setStatus('success'); playSoundEffect('success'); }
    else { setStatus('error'); playSoundEffect('error'); }
};

    const handleWordClick = useCallback((word, isSelecting) => {
        if (!['。', '？', '！', '，', '、'].includes(word.text)) playAudio(word.text);
        if (isSelecting) { setSelected(s => [...s, word]); setAvailable(a => a.filter(w=>w.id!==word.id)); } 
        else { setAvailable(a => [...a, word].sort((x,y)=>x.id-y.id)); setSelected(s => s.filter(w=>w.id!==word.id)); }
        setStatus(null);
    }, []);

    return (
        <div className="bg-white border-2 border-dashed border-indigo-200 p-6 rounded-xl mt-4 relative">
            <div className="absolute -top-3 left-4 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm">Thực hành {currentIndex + 1}/{practiceList.length}</div>
            <p className="text-gray-600 mb-4 text-sm mt-2">Sắp xếp thành câu đúng (Nhấn vào chữ để nghe đọc):</p>
            <div className="min-h-[60px] p-4 bg-gray-50 rounded-lg border border-gray-200 mb-4 flex flex-wrap gap-2 items-center">
                {selected.length === 0 && <span className="text-gray-400 italic text-sm">Kết quả...</span>}
                {selected.map(word => ( <button key={word.id} onClick={() => handleWordClick(word, false)} className="px-4 py-2 bg-indigo-600 text-white rounded shadow text-lg hover:bg-indigo-700 transition-colors">{word.text}</button> ))}
            </div>
            <div className="flex flex-wrap gap-3 mb-6 min-h-[50px]">
                {available.map(word => ( <button key={word.id} onClick={() => handleWordClick(word, true)} className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded shadow-sm text-lg hover:border-indigo-400 hover:text-indigo-600 transition-colors">{word.text}</button> ))}
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex gap-3">
                    {status !== 'success' && <button onClick={checkAnswer} className="px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"><i className="fa-solid fa-check"></i> Kiểm tra</button>}
                    <button onClick={() => { setSelected([]); setAvailable(practice.scrambled.map((t, id) => ({ id, text: t }))); setStatus(null); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"><i className="fa-solid fa-rotate-right"></i> Làm lại</button>
                </div>
                {status === 'success' && (
                    <div className="flex items-center gap-4 animate-fade-in">
                        <button onClick={() => setCurrentIndex(c => c < practiceList.length - 1 ? c + 1 : 0)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition-colors flex items-center gap-2">
                            {currentIndex < practiceList.length - 1 ? 'Câu tiếp theo' : 'Làm lại từ đầu'} <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                )}
                {status === 'error' && <div className="text-red-500 font-bold animate-fade-in"><i className="fa-solid fa-triangle-exclamation mr-2"></i>Sai rồi!</div>}
            </div>
        </div>
    );
});

// ========== SRS QUIZ SESSION COMPONENT ==========

export const SRSQuizSession = memo(({ levelId, onFinish }) => {
    const { vocabData } = React.useContext(DataContext);
    const [dueWords, setDueWords] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });
    const [isFinished, setIsFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const [mistakeCount, setMistakeCount] = useState(0);
    const [inputResult, setInputResult] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        const due = SRS.getDueWords(levelId, vocabData);
        setDueWords(due);
        setLoading(false);
    }, [levelId, vocabData]);

    useEffect(() => {
        if (!isFlipped && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [currentIndex, isFlipped]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-gray-500">Đang tải dữ liệu...</div>
        </div>
    );

    if (dueWords.length === 0) return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center animate-fade-in">
            <i className="fa-solid fa-check-circle text-5xl text-green-500 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Tuyệt vời!</h2>
            <p className="text-gray-600 mb-6">Không có từ cần ôn hôm nay.</p>
            <button onClick={onFinish} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
                <i className="fa-solid fa-arrow-left mr-2"></i> Quay lại
            </button>
        </div>
    );

    if (isFinished) return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center animate-fade-in">
            <div className="mb-8">
                <div className="text-6xl font-bold text-indigo-600 mb-2">{sessionStats.correct + sessionStats.wrong}</div>
                <p className="text-gray-600">từ đã ôn</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="text-3xl font-bold text-green-600">{sessionStats.correct}</div>
                    <div className="text-sm text-green-700">Nhớ được</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="text-3xl font-bold text-red-600">{sessionStats.wrong}</div>
                    <div className="text-sm text-red-700">Quên mất</div>
                </div>
            </div>
            <button onClick={onFinish} className="w-full px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                <i className="fa-solid fa-check"></i> Hoàn thành
            </button>
        </div>
    );

    const currentWord = dueWords[currentIndex];
    const progress = currentIndex + 1;
    const total = dueWords.length;

    const handleNext = (isCorrect) => {
        SRS.updateCard(levelId, currentWord.id, isCorrect);
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
        // Nhấn vào ô chữ Hán → xem nghĩa = tính là quên → 3s tự động qua từ tiếp
        setIsFlipped(true);
        playSoundEffect('error');
        setSessionStats(prev => ({ ...prev, wrong: prev.wrong + 1 }));
        SRS.updateCard(levelId, currentWord.id, false);
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

        const checkAnswer = (userInput, correctMeaning) => {
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
                return meaningStr === userStr ||
                       meaningStr.startsWith(userStr + ' ') ||
                       meaningStr.endsWith(' ' + userStr);
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
                // Sai 3 lần → lật xem nghĩa, tính quên, 3s tự động qua
                setTimeout(() => {
                    setIsFlipped(true);
                    setInputResult(null);
                    SRS.updateCard(levelId, currentWord.id, false);
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
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Từ {progress}/{total}</span>
                    <span className="font-bold text-indigo-600">{Math.round((progress / total) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-300"
                        style={{ width: `${(progress / total) * 100}%` }}></div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                {!isFlipped ? (
                    <>
                        {/* Ô chữ Hán — click để xem nghĩa = tính quên */}
                        <div onClick={handleFlipToMeaning}
                            className="cursor-pointer text-center mb-6 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 transition-all">
                            {currentWord.hanzi ? (
                                <div className="text-6xl font-bold text-gray-800 mb-3">{currentWord.hanzi}</div>
                            ) : (
                                <div className="text-4xl font-bold text-emerald-700 mb-3">{currentWord.word}</div>
                            )}
                            {currentWord.ipa && (
                                <div className="text-emerald-500 font-mono text-lg mt-1 mb-2">{currentWord.ipa}</div>
                            )}
                            {currentWord.pinyin && (
                                <div className="text-lg text-indigo-600 mb-2">{currentWord.pinyin}</div>
                            )}
                            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                                <i className="fa-solid fa-hand-pointer"></i> Nhấn để xem nghĩa
                            </p>
                        </div>

                        {/* Ô nhập nghĩa */}
                        <div className="space-y-3">
                            <p className="text-sm text-gray-500 text-center">
                                Nhập nghĩa tiếng Việt
                                {mistakeCount > 0 && <span className="text-red-400 font-bold ml-2">({mistakeCount}/3 lần sai)</span>}
                            </p>
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleCheckInput()}
                                    placeholder="Gõ nghĩa tiếng Việt..."
                                    className={`flex-1 px-4 py-3 rounded-xl border-2 outline-none transition-all text-gray-800
                                        ${inputResult === 'correct' ? 'border-green-500 bg-green-50' :
                                          inputResult === 'wrong' ? 'border-red-400 bg-red-50' :
                                          'border-gray-200 focus:border-indigo-400'}`}
                                />
                                <button onClick={handleCheckInput}
                                    className="px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                                    <i className="fa-solid fa-check"></i>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Hiện nghĩa sau khi lật — tự động qua sau 3s */
                    <div className="text-center animate-fade-in">
                        {currentWord.hanzi ? (
                            <div className="text-5xl font-bold text-gray-800 mb-2">{currentWord.hanzi}</div>
                        ) : (
                            <div className="text-4xl font-bold text-emerald-700 mb-2">{currentWord.word}</div>
                        )}
                        {currentWord.ipa && (
                            <div className="text-emerald-500 font-mono text-lg mt-1">{currentWord.ipa}</div>
                        )}
                        {currentWord.pinyin && (
                            <div className="text-lg text-indigo-600 mb-2">{currentWord.pinyin}</div>
                        )}
                        <button onClick={() => {
                            if (currentWord.hanzi) {
                                playAudio(currentWord.hanzi);
                            } else {
                                window.speechSynthesis.cancel();
                                const u = new SpeechSynthesisUtterance(currentWord.word);
                                u.lang = 'en-US'; u.rate = 0.85;
                                window.speechSynthesis.speak(u);
                            }
                        }} className="text-indigo-400 hover:text-indigo-600 mb-4">
                            <i className="fa-solid fa-volume-high text-xl"></i>
                        </button>
                        <div className="text-2xl font-semibold text-gray-800 p-4 bg-yellow-50 rounded-xl border border-yellow-200 mb-3">
                            {currentWord.meaning}
                        </div>
                        <p className="text-sm text-red-500 animate-pulse">Tự động chuyển sau 3 giây...</p>
                    </div>
                )}
            </div>

            <div className="text-center">
                <button onClick={onFinish}
                    className="text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2 mx-auto">
                    <i className="fa-solid fa-times"></i> Thoát
                </button>
            </div>
        </div>
    );
});
