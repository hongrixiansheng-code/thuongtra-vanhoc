"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
export const ChatBubble = memo(({ line }) => {
    const isA = line.speaker === 'A';
    const { vocabData } = React.useContext(DataContext);
    const { openDict } = useDictionary();
    const [isListening, setIsListening] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleSpeech = useCallback(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return alert("Trình duyệt của bạn không hỗ trợ Web Speech API.");
        const recognition = new SpeechRecognition();
        recognition.lang = 'zh-CN'; recognition.interimResults = false;
        recognition.onstart = () => { setIsListening(true); setFeedback(null); };
        recognition.onresult = (event) => {
            const raw = event.results[0][0].transcript;
            const normRaw = normalizeHomophones(raw);
            const normTarget = normalizeHomophones(line.zh);
            if (normRaw === normTarget || normRaw.includes(normTarget) || normTarget.includes(normRaw)) {
                setFeedback({ text: raw, status: 'success' }); playSoundEffect('success');
            } else { setFeedback({ text: raw, status: 'error' }); playSoundEffect('error'); }
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        try { recognition.start(); } catch(e) { setIsListening(false); }
    }, [line.zh]);

    return (
        <div className={`flex w-full mb-6 ${isA ? 'justify-start' : 'justify-end'}`}>
            <div className={`flex w-full max-w-[95%] md:max-w-[80%] ${isA ? 'flex-row' : 'flex-row-reverse'} gap-3 items-start`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm mt-1 ${isA ? 'bg-blue-500' : 'bg-green-500'}`}>{line.speaker}</div>
                <div className={`flex flex-col gap-1 w-full ${isA ? 'items-start' : 'items-end'}`}>
                    <div className={`p-4 rounded-2xl shadow-sm w-max max-w-full ${isA ? 'bg-white border border-gray-100 rounded-tl-none' : 'bg-indigo-50 border border-indigo-100 rounded-tr-none'}`}>
                        <p className="text-xl md:text-2xl font-bold text-gray-800 mb-1 text-left cursor-pointer hover:text-indigo-600 transition-colors"
                            onClick={() => {
                                if (!openDict || !vocabData) return;
                                const found = vocabData.find(w => line.zh.includes(w.hanzi));
                                if (found) openDict(found);
                            }}>
                            {line.zh}
                        </p>
                        <p className="text-indigo-600 font-medium text-sm md:text-base mb-1 text-left">{line.py}</p>
                        <p className="text-gray-500 text-xs md:text-sm italic mb-3 text-left">{line.vi}</p>
                        <div className={`flex gap-2 mt-2 pt-3 border-t ${isA ? 'border-gray-100 justify-start' : 'border-indigo-100 justify-start'}`}>
                            <button onClick={() => playAudio(line.zh)} className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"><i className="fa-solid fa-volume-high"></i> Nghe</button>
                            {hasSpeechRecognition && <button onClick={handleSpeech} disabled={isListening} className={`text-xs px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 ${isListening ? 'bg-orange-500 text-white animate-pulse' : 'bg-orange-100 hover:bg-orange-200 text-orange-700'}`}>
                                <i className={`fa-solid fa-microphone ${isListening ? 'fa-beat' : ''}`}></i> {isListening ? 'Đang nghe...' : 'Đọc thử'}
                            </button>}
                        </div>
                    </div>
                    {feedback && (
                        <div className={`mt-1 text-sm px-3 py-2 rounded-xl border animate-fade-in flex items-center gap-2.5 max-w-full w-max ${feedback.status === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                            <div className="flex-shrink-0"><i className={`fa-solid ${feedback.status === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'} text-lg`}></i></div>
                            <div className="flex flex-col text-left"><span className="font-medium text-[11px] opacity-75 uppercase tracking-wider mb-0.5">Bạn vừa đọc:</span><span className="font-bold text-base leading-none">{feedback.text}</span></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export const VocabCard = memo(({ word, onOpenWriting, onOpenDetail }) => {
    return (
        <div
            onClick={() => onOpenDetail && onOpenDetail(word)}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md
                transition-all cursor-pointer active:scale-95 p-4 flex items-center gap-4">

            {/* CỘT TRÁI — Chữ Hán lớn */}
            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center
                bg-indigo-50 rounded-xl border border-indigo-100">
                {word.hanzi ? (
                    <span className="text-4xl font-bold text-gray-800 leading-none">
                        {word.hanzi}
                    </span>
                ) : (
                    <span className="text-2xl font-bold text-emerald-700 text-center leading-tight">
                        {word.word}
                    </span>
                )}
            </div>

            {/* CỘT PHẢI — Thông tin */}
            <div className="flex-1 min-w-0">
                {/* Loại từ */}
                <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1
                    bg-indigo-100 text-indigo-700 uppercase tracking-wide">
                    {word.type}
                </span>
                {/* Pinyin / IPA */}
                {word.pinyin && (
                    <p className="text-indigo-500 font-medium text-sm mb-0.5">{word.pinyin}</p>
                )}
                {word.ipa && (
                    <p className="text-emerald-500 font-mono text-sm mb-0.5">{word.ipa}</p>
                )}
                {/* Nghĩa */}
                <p className="text-gray-700 font-medium text-sm leading-snug truncate">
                    {word.meaning}
                </p>
            </div>

            {/* Nút nghe nhỏ góc phải */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    window.speechSynthesis.cancel();
                    const u = new SpeechSynthesisUtterance(word.hanzi || word.word);
                    u.lang = word.hanzi ? 'zh-CN' : 'en-US';
                    u.rate = 0.85;
                    window.speechSynthesis.speak(u);
                }}
                className="shrink-0 w-8 h-8 flex items-center justify-center
                    text-gray-400 hover:text-indigo-600 hover:bg-indigo-50
                    rounded-full transition-colors">
                <i className="fa-solid fa-volume-high text-sm"></i>
            </button>
        </div>
    );
});

export const VocabGrid = memo(({ vocabList, onOpenWriting, onOpenDetail }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {vocabList.map(word => (
            <VocabCard
                key={word.id}
                word={word}
                onOpenWriting={onOpenWriting}
                onOpenDetail={onOpenDetail}
            />
        ))}
    </div>
));

// CurriculumTab and LessonTest moved to js/ui/curriculum-tab.js

export const MockTestTab = memo(() => {
    const { vocabData, currentLevel } = React.useContext(DataContext);
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
        setTimeLeft(40 * 60);
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
                    <h2 className="text-2xl font-bold text-gray-800">Thi Thử HSK 1</h2>
                    <p className="text-gray-500 mt-2">Mô phỏng đề thi HSK 1 thực tế</p>
                </div>
                <div className="space-y-3 mb-6">
                    {[
                        { icon: '🎧', label: 'Phần 1: Nghe',  desc: '20 câu — nghe và chọn chữ Hán' },
                        { icon: '📖', label: 'Phần 2: Đọc',   desc: '20 câu — đọc và chọn nghĩa'    },
                        { icon: '⏱',  label: 'Thời gian',     desc: '40 phút cho toàn bộ bài thi'   },
                        { icon: '🏆', label: 'Điểm đạt',      desc: '180/300 điểm (thang điểm HSK)' },
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
        const passed    = hskScore >= 180;
        const listenCorrect = answers.slice(0, 20).filter(a => a.correct).length;
        const readCorrect   = answers.slice(20).filter(a => a.correct).length;
        return (
            <div className="max-w-md mx-auto animate-fade-in">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="text-center mb-6">
                        <div className="text-5xl mb-3">{passed ? '🏆' : '💪'}</div>
                        <div className={`text-5xl font-bold mb-1 ${passed ? 'text-green-600' : 'text-orange-500'}`}>{hskScore}</div>
                        <div className="text-gray-500 text-sm">/ 300 điểm</div>
                        <div className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-bold ${passed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                            {passed ? '✓ ĐẠT — Đủ điều kiện thi HSK 1' : '✗ CHƯA ĐẠT — Cần ôn thêm'}
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
                            <button onClick={() => playAudio(current.word.hanzi)} className="w-20 h-20 rounded-full bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center mx-auto transition-all active:scale-95">
                                <i className="fa-solid fa-volume-high text-indigo-600 text-3xl"></i>
                            </button>
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
                            const display = isListening ? opt.hanzi : opt.meaning;
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

export const VocabDetailModal = memo(({ word, onClose, onOpenWriting }) => {
    return ReactDOM.createPortal(
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
        }} onClick={onClose}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-6xl font-bold mb-2">{word.hanzi}</div>
                            <div className="flex items-center gap-2">
                                <span className="text-indigo-200 text-lg">{word.pinyin}</span>
                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                                    {word.type}
                                </span>
                            </div>
                        </div>
                        <button onClick={onClose}
                            className="text-white/70 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
                            <i className="fa-solid fa-xmark text-xl"></i>
                        </button>
                    </div>
                </div>

                {/* Nội dung */}
                <div className="p-6 space-y-4">
                    {/* Nghĩa */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4">
                        <span className="text-2xl">📖</span>
                        <span className="text-xl font-medium text-gray-800">{word.meaning}</span>
                    </div>

                    {/* Nút công cụ */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => playAudio(word.hanzi)}
                            className="flex items-center justify-center gap-2 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-2xl font-medium transition-colors">
                            <i className="fa-solid fa-volume-high"></i> Nghe
                        </button>
                        <button
                            onClick={() => { onOpenWriting(word); onClose(); }}
                            className="flex items-center justify-center gap-2 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-2xl font-medium transition-colors">
                            <i className="fa-solid fa-pen-nib"></i> Luyện viết
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
});

export const VocabTab = memo(({ onOpenWriting }) => {
    const { vocabData } = React.useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMode, setSearchMode] = useState('meaning');
    const [detailWord, setDetailWord] = useState(null);

    // removePinyinTones moved to js/core/utils.js

    const searchVocab = (vocabData, query, mode) => {
        if (!query.trim()) return [];
        const q = query.trim().toLowerCase();
        const qNorm = removePinyinTones(q);

        const scored = vocabData.map(word => {
            let target = '';
            if (mode === 'pinyin') target = removePinyinTones((word.pinyin || '').toLowerCase());
            if (mode === 'hanzi') target = word.hanzi;
            if (mode === 'meaning') target = (word.meaning || '').toLowerCase();
            if (mode === 'word') target = (word.word || '').toLowerCase();

            const searchQ = mode === 'pinyin' ? qNorm : q;

            if (target === searchQ) return { word, score: 3 };
            if (target.startsWith(searchQ + ' ') || target.startsWith(searchQ + ','))
                return { word, score: 2 };

            // Tách meaning theo / và , để tìm từng phần riêng
            const parts = target.split(/[\/,]/).map(p => p.trim());
            const exactPartMatch = parts.some(p => p === searchQ || p.startsWith(searchQ));
            if (exactPartMatch) return { word, score: 2 };

            // Tìm từ đứng độc lập
            if (q.length >= 2) {
                const regex = new RegExp(`(^|[\\s\\/,])${searchQ}([\\s\\/,]|$)`);
                if (regex.test(target)) return { word, score: 1 };
            }
            return { word, score: 0 };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);

        return scored.map(item => item.word);
    };

    const filteredWords = React.useMemo(() => searchVocab(vocabData, searchTerm, searchMode), [searchTerm, searchMode, vocabData]);

    const visibleWords = filteredWords.slice(0, 50);
    const resultCount = filteredWords.length;
    const totalCount = vocabData.length;

    const handleOpenDetail = useCallback((word) => setDetailWord(word), []);
    const handleCloseDetail = useCallback(() => setDetailWord(null), []);

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 animate-fade-in">
                <div className="flex flex-col gap-3 mb-5">
                    <div className="flex-1">
                        <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Tìm bằng chữ Hán, pinyin hoặc tiếng Việt..." className="w-full px-4 py-3 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button type="button" onClick={() => setSearchMode('meaning')}
                            className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${searchMode === 'meaning' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            🇻🇳 Tiếng Việt
                        </button>
                        {/* Chỉ hiện nút Hán tự và Pinyin khi là tiếng Trung, hiện nút Tiếng Anh khi là tiếng Anh */}
                        {vocabData[0]?.hanzi ? (
                            <>
                                <button type="button" onClick={() => setSearchMode('hanzi')}
                                    className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${searchMode === 'hanzi' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                    🀄 Hán tự
                                </button>
                                <button type="button" onClick={() => setSearchMode('pinyin')}
                                    className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${searchMode === 'pinyin' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                    🔤 Pinyin
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setSearchMode('word')}
                                className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${searchMode === 'word' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                🇬🇧 Tiếng Anh
                            </button>
                        )}
                    </div>
                </div>
                {searchTerm.trim() === '' ? (
                    <div className="border border-dashed border-gray-300 rounded-3xl py-16 text-center text-gray-500">
                        <div className="flex justify-center mb-4"><i className="fa-solid fa-magnifying-glass text-4xl"></i></div>
                        <p className="text-lg font-semibold mb-2">Gõ từ cần tìm để bắt đầu</p>
                        <p className="text-sm text-gray-400">{totalCount} từ HSK1 sẵn sàng</p>
                    </div>
                ) : resultCount === 0 ? (
                    <div className="border border-dashed border-red-200 rounded-3xl py-16 text-center text-red-600">
                        <div className="flex justify-center mb-4"><i className="fa-solid fa-circle-xmark text-4xl"></i></div>
                        <p className="text-lg font-semibold">Không tìm thấy từ nào phù hợp</p>
                    </div>
                ) : (
                    <div className="text-sm text-gray-500 mb-4">Tìm thấy <span className="font-semibold text-gray-800">{resultCount}</span> kết quả{resultCount > 50 ? `, hiển thị 50 kết quả` : ''}</div>
                )}
                {searchTerm.trim() !== '' && visibleWords.length > 0 && (
                    <VocabGrid vocabList={visibleWords} onOpenWriting={onOpenWriting} onOpenDetail={handleOpenDetail} />
                )}
            </div>
            {detailWord && <VocabDetailModal word={detailWord} onClose={handleCloseDetail} onOpenWriting={onOpenWriting} />}
        </>
    );
});

export const GrammarTab = memo(() => {
    const { vocabData, grammarData, curriculumData } = React.useContext(DataContext);
    const [activeId, setActiveId] = useState(grammarData[0].id);
    return (
        <div className="flex flex-col md:flex-row gap-6 animate-fade-in">
            <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 self-start md:sticky md:top-24 max-h-[35vh] md:max-h-none md:h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide mb-6 md:mb-0">
                <h3 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2"><i className="fa-solid fa-list-ul mr-2 text-indigo-600"></i>Toàn bộ 50 Cấu Trúc</h3>
                <div className="flex flex-col gap-2">
                    {grammarData.map(g => ( <button key={g.id} onClick={() => setActiveId(g.id)} className={`text-left px-4 py-3 rounded-lg transition-colors border ${activeId === g.id ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'hover:bg-gray-50 border-transparent text-gray-600 text-sm'}`}>{g.title}</button> ))}
                </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4">
                {(() => { const g = grammarData.find(g => g.id === activeId); return g ? (
                    <div key={g.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{g.title}</h2>
                        <p className="text-gray-600 mb-8">{g.desc}</p>
                        <div className="mb-10 bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h4 className="text-sm font-bold text-gray-500 mb-4">Công thức:</h4>
                            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                {g.formula.map((item, idx) => (<div key={idx} className={`grammar-block px-5 py-3 rounded-lg border-2 text-center ${item.classes}`}>{item.text}</div>))}
                            </div>
                        </div>
                        <SentencePractice practiceList={g.practiceList} />
                    </div>
                ) : null; })()}
            </div>
        </div>
    );
});
