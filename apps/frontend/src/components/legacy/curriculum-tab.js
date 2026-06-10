"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
// ========== CURRICULUM TAB ==========
// Displays lesson navigation, grammar sections, and handles lesson tests.

/** @jsxRuntime classic */

// ========== ENGLISH HOME ==========
export const EnglishHome = ({ vocabData, currentLevel }) => {
    const [selectedTopic, setSelectedTopic] = React.useState('All');
    const [searchText, setSearchText] = React.useState('');
    const [flipped, setFlipped] = React.useState({});

    const levelLabel = {
        'en-starters': 'Cambridge YLE Starters',
        'en-movers':   'Cambridge YLE Movers',
        'en-flyers':   'Cambridge YLE Flyers',
    }[currentLevel] || 'Cambridge English';

    // Lấy danh sách topics
    const topics = ['All', ...new Set(vocabData.map(w => w.topic).filter(Boolean))];

    // Filter theo topic + search
    const filtered = vocabData.filter(w => {
        const matchTopic = selectedTopic === 'All' || w.topic === selectedTopic;
        const matchSearch = !searchText ||
            w.word.toLowerCase().includes(searchText.toLowerCase()) ||
            w.meaning.includes(searchText);
        return matchTopic && matchSearch;
    });

    const toggleFlip = (id) => setFlipped(f => ({ ...f, [id]: !f[id] }));

    // Speak word using Web Speech API
    const speak = (word) => {
        if (!window.speechSynthesis) return;
        const u = new SpeechSynthesisUtterance(word);
        u.lang = 'en-US';
        u.rate = 0.85;
        window.speechSynthesis.speak(u);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">

            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">🇬🇧</span>
                    <div>
                        <h2 className="text-2xl font-bold">{levelLabel}</h2>
                        <p className="text-emerald-100 text-sm">{vocabData.length} từ vựng · {new Set(vocabData.map(w=>w.topic)).size} chủ đề</p>
                    </div>
                </div>

                {/* Search */}
                <div className="mt-4 relative">
                    <input
                        type="text"
                        placeholder="Tìm từ tiếng Anh hoặc nghĩa tiếng Việt..."
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-2xl text-gray-800 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    {searchText
                        ? <button onClick={() => setSearchText('')}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        : <i className="fa-solid fa-magnifying-glass absolute right-3 top-3 text-gray-400"></i>
                    }
                </div>
            </div>

            {/* Topic filter */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                {topics.map(topic => (
                    <button key={topic}
                        onClick={() => setSelectedTopic(topic)}
                        className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all
                            ${selectedTopic === topic
                                ? 'bg-emerald-500 text-white shadow-sm'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'}`}>
                        {topic === 'All' ? `🌟 Tất cả (${vocabData.length})` : topic}
                    </button>
                ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    { icon: 'fa-book-open', label: 'Tổng từ',    value: vocabData.length,           color: 'text-emerald-600' },
                    { icon: 'fa-filter',    label: 'Đang xem',   value: filtered.length,            color: 'text-sky-600'     },
                    { icon: 'fa-layer-group',label:'Chủ đề',     value: topics.length - 1,          color: 'text-violet-600'  },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
                        <i className={`fa-solid ${s.icon} ${s.color} text-xl mb-1`}></i>
                        <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                        <div className="text-xs text-gray-500">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Vocab grid — flip card */}
            {filtered.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    <i className="fa-solid fa-face-sad-tear text-4xl mb-3"></i>
                    <p>Không tìm thấy từ nào phù hợp.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {filtered.map(w => (
                        <div key={w.id}
                            onClick={() => toggleFlip(w.id)}
                            className="cursor-pointer group">
                            <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-4
                                hover:shadow-md hover:border-emerald-200 transition-all
                                ${flipped[w.id] ? 'bg-emerald-50 border-emerald-200' : ''}`}>

                                {!flipped[w.id] ? (
                                    /* Mặt trước: từ tiếng Anh */
                                    <div className="text-center">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                                {w.type_short}
                                            </span>
                                            <button
                                                onClick={e => { e.stopPropagation(); speak(w.word); }}
                                                className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600
                                                    flex items-center justify-center hover:bg-emerald-200 transition">
                                                <i className="fa-solid fa-volume-low text-xs"></i>
                                            </button>
                                        </div>
                                        <div className="text-xl font-bold text-gray-800 mt-1">{w.word}</div>
                                        <div className="text-xs text-gray-400 mt-1 font-mono">{w.ipa}</div>
                                        <div className="text-xs text-emerald-600 mt-2 font-medium">{w.topic}</div>
                                    </div>
                                ) : (
                                    /* Mặt sau: nghĩa + ví dụ */
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-emerald-700 mb-1">{w.meaning}</div>
                                        <div className="text-xs text-gray-600 italic mt-2 leading-relaxed">
                                            "{w.example_en}"
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1 leading-relaxed">
                                            {w.example_vi}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export const DialogueLine = ({ line }) => {
    const [speechState, setSpeechState] = React.useState('idle');
    const [speechScore, setSpeechScore] = React.useState(null);
    const [speechMsg, setSpeechMsg] = React.useState('');
    const recognitionRef = React.useRef(null);

    const handleSpeak = () => {
        if (!window.SpeechEngine || !SpeechEngine.isSupported()) {
            setSpeechState('error');
            setSpeechMsg('Chrome mới hỗ trợ tính năng này');
            return;
        }
        if (speechState === 'listening') {
            recognitionRef.current?.stop();
            setSpeechState('idle');
            return;
        }
        setSpeechState('listening');
        setSpeechScore(null);
        setSpeechMsg('');
        recognitionRef.current = SpeechEngine.listen({
            onStart: () => setSpeechState('listening'),
            onResult: ({ transcript }) => {
                const score = SpeechEngine.calcScore(transcript, line.zh);
                setSpeechScore(score);
                setSpeechState(score >= 70 ? 'success' : 'error');
                setSpeechMsg(`Bạn đọc: "${transcript}"`);
            },
            onError: (msg) => {
                setSpeechState('error');
                setSpeechMsg(msg);
            },
        });
    };

    const scoreColor = speechScore >= 90 ? 'text-green-600'
        : speechScore >= 70 ? 'text-yellow-600'
        : 'text-red-500';

    return (
        <div className={`flex gap-4 px-5 py-4 ${line.speaker === 'A' ? 'bg-white' : 'bg-gray-50'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-1
                ${line.speaker === 'A' ? 'bg-indigo-100 text-indigo-700' : 'bg-pink-100 text-pink-700'}`}>
                {line.speaker}
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xl font-bold text-gray-800">{line.zh}</span>
                    <button onClick={() => playAudio(line.zh)}
                        className="text-indigo-400 hover:text-indigo-600 transition">
                        <i className="fa-solid fa-volume-high text-sm"></i>
                    </button>
                    <button
                        onClick={handleSpeak}
                        title="Luyện phát âm"
                        className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition
                            ${speechState === 'listening'
                                ? 'bg-red-100 text-red-600 animate-pulse'
                                : speechState === 'success'
                                ? 'bg-green-100 text-green-600'
                                : speechState === 'error'
                                ? 'bg-red-50 text-red-400'
                                : 'bg-indigo-50 text-indigo-500 hover:bg-indigo-100'}`}>
                        <i className={`fa-solid ${speechState === 'listening' ? 'fa-stop' : 'fa-microphone'} text-xs`}></i>
                        <span>{speechState === 'listening' ? 'Dừng' : 'Đọc'}</span>
                    </button>
                </div>
                <div className="text-sm text-indigo-500 mt-0.5">{line.py}</div>
                <div className="text-sm text-gray-500 mt-0.5">{line.vi}</div>
                {speechScore !== null && (
                    <div className={`mt-2 text-xs font-semibold ${scoreColor}`}>
                        {speechState === 'success' ? '✅' : '❌'} {speechScore}% chính xác
                        {speechMsg && <span className="ml-1 font-normal text-gray-400">— {speechMsg}</span>}
                    </div>
                )}
                {speechState === 'error' && speechScore === null && speechMsg && (
                    <div className="mt-1 text-xs text-red-400">{speechMsg}</div>
                )}
            </div>
        </div>
    );
};
export const CurriculumTab = memo(({ onOpenWriting, onLessonChange }) => {
    const { vocabData, grammarData, curriculumData, currentLevel } = React.useContext(DataContext);
    const [activeLessonId, setActiveLessonId] = useState(curriculumData[0]?.id ?? null);
    const [lessonTab, setLessonTab] = useState('vocab');
    const [showTest, setShowTest] = useState(false);
    const [playingDlg, setPlayingDlg] = useState(null);
    const [speechRate, setSpeechRate] = useState(0.85);
    const testResults = TestEngine.getLessonResults(currentLevel);
    useEffect(() => {
        window.speechSynthesis.cancel();
        setPlayingDlg(null);
        if (window._dlgTimeouts) {
            window._dlgTimeouts.forEach(t => clearTimeout(t));
            window._dlgTimeouts = [];
        }
    }, [activeLessonId, lessonTab]);

    const handleLessonClick = useCallback((id) => {
        setActiveLessonId(id);
        setShowTest(false);
        onLessonChange?.(id);
    }, [onLessonChange]);

    const lesson = curriculumData.find(l => l.id === activeLessonId);
    const lessonGrammar = grammarData.filter(g => lesson.grammarIds?.includes(g.id));
    const themes = [...new Set(curriculumData.map(l => l.theme))];
// Thêm dòng này — nếu chưa có data thì hiện thông báo
if (curriculumData.length === 0) {
    const isEnglish = currentLevel.startsWith('en-');
    if (isEnglish) return <EnglishHome vocabData={vocabData} currentLevel={currentLevel} />;
    return (
        <div className="max-w-7xl mx-auto p-8 text-center">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Đang xây dựng</h2>
                <p className="text-gray-500">Nội dung cho cấp độ này sẽ sớm có mặt!</p>
            </div>
        </div>
    );
}
    const filteredVocab = lesson.vocab.filter(w => (w.hanzi || w.word) && w.meaning);

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Bài học: {lesson.title}</h2>
                        <p className="text-sm text-gray-500 mt-1">Chủ đề: {lesson.theme}</p>
                        {lesson.desc && <p className="text-sm text-gray-500 mt-2 max-w-2xl">{lesson.desc}</p>}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => setLessonTab('vocab')}
                            className={`px-4 py-2 rounded-2xl font-medium transition ${lessonTab === 'vocab' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            Từ vựng
                        </button>
                        <button onClick={() => setLessonTab('grammar')}
                            className={`px-4 py-2 rounded-2xl font-medium transition ${lessonTab === 'grammar' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            Ngữ pháp
                        </button>
                        {lesson.dialogues?.length > 0 && (
    <button onClick={() => setLessonTab('dialogue')}
        className={`px-4 py-2 rounded-2xl font-medium transition ${lessonTab === 'dialogue' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
        💬 Hội thoại
    </button>
)}
                        <button onClick={() => setShowTest(true)}
                            className="px-4 py-2 rounded-2xl bg-green-600 text-white font-medium hover:bg-green-700 transition">
                            Làm bài kiểm tra
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-6">
                    <div className="space-y-3">
                        <div className="w-48 shrink-0 overflow-y-auto scrollbar-hide" style={{ maxHeight: '70vh' }}>
                            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Các bài học</h3>
                            <div className="space-y-2">
                                {themes.map(theme => (
                                    <div key={theme}>
                                        <div className="text-xs uppercase tracking-[0.24em] text-gray-400 mb-2">{theme}</div>
                                        {curriculumData.filter(l => l.theme === theme).map(item => {
                                            const result = testResults[item.id];
                                            return (
                                                <button key={item.id}
                                                    onClick={() => handleLessonClick(item.id)}
                                                    className={`w-full text-left rounded-2xl px-4 py-3 transition ${item.id === activeLessonId ? 'bg-indigo-600 text-white' : 'bg-white hover:bg-indigo-50 text-gray-700'} `}>
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span className="font-medium">{item.title}</span>
                                                        {result && (
                                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${result.passed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                                                {result.pct}%
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-400 mt-1">{item.vocab.length} từ</div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {lessonTab === 'vocab' && (
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-800">Từ vựng bài học</h3>
                                    <span className="text-sm text-gray-500">{filteredVocab.length} từ</span>
                                </div>
                                {filteredVocab.length === 0 ? (
                                    <div>
                                        {lesson.id === 0 || lesson.vocab_hanzi?.length === 0 ? (
                                            <PinyinLesson />
                                        ) : (
                                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center text-gray-500">
                                                <p className="font-medium mb-2">Bài học này hiện chưa có từ vựng.</p>
                                                <p className="text-sm">{lesson.desc}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {filteredVocab.map(word => (
                                            <div key={word.id}
                                                onClick={() => onOpenWriting && onOpenWriting(word)}
                                                className="bg-white rounded-2xl border border-gray-100 shadow-sm
                                                    hover:shadow-md transition-all cursor-pointer active:scale-95
                                                    p-3 flex items-center gap-3 min-h-[80px]">

                                                {/* Chữ Hán — cố định 160px, chữ luôn text-4xl */}
                                                {/* Từ chính — Hanzi hoặc English */}
<div className="shrink-0 w-40 flex items-center justify-center">
    {word.hanzi ? (
        <span className="text-4xl font-bold text-gray-800 leading-none whitespace-nowrap">
            {word.hanzi}
        </span>
    ) : (
        <span className="text-2xl font-bold text-emerald-700 leading-tight text-center">
            {word.word}
        </span>
    )}
</div>

{/* Đường kẻ dọc */}
<div className="w-px self-stretch bg-gray-100 shrink-0"></div>

{/* Nội dung */}
<div className="flex-1 min-w-0 pl-1">
    <div className="flex items-center gap-1.5 mb-1">
        <span className="inline-block text-xs font-bold px-2 py-0.5
            rounded-full bg-indigo-100 text-indigo-700 uppercase">
            {word.type_short || word.type}
        </span>
        <button
            onClick={(e) => {
    e.stopPropagation();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word.hanzi || word.word);
    u.lang = word.hanzi ? 'zh-CN' : 'en-US';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
}}
            className="w-6 h-6 flex items-center justify-center
                text-indigo-400 hover:text-indigo-600
                rounded-full transition-colors"
            title="Nghe phát âm">
            <i className="fa-solid fa-volume-high text-xs"></i>
        </button>
    </div>
    {word.pinyin && (
        <p className="text-indigo-500 font-medium text-sm leading-tight">
            {word.pinyin}
        </p>
    )}
    {word.ipa && (
        <p className="text-emerald-500 font-medium text-sm leading-tight font-mono">
            {word.ipa}
        </p>
    )}
    <p className="text-gray-700 text-sm leading-tight">
        {word.meaning}
    </p>
</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {lessonTab === 'grammar' && (
                            <div>
                                <h3 className="font-bold text-gray-700 mb-3">Ngữ pháp liên quan</h3>
                                {lesson.grammarIds && lesson.grammarIds.length > 0 ? (
                                    <div className="space-y-3">
                                        {lesson.grammarIds.map(gid => {
                                            const g = grammarData.find(x => x.id === gid);
                                            if (!g) return null;
                                            return (
                                                <div key={gid}
                                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                                                    <h4 className="font-bold text-gray-800 mb-1">{g.title}</h4>
                                                    <p className="text-gray-500 text-sm mb-4">{g.desc}</p>
                                                    {/* Công thức */}
                                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-4
                                                        bg-gray-50 p-4 rounded-xl">
                                                        {g.formula && g.formula.map((item, idx) => (
                                                            <div key={idx}
                                                                className={`grammar-block px-4 py-2 rounded-lg
                                                                    border-2 text-center text-sm ${item.classes}`}>
                                                                {item.text}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {/* Bài tập sắp xếp câu */}
                                                    {g.practiceList && g.practiceList.length > 0 && (
                                                        <SentencePractice practiceList={g.practiceList} />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-gray-400">
                                        <p>Bài học này chưa có ngữ pháp liên quan.</p>
                                    </div>
                                )}
                            </div>
                        )}
                        {lessonTab === 'dialogue' && (
    <div className="space-y-6 animate-fade-in">
        {lesson.dialogues?.map((dlg, di) => (
            <div key={di} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-indigo-50 px-5 py-3 border-b border-indigo-100 flex items-center justify-between">
                    <h3 className="font-bold text-indigo-700">{dlg.title}</h3>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-indigo-400 font-medium">Tốc độ:</span>
                        {[
                            { label: '0.5x', value: 0.5 },
                            { label: '0.75x', value: 0.75 },
                            { label: '1x', value: 1.0 },
                            { label: '1.25x', value: 1.25 },
                        ].map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => setSpeechRate(opt.value)}
                                className={`text-xs px-2 py-1 rounded-lg font-medium transition
                                    ${speechRate === opt.value
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white text-indigo-400 border border-indigo-200 hover:bg-indigo-50'}`}>
                                {opt.label}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => {
    window.speechSynthesis.cancel();
    if (playingDlg === di) {
        setPlayingDlg(null);
        // Xóa tất cả timeout đang chờ
        if (window._dlgTimeouts) {
            window._dlgTimeouts.forEach(t => clearTimeout(t));
            window._dlgTimeouts = [];
        }
        return;
    }
    // Xóa timeout cũ nếu có
    if (window._dlgTimeouts) {
        window._dlgTimeouts.forEach(t => clearTimeout(t));
    }
    window._dlgTimeouts = [];
    setPlayingDlg(di);
    dlg.lines.forEach((line, i) => {
        const t = setTimeout(() => {
            const utt = new SpeechSynthesisUtterance(line.zh || line.en);
            utt.lang = line.zh ? 'zh-CN' : 'en-US';
            utt.rate = speechRate;
            utt.onend = () => {
                if (i === dlg.lines.length - 1) setPlayingDlg(null);
            };
            window.speechSynthesis.speak(utt);
        }, i * 2000);
        window._dlgTimeouts.push(t);
    });
}} className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-lg hover:bg-indigo-700 transition flex items-center gap-1">
    <i className={`fa-solid ${playingDlg === di ? 'fa-stop' : 'fa-play'}`}></i>
    {playingDlg === di ? 'Dừng' : 'Nghe cả đoạn'}
</button>
                </div>
                <div className="divide-y divide-gray-50">
                    {dlg.lines.map((line, li) => (
                        <DialogueLine key={li} line={line} rate={speechRate} />
                    ))}
                </div>
            </div>
        ))}
    </div>
)}
                    </div>
                </div>
            </div>

            {showTest && lesson && ReactDOM.createPortal(
                <LessonTest
                    lesson={lesson}
                    allVocab={vocabData}
                    levelId={currentLevel}
                    onClose={() => setShowTest(false)}
                    onFinish={() => setShowTest(false)}
                />,
                document.body
            )}
        </div>
    );
});

export const LessonTest = memo(({ lesson, allVocab, levelId, onClose, onFinish }) => {
    const [questions]   = useState(() => TestEngine.generateLessonTest(lesson.vocab, allVocab));
    const [idx, setIdx] = useState(0);
    const [selected, setSelected]   = useState(null);
    const [answers, setAnswers]     = useState([]);
    const [finished, setFinished]   = useState(false);
    const [timeLeft, setTimeLeft]   = useState(60 * 10); // 10 phút
    const timerRef = useRef(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) { clearInterval(timerRef.current); setFinished(true); return 0; }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, []);

    const formatTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
    const current = questions[idx];
    const correctCount = answers.filter(a => a.correct).length;

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
            setIdx(i => i + 1);
            setSelected(null);
        } else {
            clearInterval(timerRef.current);
            TestEngine.saveLessonResult(levelId, lesson.id, correctCount + (selected && selected.id === current.word.id ? 0 : 0), questions.length);
            setFinished(true);
        }
    };

    if (finished) {
        const finalScore = answers.filter(a => a.correct).length;
        const finalPct   = Math.round((finalScore / questions.length) * 100);
        const passed     = finalPct >= 70;
        TestEngine.saveLessonResult(levelId, lesson.id, finalScore, questions.length);
        return (
            <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center animate-fade-in">
                    <div className="text-6xl mb-4">{passed ? '🎉' : '📚'}</div>
                    <h2 className="text-2xl font-bold mb-1">
                        {passed ? 'Bạn đã qua bài!' : 'Chưa đạt — Cố lên!'}
                    </h2>
                    <p className="text-gray-500 mb-6">{lesson.title}</p>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                            <div className="text-2xl font-bold text-green-600">{finalScore}</div>
                            <div className="text-xs text-green-700">Đúng</div>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                            <div className="text-2xl font-bold text-red-500">{questions.length - finalScore}</div>
                            <div className="text-xs text-red-600">Sai</div>
                        </div>
                        <div className={`${passed ? 'bg-indigo-50 border-indigo-200' : 'bg-orange-50 border-orange-200'} border rounded-xl p-3`}>
                            <div className={`text-2xl font-bold ${passed ? 'text-indigo-600' : 'text-orange-500'}`}>{finalPct}%</div>
                            <div className="text-xs text-gray-500">Điểm</div>
                        </div>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <div className={`h-full rounded-full transition-all ${passed ? 'bg-green-500' : 'bg-orange-400'}`} style={{ width: `${finalPct}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-400 mb-6">Điểm đạt: 70%</p>
                    <div className="flex gap-3">
                        <button onClick={onClose}
                            className="flex-1 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50">
                            Đóng
                        </button>
                        {!passed && (
                            <button onClick={() => { setIdx(0); setSelected(null); setAnswers([]); setFinished(false); setTimeLeft(600); }}
                                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">
                                Làm lại
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (!current) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
                <div className="bg-indigo-600 text-white px-6 py-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold truncate max-w-[200px]">{lesson.title}</h3>
                        <div className="flex items-center gap-3">
                            <span className={`text-sm font-mono font-bold ${timeLeft < 60 ? 'text-red-300' : 'text-indigo-200'}`}>⏱ {formatTime(timeLeft)}</span>
                            <button onClick={onClose} className="text-indigo-200 hover:text-white"><i className="fa-solid fa-xmark text-xl"></i></button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-indigo-400 rounded-full overflow-hidden">
                            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${((idx) / questions.length) * 100}%` }}></div>
                        </div>
                        <span className="text-sm text-indigo-200">{idx + 1}/{questions.length}</span>
                    </div>
                </div>
                <div className="p-6">
                    <p className="text-gray-500 text-sm mb-2">{current.type === 'listening' ? '🎧 Nghe và chọn chữ Hán đúng:' : '📖 Chữ Hán sau có nghĩa là gì?'}</p>
                    <div className="text-center mb-6">
                        {current.type === 'listening' ? (
                            <button onClick={() => playAudio(current.word.hanzi)} className="w-20 h-20 rounded-full bg-indigo-100 hover:bg-indigo-200 flex items-center justify-center mx-auto transition-all active:scale-95">
                                <i className="fa-solid fa-volume-high text-indigo-600 text-3xl"></i>
                            </button>
                        ) : (
                            <div className="text-7xl font-bold text-gray-800">{current.word.hanzi || current.word.word}</div>
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
                            const display = current.type === 'listening' ? opt.hanzi : opt.meaning;
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
