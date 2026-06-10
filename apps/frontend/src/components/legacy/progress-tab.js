"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
// ========== PROGRESS TAB ==========
// UI for showing streak, weekly data, and HSK progress.
/** @jsxRuntime classic */
export const ProgressTab = memo(() => {
    const { vocabData, currentLevel } = React.useContext(DataContext);
    const streak = StudyTracker.getStreak();
    const weekData = StudyTracker.getWeekData();
    const today = StudyTracker.getToday();
    const srsStats = SRS.getStats(currentLevel, vocabData);
    const learnedWords = srsStats.total - srsStats.new;
    const daysLeft = StudyTracker.estimateFinish(srsStats.total, learnedWords);
    const pct = Math.round((learnedWords / srsStats.total) * 100);

    return (
        <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">

            {/* Streak */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="text-5xl">🔥</div>
                    <div>
                        <div className="text-3xl font-bold text-orange-500">{streak} ngày</div>
                        <div className="text-gray-500 text-sm">học liên tiếp</div>
                        {streak === 0 && <div className="text-xs text-red-400 mt-1">Hãy học hôm nay để bắt đầu streak!</div>}
                    </div>
                </div>
            </div>

            {/* Hôm nay */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-700 mb-4">📅 Hôm nay</h3>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { icon: '🧠', value: today.words, label: 'từ đã ôn' },
                        { icon: '⏱', value: today.minutes, label: 'phút học' },
                        { icon: '📝', value: today.sessions, label: 'phiên học' },
                    ].map(s => (
                        <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                            <div className="text-2xl mb-1">{s.icon}</div>
                            <div className="text-2xl font-bold text-indigo-600">{s.value}</div>
                            <div className="text-xs text-gray-500">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tuần này */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-700 mb-4">📆 7 ngày gần nhất</h3>
                <div className="flex justify-between gap-2">
                    {weekData.map((day, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg
                                ${day.studied ? 'bg-green-100 border-2 border-green-400' : 'bg-gray-100 border-2 border-gray-200'}`}>
                                {day.studied ? '✓' : '○'}
                            </div>
                            <span className="text-xs text-gray-500">{day.label}</span>
                            {day.words > 0 && <span className="text-xs text-green-600 font-medium">{day.words}</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Tiến độ HSK */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-gray-700">🎯 Tiến độ {currentLevel.toUpperCase()}</h3>
                    <span className="text-indigo-600 font-bold">{pct}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}></div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                        { label: 'Từ mới', value: srsStats.new, color: 'text-gray-500' },
                        { label: 'Đang học', value: srsStats.learning, color: 'text-blue-500' },
                        { label: 'Cần ôn', value: srsStats.due, color: 'text-orange-500' },
                        { label: 'Đã nhớ', value: srsStats.known, color: 'text-green-500' },
                    ].map(s => (
                        <div key={s.label} className="flex justify-between bg-gray-50 rounded-lg px-3 py-2">
                            <span className="text-sm text-gray-500">{s.label}</span>
                            <span className={`text-sm font-bold ${s.color}`}>{s.value}</span>
                        </div>
                    ))}
                </div>
                {daysLeft && (
                    <div className="text-center text-sm text-indigo-600 bg-indigo-50 rounded-lg py-2">
                        🏁 Dự kiến hoàn thành sau <strong>{daysLeft} ngày</strong> nữa
                    </div>
                )}
            </div>
        </div>
    );
});
