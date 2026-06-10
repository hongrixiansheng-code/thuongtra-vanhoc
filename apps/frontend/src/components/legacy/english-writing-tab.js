"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
// ========== ENGLISH WRITING TAB ==========

export const LetterCanvas = memo(({ letter, onDone }) => {
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const lastPos = useRef(null);
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
const animFrameRef = useRef(null);

    const W = 220, H = 220;



// Dữ liệu đường dẫn đơn giản cho từng chữ cái (tọa độ % của W,H)
const LETTER_STROKES = {
    'A': [[[50,5],[15,95]], [[50,5],[85,95]], [[25,65],[75,65]]],
    'B': [[[20,5],[20,95]], [[20,5],[65,5],[80,20],[65,40],[20,40]], [[20,40],[65,40],[80,60],[65,80],[20,80],[20,95]]],
    'C': [[[80,20],[60,5],[30,5],[15,20],[15,80],[30,95],[60,95],[80,80]]],
    'D': [[[20,5],[20,95]], [[20,5],[55,5],[75,20],[75,80],[55,95],[20,95]]],
    'E': [[[20,5],[20,95]], [[20,5],[80,5]], [[20,50],[65,50]], [[20,95],[80,95]]],
    'F': [[[20,5],[20,95]], [[20,5],[80,5]], [[20,50],[65,50]]],
    'G': [[[80,20],[60,5],[30,5],[15,20],[15,80],[30,95],[65,95],[80,80],[80,55],[55,55]]],
    'H': [[[20,5],[20,95]], [[80,5],[80,95]], [[20,50],[80,50]]],
    'I': [[[30,5],[70,5]], [[50,5],[50,95]], [[30,95],[70,95]]],
    'J': [[[30,5],[70,5]], [[60,5],[60,80],[45,95],[25,85]]],
    'K': [[[20,5],[20,95]], [[80,5],[20,50]], [[20,50],[80,95]]],
    'L': [[[20,5],[20,95],[80,95]]],
    'M': [[[15,95],[15,5],[50,50],[85,5],[85,95]]],
    'N': [[[20,95],[20,5],[80,95],[80,5]]],
    'O': [[[50,5],[80,20],[85,50],[80,80],[50,95],[20,80],[15,50],[20,20],[50,5]]],
    'P': [[[20,5],[20,95]], [[20,5],[60,5],[75,20],[60,50],[20,50]]],
    'Q': [[[50,5],[80,20],[85,50],[80,80],[50,95],[20,80],[15,50],[20,20],[50,5]], [[60,75],[85,95]]],
    'R': [[[20,5],[20,95]], [[20,5],[60,5],[75,20],[60,50],[20,50]], [[45,50],[80,95]]],
    'S': [[[80,15],[65,5],[35,5],[15,20],[15,45],[35,55],[65,55],[80,70],[80,80],[65,95],[35,95],[15,80]]],
    'T': [[[15,5],[85,5]], [[50,5],[50,95]]],
    'U': [[[20,5],[20,75],[35,90],[65,90],[80,75],[80,5]]],
    'V': [[[15,5],[50,95],[85,5]]],
    'W': [[[10,5],[25,95],[50,55],[75,95],[90,5]]],
    'X': [[[15,5],[85,95]], [[85,5],[15,95]]],
    'Y': [[[15,5],[50,50],[85,5]], [[50,50],[50,95]]],
    'Z': [[[15,5],[85,5],[15,95],[85,95]]],
    'a': [[[70,35],[50,25],[30,30],[20,50],[25,70],[45,80],[70,75],[70,35],[70,80]]],
    'b': [[[20,5],[20,80],[35,90],[55,88],[68,70],[65,50],[50,38],[25,40]]],
    'c': [[[70,40],[55,28],[35,28],[20,42],[18,62],[28,76],[48,82],[68,72]]],
    'd': [[[80,5],[80,80],[65,90],[45,88],[30,72],[28,52],[40,36],[60,30],[80,35]]],
    'e': [[[18,55],[82,55],[80,40],[65,28],[42,26],[22,40],[18,60],[25,76],[48,84],[70,78]]],
    'f': [[[70,10],[55,5],[40,15],[38,35],[38,85]], [[25,40],[58,40]]],
    'g': [[[70,35],[50,25],[30,30],[20,50],[25,70],[45,80],[70,75],[70,35],[70,85],[60,98],[40,100],[22,90]]],
    'h': [[[20,5],[20,85]], [[20,45],[35,30],[55,28],[68,40],[68,85]]],
    'i': [[[50,25],[50,85]], [[50,12],[50,15]]],
    'j': [[[60,25],[60,90],[50,100],[35,95]], [[60,12],[60,15]]],
    'k': [[[20,5],[20,85]], [[65,28],[20,58]], [[30,50],[68,85]]],
    'l': [[[50,5],[50,85],[58,88]]],
    'm': [[[20,35],[20,85]], [[20,45],[35,30],[50,35],[50,85]], [[50,45],[65,30],[80,35],[80,85]]],
    'n': [[[20,35],[20,85]], [[20,45],[35,30],[55,28],[68,40],[68,85]]],
    'o': [[[50,28],[68,38],[75,58],[65,75],[48,82],[28,74],[20,55],[28,38],[50,28]]],
    'p': [[[20,35],[20,100]], [[20,42],[38,30],[58,30],[70,45],[68,65],[52,78],[28,75]]],
    'q': [[[80,35],[80,100]], [[80,42],[62,30],[42,30],[28,45],[30,65],[46,78],[70,75]]],
    'r': [[[20,35],[20,85]], [[20,50],[30,35],[48,30],[62,33]]],
    's': [[[70,35],[52,28],[32,32],[22,48],[42,60],[62,65],[72,78],[58,88],[35,88],[20,78]]],
    't': [[[50,10],[50,85],[58,90]], [[28,38],[68,38]]],
    'u': [[[20,35],[20,72],[30,83],[50,85],[65,78],[70,60],[70,35],[70,85]]],
    'v': [[[20,35],[50,85],[80,35]]],
    'w': [[[15,35],[28,85],[50,60],[72,85],[85,35]]],
    'x': [[[20,35],[75,85]], [[75,35],[20,85]]],
    'y': [[[20,35],[50,70]], [[80,35],[50,70],[35,95],[20,100]]],
    'z': [[[20,35],[75,35],[20,85],[75,85]]],
};



const animateLetter = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isAnimating) return;
    const ctx = canvas.getContext('2d');
    const strokes = LETTER_STROKES[letter] || [];
    if (strokes.length === 0) return;

    // Reset canvas trước
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    [H/4, H/2, H*3/4].forEach(y => {
        ctx.beginPath(); ctx.moveTo(8, y); ctx.lineTo(W-8, y); ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = '#94a3b8';
    ctx.font = `bold ${H * 0.78}px Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, W/2, H/2);
    ctx.globalAlpha = 1;
    setProgress(0);
    setDone(false);
    setIsAnimating(true);

    let strokeIdx = 0;
    let pointIdx = 0;

    const drawNextPoint = () => {
        if (strokeIdx >= strokes.length) {
            setIsAnimating(false);
            return;
        }
        const stroke = strokes[strokeIdx];
        if (pointIdx >= stroke.length - 1) {
            strokeIdx++;
            pointIdx = 0;
            animFrameRef.current = setTimeout(drawNextPoint, 150);
            return;
        }

        const [x1pct, y1pct] = stroke[pointIdx];
        const [x2pct, y2pct] = stroke[pointIdx + 1];
        const x1 = (x1pct / 100) * W;
        const y1 = (y1pct / 100) * H;
        const x2 = (x2pct / 100) * W;
        const y2 = (y2pct / 100) * H;

        // Vẽ đoạn nét với màu đỏ cam animation
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        // Vẽ chấm đầu nét
        ctx.beginPath();
        ctx.arc(x2, y2, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();

        pointIdx++;
        animFrameRef.current = setTimeout(drawNextPoint, 80);
    };

    drawNextPoint();
}, [letter, isAnimating]);

// Cleanup animation khi unmount hoặc đổi chữ
useEffect(() => {
    return () => {
        if (animFrameRef.current) clearTimeout(animFrameRef.current);
    };
}, [letter]);

    // Tạo template pixels từ chữ mẫu
    const getTemplatePixels = React.useCallback(() => {
        const temp = document.createElement('canvas');
        temp.width = W; temp.height = H;
        const ctx = temp.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#000000';
        ctx.font = `bold ${H * 0.78}px Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, W / 2, H / 2);
        return ctx.getImageData(0, 0, W, H).data;
    }, [letter]);

    // Vẽ canvas ban đầu — chữ mờ xám
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, W, H);

        // Nền
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, W, H);

        // Đường kẻ ô
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        [H/4, H/2, H*3/4].forEach(y => {
            ctx.beginPath();
            ctx.moveTo(8, y); ctx.lineTo(W-8, y);
            ctx.stroke();
        });
        ctx.setLineDash([]);

        // Chữ mờ màu xám nhạt làm nền để tô
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = '#94a3b8';
        ctx.font = `bold ${H * 0.78}px Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, W/2, H/2);
        ctx.globalAlpha = 1;

        setProgress(0);
        setDone(false);
    }, [letter]);

    const getPos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = W / rect.width;
        const scaleY = H / rect.height;
        if (e.touches) return {
            x: (e.touches[0].clientX - rect.left) * scaleX,
            y: (e.touches[0].clientY - rect.top) * scaleY,
        };
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
        };
    };

    const paintAt = (x, y) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const templatePixels = getTemplatePixels();
        const radius = 14;

        // Vẽ vòng tròn tại vị trí tô
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                if (dx*dx + dy*dy > radius*radius) continue;
                const px = Math.round(x + dx);
                const py = Math.round(y + dy);
                if (px < 0 || px >= W || py < 0 || py >= H) continue;
                const idx = (py * W + px) * 4;
                const brightness = (templatePixels[idx] + templatePixels[idx+1] + templatePixels[idx+2]) / 3;
                // Chỉ tô nếu pixel thuộc vùng chữ mẫu (tối)
                if (brightness < 128) {
                    const imageData = ctx.getImageData(px, py, 1, 1);
                    // Đổi sang màu xanh emerald
                    imageData.data[0] = 16;
                    imageData.data[1] = 185;
                    imageData.data[2] = 129;
                    imageData.data[3] = 255;
                    ctx.putImageData(imageData, px, py);
                }
            }
        }

        // Tính progress
        const fullData = ctx.getImageData(0, 0, W, H).data;
        let colored = 0, total = 0;
        for (let i = 0; i < templatePixels.length; i += 4) {
            const tBright = (templatePixels[i] + templatePixels[i+1] + templatePixels[i+2]) / 3;
            if (tBright < 128) {
                total++;
                const r = fullData[i], g = fullData[i+1], b = fullData[i+2];
                if (r === 16 && g === 185 && b === 129) colored++;
            }
        }
        const pct = total > 0 ? Math.round((colored / total) * 100) : 0;
        setProgress(pct);
        if (pct >= 80 && !done) {
            setDone(true);
            playSoundEffect('success');
            if (onDone) setTimeout(() => onDone(), 800);
        }
    };

    const startDraw = (e) => { e.preventDefault(); isDrawing.current = true; paintAt(...Object.values(getPos(e))); };
    const draw = (e) => { e.preventDefault(); if (!isDrawing.current) return; paintAt(...Object.values(getPos(e))); };
    const stopDraw = (e) => { e.preventDefault(); isDrawing.current = false; };

    const reset = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        [H/4, H/2, H*3/4].forEach(y => {
            ctx.beginPath(); ctx.moveTo(8, y); ctx.lineTo(W-8, y); ctx.stroke();
        });
        ctx.setLineDash([]);
        ctx.globalAlpha = 0.18;
        ctx.fillStyle = '#94a3b8';
        ctx.font = `bold ${H * 0.78}px Georgia, serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, W/2, H/2);
        ctx.globalAlpha = 1;
        setProgress(0);
        setDone(false);
    };

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Progress bar */}
            <div className="w-full">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Tiến độ tô</span>
                    <span className={`font-bold ${progress >= 80 ? 'text-emerald-600' : 'text-gray-500'}`}>{progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${progress >= 80 ? 'bg-emerald-500' : 'bg-indigo-400'}`}
                        style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Canvas */}
            <canvas ref={canvasRef} width={W} height={H}
                className="rounded-2xl cursor-crosshair touch-none"
                style={{ width: 220, height: 220, border: '2px solid #e2e8f0', display: 'block' }}
                onMouseDown={startDraw} onMouseMove={draw} onMouseUp={stopDraw} onMouseLeave={stopDraw}
                onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={stopDraw}
            />

            {done && (
                <div className="w-full text-center py-2 bg-emerald-100 text-emerald-700 rounded-xl font-bold animate-fade-in">
                    ⭐ Xuất sắc! Bạn đã tô xong chữ {letter}!
                </div>
            )}
<button onClick={animateLetter} disabled={isAnimating}
    className={`w-full py-2 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2
        ${isAnimating
            ? 'bg-orange-100 text-orange-500 cursor-wait'
            : 'bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200'}`}>
    <i className={`fa-solid ${isAnimating ? 'fa-spinner fa-spin' : 'fa-play'} text-xs`}></i>
    {isAnimating ? 'Đang hướng dẫn...' : 'Xem hướng dẫn nét'}
</button>
            <button onClick={reset}
                className="w-full py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition flex items-center justify-center gap-1">
                <i className="fa-solid fa-rotate-left text-xs"></i> Tô lại
            </button>
        </div>
    );
});

export const EnglishWritingTab = memo(({ vocabData }) => {
    const [section, setSection] = useState('menu');
    const [currentLetter, setCurrentLetter] = useState('A');
    const [letterCase, setLetterCase] = useState('upper');
    const [vocabIdx, setVocabIdx] = useState(0);
    const [vocabQueue, setVocabQueue] = useState([]);
    const [vocabCharIdx, setVocabCharIdx] = useState(0);
    const [canvasKey, setCanvasKey] = useState(0);

    const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const startVocab = () => {
        const q = fisherYatesShuffle([...vocabData]).slice(0, 10);
        setVocabQueue(q);
        setVocabIdx(0); setVocabCharIdx(0); setCanvasKey(0);
        setSection('vocab');
    };

    const speak = (text) => {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US'; u.rate = 0.85;
        window.speechSynthesis.speak(u);
    };

    const displayLetter = letterCase === 'upper' ? currentLetter : currentLetter.toLowerCase();
    const currentVocabWord = vocabQueue[vocabIdx];
    const vocabChars = currentVocabWord?.word?.split('') || [];
    const currentVocabChar = vocabChars[vocabCharIdx] || '';

    // ---- MENU ----
    if (section === 'menu') return (
        <div className="max-w-md mx-auto space-y-4">
            <div className="text-center mb-4">
                <div className="text-4xl mb-2">✍️</div>
                <h2 className="text-2xl font-bold text-gray-800">Luyện Viết Tiếng Anh</h2>
                <p className="text-gray-500 text-sm mt-1">Dùng chuột hoặc ngón tay tô theo chữ mẫu</p>
            </div>
            <button onClick={() => setSection('alphabet')}
                className="w-full p-5 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 rounded-2xl text-left transition active:scale-95">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0" style={{fontFamily:'Georgia,serif'}}>Aa</div>
                    <div>
                        <div className="font-bold text-indigo-700 text-lg">Luyện 26 chữ cái</div>
                        <div className="text-sm text-indigo-500 mt-1">Tô theo chữ mẫu mờ — A đến Z</div>
                        <div className="text-sm text-indigo-500">Hỗ trợ chữ HOA và chữ thường</div>
                    </div>
                </div>
            </button>
            <button onClick={startVocab}
                className="w-full p-5 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 rounded-2xl text-left transition active:scale-95">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shrink-0" style={{fontFamily:'Georgia,serif'}}>W</div>
                    <div>
                        <div className="font-bold text-emerald-700 text-lg">Luyện viết từ vựng</div>
                        <div className="text-sm text-emerald-500 mt-1">Tô từng chữ cái của từ vựng</div>
                        <div className="text-sm text-emerald-500">10 từ ngẫu nhiên mỗi lần</div>
                    </div>
                </div>
            </button>
        </div>
    );

    // ---- 26 CHỮ CÁI ----
    if (section === 'alphabet') return (
        <div className="max-w-sm mx-auto">
            <div className="flex items-center gap-3 mb-4">
                <button onClick={() => setSection('menu')} className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1">
                    <i className="fa-solid fa-arrow-left"></i> Quay lại
                </button>
                <span className="font-bold text-gray-700 flex-1 text-center">Luyện 26 chữ cái</span>
                <div className="flex gap-1">
                    {['upper','lower'].map(c => (
                        <button key={c} onClick={() => { setLetterCase(c); setCanvasKey(k=>k+1); }}
                            className={`px-3 py-1 rounded-lg text-sm font-bold border-2 transition
                                ${letterCase === c ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-500'}`}>
                            {c === 'upper' ? 'ABC' : 'abc'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bảng chữ cái */}
            <div className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm mb-4">
                <div className="flex flex-wrap gap-1 justify-center">
                    {ALPHABET.map(l => (
                        <button key={l}
                            onClick={() => { setCurrentLetter(l); setCanvasKey(k=>k+1); }}
                            className={`w-9 h-9 rounded-lg text-sm font-bold transition
                                ${currentLetter === l ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'}`}>
                            {letterCase === 'upper' ? l : l.toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chữ hiện tại + canvas */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-5xl font-bold text-indigo-600" style={{fontFamily:'Georgia,serif'}}>{displayLetter}</span>
                        <span className="text-gray-400 text-sm">{letterCase === 'upper' ? 'Chữ HOA' : 'Chữ thường'}</span>
                    </div>
                    <button onClick={() => speak(displayLetter)}
                        className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-200 transition">
                        <i className="fa-solid fa-volume-high"></i>
                    </button>
                </div>
                <LetterCanvas key={`${displayLetter}-${canvasKey}`} letter={displayLetter}
                    onDone={() => {
                        const idx = ALPHABET.indexOf(currentLetter);
                        if (idx < 25) { setTimeout(() => { setCurrentLetter(ALPHABET[idx+1]); setCanvasKey(k=>k+1); }, 1000); }
                    }}
                />
            </div>

            {/* Điều hướng */}
            <div className="flex gap-3 mt-4">
                <button onClick={() => { const i = ALPHABET.indexOf(currentLetter); if(i>0){setCurrentLetter(ALPHABET[i-1]);setCanvasKey(k=>k+1);} }}
                    disabled={currentLetter==='A'}
                    className="flex-1 py-2.5 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-30 transition">
                    ← {ALPHABET[ALPHABET.indexOf(currentLetter)-1] || ''}
                </button>
                <button onClick={() => { const i = ALPHABET.indexOf(currentLetter); if(i<25){setCurrentLetter(ALPHABET[i+1]);setCanvasKey(k=>k+1);} }}
                    disabled={currentLetter==='Z'}
                    className="flex-1 py-2.5 border-2 border-indigo-200 text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 disabled:opacity-30 transition">
                    {ALPHABET[ALPHABET.indexOf(currentLetter)+1] || ''} →
                </button>
            </div>
        </div>
    );

    // ---- TỪ VỰNG ----
    if (section === 'vocab') {
        if (!currentVocabWord) return (
            <div className="max-w-sm mx-auto text-center py-12">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-4">Hoàn thành!</h3>
                <div className="flex gap-3">
                    <button onClick={() => setSection('menu')} className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-gray-600">Về menu</button>
                    <button onClick={startVocab} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold">Luyện lại</button>
                </div>
            </div>
        );

        return (
            <div className="max-w-sm mx-auto">
                <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => setSection('menu')} className="text-gray-400 hover:text-gray-600 text-sm"><i className="fa-solid fa-arrow-left"></i></button>
                    <span className="text-sm text-gray-500">Từ {vocabIdx+1}/{vocabQueue.length}</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{width:`${(vocabIdx/vocabQueue.length)*100}%`}}></div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xl font-bold text-gray-700">{currentVocabWord.meaning}</div>
                            <div className="text-emerald-500 font-mono text-sm">{currentVocabWord.ipa}</div>
                        </div>
                        <button onClick={() => speak(currentVocabWord.word)}
                            className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center hover:bg-emerald-200 transition">
                            <i className="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                    <div className="flex gap-1.5 mt-3 flex-wrap">
                        {vocabChars.map((c, i) => (
                            <div key={i} className={`w-9 h-9 rounded-lg border-2 flex items-center justify-center font-bold text-base transition
                                ${i === vocabCharIdx ? 'border-emerald-500 bg-emerald-50 text-emerald-700' :
                                  i < vocabCharIdx ? 'border-green-300 bg-green-50 text-green-600' :
                                  'border-gray-200 bg-gray-50 text-gray-300'}`}>
                                {i <= vocabCharIdx ? c : '?'}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500">Tô chữ <span className="text-2xl font-bold text-emerald-600" style={{fontFamily:'Georgia,serif'}}>{currentVocabChar}</span></span>
                        <span className="text-xs text-gray-400">{vocabCharIdx+1}/{vocabChars.length}</span>
                    </div>
                    <LetterCanvas key={`v-${vocabIdx}-${vocabCharIdx}-${canvasKey}`}
                        letter={currentVocabChar}
                        onDone={() => {
                            setTimeout(() => {
                                if (vocabCharIdx < vocabChars.length - 1) {
                                    setVocabCharIdx(i => i+1);
                                } else {
                                    setVocabIdx(i => i+1);
                                    setVocabCharIdx(0);
                                }
                                setCanvasKey(k => k+1);
                            }, 800);
                        }}
                    />
                </div>

                <button onClick={() => {
                    if (vocabCharIdx < vocabChars.length-1) setVocabCharIdx(i=>i+1);
                    else { setVocabIdx(i=>i+1); setVocabCharIdx(0); }
                    setCanvasKey(k=>k+1);
                }} className="w-full mt-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition text-center">
                    Bỏ qua →
                </button>
            </div>
        );
    }
    return null;
});
