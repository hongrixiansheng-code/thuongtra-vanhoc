"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
// ========== VOCAB READING TAB ==========
// Luyện đọc từ vựng bằng giọng nói — Web Speech API
// Hỗ trợ 2 chế độ: theo từ đơn và theo câu ví dụ

/** @jsxRuntime classic */

// ── Component 1 từ — hiển thị thẻ từ và nút luyện đọc ──
export const VocabReadingCard = memo(({ word, onNext, onPrev, onRandom, current, total }) => {
    const [speechState, setSpeechState] = React.useState('idle');
    // idle | listening | success | partial | error
    const [score, setScore]     = React.useState(null);
    const [heard, setHeard]     = React.useState('');
    const [showPinyin, setShowPinyin] = React.useState(true);
    const recognitionRef = React.useRef(null);

    // Reset khi đổi từ
    React.useEffect(() => {
        setSpeechState('idle');
        setScore(null);
        setHeard('');
    }, [word?.id]);

    const handleListen = () => {
        setSpeechState('idle');
        setScore(null);
        setHeard('');
        if (word.hanzi) {
            playAudio(word.hanzi);
        } else {
            window.speechSynthesis.cancel();
            const u = new SpeechSynthesisUtterance(word.word);
            u.lang = 'en-US'; u.rate = 0.85;
            window.speechSynthesis.speak(u);
        }
    };

    const handleSpeak = () => {
        if (!window.SpeechEngine) {
            alert('Speech engine chưa load. Kiểm tra js/core/speech-engine.js');
            return;
        }
        if (!SpeechEngine.isSupported()) {
            setSpeechState('error');
            setHeard('Trình duyệt không hỗ trợ. Hãy dùng Chrome.');
            return;
        }
        if (speechState === 'listening') {
            recognitionRef.current?.stop();
            setSpeechState('idle');
            return;
        }
        setSpeechState('listening');
        setScore(null);
        setHeard('');

        const target = word.hanzi || word.word;
        recognitionRef.current = SpeechEngine.listen({
            lang: word.hanzi ? 'zh-CN' : 'en-US',
            onResult: ({ transcript }) => {
                const s = SpeechEngine.calcScore(transcript, target);
                setScore(s);
                setHeard(transcript);
                setSpeechState(s >= 80 ? 'success' : s >= 50 ? 'partial' : 'error');
            },
            onError: (msg) => {
                setSpeechState('error');
                setHeard(msg);
            },
        });
    };

    // Màu thanh điểm
    const barColor = score >= 80 ? 'bg-green-500'
        : score >= 50 ? 'bg-yellow-400'
        : 'bg-red-400';

    const scoreLabel = score >= 90 ? '🌟 Xuất sắc!'
        : score >= 80 ? '✅ Rất tốt!'
        : score >= 50 ? '🟡 Khá ổn, thử lại!'
        : '❌ Cần luyện thêm!';

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">

            {/* Thẻ từ chính */}
            <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center relative">

                {/* Badge loại từ */}
                <span className="absolute top-4 left-4 text-xs font-bold px-2 py-1
                    rounded-full bg-indigo-100 text-indigo-700 uppercase">
                    {word.type_short || word.type}
                </span>

                {/* Nút toggle pinyin */}
                <button onClick={() => setShowPinyin(v => !v)}
                    className="absolute top-4 right-4 text-xs text-gray-400 hover:text-gray-600 transition">
                    {showPinyin ? 'Ẩn pinyin' : 'Hiện pinyin'}
                </button>

                {/* Chữ Hán / Từ tiếng Anh */}
                <div className="mb-4">
                    {word.hanzi ? (
                        <div className="text-7xl font-bold text-gray-800 leading-none">{word.hanzi}</div>
                    ) : (
                        <div className="text-4xl font-bold text-emerald-700 leading-none"
                            style={{fontFamily:'Georgia,serif'}}>{word.word}</div>
                    )}
                </div>

                {/* Pinyin / IPA */}
                {showPinyin && (
                    <>
                        {word.pinyin && (
                            <div className="text-xl text-indigo-500 font-medium mb-2">
                                {word.pinyin}
                            </div>
                        )}
                        {word.ipa && (
                            <div className="text-emerald-500 font-mono text-lg mb-2">{word.ipa}</div>
                        )}
                    </>
                )}

                {/* Nghĩa */}
                <div className="text-gray-600 text-base">{word.meaning}</div>
            </div>

            {/* Điều hướng từ */}
            <div className="flex items-center gap-4">
                <button onClick={onPrev}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200
                        flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-30"
                    disabled={current <= 0}>
                    <i className="fa-solid fa-chevron-left text-gray-500"></i>
                </button>
                <button onClick={onRandom}
                    className="w-12 h-12 rounded-full bg-purple-100 text-purple-600
                        flex items-center justify-center hover:bg-purple-200 transition"
                    title="Từ ngẫu nhiên">
                    <i className="fa-solid fa-shuffle"></i>
                </button>
                <span className="text-sm text-gray-500 font-medium min-w-[60px] text-center">
                    {current + 1} / {total}
                </span>
                <button onClick={onNext}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200
                        flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-30"
                    disabled={current >= total - 1}>
                    <i className="fa-solid fa-chevron-right text-gray-500"></i>
                </button>
            </div>

            {/* 2 nút hành động */}
            <div className="flex gap-3 w-full">
                <button onClick={handleListen}
                    className="flex-1 flex items-center justify-center gap-2
                        py-3 rounded-2xl bg-white border-2 border-indigo-200
                        text-indigo-600 font-medium hover:bg-indigo-50 transition">
                    <i className="fa-solid fa-volume-high"></i>
                    Nghe mẫu
                </button>

                <button onClick={handleSpeak}
                    className={`flex-1 flex items-center justify-center gap-2
                        py-3 rounded-2xl font-medium transition
                        ${speechState === 'listening'
                            ? 'bg-red-500 text-white animate-pulse border-2 border-red-500'
                            : speechState === 'success'
                            ? 'bg-green-500 text-white border-2 border-green-500'
                            : 'bg-indigo-600 text-white border-2 border-indigo-600 hover:bg-indigo-700'}`}>
                    <i className={`fa-solid ${speechState === 'listening' ? 'fa-stop' : 'fa-microphone'}`}></i>
                    {speechState === 'listening' ? 'Đang nghe...' : 'Đọc thử'}
                </button>
            </div>

            {/* Kết quả phát âm */}
            {score !== null && (
                <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-4 animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">{scoreLabel}</span>
                        <span className={`text-sm font-bold
                            ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                            {score}%
                        </span>
                    </div>
                    {/* Thanh tiến trình */}
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <div className={`h-full rounded-full transition-all ${barColor}`}
                            style={{ width: `${score}%` }}>
                        </div>
                    </div>
                    {heard && (
                        <p className="text-xs text-gray-400 mt-1">
                            Bạn đọc: <span className="text-gray-600 font-medium">"{heard}"</span>
                        </p>
                    )}
                    <div className="flex gap-2 mt-3">
                        <button onClick={handleSpeak}
                            className="flex-1 py-2 text-xs rounded-xl bg-indigo-50
                                text-indigo-600 font-medium hover:bg-indigo-100 transition">
                            🔄 Thử lại
                        </button>
                        {score >= 80 && current < total - 1 && (
                            <button onClick={onNext}
                                className="flex-1 py-2 text-xs rounded-xl bg-green-50
                                    text-green-600 font-medium hover:bg-green-100 transition">
                                Từ tiếp →
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Lỗi khi không nghe thấy */}
            {speechState === 'error' && score === null && heard && (
                <div className="w-full text-center text-sm text-red-400 bg-red-50
                    rounded-xl p-3 border border-red-100">
                    {heard}
                </div>
            )}
        </div>
    );
});

// ── Component chính: VocabReadingTab ──
export const VocabReadingTab = memo(() => {
    const { vocabData, currentLevel } = React.useContext(DataContext);
    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);

    const [filterType, setFilterType] = React.useState('all');
    const [currentIdx, setCurrentIdx] = React.useState(0);
    const [shuffledWords, setShuffledWords] = React.useState([]);
    const [mode, setMode] = React.useState('card');
    // card = luyện từng thẻ | list = danh sách để chọn

    // Danh sách loại từ có trong data
    const types = React.useMemo(() => {
        const set = new Set(vocabData.map(w => w.type_short).filter(Boolean));
        return ['all', ...set];
    }, [vocabData]);

    // Lọc từ theo loại
    const filteredWords = React.useMemo(() => {
        if (filterType === 'all') return vocabData.filter(w => (w.hanzi || w.word) && w.meaning);
        return vocabData.filter(w => w.type_short === filterType && (w.hanzi || w.word) && w.meaning);
    }, [vocabData, filterType]);

    // Reset index khi đổi filter
    React.useEffect(() => { setCurrentIdx(0); }, [filterType]);

    React.useEffect(() => {
        setShuffledWords(fisherYatesShuffle([...filteredWords]));
        setCurrentIdx(0);
    }, [filteredWords]);

    const wordList = shuffledWords.length > 0 ? shuffledWords : filteredWords;
    const currentWord = wordList[currentIdx];

    // Nhãn hiển thị cho loại từ
    const typeLabels = {
        all: 'Tất cả', n: 'Danh từ', v: 'Động từ', adj: 'Tính từ',
        adv: 'Phó từ', pron: 'Đại từ', prep: 'Giới từ',
        conj: 'Liên từ', part: 'Trợ từ', num: 'Số từ',
        m: 'Lượng từ', phr: 'Cụm từ',
    };

    // Thống kê nhanh
    const stats = React.useMemo(() => {
        const total = filteredWords.length;
        return { total };
    }, [filteredWords]);

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">

            {/* Header */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <i className="fa-solid fa-microphone text-indigo-500"></i>
                            Luyện đọc từ vựng
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Nhìn chữ Hán → đọc to → hệ thống chấm điểm phát âm
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-indigo-600">{stats.total}</div>
                        <div className="text-xs text-gray-400">từ</div>
                        <button onClick={() => {
                            setShuffledWords(fisherYatesShuffle([...filteredWords]));
                            setCurrentIdx(0);
                        }} className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1 mt-1">
                            <i className="fa-solid fa-shuffle text-xs"></i> Xáo thứ tự
                        </button>
                    </div>
                </div>

                {/* Bộ lọc loại từ */}
                <div className="flex flex-wrap gap-2">
                    {types.map(t => (
                        <button key={t} onClick={() => setFilterType(t)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition
                                ${filterType === t
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            {typeLabels[t] || t}
                        </button>
                    ))}
                </div>
            </div>

            {/* Hướng dẫn nhỏ */}
            {!window.SpeechEngine?.isSupported() && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4
                    flex items-start gap-3">
                    <i className="fa-solid fa-triangle-exclamation text-yellow-500 mt-0.5"></i>
                    <div>
                        <p className="text-sm font-medium text-yellow-800">
                            Tính năng nhận dạng giọng nói cần Chrome hoặc Edge
                        </p>
                        <p className="text-xs text-yellow-600 mt-1">
                            Bạn vẫn có thể nghe phát âm mẫu bằng nút "Nghe mẫu"
                        </p>
                    </div>
                </div>
            )}

            {/* Card luyện đọc */}
            {currentWord ? (
                <VocabReadingCard
                    word={currentWord}
                    current={currentIdx}
                    total={wordList.length}
                    onNext={() => setCurrentIdx(i => Math.min(i + 1, wordList.length - 1))}
                    onPrev={() => setCurrentIdx(i => Math.max(i - 1, 0))}
                    onRandom={() => setCurrentIdx(Math.floor(Math.random() * wordList.length))}
                />
            ) : (
                <div className="text-center text-gray-400 py-12">
                    Không có từ nào trong nhóm này.
                </div>
            )}


        </div>
    );
});
