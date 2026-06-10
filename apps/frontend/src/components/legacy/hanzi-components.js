"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
export const PinyinLesson = memo(() => {
    const tones = [
        { label: 'Thanh 1', desc: 'Ngang, bình', pinyin: 'mā', char: '妈', color: 'bg-red-50 text-red-700 border-red-200' },
        { label: 'Thanh 2', desc: 'Sắc, lên', pinyin: 'má', char: '麻', color: 'bg-orange-50 text-orange-700 border-orange-200' },
        { label: 'Thanh 3', desc: 'Hỏi, xuống-lên', pinyin: 'mǎ', char: '马', color: 'bg-green-50 text-green-700 border-green-200' },
        { label: 'Thanh 4', desc: 'Nặng, dứt khoát', pinyin: 'mà', char: '骂', color: 'bg-blue-50 text-blue-700 border-blue-200' },
        { label: 'Khinh thanh', desc: 'Nhẹ, ngắn', pinyin: 'ma', char: '吗', color: 'bg-gray-100 text-gray-700 border-gray-300' }
    ];
    const initialsGroups = [
        { group: 'Âm môi', items: [{p:'b', c:'玻'}, {p:'p', c:'坡'}, {p:'m', c:'摸'}, {p:'f', c:'佛'}] },
        { group: 'Âm đầu lưỡi', items: [{p:'d', c:'得'}, {p:'t', c:'特'}, {p:'n', c:'呢'}, {p:'l', c:'勒'}] },
        { group: 'Âm cuống lưỡi', items: [{p:'g', c:'哥'}, {p:'k', c:'科'}, {p:'h', c:'喝'}] },
        { group: 'Âm mặt lưỡi', items: [{p:'j', c:'基'}, {p:'q', c:'欺'}, {p:'x', c:'希'}] },
        { group: 'Âm trước/sau', items: [{p:'z', c:'资'}, {p:'c', c:'雌'}, {p:'s', c:'思'}, {p:'zh', c:'知'}, {p:'ch', c:'吃'}, {p:'sh', c:'诗'}, {p:'r', c:'日'}] },
        { group: 'Bán nguyên âm', items: [{p:'y', c:'衣'}, {p:'w', c:'乌'}] }
    ];
    const finalsGroups = [
        { group: 'Đơn / Kép', items: [{p:'a', c:'啊'}, {p:'o', c:'喔'}, {p:'e', c:'鹅'}, {p:'i', c:'衣'}, {p:'u', c:'乌'}, {p:'ü', c:'迂'}, {p:'ai', c:'哀'}, {p:'ei', c:'诶'}, {p:'ao', c:'熬'}, {p:'ou', c:'欧'}, {p:'ia', c:'呀'}, {p:'ie', c:'耶'}, {p:'ua', c:'哇'}, {p:'uo', c:'窝'}, {p:'üe', c:'约'}] },
        { group: 'Mũi', items: [{p:'an', c:'安'}, {p:'en', c:'恩'}, {p:'in', c:'因'}, {p:'un', c:'温'}, {p:'ün', c:'晕'}, {p:'ang', c:'昂'}, {p:'eng', c:'鞥'}, {p:'ing', c:'英'}, {p:'ong', c:'翁'}, {p:'iang', c:'央'}] } 
    ];
    return (
        <div className="animate-fade-in space-y-10">
            <div className="text-center mb-8"><p className="text-gray-500">Bấm vào ô để nghe cách phát âm.</p></div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-3">Thanh điệu</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {tones.map((t, idx) => ( <button key={idx} onClick={() => playAudio(t.char)} className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl transition-all hover:opacity-80 ${t.color}`}><span className="text-3xl font-bold mb-1">{t.pinyin}</span><span className="text-xs font-semibold uppercase">{t.label}</span></button> ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-3">Thanh mẫu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {initialsGroups.map((grp, idx) => (
                        <div key={idx} className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                            <div className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-3">{grp.group}</div>
                            <div className="flex flex-wrap gap-3">
                                {grp.items.map((item, i) => ( <button key={i} onClick={() => playAudio(item.c)} className="w-14 h-14 bg-white border border-indigo-200 text-indigo-700 text-xl font-bold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors shadow-sm">{item.p}</button> ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 border-l-4 border-indigo-600 pl-3">Vận mẫu</h3>
                <div className="flex flex-col gap-6">
                    {finalsGroups.map((grp, idx) => (
                        <div key={idx}>
                            <div className="text-sm font-bold text-teal-500 uppercase tracking-widest mb-3">{grp.group}</div>
                            <div className="flex flex-wrap gap-3">
                                {grp.items.map((item, i) => ( <button key={i} onClick={() => playAudio(item.c)} className="px-4 h-12 bg-white border border-teal-200 text-teal-700 text-lg font-bold rounded-lg hover:bg-teal-500 hover:text-white transition-colors shadow-sm">{item.p}</button> ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export const CharacterQuizModal = memo(({ char, chars, charIndex, onNextChar, onGoToChar, onClose }) => {
    const canvasRef = useRef(null);
    const writerRef = useRef(null);
    const [usedHint, setUsedHint] = useState(false);

    useEffect(() => {
    if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
        const size = Math.min(window.innerWidth - 60, 340);
        writerRef.current = HanziWriter.create(canvasRef.current, char, {
            width: size, height: size, padding: 15,
            showOutline: true, showCharacter: false,
            strokeColor: '#4f46e5', outlineColor: '#e5e7eb',
            radicalColor: '#16a34a', drawingColor: '#ec4899',
            drawingWidth: 15, strokeAnimationSpeed: 4
        });
        writerRef.current.quiz({
            onMistake: () => playSoundEffect('error'),
            onComplete: () => {
                playSoundEffect('success');
                if (chars && charIndex < chars.length - 1) {
                    setTimeout(() => onNextChar && onNextChar(), 800);
                } else {
                    setTimeout(() => writerRef.current?.quiz(), 1500);
                }
            }
        });
    }
    setUsedHint(false);
}, [char]);        

    return (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center p-4 bg-gray-900/90 backdrop-blur-sm animate-fade-in touch-none">
            <button onClick={onClose} className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/40 rounded-full w-12 h-12 flex items-center justify-center transition-colors"><i className="fa-solid fa-xmark text-2xl"></i></button>
            <div className="text-center mb-6"><h3 className="text-3xl font-bold text-white mb-2">Luyện viết: <span className="text-pink-400">{char}</span></h3><p className="text-gray-300">Dùng ngón tay tô đậm nét theo hình viền</p></div>
            <div className="bg-white p-2 rounded-3xl shadow-2xl">
                <div
                ref={canvasRef}
                style={{touchAction: 'none'}}
                className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
</div>
                {chars && chars.length > 1 && (
    <div className="flex justify-center gap-2 mt-3">
        {chars.map((c, i) => (
    <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border-2
        ${i < charIndex ? 'bg-green-100 border-green-400 text-green-700' :
          i === charIndex ? 'bg-pink-100 border-pink-400 text-pink-600' :
          'bg-gray-100 border-gray-300 text-gray-400'}`}
        onClick={() => onGoToChar && onGoToChar(i)}
        style={{cursor: 'pointer'}}>
        {i < charIndex ? '✓' : c}
    </div>
))}
    </div>
)}
            </div>
            <div className="mt-10 flex gap-4 w-full max-w-[340px]">
                <button onClick={() => {
    setUsedHint(true);
    canvasRef.current.innerHTML = '';
    writerRef.current = HanziWriter.create(canvasRef.current, char, {
        width: Math.min(window.innerWidth - 60, 340),
        height: Math.min(window.innerWidth - 60, 340),
        padding: 15, showOutline: true, showCharacter: true,
        strokeColor: '#1a56db', strokeAnimationSpeed: 4, delayBetweenStrokes: 10,
    });
    writerRef.current.animateCharacter({ onComplete: () => {
        setTimeout(() => {
            canvasRef.current.innerHTML = '';
            writerRef.current = HanziWriter.create(canvasRef.current, char, {
                width: Math.min(window.innerWidth - 60, 340),
                height: Math.min(window.innerWidth - 60, 340),
                padding: 15, showOutline: true, showCharacter: false,
                strokeColor: '#4f46e5', drawingColor: '#ec4899', drawingWidth: 15, strokeAnimationSpeed: 4,
            });
            writerRef.current.quiz({
                onMistake: () => playSoundEffect('error'),
                onComplete: () => { playSoundEffect('success'); setTimeout(() => writerRef.current?.quiz(), 1500); }
            });
        }, 1000);
    }});
}} className="flex-1 py-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl font-medium transition-colors flex justify-center items-center gap-2">
    <i className="fa-solid fa-eye"></i> Xem gợi ý
</button>
                
                
            {chars && charIndex < chars.length - 1 && (
    <button onClick={onNextChar} className="flex-1 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-medium shadow-lg transition-colors flex justify-center items-center gap-2">
        <i className="fa-solid fa-arrow-right"></i> Chữ tiếp
    </button>
)}
            </div>
        </div>
    );
});

export const SingleCharacterWriter = memo(({ char, onOpenQuiz }) => {
    const ref = useRef(null);
    const writerRef = useRef(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.innerHTML = '';
            if (char.match(/[㐀-龿]/)) writerRef.current = HanziWriter.create(ref.current, char, { width: 110, height: 110, padding: 5, strokeAnimationSpeed: 4, delayBetweenStrokes: 50, showOutline: true, strokeColor: '#4f46e5', radicalColor: '#16a34a' });
            else ref.current.innerHTML = `<div class="flex items-center justify-center w-full h-full text-4xl font-bold text-gray-300">${char}</div>`;
        }
    }, [char]);
    return (
        <div className="flex flex-col items-center gap-3 animate-fade-in">
            <div ref={ref} className="w-[120px] h-[120px] border-2 border-dashed border-indigo-200 rounded-xl bg-gray-50 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all flex items-center justify-center shadow-sm" onClick={() => writerRef.current?.animateCharacter()}></div>
            <div className="flex gap-2">
                <button onClick={() => writerRef.current?.animateCharacter()} className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-medium hover:bg-indigo-200 transition-colors"><i className="fa-solid fa-play"></i> Nét</button>
                <button onClick={() => onOpenQuiz(char)} className="px-3 py-2 bg-pink-100 text-pink-700 rounded-lg text-xs font-medium hover:bg-pink-200 transition-colors"><i className="fa-solid fa-pen"></i> Viết</button>
            </div>
        </div>
    );
});
