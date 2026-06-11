"use client";

import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import { SpeechEngine } from '@/lib/speech-engine';
import { StartersExercises } from './StartersExercises';

const playAudio = (text: string, isEnglish: boolean = false) => {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = isEnglish ? 'en-US' : 'zh-CN';
    utt.rate = 0.85;
    window.speechSynthesis.speak(utt);
};

function fisherYatesShuffle<T>(arr: T[]): T[] {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const VocabReadingCard = memo(({ word, onNext, onPrev, onRandom, current, total }: any) => {
    const [speechState, setSpeechState] = useState<'idle' | 'listening' | 'success' | 'partial' | 'error'>('idle');
    const [score, setScore] = useState<number | null>(null);
    const [heard, setHeard] = useState('');
    const [showPinyin, setShowPinyin] = useState(true);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        setSpeechState('idle');
        setScore(null);
        setHeard('');
        if (recognitionRef.current) {
            try { recognitionRef.current.stop(); } catch (e) {}
        }
    }, [word?.id, word?._uuid, word?.hanzi]);

    const handleListen = () => {
        setSpeechState('idle');
        setScore(null);
        setHeard('');
        playAudio(word.hanzi || word.word, !word.hanzi);
    };

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

        // Hủy bỏ âm thanh đọc mẫu đang phát (nếu có) để tránh xung đột gây lỗi "aborted"
        window.speechSynthesis.cancel();

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
    const scoreLabel = score !== null && score >= 90 ? '🌟 Xuất sắc!' : score !== null && score >= 80 ? '✅ Rất tốt!' : score !== null && score >= 50 ? '🟡 Khá ổn, thử lại!' : '❌ Cần luyện thêm!';

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto animate-fade-in">
            <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center relative mt-6">
                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 uppercase">
                    {word.type_short || word.type || 'Từ vựng'}
                </span>
                <button onClick={() => setShowPinyin(v => !v)} className="absolute top-4 right-4 text-xs text-gray-400 hover:text-indigo-600 transition-colors font-medium">
                    {showPinyin ? <><i className="fa-regular fa-eye-slash"></i> Ẩn pinyin</> : <><i className="fa-regular fa-eye"></i> Hiện pinyin</>}
                </button>

                <div className="my-8">
                    {word.hanzi ? (
                        <div className="text-7xl font-bold text-gray-800 leading-none">{word.hanzi}</div>
                    ) : (
                        <div className="text-5xl font-bold text-emerald-700 leading-none" style={{fontFamily:'Georgia,serif'}}>{word.word}</div>
                    )}
                </div>

                <div className="min-h-[60px]">
                    {showPinyin && (
                        <>
                            {word.pinyin && <div className="text-2xl text-indigo-500 font-medium mb-2 tracking-wide">{word.pinyin}</div>}
                            {word.ipa && <div className="text-emerald-500 font-mono text-lg mb-2">{word.ipa}</div>}
                        </>
                    )}
                </div>

                <div className="text-gray-600 text-lg font-medium">{word.meaning}</div>
            </div>

            <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
                <button onClick={onPrev} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={current <= 0}>
                    <i className="fa-solid fa-chevron-left text-gray-500"></i>
                </button>
                <button onClick={onRandom} className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center hover:bg-purple-100 transition-colors" title="Từ ngẫu nhiên">
                    <i className="fa-solid fa-shuffle"></i>
                </button>
                <span className="text-sm text-gray-500 font-bold min-w-[60px] text-center bg-gray-100 px-3 py-1 rounded-full">
                    {current + 1} / {total}
                </span>
                <button onClick={onNext} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={current >= total - 1}>
                    <i className="fa-solid fa-chevron-right text-gray-500"></i>
                </button>
            </div>

            <div className="flex gap-3 w-full">
                <button onClick={handleListen} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-indigo-50 text-indigo-600 font-bold hover:bg-indigo-100 transition-colors border border-indigo-100">
                    <i className="fa-solid fa-volume-high"></i> Nghe mẫu
                </button>

                <button onClick={handleSpeak} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all shadow-sm
                    ${speechState === 'listening' ? 'bg-red-500 text-white animate-pulse shadow-red-500/30' : 
                      speechState === 'success' ? 'bg-green-500 text-white shadow-green-500/30' : 
                      'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/30 hover:-translate-y-0.5'}`}>
                    <i className={`fa-solid ${speechState === 'listening' ? 'fa-stop' : 'fa-microphone'}`}></i>
                    {speechState === 'listening' ? 'Đang nghe...' : 'Đọc thử'}
                </button>
            </div>

            {score !== null && (
                <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-sm p-6 animate-fade-in relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-base font-bold text-gray-800">{scoreLabel}</span>
                        <span className={`text-2xl font-black ${score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {score}%
                        </span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4 relative z-10">
                        <div className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`} style={{ width: `${score}%` }}></div>
                    </div>
                    {heard && (
                        <div className="bg-gray-50 p-3 rounded-xl mb-4 relative z-10">
                            <p className="text-xs text-gray-500 mb-1">Hệ thống nghe được:</p>
                            <p className="text-lg font-bold text-gray-700">{heard}</p>
                        </div>
                    )}
                    <div className="flex gap-3 relative z-10">
                        <button onClick={handleSpeak} className="flex-1 py-3 text-sm rounded-xl bg-indigo-50 text-indigo-600 font-bold hover:bg-indigo-100 transition-colors">
                            🔄 Đọc lại
                        </button>
                        {score >= 80 && current < total - 1 && (
                            <button onClick={onNext} className="flex-1 py-3 text-sm rounded-xl bg-green-50 text-green-600 font-bold hover:bg-green-100 transition-colors">
                                Câu tiếp <i className="fa-solid fa-arrow-right ml-1"></i>
                            </button>
                        )}
                    </div>
                    
                    {/* Decoration */}
                    {score >= 80 && (
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-400 rounded-full blur-3xl mix-blend-multiply opacity-20 pointer-events-none"></div>
                    )}
                </div>
            )}

            {speechState === 'error' && score === null && heard && (
                <div className="w-full text-center text-sm font-medium text-red-500 bg-red-50 rounded-2xl p-4 border border-red-100 animate-fade-in">
                    <i className="fa-solid fa-triangle-exclamation mr-2"></i> {heard}
                </div>
            )}
        </div>
    );
});

export function ReadingTab({ vocabData, levelId = 'hsk1' }: { vocabData: any[], levelId?: string }) {
    if (levelId === 'en-starters') {
        return <StartersExercises vocabData={vocabData} mode="reading" />;
    }
    const [filterType, setFilterType] = useState('all');
    const [currentIdx, setCurrentIdx] = useState(0);
    const [shuffledWords, setShuffledWords] = useState<any[]>([]);

    const types = useMemo(() => {
        const set = new Set(vocabData.map(w => w.type_short).filter(Boolean));
        return ['all', ...Array.from(set)];
    }, [vocabData]);

    const filteredWords = useMemo(() => {
        if (filterType === 'all') return vocabData.filter(w => (w.hanzi || w.word) && w.meaning);
        return vocabData.filter(w => w.type_short === filterType && (w.hanzi || w.word) && w.meaning);
    }, [vocabData, filterType]);

    useEffect(() => { setCurrentIdx(0); }, [filterType]);

    useEffect(() => {
        setShuffledWords(fisherYatesShuffle([...filteredWords]));
        setCurrentIdx(0);
    }, [filteredWords]);

    const wordList = shuffledWords.length > 0 ? shuffledWords : filteredWords;
    const currentWord = wordList[currentIdx];

    const typeLabels: Record<string, string> = {
        all: 'Tất cả', n: 'Danh từ', v: 'Động từ', adj: 'Tính từ',
        adv: 'Phó từ', pron: 'Đại từ', prep: 'Giới từ',
        conj: 'Liên từ', part: 'Trợ từ', num: 'Số từ',
        m: 'Lượng từ', phr: 'Cụm từ',
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mt-6 relative overflow-hidden">
                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-xl mb-4 shadow-inner">
                            <i className="fa-solid fa-microphone-lines"></i>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Luyện Đọc Phát Âm</h2>
                        <p className="text-gray-500 mt-2 font-medium">Nhìn chữ Hán → Đọc to → AI chấm điểm</p>
                    </div>
                    <div className="text-right bg-gray-50 p-4 rounded-2xl border border-gray-100 shadow-inner">
                        <div className="text-3xl font-black text-indigo-600">{filteredWords.length}</div>
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Từ vựng</div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 relative z-10">
                    {types.map(t => (
                        <button key={t} onClick={() => setFilterType(t)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all
                                ${filterType === t ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
                            {typeLabels[t] || t}
                        </button>
                    ))}
                </div>
                
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-50 rounded-full blur-3xl pointer-events-none"></div>
            </div>

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
                <div className="text-center text-gray-400 py-16 bg-white rounded-3xl border border-gray-100 border-dashed">
                    <i className="fa-solid fa-box-open text-4xl mb-4 text-gray-300"></i>
                    <p className="font-medium">Không có từ nào trong danh mục này.</p>
                </div>
            )}
        </div>
    );
}
