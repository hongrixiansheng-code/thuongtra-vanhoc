"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
export const ListeningTab = memo(() => {
            const { vocabData, currentLevel } = React.useContext(DataContext);

            const [mode, setMode] = useState('menu');
            const [speed, setSpeed] = useState(0.7);
            const [selectedVoice, setSelectedVoice] = useState(null);
            const [availableVoices, setAvailableVoices] = useState([]);
            const [queue, setQueue] = useState([]);
            const [idx, setIdx] = useState(0);
            const [options, setOptions] = useState([]);
            const [selected, setSelected] = useState(null);
            const [pinyinInput, setPinyinInput] = useState('');
            const [inputResult, setInputResult] = useState(null);
            const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });
            const [hasPlayed, setHasPlayed] = useState(false);
            const [mistakeCount, setMistakeCount] = useState(0);
            const [finished, setFinished] = useState(false);
            const [passages, setPassages] = useState([]);
            const [activePassage, setActivePassage] = useState(0);
            const [playingLine, setPlayingLine] = useState(null);
            const [showPinyinPassage, setShowPinyinPassage] = useState(true);
            const [showViPassage, setShowViPassage] = useState(true);
            const inputRef = useRef(null);

            const [TOTAL, setTOTAL] = useState(10);

            const startSession = useCallback((selectedMode, total) => {
             const q = fisherYatesShuffle([...vocabData]).slice(0, total || TOTAL);
                 setQueue(q);
                    setIdx(0);
                     setSelected(null);
                     setPinyinInput('');
                     setInputResult(null);
                        setSessionStats({ correct: 0, wrong: 0 });
                        setHasPlayed(false);
                         setFinished(false);
                            setMode(selectedMode);
                            }, [vocabData, TOTAL]);

            const currentWord = queue[idx];
            const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);

            useEffect(() => {
                if (mode !== 'choose' || !currentWord) return;
                const wrong = fisherYatesShuffle(
                    vocabData.filter(w => w.id !== currentWord.id)
                ).slice(0, 3);
                setOptions(fisherYatesShuffle([currentWord, ...wrong]));
                setSelected(null);
                setHasPlayed(false);
            }, [idx, mode, currentWord]);

            useEffect(() => {
                if (mode === 'pinyin' && inputRef.current) {
                    setTimeout(() => inputRef.current?.focus(), 100);
                }
            }, [idx, mode]);

            const playWord = useCallback(() => {
                if (!currentWord) return;
                window.speechSynthesis.cancel();
                const utt = new SpeechSynthesisUtterance(currentWord.hanzi || currentWord.word);
                if (selectedVoice?.voice) {
                    utt.voice = selectedVoice.voice;
                    utt.lang = selectedVoice.lang;
                } else {
                    utt.lang = isEnglish ? 'en-US' : 'zh-CN';
                }
                utt.rate = speed;
                window.speechSynthesis.speak(utt);
                setHasPlayed(true);
            }, [currentWord, speed, selectedVoice]);

            const playPassageLine = useCallback((text, lineIdx) => {
                window.speechSynthesis.cancel();
                setPlayingLine(lineIdx);
                const utt = new SpeechSynthesisUtterance(text);
                if (selectedVoice?.voice) {
                    utt.voice = selectedVoice.voice;
                    utt.lang = selectedVoice.lang;
                } else {
                    utt.lang = isEnglish ? 'en-US' : 'zh-CN';
                }
                utt.rate = speed;
                utt.onend = () => setPlayingLine(null);
                window.speechSynthesis.speak(utt);
            }, [speed, selectedVoice]);

            const playPassageAll = useCallback((lines) => {
                window.speechSynthesis.cancel();
                setPlayingLine(0);
                lines.forEach((line, i) => {
                    setTimeout(() => {
                        setPlayingLine(i);
                        const utt = new SpeechSynthesisUtterance(line.zh);
                        if (selectedVoice?.voice) {
                            utt.voice = selectedVoice.voice;
                            utt.lang = selectedVoice.lang;
                        } else {
                            utt.lang = isEnglish ? 'en-US' : 'zh-CN';
                        }
                        utt.rate = speed;
                        utt.onend = () => {
                            if (i === lines.length - 1) setPlayingLine(null);
                        };
                        window.speechSynthesis.speak(utt);
                    }, i * 2400);
                });
            }, [speed, selectedVoice]);

            useEffect(() => {
                if ((mode === 'choose' || mode === 'pinyin') && currentWord) {
                    setTimeout(() => playWord(), 300);
                }
            }, [idx, mode]);

            useEffect(() => {
                const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);
                const passageFile = isEnglish
                    ? 'data/en-starters-passages.json'
                    : 'data/passages.json';

                fetch(passageFile)
                    .then(r => r.json())
                    .then(data => setPassages(data))
                    .catch(() => setPassages([]));
            }, [vocabData]);

            useEffect(() => {
                const loadVoices = () => {
                    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);
                    const langPrefix = isEnglish ? 'en' : 'zh';
                    const voices = window.speechSynthesis.getVoices()
                        .filter(v => v.lang.startsWith(langPrefix) && v.localService === true)
                        .map(v => ({ name: v.name, lang: v.lang, voice: v }));

                    // Nếu không có local voice thì lấy tất cả
                    const finalVoices = voices.length > 0
                        ? voices
                        : window.speechSynthesis.getVoices()
                            .filter(v => v.lang.startsWith(langPrefix))
                            .map(v => ({ name: v.name, lang: v.lang, voice: v }));
                    setAvailableVoices(finalVoices);
                    if (finalVoices.length > 0) setSelectedVoice(finalVoices[0]);
                };
                loadVoices();
                window.speechSynthesis.onvoiceschanged = loadVoices;
                return () => { window.speechSynthesis.onvoiceschanged = null; };
            }, [vocabData]);

            const handleChoose = (opt) => {
                if (selected) return;
                setSelected(opt);
                const isCorrect = opt.id === currentWord.id;
                if (isCorrect) {
                    playSoundEffect('success');
                    setSessionStats(s => ({ ...s, correct: s.correct + 1 }));
                    SRS.updateCard(currentLevel, currentWord.id, true);
                } else {
                    playSoundEffect('error');
                    setSessionStats(s => ({ ...s, wrong: s.wrong + 1 }));
                    SRS.updateCard(currentLevel, currentWord.id, false);
                }
            };

            const handleCheckPinyin = () => {
    if (!pinyinInput.trim() || inputResult === 'correct' || inputResult === 'wrong') return;
    const correctAnswer = isEnglish
        ? (currentWord.word || '').toLowerCase()
        : removePinyinTones((currentWord.pinyin || '').toLowerCase());
    const answer = isEnglish
        ? pinyinInput.trim().toLowerCase()
        : removePinyinTones(pinyinInput.trim().toLowerCase());
    const isCorrect = answer === correctAnswer;

    if (isCorrect) {
        setInputResult('correct');
        playSoundEffect('success');
        setSessionStats(s => ({ ...s, correct: s.correct + 1 }));
        SRS.updateCard(currentLevel, currentWord.id, true);
    } else {
        const newMistakes = (mistakeCount || 0) + 1;
        setMistakeCount(newMistakes);
        playSoundEffect('error');
        if (newMistakes >= 3) {
            setInputResult('wrong');
            setSessionStats(s => ({ ...s, wrong: s.wrong + 1 }));
            SRS.updateCard(currentLevel, currentWord.id, false);
        } else {
    playSoundEffect('error');
    setTimeout(() => {
        setInputResult(null);
        setPinyinInput('');
    }, 800);
}
    }
};

            const handleNext = () => {
                if (idx < queue.length - 1) {
                    setIdx(i => i + 1);
                    setSelected(null);
                    setPinyinInput('');
                    setInputResult(null);
                    setMistakeCount(0);
                    setHasPlayed(false);
                } else {
                    setFinished(true);
                    StudyTracker.logActivity(TOTAL, Math.ceil(TOTAL * 0.4));
                }
            };

            if (finished) {
                const total = sessionStats.correct + sessionStats.wrong;
                const pct = Math.round((sessionStats.correct / total) * 100);
                return (
                    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center animate-fade-in mt-6">
                        <div className="text-6xl mb-4">{pct >= 80 ? '🎧' : pct >= 50 ? '💪' : '📚'}</div>
                        <h2 className="text-2xl font-bold mb-1">Hoàn thành!</h2>
                        <p className="text-gray-500 mb-6">Bạn vừa luyện nghe {total} từ</p>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                <div className="text-3xl font-bold text-green-600">{sessionStats.correct}</div>
                                <div className="text-sm text-green-700">Đúng ✓</div>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <div className="text-3xl font-bold text-red-500">{sessionStats.wrong}</div>
                                <div className="text-sm text-red-600">Sai ✗</div>
                            </div>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full mb-4 overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                        <p className="text-indigo-600 font-bold text-xl mb-6">{pct}% chính xác</p>
                        <div className="flex gap-3">
                            <button onClick={() => startSession(mode)}
                                className="flex-1 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50">
                                Làm lại
                            </button>
                            <button onClick={() => { setFinished(false); setMode('menu'); }}
                                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
                                Chọn chế độ
                            </button>
                        </div>
                    </div>
                );
            }

            if (mode === 'menu') return (
                <div className="max-w-md mx-auto animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                            <i className="fa-solid fa-headphones text-indigo-500"></i> Luyện Nghe
                        </h2>
                        <p className="text-gray-500 text-sm mb-6">
                            Nghe phát âm và chọn đáp án đúng — luyện tai nghe tiếng Trung
                        </p>
                        {availableVoices.length > 1 && (
                            <div className="mb-5">
                                <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                                    <i className="fa-solid fa-microphone text-indigo-500"></i> Giọng đọc:
                                </p>
                                <select
                                    value={selectedVoice?.name || ''}
                                    onChange={e => {
                                        const v = availableVoices.find(v => v.name === e.target.value);
                                        setSelectedVoice(v);
                                    }}
                                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 bg-white cursor-pointer">
                                    {availableVoices.map(v => (
                                        <option key={v.name} value={v.name}>
                                            {v.name} ({v.lang})
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => {
                                        if (!selectedVoice) return;
                                        window.speechSynthesis.cancel();
                                        const utt = new SpeechSynthesisUtterance(
                                            isEnglish ? 'Hello, this is a test.' : '你好，这是测试。'
                                        );
                                        utt.voice = selectedVoice.voice;
                                        utt.lang = selectedVoice.lang;
                                        utt.rate = speed;
                                        window.speechSynthesis.speak(utt);
                                    }}
                                    className="mt-2 text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1">
                                    <i className="fa-solid fa-play text-xs"></i> Thử giọng này
                                </button>
                            </div>
                        )}
                        <div className="mb-6">
                            <p className="text-sm font-medium text-gray-600 mb-3">🎚️ Tốc độ phát âm:</p>
                            <div className="flex gap-2">
                                {[
                                    { label: '🐢 Rất chậm', value: 0.5 },
                                    { label: '🐌 Chậm', value: 0.7 },
                                    { label: '🚶 Bình thường', value: 0.9 },
                                    { label: '🚀 Nhanh', value: 1.1 },
                                ].map(s => (
                                    <button key={s.value}
                                        onClick={() => setSpeed(s.value)}
                                        className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium border-2 transition-all
                                            ${speed === s.value
                                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                                : 'border-gray-200 text-gray-600 hover:border-indigo-200'}`}>
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-6">
                             <p className="text-sm font-medium text-gray-600 mb-3">🔢 Số câu:</p>
                             <div className="flex gap-2 flex-wrap">
                                    {[5, 10, 15, 20, 30, 50].map(n => (
                                         <button key={n}
                                         onClick={() => setTOTAL(n)}
                                         className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all
                                         ${TOTAL === n
                                         ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                         : 'border-gray-200 text-gray-600 hover:border-indigo-200'}`}>
                                            {n}
                                            </button>
                                         ))}
                                         </div>
                                </div>
                        <p className="text-sm font-medium text-gray-600 mb-3">🎯 Chọn chế độ luyện:</p>
                        <div className="space-y-3">
                            <button onClick={() => startSession('choose')}
                                className="w-full p-4 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 rounded-2xl text-left transition-all active:scale-95">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">🔤</span>
                                    <div>
                                        <div className="font-bold text-indigo-700">
                                            {isEnglish ? 'Nghe → Chọn từ tiếng Anh' : 'Nghe → Chọn chữ Hán'}
                                        </div>
                                        <div className="text-sm text-indigo-500">
                                            {isEnglish ? 'Nghe âm thanh, chọn từ đúng trong 4 lựa chọn' : 'Nghe âm thanh, chọn chữ Hán đúng trong 4 lựa chọn'}
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <button onClick={() => startSession('pinyin')}
                                className="w-full p-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-2xl text-left transition-all active:scale-95">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">✍️</span>
                                    <div>
                                        <div className="font-bold text-purple-700">
                                            {isEnglish ? 'Nghe → Điền từ tiếng Anh' : 'Nghe → Điền Pinyin'}
                                        </div>
                                        <div className="text-sm text-purple-500">
                                            {isEnglish ? 'Nghe âm thanh, gõ từ tiếng Anh tương ứng' : 'Nghe âm thanh, gõ pinyin tương ứng (không cần dấu)'}
                                        </div>
                                    </div>
                                </div>
                            </button>
                            <button onClick={() => setMode('passage')}
                                className="w-full p-4 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-2xl text-left transition-all active:scale-95">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">📖</span>
                                    <div>
                                        <div className="font-bold text-green-700">Nghe đoạn văn</div>
                                        <div className="text-sm text-green-500">Nghe câu chuyện theo chủ đề, chọn câu bất kỳ để nghe lại</div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            );

            if (mode === 'passage') {
    const filteredPassages = passages.filter(p => p.level === currentLevel);
    const passage = filteredPassages[activePassage] || filteredPassages[0];
    const lines = passage?.lines || [];
    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <button onClick={() => { window.speechSynthesis.cancel(); setMode('menu'); setPlayingLine(null); }}
                    className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
                    <i className="fa-solid fa-arrow-left"></i> Thoát
                </button>
                <span className="text-sm font-medium text-gray-500">📖 Nghe đoạn văn</span>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-4">
                <div className="mb-4">
                    <label className="text-xs text-gray-400 mb-1 block">Chọn đoạn văn</label>
                    <select value={activePassage}
                        onChange={e => { setActivePassage(Number(e.target.value)); window.speechSynthesis.cancel(); setPlayingLine(null); }}
                        className="w-full border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:border-indigo-400 outline-none">
                        {filteredPassages.map((p, i) => (
                            <option key={i} value={i}>{p.title} — {p.topic}</option>
                        ))}
                    </select>
                </div>

                {passage && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                            <button onClick={() => playPassageAll(lines)}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
                                <i className="fa-solid fa-play"></i> Nghe cả đoạn
                            </button>
                            <button onClick={() => { window.speechSynthesis.cancel(); setPlayingLine(null); }}
                                className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition">
                                <i className="fa-solid fa-stop"></i> Dừng
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                                {[{label:'🐢',value:0.6},{label:'🚶',value:0.9},{label:'🏃',value:1.2}].map(s => (
                                    <button key={s.value} onClick={() => setSpeed(s.value)}
                                        className={`w-9 h-9 rounded-lg text-sm transition ${speed === s.value ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setShowPinyinPassage(v => !v)}
                                className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition">
                                {showPinyinPassage ? 'Ẩn' : 'Hiện'} pinyin
                            </button>
                            <button onClick={() => setShowViPassage(v => !v)}
                                className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition">
                                {showViPassage ? 'Ẩn' : 'Hiện'} nghĩa
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {passage && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="bg-indigo-50 px-5 py-3 border-b border-indigo-100 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-indigo-700">{passage.zh_title}</h3>
                            <p className="text-xs text-indigo-400 mt-0.5">{passage.title}</p>
                        </div>
                        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-medium">
                            {passage.level.toUpperCase()} · {lines.length} câu
                        </span>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {lines.map((line, li) => (
                            <div key={li}
                                onClick={() => playPassageLine(line.zh, li)}
                                className={`flex gap-4 px-5 py-4 cursor-pointer transition-all
                                    ${playingLine === li
                                        ? 'bg-indigo-50 border-l-4 border-indigo-500'
                                        : 'hover:bg-gray-50 border-l-4 border-transparent'}`}>
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1
                                    ${playingLine === li ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    {li + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start gap-2">
                                        <span className="text-lg font-bold text-gray-800 leading-snug flex-1">{line.zh}</span>
                                        {playingLine === li && (
                                            <span className="flex gap-0.5 mt-1.5 shrink-0">
                                                <span className="w-1 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay:'0ms'}}></span>
                                                <span className="w-1 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay:'150ms'}}></span>
                                                <span className="w-1 h-3 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay:'300ms'}}></span>
                                            </span>
                                        )}
                                    </div>
                                    {showPinyinPassage && <div className="text-sm text-indigo-500 mt-0.5">{line.py}</div>}
                                    {showViPassage && <div className="text-sm text-gray-400 mt-0.5">{line.vi}</div>}
                                </div>
                                <button
                                    onClick={e => { e.stopPropagation(); playPassageLine(line.zh, li); }}
                                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center self-center transition
                                        ${playingLine === li ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-indigo-100 hover:text-indigo-600'}`}>
                                    <i className="fa-solid fa-volume-high text-sm"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {passages.length === 0 && (
                <div className="text-center text-gray-400 py-12">
                    <i className="fa-solid fa-circle-exclamation text-3xl mb-3"></i>
                    <p>Không tải được đoạn văn. Kiểm tra file data/passages.json</p>
                </div>
            )}
        </div>
    );
}

            if (!currentWord) return null;
            const progress = Math.round((idx / TOTAL) * 100);

            return (
                <div className="max-w-lg mx-auto animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                        <button onClick={() => setMode('menu')}
                            className="text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
                            <i className="fa-solid fa-arrow-left"></i> Thoát
                        </button>
                        <div className="flex gap-3 text-sm">
                            <span className="text-green-600 font-medium">✓ {sessionStats.correct}</span>
                            <span className="text-red-500 font-medium">✗ {sessionStats.wrong}</span>
                            <span className="text-gray-400">{idx + 1}/{TOTAL}</span>
                        </div>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mb-5 overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-5 text-center">
                        <button onClick={playWord}
                            className="w-24 h-24 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center mx-auto mb-4 shadow-lg active:scale-95 transition-all">
                            <i className="fa-solid fa-volume-high text-white text-4xl"></i>
                        </button>
                        <p className="text-gray-400 text-sm">{hasPlayed ? 'Nhấn để nghe lại' : 'Nhấn để nghe'}</p>
                        {hasPlayed && (
                            <p className="text-indigo-400 text-sm mt-2 animate-fade-in">💡 {currentWord.meaning}</p>
                        )}
                    </div>
                    {mode === 'choose' && (
                        <div className="space-y-3 mb-4">
                            {options.map((opt, i) => {
                                let cls = 'w-full p-4 rounded-2xl border-2 text-3xl font-bold transition-all ';
                                if (!selected) {
                                    cls += 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 bg-white';
                                } else if (opt.id === currentWord.id) {
                                    cls += 'border-green-500 bg-green-50 text-green-700';
                                } else if (opt.id === selected.id) {
                                    cls += 'border-red-400 bg-red-50 text-red-600';
                                } else {
                                    cls += 'border-gray-100 bg-gray-50 opacity-40';
                                }
                                return (
                                    <button key={i} onClick={() => handleChoose(opt)}
                                        className={cls} disabled={!!selected}>
                                        <span>{opt.hanzi || opt.word}</span>
                                        
                                    </button>
                                );
                            })}
                        </div>
                    )}
                    {mode === 'pinyin' && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
                            <p className="text-sm text-gray-500 mb-3">Gõ pinyin bạn vừa nghe (không cần dấu thanh):</p>
                            <div className="flex gap-2 mb-3">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={pinyinInput}
                                    onChange={e => setPinyinInput(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            if (inputResult === 'correct' || inputResult === 'wrong') handleNext();
                                            else if (pinyinInput.trim()) handleCheckPinyin();
                                        }
                                    }}
                                    
                                    placeholder={isEnglish ? 'Gõ từ tiếng Anh...' : 'Gõ pinyin... (vd: nihao)'}
                                    className={`flex-1 border-2 rounded-xl px-4 py-3 text-lg outline-none transition-colors
                                        ${inputResult === 'correct' ? 'border-green-500 bg-green-50' :
                                          inputResult === 'wrong' ? 'border-red-400 bg-red-50' :
                                          inputResult === 'retry' ? 'border-red-400 bg-red-50' :
                                          'border-gray-200 focus:border-indigo-400'}`}
                                />
                                {(inputResult !== 'correct' && inputResult !== 'wrong') && (
    <button onClick={handleCheckPinyin}
        className="px-5 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
        OK
    </button>
)}
                            </div>
                            {inputResult && (
                                <div className={`rounded-xl p-3 animate-fade-in
                                    ${inputResult === 'correct' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                                    <p className={`font-bold ${inputResult === 'correct' ? 'text-green-700' : 'text-red-600'}`}>
                                        {inputResult === 'correct' ? '✓ Chính xác!' : `✗ Đáp án đúng: ${isEnglish ? currentWord.word : currentWord.pinyin}`}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">{currentWord.hanzi || currentWord.word} — {currentWord.meaning}</p>
                                </div>
                            )}
                        </div>
                    )}
                    {(selected || inputResult) && (
                        <button onClick={handleNext}
                            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 active:scale-95 transition-all animate-fade-in">
                            {idx < queue.length - 1 ? 'Tiếp theo →' : 'Xem kết quả 🎉'}
                        </button>
                    )}
                </div>
            );
        });

