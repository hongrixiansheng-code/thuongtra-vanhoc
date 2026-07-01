"use client";

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { SpeechEngine } from '@/lib/speech-engine';
import { Play, PenLine, Volume2, Mic, Square, XCircle, AlertTriangle, X } from 'lucide-react';

const playSoundEffect = (type: 'success' | 'error') => {
    const audio = new Audio(`/audio/${type}.mp3`);
    audio.play().catch(e => console.log('Audio play failed:', e));
};

const SingleHanziWriter = ({ character }: { character: string }) => {
    const writerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !character || typeof window === 'undefined') return;

        import('hanzi-writer').then((m) => {
            const HW = m.default || m;
            if (!containerRef.current) return;
            containerRef.current.innerHTML = '';
            writerRef.current = HW.create(containerRef.current, character, {
                width: 180,
                height: 180,
                padding: 10,
                showOutline: true,
                strokeAnimationSpeed: 1.5,
                delayBetweenStrokes: 150,
                drawingWidth: 15,
                drawingColor: '#ec4899',
            });
        }).catch(err => console.error("Failed to load hanzi-writer", err));

        return () => {
            if (containerRef.current) containerRef.current.innerHTML = '';
        };
    }, [character]);

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Nền canvas luôn để trắng (cố định) vì nét chữ mẫu của HanziWriter không tự đổi theo dark mode */}
            <div ref={containerRef} className="w-[180px] h-[180px] bg-white border-2 border-dashed border-primary-200 rounded-xl overflow-hidden shadow-inner flex items-center justify-center"></div>
            <div className="flex gap-2">
                <button onClick={() => writerRef.current?.animateCharacter()} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg text-sm font-bold hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors shadow-sm border border-primary-100 dark:border-primary-500/20">
                    <Play className="w-3.5 h-3.5" /> Vẽ mẫu
                </button>
                <button onClick={() => writerRef.current?.quiz({
                    onMistake: () => playSoundEffect('error'),
                    onCorrectStroke: () => playSoundEffect('success'),
                })} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg text-sm font-bold hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors shadow-sm border border-green-100 dark:border-green-500/20">
                    <PenLine className="w-3.5 h-3.5" /> Tự viết
                </button>
            </div>
        </div>
    );
};

const VocabHanziWriter = ({ character }: { character: string }) => {
    const chars = Array.from(character || '').filter(c => /[\u4e00-\u9fa5]/.test(c));
    if (chars.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center justify-center gap-6 w-full">
            {chars.map((char, index) => (
                <SingleHanziWriter key={`${char}-${index}`} character={char} />
            ))}
        </div>
    );
};

// Giữ lại hàm xử lý Pinyin
function removePinyinTones(pinyin: string) {
    if (!pinyin) return '';
    return pinyin.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/v/g, "u").toLowerCase();
}

const VocabCard = React.memo(({ word, onOpenDetail }: { word: any, onOpenDetail: (w: any) => void }) => {
    return (
        <div
            onClick={() => onOpenDetail && onOpenDetail(word)}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md
                transition-all cursor-pointer active:scale-95 p-4 flex items-center gap-4">

            {/* CỘT TRÁI — Chữ Hán lớn */}
            <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center
                bg-primary-50 dark:bg-primary-500/10 rounded-xl border border-primary-100 dark:border-primary-500/20">
                {word.hanzi ? (
                    <span className="text-4xl font-bold text-slate-800 dark:text-slate-100 leading-none">
                        {word.hanzi}
                    </span>
                ) : (
                    <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center leading-tight">
                        {word.word}
                    </span>
                )}
            </div>

            {/* CỘT PHẢI — Thông tin */}
            <div className="flex-1 min-w-0">
                {/* Loại từ */}
                <span className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1
                    bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 uppercase tracking-wide">
                    {word.type || 'N/A'}
                </span>
                {/* Pinyin / IPA */}
                {word.pinyin && (
                    <p className="text-primary-500 dark:text-primary-400 font-medium text-sm mb-0.5">{word.pinyin}</p>
                )}
                {word.ipa && (
                    <p className="text-primary-500 dark:text-primary-400 font-mono text-sm mb-0.5">{word.ipa}</p>
                )}
                {/* Nghĩa */}
                <p className="text-slate-700 dark:text-slate-300 font-medium text-sm leading-snug truncate">
                    {word.meaning}
                </p>
            </div>

            {/* Nút nghe nhỏ góc phải */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (typeof window !== 'undefined') {
                        window.speechSynthesis.cancel();
                        const u = new SpeechSynthesisUtterance(word.hanzi || word.word);
                        u.lang = word.hanzi ? 'zh-CN' : 'en-US';
                        u.rate = 0.85;
                        window.speechSynthesis.speak(u);
                    }
                }}
                className="shrink-0 w-8 h-8 flex items-center justify-center
                    text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10
                    rounded-full transition-colors">
                <Volume2 className="w-4 h-4" />
            </button>
        </div>
    );
});

const VocabGrid = React.memo(({ vocabList, onOpenDetail }: { vocabList: any[], onOpenDetail: (w: any) => void }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {vocabList.map(word => (
            <VocabCard
                key={word._uuid || word.id || Math.random().toString()}
                word={word}
                onOpenDetail={onOpenDetail}
            />
        ))}
    </div>
));

const VocabReader = ({ word }: { word: any }) => {
    const [speechState, setSpeechState] = useState<'idle' | 'listening' | 'success' | 'partial' | 'error'>('idle');
    const [score, setScore] = useState<number | null>(null);
    const [heard, setHeard] = useState('');
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch(e) {}
            }
        };
    }, []);

    const handleSpeak = () => {
        if (!SpeechEngine.isSupported()) {
            setSpeechState('error');
            setHeard('Trình duyệt không hỗ trợ. Hãy dùng Chrome hoặc Edge.');
            return;
        }

        if (speechState === 'listening') {
            try { recognitionRef.current?.stop(); } catch(e) {}
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

    const barColor = score !== null && score >= 80 ? 'bg-green-500' : score !== null && score >= 50 ? 'bg-yellow-400' : 'bg-red-400';
    const scoreLabel = score !== null && score >= 90 ? '🌟 Xuất sắc!' : score !== null && score >= 80 ? '✅ Rất tốt!' : score !== null && score >= 50 ? '🟡 Khá ổn!' : '❌ Cần luyện thêm!';

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <button onClick={handleSpeak} className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all shadow-sm
                ${speechState === 'listening' ? 'bg-red-500 text-white animate-pulse shadow-red-500/30' :
                  speechState === 'success' ? 'bg-green-500 text-white shadow-green-500/30' :
                  'bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-500/20 border border-green-100 dark:border-green-500/20'}`}>
                {speechState === 'listening' ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {speechState === 'listening' ? 'Đang nghe...' : 'Bấm để đọc'}
            </button>

            {score !== null && (
                <div className="w-full bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3 relative z-10">
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{scoreLabel}</span>
                        <span className={`text-xl font-black ${score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {score}%
                        </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3 relative z-10">
                        <div className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`} style={{ width: `${score}%` }}></div>
                    </div>
                    {heard && (
                        <div className="bg-white dark:bg-slate-900 p-3 rounded-lg relative z-10 border border-slate-100 dark:border-slate-800 shadow-sm">
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-0.5 uppercase tracking-wider font-bold">Hệ thống nghe được:</p>
                            <p className="text-base font-bold text-slate-700 dark:text-slate-200">{heard}</p>
                        </div>
                    )}
                </div>
            )}
            {speechState === 'error' && score === null && heard && (
                <div className="w-full flex items-center gap-2 text-center text-xs font-medium text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-xl p-3 border border-red-100 dark:border-red-500/20">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" /> {heard}
                </div>
            )}
        </div>
    );
};

export const VocabDetailModal = React.memo(({ word, onClose }: { word: any, onClose: () => void }) => {
    const [activeTab, setActiveTab] = useState<'writer' | 'reader' | null>(null);

    return (
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
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in" onClick={e => e.stopPropagation()}>

                {/* Header — luôn dùng accent đậm làm dải màu thương hiệu, không phụ thuộc light/dark */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-6xl font-bold mb-2">{word.hanzi || word.word}</div>
                            <div className="flex items-center gap-2">
                                {word.pinyin && <span className="text-primary-100 text-lg">{word.pinyin}</span>}
                                {word.ipa && <span className="text-primary-100 text-lg">{word.ipa}</span>}
                                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                                    {word.type || 'N/A'}
                                </span>
                            </div>
                        </div>
                        <button onClick={onClose}
                            className="text-white/70 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Nội dung */}
                <div className="p-6 space-y-4">
                    {/* Nghĩa & Ví dụ */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4">
                            <span className="text-2xl">📖</span>
                            <span className="text-xl font-medium text-slate-800 dark:text-slate-100">{word.meaning}</span>
                        </div>
                        {(word.example_en || word.example) && (
                            <div className="bg-primary-50/50 dark:bg-primary-500/10 rounded-2xl p-4 border border-primary-100 dark:border-primary-500/20">
                                <h4 className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-1">Ví dụ minh họa</h4>
                                <p className="text-primary-900 dark:text-primary-100 font-medium">{word.example_en || word.example}</p>
                                {word.example_vi && <p className="text-primary-700/70 dark:text-primary-300/70 text-sm mt-1">{word.example_vi}</p>}
                            </div>
                        )}
                    </div>

                    {/* Nút công cụ */}
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={() => {
                                if (typeof window !== 'undefined') {
                                    window.speechSynthesis.cancel();
                                    const u = new SpeechSynthesisUtterance(word.hanzi || word.word);
                                    u.lang = word.hanzi ? 'zh-CN' : 'en-US';
                                    u.rate = 0.85;
                                    window.speechSynthesis.speak(u);
                                }
                            }}
                            className="flex flex-col items-center justify-center gap-1 py-3 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 text-primary-700 dark:text-primary-300 rounded-2xl font-medium transition-colors text-sm">
                            <Volume2 className="w-4 h-4" /> Nghe
                        </button>

                        <button
                            onClick={() => setActiveTab(activeTab === 'reader' ? null : 'reader')}
                            className={`flex flex-col items-center justify-center gap-1 py-3 rounded-2xl font-medium transition-colors text-sm
                                ${activeTab === 'reader' ? 'bg-green-600 text-white shadow-md' : 'bg-green-50 dark:bg-green-500/10 hover:bg-green-100 dark:hover:bg-green-500/20 text-green-700 dark:text-green-400'}`}>
                            <Mic className="w-4 h-4" /> Đọc
                        </button>

                        {word.hanzi ? (
                            <button
                                onClick={() => setActiveTab(activeTab === 'writer' ? null : 'writer')}
                                className={`flex flex-col items-center justify-center gap-1 py-3 rounded-2xl font-medium transition-colors text-sm
                                    ${activeTab === 'writer' ? 'bg-primary-600 text-white shadow-md' : 'bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 text-primary-700 dark:text-primary-300'}`}>
                                <PenLine className="w-4 h-4" /> Viết
                            </button>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-1 py-3 bg-slate-50 dark:bg-slate-800/60 text-slate-400 dark:text-slate-600 rounded-2xl font-medium text-sm cursor-not-allowed">
                                <PenLine className="w-4 h-4" /> Viết
                            </div>
                        )}
                    </div>

                    {activeTab === 'writer' && word.hanzi && (
                        <div className="mt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 pt-6">
                            <VocabHanziWriter character={word.hanzi} />
                        </div>
                    )}

                    {activeTab === 'reader' && (
                        <div className="mt-2 animate-fade-in border-t border-slate-100 dark:border-slate-800 pt-6">
                            <VocabReader word={word} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

export function VocabTab({ vocabData }: { vocabData: any[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMode, setSearchMode] = useState('meaning');
    const [detailWord, setDetailWord] = useState<any | null>(null);

    const searchVocab = (vocabData: any[], query: string, mode: string) => {
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

            const parts = target.split(/[\/,]/).map(p => p.trim());
            const exactPartMatch = parts.some(p => p === searchQ || p.startsWith(searchQ));
            if (exactPartMatch) return { word, score: 2 };

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

    const filteredWords = useMemo(() => {
        // Mặc định hiện tất cả nếu chưa nhập
        if (!searchTerm.trim()) return vocabData;
        return searchVocab(vocabData, searchTerm, searchMode);
    }, [searchTerm, searchMode, vocabData]);

    const visibleWords = filteredWords.slice(0, 50);
    const resultCount = filteredWords.length;
    const totalCount = vocabData.length;

    const handleOpenDetail = useCallback((word: any) => setDetailWord(word), []);
    const handleCloseDetail = useCallback(() => setDetailWord(null), []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero panel */}
            <div className="relative overflow-hidden rounded-3xl border border-primary-100/70 dark:border-primary-500/10 bg-gradient-to-br from-primary-50 via-white to-white dark:from-primary-500/10 dark:via-slate-900 dark:to-slate-900 p-6 sm:p-8 mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Từ điển tổng hợp
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{totalCount} từ đã mở khóa</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 mb-6 animate-fade-in">
                <div className="flex flex-col gap-3 mb-5">
                    <div className="flex-1">
                        <input
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Tìm bằng chữ Hán, pinyin hoặc tiếng Việt..."
                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-500/40"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <button type="button" onClick={() => setSearchMode('meaning')}
                            className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${searchMode === 'meaning' ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                            🇻🇳 Tiếng Việt
                        </button>
                        {vocabData[0]?.hanzi ? (
                            <>
                                <button type="button" onClick={() => setSearchMode('hanzi')}
                                    className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${searchMode === 'hanzi' ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                    🀄 Hán tự
                                </button>
                                <button type="button" onClick={() => setSearchMode('pinyin')}
                                    className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${searchMode === 'pinyin' ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                    🔤 Pinyin
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setSearchMode('word')}
                                className={`px-4 py-3 rounded-2xl text-sm font-semibold transition ${searchMode === 'word' ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                                🇬🇧 Tiếng Anh
                            </button>
                        )}
                    </div>
                </div>

                {searchTerm.trim() !== '' && resultCount === 0 ? (
                    <div className="border border-dashed border-red-200 dark:border-red-500/30 rounded-3xl py-16 text-center text-red-600 dark:text-red-400">
                        <div className="flex justify-center mb-4"><XCircle className="w-10 h-10" /></div>
                        <p className="text-lg font-semibold">Không tìm thấy từ nào phù hợp</p>
                    </div>
                ) : (
                    <>
                        <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            Đang hiển thị <span className="font-semibold text-slate-800 dark:text-slate-100">{visibleWords.length}</span> / {resultCount} kết quả
                        </div>
                        <VocabGrid vocabList={visibleWords} onOpenDetail={handleOpenDetail} />
                    </>
                )}
            </div>
            {detailWord && <VocabDetailModal word={detailWord} onClose={handleCloseDetail} />}
        </div>
    );
}
