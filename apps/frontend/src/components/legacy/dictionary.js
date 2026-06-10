"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
// ========== DICTIONARY UI & CONTEXT ==========
// Provides `DictContext`, `DictionaryPopup`, `useDictionary`, `DictionaryProvider`,
// `useLongPress`, and `ClickableHanzi` for in-app dictionary interactions.

/** @jsxRuntime classic */
const DictContext = React.createContext(null);

export const DictionaryPopup = memo(({ word, levelId, onClose, onOpenWriting }) => {
    const [example, setExample]     = useState(null);
    const [loadingAI, setLoadingAI] = useState(false);
    const [addedSRS, setAddedSRS]   = useState(false);

    if (!word) return null;

    const card = SRS.getCard(levelId, word.id);
    const hasStudied = !!card.lastSeen;
    const intervals = [1, 3, 7, 14, 30];
    const daysLeft = card.nextReview
        ? Math.max(0, Math.ceil(
            (new Date(card.nextReview) - new Date()) / (1000 * 60 * 60 * 24)
          ))
        : null;

    const handleAddSRS = () => {
        SRS.updateCard(levelId, word.id, true);
        setAddedSRS(true);
        playSoundEffect('success');
    };

    const handleAI = async () => {
        setLoadingAI(true);
        try {
            const result = await callAIJSON(
                `Chỉ trả JSON thuần\u200b\u200b, không markdown. Tạo 1 câu tiếng Trung đơn giản (trình độ HSK1) dùng từ "${word.hanzi}". Schema: {"sentence":"","pinyin":"","translation":""}`
            );
            setExample(result);
        } catch {
            setExample({ sentence: 'Lỗi tạo câu.', pinyin: '', translation: '' });
        } finally {
            setLoadingAI(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
            onClick={onClose}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            <div className="relative bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl
                shadow-2xl z-10 overflow-hidden animate-fade-in"
                onClick={e => e.stopPropagation()}>

                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-5xl font-bold mb-1">{word.hanzi}</div>
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

                <div className="p-5 space-y-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">📖</span>
                        <span className="text-xl font-medium text-gray-800">{word.meaning}</span>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-3">
                        <p className="text-xs text-gray-500 font-medium mb-2">📊 Trạng thái ôn tập:</p>
                        {hasStudied ? (
                            <div>
                                <div className="flex gap-1 mb-1">
                                    {[1,2,3,4,5].map(b => (
                                        <div key={b}
                                            className={`flex-1 h-2 rounded-full
                                                ${b <= card.box ? 'bg-indigo-500' : 'bg-gray-200'}`}>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500">
                                    Hộp {card.box} •
                                    {daysLeft === 0
                                        ? ' Cần ôn hôm nay!'
                                        : ` Ôn lại sau ${daysLeft} ngày`}
                                </p>
                            </div>
                        ) : (
                            <p className="text-xs text-gray-400">Chưa học từ này</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => { playAudio(word.hanzi); }}
                            className="flex items-center justify-center gap-2 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-2xl font-medium transition-colors">
                            <i className="fa-solid fa-volume-high"></i> Nghe
                        </button>
                        <button
                            onClick={() => { onOpenWriting(word); onClose(); }}
                            className="flex items-center justify-center gap-2 py-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-2xl font-medium transition-colors">
                            <i className="fa-solid fa-pen-nib"></i> Viết
                        </button>
                    </div>

                    {!hasStudied && !addedSRS && (
                        <button onClick={handleAddSRS}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-colors flex items-center justify-center gap-2">
                            <i className="fa-solid fa-plus"></i> Thêm vào danh sách ôn tập
                        </button>
                    )}
                    {addedSRS && (
                        <div className="text-center text-green-600 text-sm font-medium animate-fade-in">
                            ✓ Đã thêm vào danh sách ôn tập!
                        </div>
                    )}

                    <div className="border-t border-gray-100 pt-3">
                        {!example && (
                            <button onClick={handleAI} disabled={loadingAI}
                                className="w-full py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2">
                                {loadingAI
                                    ? <><i className="fa-solid fa-spinner fa-spin"></i> Đang tạo...</>
                                    : <><i className="fa-solid fa-wand-magic-sparkles"></i> Tạo câu ví dụ AI</>}
                            </button>
                        )}
                        {example && (
                            <div className="bg-purple-50 rounded-2xl p-4 animate-fade-in">
                                <p className="text-lg font-medium text-gray-800 mb-1">{example.sentence}</p>
                                <p className="text-sm text-indigo-600 mb-1">{example.pinyin}</p>
                                <p className="text-sm text-gray-500 italic">{example.translation}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

const useDictionary = () => React.useContext(DictContext);

export const DictionaryProvider = ({ children, levelId, onOpenWriting }) => {
    const [dictWord, setDictWord] = useState(null);

    return (
        <DictContext.Provider value={{ openDict: setDictWord }}>
            {children}
            {dictWord && (
                <DictionaryPopup
                    word={dictWord}
                    levelId={levelId}
                    onClose={() => setDictWord(null)}
                    onOpenWriting={onOpenWriting}
                />
            )}
        </DictContext.Provider>
    );
};

const useLongPress = (callback, ms = 500) => {
    const timerRef = useRef(null);
    const start = useCallback((word) => {
        timerRef.current = setTimeout(() => callback(word), ms);
    }, [callback, ms]);
    const stop = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);
    return { onMouseDown: () => start(), onMouseUp: stop, onMouseLeave: stop, onTouchStart: () => start(), onTouchEnd: stop };
};

export const ClickableHanzi = memo(({ word, className = '', children }) => {
    const { openDict } = useDictionary();
    const longPress = useLongPress(() => openDict && openDict(word));
    if (!word || !openDict) return <span className={className}>{children || word.hanzi}</span>;
    return (
        <span
            onClick={(e) => { e.stopPropagation(); openDict(word); }}
            {...longPress}
            className={`cursor-pointer hover:text-indigo-600 hover:underline
                decoration-indigo-300 underline-offset-2 transition-colors ${className}`}
            title={`${word.pinyin} — ${word.meaning}`}>
            {children || word.hanzi}
        </span>
    );
});
