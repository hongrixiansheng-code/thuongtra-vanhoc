"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
export const EnglishWritingTab = memo(({ vocabData }) => {
    const [phase, setPhase] = useState('setup');
    const [questionCount, setQuestionCount] = useState(10);
    const [queue, setQueue] = useState([]);
    const [idx, setIdx] = useState(0);
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [stats, setStats] = useState({ correct: 0, wrong: 0 });
    const [showHint, setShowHint] = useState(false);
    const inputRef = useRef(null);

    const currentWord = queue[idx];

    const start = () => {
        const q = fisherYatesShuffle([...vocabData]).slice(0, questionCount);
        setQueue(q);
        setIdx(0); setInput(''); setResult(null);
        setStats({ correct: 0, wrong: 0 });
        setShowHint(false);
        setPhase('playing');
        setTimeout(() => inputRef.current?.focus(), 200);
    };

    useEffect(() => {
        if (phase === 'playing') {
            setInput(''); setResult(null); setShowHint(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [idx, phase]);

    const speak = (word) => {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(word);
        u.lang = 'en-US'; u.rate = 0.85;
        window.speechSynthesis.speak(u);
    };

    const check = () => {
        if (!input.trim()) return;
        const correct = currentWord.word.toLowerCase().trim();
        const user = input.toLowerCase().trim();
        const isCorrect = user === correct;
        setResult(isCorrect ? 'correct' : 'wrong');
        if (isCorrect) {
            playSoundEffect('success');
            setStats(s => ({ ...s, correct: s.correct + 1 }));
        } else {
            playSoundEffect('error');
            setStats(s => ({ ...s, wrong: s.wrong + 1 }));
        }
    };

    const next = () => {
        if (idx < queue.length - 1) {
            setIdx(i => i + 1);
        } else {
            setPhase('result');
        }
    };

    if (phase === 'setup') return (
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="text-5xl mb-4">✍️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Luyện Viết Tiếng Anh</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Nghe nghĩa tiếng Việt → gõ từ tiếng Anh tương ứng
                </p>
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-600 mb-3">Số câu:</p>
                    <div className="flex justify-center gap-3">
                        {[5, 10, 20].map(n => (
                            <button key={n} onClick={() => setQuestionCount(n)}
                                className={`px-5 py-2.5 rounded-xl font-bold border-2 transition
                                    ${questionCount === n
                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                        : 'border-gray-200 text-gray-600 hover:border-emerald-200'}`}>
                                {n} câu
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={start}
                    className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition">
                    🚀 Bắt đầu luyện viết
                </button>
            </div>
        </div>
    );

    if (phase === 'result') {
        const pct = Math.round((stats.correct / queue.length) * 100);
        return (
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="text-5xl mb-3">{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '💪'}</div>
                    <div className="text-4xl font-bold text-emerald-600 mb-1">{pct}%</div>
                    <p className="text-gray-500 mb-2">{stats.correct}/{queue.length} từ đúng</p>
                    <div className="flex gap-3 mt-6">
                        <button onClick={() => setPhase('setup')}
                            className="flex-1 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50">
                            Về trang chủ
                        </button>
                        <button onClick={start}
                            className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600">
                            Làm lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentWord) return null;
    return (
        <div className="max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                <span>Câu {idx + 1}/{queue.length}</span>
                <div className="flex gap-3">
                    <span className="text-green-600 font-medium">✓ {stats.correct}</span>
                    <span className="text-red-500 font-medium">✗ {stats.wrong}</span>
                </div>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mb-5">
                <div className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${(idx / queue.length) * 100}%` }}></div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-4 text-center">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 uppercase mb-4 inline-block">
                    {currentWord.type}
                </span>
                <div className="text-3xl font-bold text-gray-700 mb-2">{currentWord.meaning}</div>
                <button onClick={() => speak(currentWord.word)}
                    className="mt-2 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600
                        flex items-center justify-center mx-auto hover:bg-emerald-200 transition">
                    <i className="fa-solid fa-volume-high"></i>
                </button>
                {showHint && (
                    <div className="mt-3 text-emerald-500 font-mono tracking-widest text-xl animate-fade-in">
                        {currentWord.word.split('').map((c, i) =>
                            i === 0 ? c : '_'
                        ).join(' ')}
                    </div>
                )}
                {!showHint && result !== 'correct' && (
                    <button onClick={() => setShowHint(true)}
                        className="mt-3 text-xs text-gray-400 hover:text-gray-600">
                        💡 Xem gợi ý
                    </button>
                )}
            </div>
            <div className="flex gap-2 mb-3">
                <input ref={inputRef} type="text" value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (result === 'correct') next();
                            else if (!result) check();
                        }
                    }}
                    disabled={!!result}
                    placeholder="Gõ từ tiếng Anh..."
                    className={`flex-1 border-2 rounded-xl px-4 py-3 text-lg outline-none transition
                        ${result === 'correct' ? 'border-green-500 bg-green-50' :
                          result === 'wrong' ? 'border-red-400 bg-red-50' :
                          'border-gray-200 focus:border-emerald-400'}`}
                />
                {!result && (
                    <button onClick={check}
                        className="px-5 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600">
                        OK
                    </button>
                )}
            </div>
            {result === 'wrong' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 animate-fade-in">
                    <p className="text-red-600 font-bold">✗ Đáp án đúng: <span className="font-mono text-red-700">{currentWord.word}</span></p>
                </div>
            )}
            {result && (
                <button onClick={next}
                    className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 mt-3 animate-fade-in">
                    {idx < queue.length - 1 ? 'Tiếp theo →' : 'Xem kết quả 🎉'}
                </button>
            )}
        </div>
    );
});

export const WritingTestTab = memo(() => {
    const { vocabData, grammarData, curriculumData } = React.useContext(DataContext);    
    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);
    if (isEnglish) return <EnglishWritingTab vocabData={vocabData} />;
    const [testState, setTestState] = useState('setup'); 
    const [questions, setQuestions] = useState([]);
    const [currentQIdx, setCurrentQIdx] = useState(0);
    const [currentCharIdx, setCurrentCharIdx] = useState(0);
    const [isWordFinished, setIsWordFinished] = useState(false);
    const [charResults, setCharResults] = useState([]);
    const [wordMistakes, setWordMistakes] = useState([]);
    const canvasRef = useRef(null);
    const writerRef = useRef(null);

    const currentChar = questions[currentQIdx]?.hanzi[currentCharIdx];

    const clearHintCanvas = () => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current.querySelector('canvas');
        if (canvas && canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        const svg = canvasRef.current.querySelector('svg');
        if (svg) svg.innerHTML = '';
    };

    const resetWriterInstance = (char) => {
        if (!canvasRef.current || !char) return;
        canvasRef.current.innerHTML = '';
        writerRef.current = HanziWriter.create(canvasRef.current, char, {
            width: 200,
            height: 200,
            strokeAnimationSpeed: 4,
            delayBetweenStrokes: 10,
            showCharacter: false,
            showOutline: true,
        });
    };

    const gradeChar = (mistakes) => {
        if (mistakes === 0) return { pass: true,  label: '⭐', score: 100 };
        if (mistakes === 1) return { pass: true,  label: '✓',  score: 70  };
        return                     { pass: false, label: '✗',  score: 0   };
    };

    const handleNextChar = () => {
        const word = questions[currentQIdx];
        if (!word) return;
        if (currentCharIdx + 1 < word.hanzi.length) {
            setCurrentCharIdx(prev => prev + 1);
            setIsWordFinished(false);
        } else {
            setIsWordFinished(true);
        }
    };

    const handleFullCharacterHint = () => {
    if (writerRef.current) { writerRef.current = null; }
    const container = canvasRef.current;
    if (!container) return;
    container.innerHTML = '';
    writerRef.current = HanziWriter.create(container, currentChar, {
        width: 200, height: 200,
        strokeAnimationSpeed: 4,
        delayBetweenStrokes: 10,
        showCharacter: true,
        showOutline: true,
        strokeColor: '#1a56db',
    });
    writerRef.current.animateCharacter({
        onComplete: () => {
            setTimeout(() => {
                container.innerHTML = '';
                writerRef.current = HanziWriter.create(container, currentChar, {
                    width: 260, height: 260, padding: 15,
                    showOutline: false, showCharacter: false,
                    strokeColor: '#4f46e5', radicalColor: '#16a34a',
                    drawingColor: '#ec4899', drawingWidth: 15,
                    strokeAnimationSpeed: 4, delayBetweenStrokes: 10
                });
                let mistakesCount = 0;
                writerRef.current.quiz({
                    showHintAfterMisses: 3,
                    onMistake: () => { mistakesCount++; playSoundEffect('error'); },
                    onComplete: () => {
                        playSoundEffect('success');
                        const grade = gradeChar(mistakesCount);
                        setCharResults(prev => [...prev, { char: currentChar, mistakes: mistakesCount, ...grade }]);
                        setWordMistakes(prev => [...prev, mistakesCount]);
                        if (currentCharIdx + 1 < questions[currentQIdx].hanzi.length) {
                            setTimeout(handleNextChar, 600);
                        } else {
                            setIsWordFinished(true);
                            playAudio(questions[currentQIdx].hanzi);
                        }
                    }
                });
            }, 1000);
        }
    });
};




    const startTest = (num) => {
        const validWords = vocabData.filter(w => /^[\u4e00-\u9fa5]+$/.test(w.hanzi));
        const shuffled = fisherYatesShuffle(validWords).slice(0, num);
        setQuestions(shuffled); setCurrentQIdx(0); setCurrentCharIdx(0); setIsWordFinished(false);
        setCharResults([]); setWordMistakes([]);
        setTestState('testing');
    };

    useEffect(() => {
        if (testState === 'testing' && !isWordFinished && canvasRef.current) {
            const word = questions[currentQIdx];
            const char = word.hanzi[currentCharIdx];
            canvasRef.current.innerHTML = '';
            try {
                writerRef.current = HanziWriter.create(canvasRef.current, char, {
                    width: 260, height: 260, padding: 15, showOutline: false, showCharacter: false, 
                    strokeColor: '#4f46e5', radicalColor: '#16a34a', drawingColor: '#ec4899', drawingWidth: 15,
                    strokeAnimationSpeed: 4, delayBetweenStrokes: 10
                });
                let mistakesCount = 0;
                writerRef.current.quiz({
                    showHintAfterMisses: 3, 
                    onMistake: () => { mistakesCount++; playSoundEffect('error'); },
                    onComplete: () => {
                        playSoundEffect('success');
                        const grade = gradeChar(mistakesCount);
                        setCharResults(prev => [...prev, { char, mistakes: mistakesCount, ...grade }]);
                        setWordMistakes(prev => [...prev, mistakesCount]);
                        if (currentCharIdx + 1 < word.hanzi.length) setTimeout(handleNextChar, 600);
                        else { setIsWordFinished(true); playAudio(word.hanzi); }
                    }
                });
            } catch(e) { console.error(e); }
        }
    }, [testState, currentQIdx, currentCharIdx, isWordFinished, questions]);

    const handleNextQuestion = () => {
        if (currentQIdx + 1 < questions.length) { setCurrentQIdx(prev => prev + 1); setCurrentCharIdx(0); setIsWordFinished(false); } 
        else { setTestState('finished'); playSoundEffect('success'); }
    };

    if (testState === 'setup') {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center animate-fade-in mt-10">
                <div className="w-24 h-24 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-6"><i className="fa-solid fa-pen-nib text-4xl"></i></div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Kiểm Tra Năng Lực Viết</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">Đã đến lúc kiểm tra trí nhớ của bạn! Hãy viết ra chữ Hán tương ứng dựa trên Pinyin và Nghĩa.<br/><span className="text-pink-500 font-bold">Lưu ý: Sẽ không có nét mờ nào để nhìn theo đâu nhé!</span></p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button onClick={() => startTest(5)} className="px-8 py-4 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-lg rounded-2xl transition-colors border border-pink-200">5 Câu</button>
                    <button onClick={() => startTest(10)} className="px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg rounded-2xl transition-colors shadow-lg shadow-pink-500/30">10 Câu</button>
                    <button onClick={() => startTest(20)} className="px-8 py-4 bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-lg rounded-2xl transition-colors border border-pink-200">20 Câu</button>
                </div>
            </div>
        );
    }

    if (testState === 'finished') {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center animate-fade-in mt-10">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"><i className="fa-solid fa-trophy text-5xl"></i></div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Hoàn Thành Xuất Sắc! 🎉</h2>
                <p className="text-gray-600 mb-8 text-lg">Bạn đã tự tay viết chính xác {questions.length} từ vựng HSK 1 mà không cần nhìn mẫu.</p>
                <button onClick={() => setTestState('setup')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-md">Làm lại bài kiểm tra</button>
            </div>
        );
    }

    const word = questions[currentQIdx];
    return (
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 animate-fade-in">
            <div className="w-full md:w-1/3 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col">
                <div className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-6">Tiến độ: Câu {currentQIdx + 1} / {questions.length}</div>
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <p className="text-4xl font-bold text-indigo-600 mb-3 tracking-widest">{word.pinyin}</p>
                    <p className="text-xl text-gray-600 mb-10">{word.meaning}</p>
                    <div className="flex justify-center gap-3 mb-4 flex-wrap">
                        {word.hanzi.split('').map((char, i) => {
                            const isCompleted = i < currentCharIdx || isWordFinished;
                            const result = charResults[i];
                            return (
                                <div key={i} className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold border-2 transition-all duration-300 ${isCompleted ? 'bg-green-50 border-green-400 shadow-sm' : i === currentCharIdx ? 'bg-pink-50 border-pink-400 text-pink-500 shadow-inner scale-110' : 'bg-gray-50 border-gray-200 text-transparent'}`}>
                                    {isCompleted && result ? result.label : (isCompleted ? char : (i === currentCharIdx ? '?' : ''))}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="mt-auto flex flex-col gap-3">
                    <button onClick={handleFullCharacterHint} className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-2xl transition-colors flex items-center justify-center gap-2">
                        <i className="fa-solid fa-eye"></i> Xem gợi ý
                    </button>
                </div>
            </div>
            <div className="w-full md:w-2/3 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[450px]">
                {!isWordFinished ? (
                    <>
                        <p className="text-gray-500 mb-6 font-medium text-lg">Hãy tự vẽ chữ Hán thứ <span className="text-pink-500 font-bold text-2xl">{currentCharIdx + 1}</span> vào ô trống</p>
                        <div className="bg-gray-50 p-4 rounded-[2rem] shadow-inner border border-gray-200"><div ref={canvasRef} className="border border-dashed border-gray-300 rounded-2xl bg-white touch-none" style={{width: '260px', height: '260px'}}></div></div>
                    </>
                ) : (
                    <div className="text-center animate-fade-in flex flex-col items-center">
                        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-inner"><i className="fa-solid fa-check"></i></div>
                        <h3 className="text-6xl font-bold text-gray-800 mb-4">{word.hanzi}</h3>
                        <p className="text-2xl text-green-600 mb-10 font-bold">Chính xác!</p>
                        <button onClick={handleNextQuestion} className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg shadow-pink-500/30 transition-all hover:scale-105 flex items-center gap-3">Câu tiếp theo <i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                )}
            </div>
        </div>
    );
});
