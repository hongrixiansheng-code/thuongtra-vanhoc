"use client";

import React, { useState } from 'react';

export function GrammarTab({ grammarData }: { grammarData: any[] }) {
    const [activeId, setActiveId] = useState(grammarData[0]?.id || null);

    const speak = (text: string) => {
        if (!text || typeof window === 'undefined') return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'zh-CN';
        u.rate = 0.85;
        window.speechSynthesis.speak(u);
    };

    if (!grammarData || grammarData.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500">
                Chưa có dữ liệu ngữ pháp.
            </div>
        );
    }

    const g = grammarData.find((g: any) => g.id === activeId) || grammarData[0];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Cẩm nang Ngữ pháp ({grammarData.length} cấu trúc)</h1>
            <div className="flex flex-col md:flex-row gap-6 animate-fade-in">
                
                {/* Sidebar danh sách ngữ pháp */}
                <div className="w-full md:w-1/3 lg:w-1/4 bg-white rounded-2xl shadow-sm border border-gray-100 p-4 self-start md:sticky md:top-24 max-h-[35vh] md:max-h-none md:h-[calc(100vh-8rem)] overflow-y-auto mb-6 md:mb-0">
                    <h3 className="font-bold text-gray-800 mb-4 text-lg border-b pb-2">
                        <i className="fa-solid fa-list-ul mr-2 text-indigo-600"></i>Danh mục
                    </h3>
                    <div className="flex flex-col gap-2">
                        {grammarData.map((item: any) => (
                            <button key={item.id || Math.random().toString()} 
                                onClick={() => setActiveId(item.id)} 
                                className={`text-left px-4 py-3 rounded-lg transition-colors border 
                                    ${activeId === item.id ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium' : 'hover:bg-gray-50 border-transparent text-gray-600 text-sm'}`}>
                                {item.title}
                            </button> 
                        ))}
                    </div>
                </div>

                {/* Nội dung chi tiết ngữ pháp */}
                <div className="w-full md:w-2/3 lg:w-3/4">
                    {g && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{g.title}</h2>
                            <p className="text-gray-600 mb-8">{g.desc}</p>
                            
                            {g.formula && g.formula.length > 0 && (
                                <div className="mb-10 bg-gray-50 p-6 rounded-xl border border-gray-200">
                                    <h4 className="text-sm font-bold text-gray-500 mb-4">Công thức:</h4>
                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                        {g.formula.map((item: any, idx: number) => (
                                            <div key={idx} className={`px-5 py-3 rounded-lg border-2 text-center bg-white shadow-sm font-medium ${item.classes}`}>
                                                {item.text}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {g.practiceList && g.practiceList.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Câu ví dụ:</h4>
                                    <div className="space-y-3">
                                        {g.practiceList.map((p: any, pi: number) => (
                                            <div key={pi} onClick={() => speak(p.correct)} 
                                                className="bg-white px-5 py-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-indigo-50 transition group">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
                                                    {pi + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-gray-800 font-bold text-lg mb-1">{p.correct}</div>
                                                    <div className="text-gray-500 text-sm">{p.meaning || p.vi || ''}</div>
                                                </div>
                                                <button className="ml-auto text-indigo-300 group-hover:text-indigo-600 transition w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-indigo-100">
                                                    <i className="fa-solid fa-volume-high"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
