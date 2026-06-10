"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
// ========== SETTINGS TAB ==========
// App settings and test helpers (reset SRS, seed sample data, onboarding reset).
/** @jsxRuntime classic */
export const SettingsTab = memo(() => {
    const { currentLevel } = React.useContext(DataContext);
    const [done, setDone] = useState(false);

    return (
        <div className="max-w-md mx-auto space-y-4 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-bold text-gray-800 text-lg mb-4">
                    <i className="fa-solid fa-gear mr-2 text-gray-400"></i>Cài đặt
                </h2>
                <div className="space-y-3">
                    <button
                        onClick={() => { OnboardingManager.reset(); window.location.reload(); }}
                        className="w-full flex items-center gap-3 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors text-left">
                        <i className="fa-solid fa-circle-info text-indigo-500 text-xl w-6"></i>
                        <div>
                            <div className="font-medium text-indigo-700">Xem lại hướng dẫn</div>
                            <div className="text-xs text-indigo-400">Xem lại màn hình giới thiệu</div>
                        </div>
                    </button>
                    <button
                        onClick={() => { if(window.confirm('Reset toàn bộ tiến độ SRS? Không thể hoàn tác!')) { SRS.reset(currentLevel); setDone(true); } }}
                        className="w-full flex items-center gap-3 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors text-left">
                        <i className="fa-solid fa-rotate-left text-red-500 text-xl w-6"></i>
                        <div>
                            <div className="font-medium text-red-700">Reset tiến độ SRS</div>
                            <div className="text-xs text-red-400">Xóa toàn bộ lịch sử ôn tập</div>
                        </div>
                    </button>
                    <button
                        onClick={() => { if(window.confirm('Reset toàn bộ lịch sử học? Không thể hoàn tác!')) { localStorage.removeItem('hsk_study_log'); setDone(true); } }}
                        className="w-full flex items-center gap-3 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors text-left">
                        <i className="fa-solid fa-trash text-orange-500 text-xl w-6"></i>
                        <div>
                            <div className="font-medium text-orange-700">Reset lịch sử học</div>
                            <div className="text-xs text-orange-400">Xóa streak và thống kê học tập</div>
                        </div>
                    </button>
                    <button
                        onClick={() => {
                            for (let i = 6; i >= 0; i--) {
                                const d = new Date();
                                d.setDate(d.getDate() - i);
                                const key = d.toISOString().split('T')[0];
                                const data = StudyTracker.load();
                                if (!data[key]) data[key] = { words: 10, minutes: 15, sessions: 1 };
                                localStorage.setItem('hsk_study_log', JSON.stringify(data));
                            }
                            alert('Đã tạo dữ liệu 7 ngày học mẫu! Vào tab Tiến Độ để xem.');
                        }}
                        className="w-full flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors text-left">
                        <i className="fa-solid fa-flask text-blue-500 text-xl w-6"></i>
                        <div>
                            <div className="font-medium text-blue-700">Tạo dữ liệu mẫu (Test)</div>
                            <div className="text-xs text-blue-400">Giả lập 7 ngày học để xem Streak</div>
                        </div>
                    </button>
                </div>
                {done && (
                    <p className="text-green-600 text-sm text-center mt-4 animate-fade-in">
                        ✓ Đã reset thành công!
                    </p>
                )}
            </div>
            <div className="text-center text-xs text-gray-400 py-4">
                HSK Learner Pro • Phiên bản 1.0<br/>
                Dữ liệu theo chuẩn HSK 3.0 (2021)
            </div>
        </div>
    );
});
