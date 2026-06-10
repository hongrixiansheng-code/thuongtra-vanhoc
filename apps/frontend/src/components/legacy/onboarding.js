"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
// ========== ONBOARDING SCREEN ==========
// Welcome/tutorial slides shown on first run. Uses OnboardingManager from tracker.js.

/** @jsxRuntime classic */
export const OnboardingScreen = memo(({ onFinish }) => {
    const [step, setStep] = useState(0);

    const slides = [
        {
            emoji: '🀄',
            title: 'Chào mừng đến với\nHSK Learner Pro!',
            desc: 'Ứng dụng học tiếng Trung theo chuẩn HSK 3.0 — dành riêng cho người Việt bắt đầu từ con số 0.',
            color: 'from-indigo-500 to-purple-600',
        },
        {
            emoji: '📚',
            title: 'Học từ vựng thông minh',
            desc: '489 từ HSK1 với âm thanh phát âm chuẩn, hướng dẫn viết từng nét chữ và ví dụ câu thực tế.',
            color: 'from-blue-500 to-cyan-500',
            tips: ['Nghe phát âm chuẩn giọng Bắc Kinh', 'Xem hướng dẫn viết từng nét', 'Tìm kiếm bằng tiếng Việt / Pinyin / Hán tự'],
        },
        {
            emoji: '🧠',
            title: 'Ôn tập đúng lúc — không quên',
            desc: 'Hệ thống SRS tự động nhắc bạn ôn đúng lúc sắp quên. Học ít hơn nhưng nhớ lâu hơn.',
            color: 'from-violet-500 to-purple-600',
            tips: ['Từ mới → ôn sau 1 ngày', 'Trả lời đúng → ôn thưa dần', 'Trả lời sai → ôn lại ngay'],
        },
        {
            emoji: '✅',
            title: 'Kiểm tra & theo dõi tiến độ',
            desc: 'Thi viết chữ Hán, trắc nghiệm từ vựng và xem lộ trình học của bạn mỗi ngày.',
            color: 'from-green-500 to-emerald-600',
            tips: ['Thi viết chữ Hán có chấm điểm', 'Xem streak học liên tiếp', 'Dự đoán ngày hoàn thành HSK1'],
        },
    ];

    const current = slides[step];
    const isLast = step === slides.length - 1;

    const handleNext = () => {
        if (isLast) {
            OnboardingManager.markDone();
            onFinish();
        } else {
            setStep(s => s + 1);
        }
    };

    const handleSkip = () => {
        OnboardingManager.markDone();
        onFinish();
    };

    return (
        <div className="fixed inset-0 z-[200] bg-white flex flex-col">
            <div className="flex justify-between items-center px-6 pt-6 pb-2">
                <div className="flex gap-2">
                    {slides.map((_, i) => (
                        <div key={i}
                            className={`h-2 rounded-full transition-all duration-300
                                ${i === step ? 'w-6 bg-indigo-600' : 'w-2 bg-gray-200'}`}>
                        </div>
                    ))}
                </div>
                {!isLast && (
                    <button onClick={handleSkip}
                        className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                        Bỏ qua
                    </button>
                )}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center animate-fade-in"
                key={step}>
                <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${current.color}
                    flex items-center justify-center text-6xl mb-8 shadow-lg`}>
                    {current.emoji}
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-3 leading-tight whitespace-pre-line">
                    {current.title}
                </h1>
                <p className="text-gray-500 text-base leading-relaxed mb-6 max-w-sm">
                    {current.desc}
                </p>
                {current.tips && (
                    <div className="w-full max-w-sm space-y-2 mb-4">
                        {current.tips.map((tip, i) => (
                            <div key={i}
                                className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 text-left">
                                <span className="text-green-500 font-bold text-lg shrink-0">✓</span>
                                <span className="text-gray-700 text-sm">{tip}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-6 pb-10 space-y-3">
                <button onClick={handleNext}
                    className={`w-full py-4 rounded-2xl font-bold text-white text-lg
                        bg-gradient-to-r ${current.color}
                        shadow-lg active:scale-95 transition-all`}>
                    {isLast ? '🚀 Bắt đầu học ngay!' : 'Tiếp theo →'}
                </button>

                {step > 0 && (
                    <button onClick={() => setStep(s => s - 1)}
                        className="w-full py-3 text-gray-400 hover:text-gray-600 text-sm transition-colors">
                        ← Quay lại
                    </button>
                )}
            </div>
        </div>
    );
});
