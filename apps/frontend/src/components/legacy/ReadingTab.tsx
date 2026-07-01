"use client";

import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import { SpeechEngine } from '@/lib/speech-engine';
import { StartersExercises } from './StartersExercises';
import ExamExerciseQuiz from '@/components/ExamExerciseQuiz';
import {
    Eye, EyeOff, ChevronLeft, ChevronRight, Shuffle, Volume2, Square, Mic,
    ArrowRight, AlertTriangle, Loader2, AudioLines, Type, AlignLeft, PackageOpen,
} from 'lucide-react';

const playTone = (type: 'success' | 'error') => {
    try {
        const ctx = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        if (type === 'success') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
        } else {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(280, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.2);
        }
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(); osc.stop(ctx.currentTime + 0.3);
    } catch {}
};

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

// Helper for Chinese Character Alignment
const cleanChineseWord = (w: string) => w.replace(/[，。！？、：；""''「」【】\s?.,!:-]/g, "").trim().toLowerCase();

const alignChineseChars = (target: string, heard: string) => {
    const targetNorm = cleanChineseWord(target);
    const heardNorm = cleanChineseWord(heard);

    let heardIdx = 0;
    return targetNorm.split('').map((char) => {
        let found = false;
        // look ahead 3 characters in heard transcript
        for (let j = heardIdx; j < Math.min(heardIdx + 3, heardNorm.length); j++) {
            if (heardNorm[j] === char) {
                heardIdx = j + 1;
                found = true;
                break;
            }
        }
        if (!found) {
            const idx = heardNorm.indexOf(char, heardIdx);
            if (idx !== -1 && idx >= heardIdx) {
                heardIdx = idx + 1;
                found = true;
            }
        }
        return { char, correct: found };
    });
};

const FALLBACK_SENTENCES = [
    { zh: "你好！", py: "Nǐ hǎo!", vi: "Xin chào!" },
    { zh: "你叫什么名字？", py: "Nǐ jiào shénme míngzi?", vi: "Bạn tên là gì?" },
    { zh: "我叫大山。", py: "Wǒ jiào Dàshān.", vi: "Tôi tên là Đại Sơn." },
    { zh: "你是学生吗？我是学生。", py: "Nǐ shì xuésheng ma? Wǒ shì xuésheng.", vi: "Bạn là học sinh phải không? Tôi là học sinh." },
    { zh: "谢谢你！", py: "Xièxie nǐ!", vi: "Cảm ơn bạn!" },
    { zh: "不客气。", py: "Bú kèqi.", vi: "Không có gì." },
    { zh: "再见！", py: "Zàijiàn!", vi: "Tạm biệt!" },
    { zh: "现在几点？", py: "Xiànzài jǐ diǎn?", vi: "Bây giờ là mấy giờ?" },
    { zh: "现在十二点。", py: "Xiànzài shí'èr diǎn.", vi: "Bây giờ là 12 giờ." },
    { zh: "你家有几口人？", py: "Nǐ jiā yǒu jǐ kǒu rén?", vi: "Nhà bạn có mấy người?" }
];

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
                const state = s >= 80 ? 'success' : s >= 50 ? 'partial' : 'error';
                setSpeechState(state);
                playTone(s >= 80 ? 'success' : 'error');
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
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto animate-fade-in font-sans">
            <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 text-center relative mt-6">
                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 uppercase">
                    {word.type_short || word.type || 'Từ vựng'}
                </span>
                <button onClick={() => setShowPinyin(v => !v)} className="absolute top-4 right-4 text-xs text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium inline-flex items-center gap-1">
                    {showPinyin ? <><EyeOff className="w-3 h-3" /> Ẩn pinyin</> : <><Eye className="w-3 h-3" /> Hiện pinyin</>}
                </button>

                <div className="my-8">
                    {word.hanzi ? (
                        <div className="text-7xl font-bold text-slate-800 dark:text-slate-100 leading-none">{word.hanzi}</div>
                    ) : (
                        <div className="text-5xl font-bold text-primary-700 dark:text-primary-300 leading-none" style={{fontFamily:'Georgia,serif'}}>{word.word}</div>
                    )}
                </div>

                <div className="min-h-[60px]">
                    {showPinyin && (
                        <>
                            {word.pinyin && <div className="text-2xl text-primary-500 dark:text-primary-400 font-medium mb-2 tracking-wide">{word.pinyin}</div>}
                            {word.ipa && <div className="text-primary-500 dark:text-primary-400 font-mono text-lg mb-2">{word.ipa}</div>}
                        </>
                    )}
                </div>

                <div className="text-slate-600 dark:text-slate-300 text-lg font-medium">{word.meaning}</div>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-3 rounded-full shadow-sm border border-slate-100 dark:border-slate-800">
                <button onClick={onPrev} className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={current <= 0}>
                    <ChevronLeft className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </button>
                <button onClick={onRandom} className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-500 dark:text-primary-400 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors" title="Từ ngẫu nhiên">
                    <Shuffle className="w-4 h-4" />
                </button>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-bold min-w-[60px] text-center bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    {current + 1} / {total}
                </span>
                <button onClick={onNext} className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={current >= total - 1}>
                    <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </button>
            </div>

            <div className="flex gap-3 w-full">
                <button onClick={handleListen} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors border border-primary-100 dark:border-primary-500/20">
                    <Volume2 className="w-4 h-4" /> Nghe mẫu
                </button>

                <button onClick={handleSpeak} className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all shadow-sm
                    ${speechState === 'listening' ? 'bg-red-500 text-white animate-pulse shadow-red-500/30' :
                      speechState === 'success' ? 'bg-green-500 text-white shadow-green-500/30' :
                      'bg-primary-500 text-white hover:bg-primary-600 hover:-translate-y-0.5'}`}>
                    {speechState === 'listening' ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {speechState === 'listening' ? 'Đang nghe...' : 'Đọc thử'}
                </button>
            </div>

            {score !== null && (
                <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 animate-fade-in relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-base font-bold text-slate-800 dark:text-slate-100">{scoreLabel}</span>
                        <span className={`text-2xl font-black ${score >= 80 ? 'text-green-500 dark:text-green-400' : score >= 50 ? 'text-yellow-500 dark:text-yellow-400' : 'text-red-500 dark:text-red-400'}`}>
                            {score}%
                        </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4 relative z-10">
                        <div className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`} style={{ width: `${score}%` }}></div>
                    </div>
                    {heard && (
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl mb-4 relative z-10">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Hệ thống nghe được:</p>
                            <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{heard}</p>
                        </div>
                    )}
                    <div className="flex gap-3 relative z-10">
                        <button onClick={handleSpeak} className="flex-1 py-3 text-sm rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors">
                            🔄 Đọc lại
                        </button>
                        {score >= 80 && current < total - 1 && (
                            <button onClick={onNext} className="flex-1 py-3 text-sm rounded-xl bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 font-bold hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors inline-flex items-center justify-center gap-1">
                                Câu tiếp <ArrowRight className="w-3 h-3" />
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
                <div className="w-full text-center text-sm font-medium text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-2xl p-4 border border-red-100 dark:border-red-500/20 animate-fade-in inline-flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> {heard}
                </div>
            )}
        </div>
    );
});

const SentenceReadingCard = memo(({ sentence, onNext, onPrev, onRandom, current, total }: any) => {
    const [speechState, setSpeechState] = useState<'idle' | 'listening' | 'evaluating' | 'success' | 'partial' | 'error'>('idle');
    const [score, setScore] = useState<number | null>(null);
    const [heard, setHeard] = useState('');
    const [alignment, setAlignment] = useState<any[]>([]);
    const [showPinyin, setShowPinyin] = useState(true);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        setSpeechState('idle');
        setScore(null);
        setHeard('');
        setAlignment([]);
        if (recognitionRef.current) {
            try { recognitionRef.current.stop(); } catch (e) {}
        }
    }, [sentence.zh]);

    const handleListen = () => {
        setSpeechState('idle');
        setScore(null);
        setHeard('');
        playAudio(sentence.zh, false);
    };

    const handleSpeak = () => {
        if (!SpeechEngine.isSupported()) {
            setSpeechState('error');
            setHeard('Trình duyệt không hỗ trợ nhận dạng giọng nói. Hãy dùng Chrome hoặc Edge.');
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
        setAlignment([]);

        window.speechSynthesis.cancel();

        recognitionRef.current = SpeechEngine.listen({
            lang: 'zh-CN',
            onResult: ({ transcript }) => {
                setSpeechState('evaluating');
                setTimeout(() => {
                    const align = alignChineseChars(sentence.zh, transcript);
                    const correctCount = align.filter(c => c.correct).length;
                    const calculatedScore = align.length > 0 ? Math.round((correctCount / align.length) * 100) : 0;

                    setHeard(transcript);
                    setAlignment(align);
                    setScore(calculatedScore);
                    setSpeechState(calculatedScore >= 80 ? 'success' : 'partial');
                    playTone(calculatedScore >= 80 ? 'success' : 'error');
                }, 400);
            },
            onError: (msg) => {
                setSpeechState('error');
                setHeard(msg);
            },
        });
    };

    const barColor = score !== null && score >= 80 ? 'bg-green-500' : score !== null && score >= 50 ? 'bg-yellow-400' : 'bg-red-400';
    const scoreLabel = score !== null && score >= 90 ? '🌟 Xuất sắc!' : score !== null && score >= 80 ? '✅ Rất tốt!' : score !== null && score >= 50 ? '🟡 Khá ổn, thử lại!' : '❌ Cần luyện thêm!';

    // Render original characters aligned
    const renderAlignedCharacters = () => {
        if (!alignment || alignment.length === 0) {
            return <span className="text-slate-800 dark:text-slate-100">{sentence.zh}</span>;
        }
        let normIdx = 0;
        return sentence.zh.split('').map((char: string, index: number) => {
            const isPunct = /[，。！？、：；""''「」【】\s?.,!:-]/.test(char);
            if (isPunct) {
                return <span key={index} className="text-slate-400 dark:text-slate-500 font-bold">{char}</span>;
            }
            const alignItem = alignment[normIdx];
            normIdx++;
            if (!alignItem) {
                return <span key={index} className="text-slate-800 dark:text-slate-100">{char}</span>;
            }
            return (
                <span key={index} className={`px-0.5 rounded font-bold transition-all ${
                    alignItem.correct ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10' : 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 line-through decoration-2'
                }`}>
                    {char}
                </span>
            );
        });
    };

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto animate-fade-in font-sans">
            <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 text-center relative mt-6">
                <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 uppercase">
                    {sentence.title || 'Luyện đọc câu'}
                </span>
                <button onClick={() => setShowPinyin(v => !v)} className="absolute top-4 right-4 text-xs text-slate-400 dark:text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium inline-flex items-center gap-1">
                    {showPinyin ? <><EyeOff className="w-3 h-3" /> Ẩn pinyin</> : <><Eye className="w-3 h-3" /> Hiện pinyin</>}
                </button>

                <div className="my-8">
                    <div className="text-4xl font-bold leading-normal tracking-wide text-slate-800 dark:text-slate-100 break-words">
                        {renderAlignedCharacters()}
                    </div>
                </div>

                <div className="min-h-[48px] mb-2">
                    {showPinyin && sentence.py && (
                        <div className="text-xl text-primary-500 dark:text-primary-400 font-medium mb-2 tracking-wide leading-relaxed">
                            {sentence.py}
                        </div>
                    )}
                    <div className="text-slate-600 dark:text-slate-300 text-base font-medium">{sentence.vi}</div>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 py-3 rounded-full shadow-sm border border-slate-100 dark:border-slate-800">
                <button onClick={onPrev} className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={current <= 0}>
                    <ChevronLeft className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </button>
                <button onClick={onRandom} className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-500 dark:text-primary-400 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors" title="Câu ngẫu nhiên">
                    <Shuffle className="w-4 h-4" />
                </button>
                <span className="text-sm text-slate-500 dark:text-slate-400 font-bold min-w-[60px] text-center bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    {current + 1} / {total}
                </span>
                <button onClick={onNext} className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed" disabled={current >= total - 1}>
                    <ChevronRight className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                </button>
            </div>

            <div className="flex gap-3 w-full">
                <button onClick={handleListen} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors border border-primary-100 dark:border-primary-500/20">
                    <Volume2 className="w-4 h-4" /> Nghe mẫu
                </button>

                <button onClick={handleSpeak} disabled={speechState === 'evaluating'}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all shadow-sm disabled:opacity-50
                        ${speechState === 'listening' ? 'bg-red-500 text-white animate-pulse shadow-red-500/30' :
                          speechState === 'success' ? 'bg-green-500 text-white shadow-green-500/30' :
                          'bg-primary-500 text-white hover:bg-primary-600 hover:-translate-y-0.5'}`}>
                    {speechState === 'listening' ? <Square className="w-4 h-4" /> : speechState === 'evaluating' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mic className="w-4 h-4" />}
                    {speechState === 'listening' ? 'Đang nghe...' : speechState === 'evaluating' ? 'Chấm điểm...' : 'Đọc thử'}
                </button>
            </div>

            {speechState === 'evaluating' && (
                <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 text-center animate-pulse">
                    <div className="flex items-center justify-center gap-3 text-primary-600 dark:text-primary-400 font-bold">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Đang phân tích phát âm...</span>
                    </div>
                </div>
            )}

            {score !== null && speechState !== 'evaluating' && (
                <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 animate-fade-in relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-base font-bold text-slate-800 dark:text-slate-100">{scoreLabel}</span>
                        <span className={`text-2xl font-black ${score >= 80 ? 'text-green-500 dark:text-green-400' : score >= 50 ? 'text-yellow-500 dark:text-yellow-400' : 'text-red-500 dark:text-red-400'}`}>
                            {score}%
                        </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4 relative z-10">
                        <div className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`} style={{ width: `${score}%` }}></div>
                    </div>
                    {heard && (
                        <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl mb-4 relative z-10">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Hệ thống nghe được:</p>
                            <p className="text-lg font-bold text-slate-700 dark:text-slate-200">{heard}</p>
                        </div>
                    )}
                    <div className="flex gap-3 relative z-10">
                        <button onClick={handleSpeak} className="flex-1 py-3 text-sm rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors">
                            🔄 Đọc lại
                        </button>
                        {score >= 80 && current < total - 1 && (
                            <button onClick={onNext} className="flex-1 py-3 text-sm rounded-xl bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 font-bold hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors inline-flex items-center justify-center gap-1">
                                Câu tiếp <ArrowRight className="w-3 h-3" />
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
                <div className="w-full text-center text-sm font-medium text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-2xl p-4 border border-red-100 dark:border-red-500/20 animate-fade-in inline-flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> {heard}
                </div>
            )}
        </div>
    );
});

export function ReadingTab({ vocabData, passagesData = [], dialogueSentences = [], levelId = 'hsk1' }: { vocabData: any[], passagesData?: any[], dialogueSentences?: any[], levelId?: string }) {
    if (levelId === 'en-starters') {
        return <StartersExercises vocabData={vocabData} mode="reading" />;
    }

    if (levelId === 'en-ket') {
        const examExercises = passagesData.filter((p: any) => p.skillTag === 'reading' || p.skillTag === 'mock');
        return (
            <ExamExerciseQuiz
                exercises={examExercises}
                accentColor="indigo"
                emptyMessage="Chưa có bài đọc đúng định dạng đề thi KET cho các bài đã hoàn thành."
            />
        );
    }

    const isEnglish = !!(vocabData?.[0]?.word && !vocabData?.[0]?.hanzi);

    const [subMode, setSubMode] = useState<'vocab' | 'sentence' | null>(null);
    const [filterType, setFilterType] = useState('all');
    const [currentIdx, setCurrentIdx] = useState(0);
    const [shuffledWords, setShuffledWords] = useState<any[]>([]);

    const [sentenceIdx, setSentenceIdx] = useState(0);
    const [shuffledSentences, setShuffledSentences] = useState<any[]>([]);

    // Filter and shuffle vocabulary logic
    const types = useMemo(() => {
        const set = new Set(vocabData.map(w => w.type_short).filter(Boolean));
        return ['all', ...Array.from(set)];
    }, [vocabData]);

    const filteredWords = useMemo(() => {
        if (filterType === 'all') return vocabData.filter(w => (w.hanzi || w.word) && w.meaning);
        return vocabData.filter(w => w.type_short === filterType && (w.hanzi || w.word) && w.meaning);
    }, [vocabData, filterType]);

    useEffect(() => {
        setCurrentIdx(0);
    }, [filterType, subMode]);

    useEffect(() => {
        if (subMode === 'vocab') {
            setShuffledWords(fisherYatesShuffle([...filteredWords]));
            setCurrentIdx(0);
        }
    }, [filteredWords, subMode]);

    const wordList = shuffledWords.length > 0 ? shuffledWords : filteredWords;
    const currentWord = wordList[currentIdx];

    // Sentence extraction and shuffle logic
    const sentencePool = useMemo(() => {
        const existingExampleSentences = vocabData
            .filter(v => v.example_zh && v.example_vi)
            .map(v => ({
                zh: v.example_zh,
                vi: v.example_vi,
                py: v.example_py || '',
                title: v.hanzi || v.word
            }));
        return [...existingExampleSentences, ...(dialogueSentences || [])];
    }, [vocabData, dialogueSentences]);

    useEffect(() => {
        if (subMode === 'sentence') {
            setShuffledSentences(fisherYatesShuffle([...sentencePool]));
            setSentenceIdx(0);
        }
    }, [sentencePool, subMode]);

    const currentSentence = shuffledSentences[sentenceIdx];

    // Main Selection Menu
    if (subMode === null) {
        return (
            <div className="max-w-md mx-auto animate-fade-in font-sans mt-6">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <AudioLines className="w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 animate-fade-in">{isEnglish ? 'Luyện Đọc Tiếng Anh' : 'Luyện Đọc Tiếng Trung'}</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">Chọn một chế độ để bắt đầu luyện phát âm AI</p>
                </div>

                <div className="space-y-4">
                    <button onClick={() => setSubMode('vocab')}
                        className="w-full flex items-center gap-4 p-5 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-500/50 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 transition-all text-left group shadow-sm hover:scale-[1.01]">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary-200 dark:group-hover:bg-primary-500/30 transition-colors">
                            <Type className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                            <div className="font-bold text-slate-800 dark:text-slate-100">Luyện Đọc Từ Vựng</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">{isEnglish ? 'Luyện phát âm từng từ kèm phiên âm IPA và nghĩa' : 'Luyện phát âm từng từ HSK kèm Pinyin và nghĩa'}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto group-hover:text-primary-500 transition-colors" />
                    </button>

                    {!isEnglish && (
                        <button onClick={() => setSubMode('sentence')}
                            className="w-full flex items-center gap-4 p-5 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-100 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-500/50 hover:bg-primary-50/50 dark:hover:bg-primary-500/10 transition-all text-left group shadow-sm hover:scale-[1.01]">
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-500/20 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary-200 dark:group-hover:bg-primary-500/30 transition-colors">
                                <AlignLeft className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-800 dark:text-slate-100">Luyện Đọc Theo Câu</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Luyện đọc các câu hội thoại giao tiếp trôi chảy</div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto group-hover:text-primary-500 transition-colors" />
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const typeLabels: Record<string, string> = {
        all: 'Tất cả', n: 'Danh từ', v: 'Động từ', adj: 'Tính từ',
        adv: 'Phó từ', pron: 'Đại từ', prep: 'Giới từ',
        conj: 'Liên từ', part: 'Trợ từ', num: 'Số từ',
        m: 'Lượng từ', phr: 'Cụm từ',
    };

    if (subMode === 'vocab') {
        return (
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in font-sans">
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 mt-6 relative overflow-hidden">
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <button onClick={() => setSubMode(null)}
                                className="flex items-center gap-2 text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 bg-primary-50 dark:bg-primary-500/10 px-3 py-1.5 rounded-full transition-colors mb-4">
                                <ChevronLeft className="w-3 h-3" /> Chọn chế độ khác
                            </button>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Luyện Đọc Từ Vựng</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">{isEnglish ? 'Nhìn từ → Đọc to → AI chấm điểm phát âm' : 'Nhìn chữ Hán → Đọc to → AI chấm điểm phát âm'}</p>
                        </div>
                        <div className="text-right bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
                            <div className="text-3xl font-black text-primary-600 dark:text-primary-400">{filteredWords.length}</div>
                            <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Từ vựng</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-6 relative z-10">
                        {types.map(t => (
                            <button key={t} onClick={() => setFilterType(t)}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all
                                    ${filterType === t ? 'bg-primary-500 text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'}`}>
                                {typeLabels[t] || t}
                            </button>
                        ))}
                    </div>

                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary-50 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
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
                    <div className="text-center text-slate-400 dark:text-slate-500 py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed">
                        <PackageOpen className="w-10 h-10 mb-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        <p className="font-medium">Không có từ nào trong danh mục này.</p>
                    </div>
                )}
            </div>
        );
    }

    // subMode === 'sentence'
    return (
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in font-sans">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-8 mt-6 relative overflow-hidden">
                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <button onClick={() => setSubMode(null)}
                            className="flex items-center gap-2 text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 bg-primary-50 dark:bg-primary-500/10 px-3 py-1.5 rounded-full transition-colors mb-4">
                            <ChevronLeft className="w-3 h-3" /> Chọn chế độ khác
                        </button>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Luyện Đọc Theo Câu</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Luyện đọc trôi chảy câu giao tiếp chữ Hán dài</p>
                    </div>
                    <div className="text-right bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
                        <div className="text-3xl font-black text-primary-600 dark:text-primary-400">{shuffledSentences.length}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Câu thoại</div>
                    </div>
                </div>
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary-50 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {currentSentence ? (
                <SentenceReadingCard
                    sentence={currentSentence}
                    current={sentenceIdx}
                    total={shuffledSentences.length}
                    onNext={() => setSentenceIdx(i => Math.min(i + 1, shuffledSentences.length - 1))}
                    onPrev={() => setSentenceIdx(i => Math.max(i - 1, 0))}
                    onRandom={() => setSentenceIdx(Math.floor(Math.random() * shuffledSentences.length))}
                />
            ) : (
                <div className="text-center text-slate-400 dark:text-slate-500 py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed">
                    <PackageOpen className="w-10 h-10 mb-4 text-slate-300 dark:text-slate-600 mx-auto" />
                    <p className="font-medium">Chưa có dữ liệu câu hội thoại nào.</p>
                </div>
            )}
        </div>
    );
}
