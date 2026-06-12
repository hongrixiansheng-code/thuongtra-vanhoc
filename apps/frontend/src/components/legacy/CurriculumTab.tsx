"use client";

import React, { useState, useEffect, useRef } from 'react';
import { VocabDetailModal } from './VocabTab';
import { SpeechEngine } from '@/lib/speech-engine';

const DialogueLine = ({ line, speak }: { line: any, speak: (t: string) => void }) => {
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

    const handleSpeak = (e: React.MouseEvent) => {
        e.stopPropagation();
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

        recognitionRef.current = SpeechEngine.listen({
            lang: (line.en && !line.zh) ? 'en-US' : 'zh-CN',
            onResult: ({ transcript }) => {
                const s = SpeechEngine.calcScore(transcript, line.zh || line.en);
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

    const isA = line.speaker === 'A';

    return (
        <div className={`flex gap-4 ${isA ? '' : 'flex-row-reverse'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 shadow-sm
                ${isA ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                {line.speaker}
            </div>
            
            <div className={`max-w-[80%] flex flex-col gap-2 ${isA ? 'items-start' : 'items-end'}`}>
                <div className="relative group">
                    <div onClick={() => speak(line.zh || line.en)} className={`rounded-2xl px-5 py-3 shadow-sm cursor-pointer transition hover:opacity-90 relative
                        ${isA ? 'bg-gray-50 rounded-tl-none border border-gray-100' : 'bg-green-50 rounded-tr-none border border-green-100'}`}>
                        <div className="text-xl font-bold text-gray-800 mb-1">{line.zh || line.en}</div>
                        {line.py && <div className="text-sm font-medium text-indigo-600 mb-1">{line.py}</div>}
                        <div className="text-sm text-gray-500">{line.vi}</div>
                    </div>

                    <button onClick={handleSpeak} 
                        className={`absolute top-1/2 -translate-y-1/2 ${isA ? '-right-12' : '-left-12'} w-9 h-9 rounded-full shadow-sm flex items-center justify-center transition-all
                            ${speechState === 'listening' ? 'bg-red-500 text-white animate-pulse' : 
                              speechState === 'success' ? 'bg-green-500 text-white' : 
                              'bg-white text-gray-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 border border-gray-100'}`}>
                        <i className={`fa-solid ${speechState === 'listening' ? 'fa-stop' : 'fa-microphone'}`}></i>
                    </button>
                </div>

                {score !== null && (
                    <div className={`text-xs p-2 rounded-xl border w-fit ${score >= 80 ? 'bg-green-50 border-green-200 text-green-700' : score >= 50 ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                        <span className="font-bold mr-2">{score}%</span>
                        {heard && <span className="opacity-80">Nghe được: {heard}</span>}
                    </div>
                )}
                {speechState === 'error' && score === null && heard && (
                    <div className="text-xs p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 w-fit">
                        {heard}
                    </div>
                )}
            </div>
        </div>
    );
};

export function CurriculumTab({ programName, lessons, isPremiumUser }: { programName?: string, lessons: any[], isPremiumUser?: boolean }) {
    const [activeLessonId, setActiveLessonId] = useState(lessons?.[0]?.id || null);
    const [lessonTab, setLessonTab] = useState('vocab');
    const [detailWord, setDetailWord] = useState<any | null>(null);
    const [dialogueSpeed, setDialogueSpeed] = useState(1.0);
    const speedRef = useRef(1.0);
    useEffect(() => { speedRef.current = dialogueSpeed; }, [dialogueSpeed]);
    
    const activeLesson = lessons?.find(l => l.id === activeLessonId) || lessons?.[0];
    
    // Group lessons by theme
    const themes = Array.from(new Set(lessons?.map(l => l.theme)));

    const speak = (text: string) => {
        if (!text || typeof window === 'undefined') return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = /[a-zA-Z]/.test(text) && !/[\u4e00-\u9fa5]/.test(text) ? 'en-US' : 'zh-CN';
        u.rate = speedRef.current;
        window.speechSynthesis.speak(u);
    };

    const playDialogue = (lines: any[]) => {
        window.speechSynthesis.cancel();
        let i = 0;
        const doPlay = () => {
            if (i >= lines.length) return;
            const text = lines[i].zh || lines[i].en;
            if (!text) { i++; doPlay(); return; }
            const u = new SpeechSynthesisUtterance(text);
            u.lang = /[a-zA-Z]/.test(text) && !/[\u4e00-\u9fa5]/.test(text) ? 'en-US' : 'zh-CN';
            u.rate = speedRef.current;
            u.onend = () => { i++; setTimeout(doPlay, 400); };
            window.speechSynthesis.speak(u);
        };
        doPlay();
    };

    if (!lessons || lessons.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-8 text-center animate-fade-in">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12">
                    <div className="text-6xl mb-4">🚧</div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-2">Đang xây dựng</h2>
                    <p className="text-gray-500">Nội dung cho cấp độ này sẽ sớm có mặt!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                
                {/* Tiêu đề Bài học */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Bài học: {activeLesson.title}</h2>
                        <div className="flex items-center gap-3 mt-1">
                            {/* TRƯỜNG DỮ LIỆU MỚI THÊM VÀO THEO YÊU CẦU USER */}
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full uppercase tracking-wider">
                                Chương trình học: {programName || "HSK 1"}
                            </span>
                            <p className="text-sm text-gray-500 font-medium">Chủ đề: {activeLesson.theme || "CHUYÊN ĐỀ MỞ ĐẦU"}</p>
                        </div>
                        {activeLesson.description && <p className="text-sm text-gray-500 mt-2 max-w-2xl">{activeLesson.description}</p>}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button onClick={() => setLessonTab('vocab')}
                            className={`px-4 py-2 rounded-2xl font-medium transition ${lessonTab === 'vocab' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            Từ vựng
                        </button>
                        <button onClick={() => setLessonTab('grammar')}
                            className={`px-4 py-2 rounded-2xl font-medium transition ${lessonTab === 'grammar' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            Ngữ pháp
                        </button>
                        <button onClick={() => setLessonTab('dialogue')}
                            className={`px-4 py-2 rounded-2xl font-medium transition ${lessonTab === 'dialogue' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            Hội thoại
                        </button>
                        <button className="px-4 py-2 rounded-2xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition shadow-md">
                            Làm bài kiểm tra
                        </button>
                    </div>
                </div>

                {/* Grid 2 cột: Sidebar và Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 border-t border-gray-100 pt-6">
                    
                    {/* Cột trái: Danh sách các bài học */}
                    <div className="space-y-3 border-r border-gray-50 pr-4">
                        <div className="w-full shrink-0 overflow-y-auto scrollbar-hide" style={{ maxHeight: '70vh' }}>
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Các bài học</h3>
                            <div className="space-y-4">
                                {themes.map((theme: any) => (
                                    <div key={theme}>
                                        <div className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-2 pl-2">{theme}</div>
                                        <div className="space-y-1">
                                            {lessons.filter(l => l.theme === theme).map(item => (
                                                <button key={item.id}
                                                    onClick={() => setActiveLessonId(item.id)}
                                                    className={`w-full text-left rounded-2xl px-4 py-3 transition-all flex items-start justify-between
                                                        ${item.id === activeLessonId 
                                                            ? 'bg-indigo-600 text-white shadow-md translate-x-1' 
                                                            : 'bg-white hover:bg-indigo-50 hover:text-indigo-600 text-gray-700 border border-transparent hover:border-indigo-100'}`}>
                                                    <div>
                                                        <div className="font-medium leading-snug flex items-center gap-2">
                                                            {item.title}
                                                        </div>
                                                        <div className={`text-xs mt-1 ${item.id === activeLessonId ? 'text-indigo-200' : 'text-gray-400'}`}>
                                                            {item.vocab?.length || 0} từ
                                                        </div>
                                                    </div>
                                                    {item.isPremium && !isPremiumUser && (
                                                        <i className={`fa-solid fa-lock shrink-0 mt-1 ${item.id === activeLessonId ? 'text-indigo-200' : 'text-amber-500'}`}></i>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cột phải: Nội dung Tab */}
                    <div className="space-y-6">
                        {activeLesson.isPremium && !isPremiumUser ? (
                            <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
                                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className="fa-solid fa-lock text-3xl text-amber-500"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Nội dung Premium</h3>
                                <p className="text-gray-500 mb-8 max-w-md mx-auto">Bài học này thuộc gói Premium. Vui lòng nâng cấp tài khoản hoặc đăng nhập để tiếp tục học.</p>
                                <button onClick={() => window.location.href = '/login'} className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition shadow-sm">
                                    Đăng nhập / Nâng cấp
                                </button>
                            </div>
                        ) : activeLesson.title.includes("Mở Đầu") ? (
                            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full opacity-50 pointer-events-none"></div>
                                
                                <h2 className="text-3xl font-extrabold text-gray-800 mb-2 relative z-10">Làm quen hệ thống Ngữ Âm (Pinyin)</h2>
                                <p className="text-gray-500 mb-8 text-lg relative z-10">Nền tảng quan trọng nhất để phát âm chuẩn tiếng Trung.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100 shadow-sm hover:shadow-md transition">
                                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-4 shadow-sm">1</div>
                                        <h3 className="text-xl font-bold text-indigo-800 mb-2">Thanh Mẫu (Initials)</h3>
                                        <p className="text-gray-600 mb-4">Gồm 21 phụ âm mở đầu âm tiết. Giống như chữ cái đầu trong tiếng Việt.</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['b','p','m','f','d','t','n','l','g','k','h'].map(c => (
                                                <span key={c} className="bg-white text-indigo-600 font-bold px-3 py-1 rounded-lg border border-indigo-200">{c}</span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition">
                                        <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-4 shadow-sm">2</div>
                                        <h3 className="text-xl font-bold text-emerald-800 mb-2">Vận Mẫu (Finals)</h3>
                                        <p className="text-gray-600 mb-4">Gồm 36 nguyên âm hoặc tổ hợp nguyên âm. Giống như vần trong tiếng Việt.</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['a','o','e','i','u','ü','ai','ei','ao','ou'].map(c => (
                                                <span key={c} className="bg-white text-emerald-600 font-bold px-3 py-1 rounded-lg border border-emerald-200">{c}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition">
                                        <div className="w-12 h-12 bg-amber-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-4 shadow-sm">3</div>
                                        <h3 className="text-xl font-bold text-amber-800 mb-2">Thanh Điệu (Tones)</h3>
                                        <p className="text-gray-600 mb-4">Tiếng Trung có 4 thanh điệu chính và 1 thanh nhẹ, quyết định nghĩa của từ.</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-amber-200">
                                                <span className="font-bold text-amber-700">Thanh 1</span>
                                                <span className="text-lg font-bold">mā</span>
                                            </div>
                                            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-amber-200">
                                                <span className="font-bold text-amber-700">Thanh 2</span>
                                                <span className="text-lg font-bold">má</span>
                                            </div>
                                            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-amber-200">
                                                <span className="font-bold text-amber-700">Thanh 3</span>
                                                <span className="text-lg font-bold">mǎ</span>
                                            </div>
                                            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-amber-200">
                                                <span className="font-bold text-amber-700">Thanh 4</span>
                                                <span className="text-lg font-bold">mà</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 text-center">
                                    <button onClick={() => speak('mā, má, mǎ, mà')} className="px-8 py-3 rounded-full bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:-translate-y-1">
                                        <i className="fa-solid fa-microphone-lines mr-2"></i>
                                        Bắt đầu luyện phát âm
                                    </button>
                                </div>
                            </div>
                        ) : (
                        <>
                        {lessonTab === 'vocab' && (
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 opacity-50"></div>
                                
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-gray-800">Từ vựng bài học</h3>
                                    <span className="text-sm font-medium bg-gray-100 text-gray-600 px-3 py-1 rounded-full">{activeLesson.vocab?.length || 0} từ</span>
                                </div>
                                
                                {(!activeLesson.vocab || activeLesson.vocab.length === 0) ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <p>Bài học này hiện chưa có từ vựng.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {activeLesson.vocab.map((word: any) => (
                                            <div key={word.id} onClick={() => setDetailWord(word)} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4 flex flex-col items-center gap-3 group cursor-pointer relative overflow-hidden">
                                                {/* Line color indicator based on tone */}
                                                <div className={`absolute top-0 left-0 w-full h-1 
                                                    ${word.pinyin?.includes('1') ? 'bg-red-400' : 
                                                      word.pinyin?.includes('2') ? 'bg-yellow-400' : 
                                                      word.pinyin?.includes('3') ? 'bg-green-400' : 
                                                      word.pinyin?.includes('4') ? 'bg-blue-400' : 'bg-gray-300'}`}>
                                                </div>

                                                <div className="flex justify-between w-full">
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-500 uppercase tracking-widest">{word.type || 'Noun'}</span>
                                                    <button onClick={(e) => { e.stopPropagation(); speak(word.hanzi || word.word); }} className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center hover:bg-indigo-100 hover:scale-110 transition-transform">
                                                        <i className="fa-solid fa-volume-high text-xs"></i>
                                                    </button>
                                                </div>

                                                <div className="text-5xl font-bold text-gray-800 my-2 group-hover:text-indigo-600 transition-colors">
                                                    {word.hanzi || word.word}
                                                </div>

                                                <div className="text-center">
                                                    {(word.pinyin || word.ipa) && <p className="text-indigo-600 font-bold text-sm tracking-wide mb-1">{word.pinyin || word.ipa}</p>}
                                                    <p className="text-gray-700 text-sm font-medium">{word.meaning}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {lessonTab === 'grammar' && (
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Ngữ pháp liên quan</h3>
                                {(!activeLesson.grammar || activeLesson.grammar.length === 0) ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <i className="fa-solid fa-layer-group text-4xl mb-3 text-gray-200"></i>
                                        <p>Bài học này không có trọng điểm ngữ pháp.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {activeLesson.grammar.map((g: any, i: number) => (
                                            <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                                <h4 className="text-lg font-bold text-indigo-700 mb-2">{g.title}</h4>
                                                <p className="text-gray-600 mb-4">{g.desc}</p>
                                                
                                                {g.formula && (
                                                    <div className="flex flex-wrap items-center gap-2 mb-4 bg-white p-3 rounded-xl border border-gray-200 inline-flex">
                                                        {g.formula.map((f: any, fi: number) => (
                                                            <React.Fragment key={fi}>
                                                                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${f.classes}`}>{f.text}</span>
                                                                {fi < g.formula.length - 1 && <span className="text-gray-400 font-bold">+</span>}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                )}
                                                
                                                {g.practiceList && (
                                                    <div className="space-y-3 mt-4">
                                                        <h5 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Ví dụ thực hành:</h5>
                                                        {g.practiceList.slice(0, 3).map((p: any, pi: number) => (
                                                            <div key={pi} onClick={() => speak(p.correct)} className="bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition group">
                                                                <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">{pi + 1}</div>
                                                                <div className="text-gray-800 font-medium">{p.correct}</div>
                                                                <button className="ml-auto text-indigo-300 group-hover:text-indigo-600 transition">
                                                                    <i className="fa-solid fa-volume-high"></i>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {lessonTab === 'dialogue' && (
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                                    <h3 className="text-xl font-bold text-gray-800">Hội thoại thực tế</h3>
                                    <div className="flex gap-1 border border-gray-200 rounded-xl p-1 bg-gray-50 shrink-0">
                                        {[{label:'🐢',value:0.5},{label:'🐌',value:0.75},{label:'🚶',value:1.0},{label:'🏃',value:1.25},{label:'🚀',value:1.5}].map(s => (
                                            <button key={s.value} onClick={() => setDialogueSpeed(s.value)}
                                                className={`w-9 h-8 rounded-lg text-sm font-bold transition-all ${dialogueSpeed === s.value ? 'bg-blue-500 shadow-md text-white scale-105' : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'}`}
                                                title={s.value.toString() + 'x'}>
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {(!activeLesson.dialogues || activeLesson.dialogues.length === 0) ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <i className="fa-solid fa-comments text-4xl mb-3 text-gray-200"></i>
                                        <p>Bài học này không có hội thoại.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        {activeLesson.dialogues.map((d: any, i: number) => (
                                            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
                                                <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center justify-between">
                                                    <h4 className="font-bold text-blue-800 text-lg">{d.title}</h4>
                                                    <button onClick={() => playDialogue(d.lines)} className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition shadow-md hover:scale-105">
                                                        <i className="fa-solid fa-play ml-1"></i>
                                                    </button>
                                                </div>
                                                <div className="p-6 space-y-4">
                                                    {d.lines.map((line: any, li: number) => (
                                                        <DialogueLine key={li} line={line} speak={speak} />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        </>
                    )}
                </div>
                </div>
            </div>
            {detailWord && <VocabDetailModal word={detailWord} onClose={() => setDetailWord(null)} />}
        </div>
    );
}
