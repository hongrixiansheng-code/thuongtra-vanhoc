"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { SRS } from '@/lib/srs';

const playSoundEffect = (type: 'success' | 'error') => {
    const audio = new Audio(`/audio/${type}.mp3`);
    audio.play().catch(e => console.log('Audio play failed:', e));
};

// --- TIỆN ÍCH DỮ LIỆU ---
function fisherYatesShuffle<T>(arr: T[]): T[] {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const playAudio = (text: string, isEnglish: boolean = false) => {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = isEnglish ? 'en-US' : 'zh-CN';
    utt.rate = 0.85;
    window.speechSynthesis.speak(utt);
};

// --- ENGLISH WRITING TAB ---
const EnglishWritingTab = memo(({ vocabData, levelId }: { vocabData: any[], levelId: string }) => {
    const [phase, setPhase] = useState('setup');
    const [questionCount, setQuestionCount] = useState(10);
    const [queue, setQueue] = useState<any[]>([]);
    const [idx, setIdx] = useState(0);
    const [input, setInput] = useState('');
    const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
    const [stats, setStats] = useState({ correct: 0, wrong: 0 });
    const [showHint, setShowHint] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

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

    const check = () => {
        if (!input.trim() || !currentWord) return;
        const correct = (currentWord.word || '').toLowerCase().trim();
        const user = input.toLowerCase().trim();
        const isCorrect = user === correct;
        setResult(isCorrect ? 'correct' : 'wrong');
        if (isCorrect) {
            playSoundEffect('success');
            setStats(s => ({ ...s, correct: s.correct + 1 }));
            SRS.updateCard(levelId, currentWord._uuid || currentWord.id, true);
        } else {
            playSoundEffect('error');
            setStats(s => ({ ...s, wrong: s.wrong + 1 }));
            SRS.updateCard(levelId, currentWord._uuid || currentWord.id, false);
        }
    };

    const handleNext = useCallback(() => {
        if (idx < queue.length - 1) {
            setIdx(i => i + 1);
        } else {
            setPhase('result');
        }
    }, [idx, queue.length]);

    useEffect(() => {
        if (result !== 'correct' && result !== 'wrong') return;
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
    }, [result, handleNext]);

    if (phase === 'setup') return (
        <div className="max-w-md mx-auto animate-fade-in">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center mt-6">
                <div className="text-5xl mb-4">✍️</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Luyện Viết Tiếng Anh</h2>
                <p className="text-gray-500 text-sm mb-6">
                    Nhìn nghĩa tiếng Việt → gõ từ tiếng Anh tương ứng
                </p>
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-600 mb-3">Số câu:</p>
                    <div className="flex justify-center gap-3">
                        {[5, 10, 20].map(n => (
                            <button key={n} onClick={() => setQuestionCount(n)}
                                className={`px-5 py-2.5 rounded-xl font-bold border-2 transition
                                    ${questionCount === n
                                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                        : 'border-gray-200 text-gray-600 hover:border-indigo-200'}`}>
                                {n} câu
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={start}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-sm">
                    🚀 Bắt đầu luyện viết
                </button>
            </div>
        </div>
    );

    if (phase === 'result') {
        const pct = Math.round((stats.correct / queue.length) * 100);
        return (
            <div className="max-w-md mx-auto animate-fade-in">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center mt-6">
                    <div className="text-5xl mb-3">{pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '💪'}</div>
                    <div className="text-4xl font-bold text-indigo-600 mb-1">{pct}%</div>
                    <p className="text-gray-500 mb-6">{stats.correct}/{queue.length} từ đúng</p>
                    <div className="w-full h-3 bg-gray-100 rounded-full mb-6 overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={() => setPhase('setup')}
                            className="flex-1 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                            Chọn lại
                        </button>
                        <button onClick={start}
                            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                            Làm lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentWord) return null;
    return (
        <div className="max-w-lg mx-auto animate-fade-in mt-6">
            <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-3">
                    <button onClick={() => setPhase('setup')} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors" title="Thoát">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <span className="font-medium bg-gray-100 px-3 py-1 rounded-full">Câu {idx + 1}/{queue.length}</span>
                </div>
                <div className="flex gap-3 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                    <span className="text-green-600 font-bold">✓ {stats.correct}</span>
                    <span className="text-red-500 font-bold">✗ {stats.wrong}</span>
                </div>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mb-5 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all"
                    style={{ width: `${(idx / queue.length) * 100}%` }}></div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-4 text-center relative overflow-hidden">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 uppercase mb-4 inline-block">
                    {currentWord.type}
                </span>
                <div className="text-3xl font-bold text-gray-800 mb-2">{currentWord.meaning}</div>
                <button onClick={() => playAudio(currentWord.word, true)}
                    className="mt-2 w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto hover:bg-indigo-100 transition-colors">
                    <i className="fa-solid fa-volume-high"></i>
                </button>
                
                {showHint && (
                    <div className="mt-4 text-indigo-500 font-mono tracking-widest text-xl animate-fade-in">
                        {(currentWord.word || '').split('').map((c: string, i: number) => i === 0 ? c : '_').join(' ')}
                    </div>
                )}
                {!showHint && result !== 'correct' && (
                    <button onClick={() => setShowHint(true)} className="mt-4 text-xs text-gray-400 hover:text-gray-600 font-medium">
                        <i className="fa-regular fa-lightbulb"></i> Xem gợi ý
                    </button>
                )}
            </div>
            
            <div className="flex gap-2 mb-4">
                <input ref={inputRef} type="text" value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            if (result === 'correct' || result === 'wrong') handleNext();
                            else if (input.trim()) check();
                        }
                    }}
                    disabled={!!result}
                    placeholder="Gõ từ tiếng Anh..."
                    className={`flex-1 border-2 rounded-xl px-5 py-4 text-lg outline-none transition-colors
                        ${result === 'correct' ? 'border-green-500 bg-green-50 text-green-700 font-bold' :
                          result === 'wrong' ? 'border-red-400 bg-red-50 text-red-700 font-bold' :
                          'border-gray-200 focus:border-indigo-400 bg-white text-gray-800'}`}
                />
                {!result && (
                    <button onClick={check} className="px-6 py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                        <i className="fa-solid fa-check"></i>
                    </button>
                )}
            </div>
            
            {result === 'wrong' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in mb-4">
                    <p className="text-red-600 font-bold">✗ Đáp án đúng: <span className="font-mono text-red-700 text-lg ml-1">{currentWord.word}</span></p>
                </div>
            )}
            
            {result && (
                <button onClick={handleNext} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-colors animate-fade-in flex items-center justify-center gap-2">
                    {idx < queue.length - 1 ? <>Câu tiếp theo <i className="fa-solid fa-arrow-right"></i></> : <>Xem kết quả <i className="fa-solid fa-flag-checkered"></i></>}
                </button>
            )}
        </div>
    );
});

// --- CHINESE WRITING TAB ---
const WritingTestTab = memo(({ vocabData, levelId }: { vocabData: any[], levelId: string }) => {
    const [testState, setTestState] = useState('setup'); 
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentQIdx, setCurrentQIdx] = useState(0);
    const [currentCharIdx, setCurrentCharIdx] = useState(0);
    const [isWordFinished, setIsWordFinished] = useState(false);
    const [charResults, setCharResults] = useState<any[]>([]);
    const [wordMistakes, setWordMistakes] = useState<number[]>([]);
    const canvasRef = useRef<HTMLDivElement>(null);
    const writerRef = useRef<any>(null);

    const HanziWriterClass = useRef<any>(null);

    useEffect(() => {
        // Dynamically import hanzi-writer on client side
        import('hanzi-writer').then((m) => {
            HanziWriterClass.current = m.default || m;
        }).catch(err => console.error("Failed to load hanzi-writer", err));
    }, []);

    const currentChar = questions[currentQIdx]?.hanzi?.[currentCharIdx];

    const gradeChar = (mistakes: number) => {
        if (mistakes === 0) return { pass: true,  label: '⭐', score: 100 };
        if (mistakes === 1) return { pass: true,  label: '✓',  score: 70  };
        return                     { pass: false, label: '✗',  score: 0   };
    };

    const handleNextChar = useCallback(() => {
        const word = questions[currentQIdx];
        if (!word) return;
        if (currentCharIdx + 1 < word.hanzi.length) {
            setCurrentCharIdx(prev => prev + 1);
            setIsWordFinished(false);
        } else {
            setIsWordFinished(true);
            playAudio(word.hanzi, false);
            // Cập nhật thẻ SRS
            const totalMistakes = wordMistakes.reduce((a,b) => a+b, 0) || 0;
            const isCorrect = totalMistakes === 0;
            SRS.updateCard(levelId, word._uuid || word.id, isCorrect);
        }
    }, [questions, currentQIdx, currentCharIdx, wordMistakes, levelId]);

    const handleFullCharacterHint = () => {
        if (!HanziWriterClass.current) return;
        if (writerRef.current) { writerRef.current = null; }
        const container = canvasRef.current;
        if (!container) return;
        container.innerHTML = '';
        
        writerRef.current = HanziWriterClass.current.create(container, currentChar, {
            width: 260, height: 260,
            strokeAnimationSpeed: 4,
            delayBetweenStrokes: 10,
            showCharacter: true,
            showOutline: true,
            strokeColor: '#4f46e5',
        });
        
        writerRef.current.animateCharacter({
            onComplete: () => {
                setTimeout(() => {
                    container.innerHTML = '';
                    writerRef.current = HanziWriterClass.current.create(container, currentChar, {
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
                            setCharResults(prev => {
                                const newArr = [...prev];
                                newArr[currentCharIdx] = { char: currentChar, mistakes: mistakesCount, ...grade };
                                return newArr;
                            });
                            setWordMistakes(prev => [...prev, mistakesCount]);
                            
                            const word = questions[currentQIdx];
                            if (currentCharIdx + 1 < word.hanzi.length) {
                                setTimeout(handleNextChar, 600);
                            } else {
                                setIsWordFinished(true);
                                playAudio(word.hanzi, false);
                                SRS.updateCard(levelId, word._uuid || word.id, false); // Có xem hint coi như không thuộc 100%
                            }
                        }
                    });
                }, 1000);
            }
        });
    };

    const startTest = (num: number) => {
        const validWords = vocabData.filter(w => /^[\u4e00-\u9fa5]+$/.test(w.hanzi || ''));
        const shuffled = fisherYatesShuffle(validWords).slice(0, num);
        setQuestions(shuffled); 
        setCurrentQIdx(0); 
        setCurrentCharIdx(0); 
        setIsWordFinished(false);
        setCharResults([]); 
        setWordMistakes([]);
        setTestState('testing');
    };

    useEffect(() => {
        if (testState === 'testing' && !isWordFinished && canvasRef.current && HanziWriterClass.current) {
            const word = questions[currentQIdx];
            if (!word) return;
            const char = word.hanzi[currentCharIdx];
            canvasRef.current.innerHTML = '';
            
            try {
                writerRef.current = HanziWriterClass.current.create(canvasRef.current, char, {
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
                        setCharResults(prev => {
                            const newArr = [...prev];
                            newArr[currentCharIdx] = { char, mistakes: mistakesCount, ...grade };
                            return newArr;
                        });
                        setWordMistakes(prev => [...prev, mistakesCount]);
                        
                        if (currentCharIdx + 1 < word.hanzi.length) {
                            setTimeout(handleNextChar, 600);
                        } else { 
                            setIsWordFinished(true); 
                            playAudio(word.hanzi, false); 
                            const total = [...wordMistakes, mistakesCount].reduce((a,b)=>a+b,0);
                            SRS.updateCard(levelId, word._uuid || word.id, total === 0);
                        }
                    }
                });
            } catch(e) { console.error(e); }
        }
    }, [testState, currentQIdx, currentCharIdx, isWordFinished, questions]);

    const handleNextQuestion = () => {
        if (currentQIdx + 1 < questions.length) { 
            setCurrentQIdx(prev => prev + 1); 
            setCurrentCharIdx(0); 
            setIsWordFinished(false); 
            setCharResults([]);
            setWordMistakes([]);
        } else { 
            setTestState('finished'); 
            playSoundEffect('success'); 
        }
    };

    useEffect(() => {
        if (!isWordFinished) return;
        let handleKey: (e: KeyboardEvent) => void;
        const timer = setTimeout(() => {
            handleKey = (e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleNextQuestion();
                }
            };
            window.addEventListener('keydown', handleKey);
        }, 500);
        return () => {
            clearTimeout(timer);
            if (handleKey) window.removeEventListener('keydown', handleKey);
        };
    }, [isWordFinished]);

    if (testState === 'setup') {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center animate-fade-in mt-10">
                <div className="w-24 h-24 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mx-auto mb-6"><i className="fa-solid fa-pen-nib text-4xl"></i></div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Kiểm Tra Năng Lực Viết</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Đã đến lúc kiểm tra trí nhớ của bạn! Hãy viết ra chữ Hán tương ứng dựa trên Pinyin và Nghĩa.<br/>
                    <span className="text-pink-500 font-bold">Lưu ý: Sẽ không có nét mờ nào để nhìn theo đâu nhé!</span>
                </p>
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
                <p className="text-gray-600 mb-8 text-lg">Bạn đã tự tay viết chính xác {questions.length} từ vựng mà không cần nhìn mẫu.</p>
                <button onClick={() => setTestState('setup')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-md">
                    Làm lại bài kiểm tra
                </button>
            </div>
        );
    }

    const word = questions[currentQIdx];
    if (!word) return null;

    return (
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 animate-fade-in mt-6">
            <div className="w-full md:w-1/3 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm font-bold text-pink-500 uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full">
                        Tiến độ: Câu {currentQIdx + 1} / {questions.length}
                    </div>
                    <button onClick={() => setTestState('setup')} className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors" title="Thoát">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                    <p className="text-4xl font-bold text-indigo-600 mb-3 tracking-widest">{word.pinyin}</p>
                    <p className="text-xl text-gray-600 mb-10 font-medium">{word.meaning}</p>
                    <div className="flex justify-center gap-3 mb-4 flex-wrap">
                        {word.hanzi.split('').map((char: string, i: number) => {
                            const isCompleted = i < currentCharIdx || isWordFinished;
                            const result = charResults[i];
                            return (
                                <div key={i} className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold border-2 transition-all duration-300 ${
                                    isCompleted ? 'bg-green-50 border-green-400 text-green-600 shadow-sm' : 
                                    i === currentCharIdx ? 'bg-pink-50 border-pink-400 text-pink-500 shadow-inner scale-110' : 
                                    'bg-gray-50 border-gray-200 text-transparent'
                                }`}>
                                    {isCompleted && result ? result.label : (isCompleted ? char : (i === currentCharIdx ? '?' : ''))}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {!isWordFinished && (
                    <div className="mt-auto flex flex-col gap-3">
                        <button onClick={handleFullCharacterHint} className="w-full py-4 bg-pink-50 hover:bg-pink-100 text-pink-600 font-bold rounded-2xl transition-colors border border-pink-200 flex items-center justify-center gap-2">
                            <i className="fa-regular fa-lightbulb"></i> Xem gợi ý
                        </button>
                    </div>
                )}
            </div>
            
            <div className="w-full md:w-2/3 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden">
                {!isWordFinished ? (
                    <>
                        <p className="text-gray-500 mb-6 font-medium text-lg">
                            Hãy tự vẽ chữ Hán thứ <span className="text-pink-500 font-bold text-2xl mx-1">{currentCharIdx + 1}</span> vào ô trống
                        </p>
                        <div className="bg-gray-50 p-4 rounded-[2.5rem] shadow-inner border border-gray-200">
                            <div ref={canvasRef} className="border-2 border-dashed border-gray-300 rounded-3xl bg-white touch-none cursor-crosshair overflow-hidden" style={{width: '260px', height: '260px'}}></div>
                        </div>
                    </>
                ) : (
                    <div className="text-center animate-fade-in flex flex-col items-center z-10">
                        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm">
                            <i className="fa-solid fa-check"></i>
                        </div>
                        <h3 className="text-7xl font-bold text-gray-800 mb-4">{word.hanzi}</h3>
                        <p className="text-2xl text-green-600 mb-10 font-bold">Chính xác!</p>
                        <button onClick={handleNextQuestion} className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-xl shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-1 flex items-center gap-3">
                            Câu tiếp theo <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>
                )}
                
                {/* Background decoration for success */}
                {isWordFinished && (
                    <div className="absolute inset-0 pointer-events-none opacity-20">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-400 rounded-full blur-3xl mix-blend-multiply"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-400 rounded-full blur-3xl mix-blend-multiply"></div>
                    </div>
                )}
            </div>
        </div>
    );
});

// --- MAIN WRITING TAB EXPORT ---
export function WritingTab({ vocabData, levelId = 'hsk1' }: { vocabData: any[], levelId?: string }) {
    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);
    
    if (isEnglish) {
        return <EnglishWritingTab vocabData={vocabData} levelId={levelId} />;
    }
    
    return <WritingTestTab vocabData={vocabData} levelId={levelId} />;
}
