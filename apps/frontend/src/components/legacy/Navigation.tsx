"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const LEVELS = [
    { id: 'hsk1', label: 'HSK 1', available: true, color: 'bg-green-500' },
    { id: 'hsk2', label: 'HSK 2', available: true, color: 'bg-blue-500' },
    { id: 'hsk3', label: 'HSK 3', available: false },
    { id: 'hsk4', label: 'HSK 4', available: false },
    { id: 'hsk5', label: 'HSK 5', available: false },
    { id: 'hsk6', label: 'HSK 6', available: false },
];

const ENGLISH_LEVELS = [
    { id: 'en-starters', label: 'Starters', available: true, color: 'bg-blue-500' },
    { id: 'en-movers', label: 'Movers', available: false },
    { id: 'en-flyers', label: 'Flyers', available: false },
    { id: 'en-ket', label: 'KET', available: false },
    { id: 'en-pet', label: 'PET', available: false },
];

export function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const levelParam = searchParams?.get('level') || 'hsk1';

    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [currentLevel, setCurrentLevel] = useState(levelParam);
    const [currentLanguage, setCurrentLanguage] = useState(levelParam.startsWith('en') ? 'en' : 'zh');
    const [showMore, setShowMore] = useState(false);
    const { data: session } = useSession();

    // Map Next.js routes to legacy tab IDs
    let activeTab = 'curriculum';
    if (pathname?.includes('/lessons')) activeTab = 'vocab';
    if (pathname?.includes('/games')) activeTab = 'flashcard';
    if (pathname?.includes('/practice')) activeTab = 'quiz';
    if (pathname?.includes('/listening')) activeTab = 'speaking-test';
    if (pathname?.includes('/writing')) activeTab = 'writing-test';
    if (pathname?.includes('/reading')) activeTab = 'reading-test';
    if (pathname?.includes('/mock-test')) activeTab = 'mock-test';
    if (pathname?.includes('/premium-tools')) activeTab = 'settings';
    if (pathname?.includes('/progress')) activeTab = 'progress';
    if (pathname?.includes('/settings')) activeTab = 'settings';

    const mainTabs = [
        { id: 'curriculum', icon: 'fa-house', label: 'Trang chủ', route: '/dashboard' },
        { id: 'flashcard', icon: 'fa-clone', label: 'Trò chơi', route: '/games' },
        { id: 'quiz', icon: 'fa-brain', label: 'Ôn tập', route: '/practice' },
        { id: 'progress', icon: 'fa-chart-line', label: 'Tiến độ', route: '/dashboard' },
    ];

    const moreTabs = [
        { id: 'vocab', icon: 'fa-book-open', label: 'Từ vựng', color: 'text-blue-600', route: '/vocab' },
        { id: 'grammar', icon: 'fa-layer-group', label: 'Ngữ pháp', color: 'text-green-600', route: '/grammar' },
        { id: 'reading-test', icon: 'fa-microphone', label: 'Luyện Đọc', color: 'text-purple-600', route: '/reading' },
        { id: 'writing-test', icon: 'fa-pencil-square', label: 'Thi Viết', color: 'text-pink-600', route: '/writing' },
        { id: 'speaking-test', icon: 'fa-headphones', label: 'Luyện Nghe', color: 'text-orange-500', route: '/listening' },
        { id: 'mock-test', icon: 'fa-graduation-cap', label: 'Thi Thử', color: 'text-yellow-600', route: '/mock-test' },
        { id: 'settings', icon: 'fa-gear', label: 'Cài đặt', color: 'text-gray-600', route: '/dashboard' },
    ];

    const isMoreActive = moreTabs.some(t => t.id === activeTab);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="bg-indigo-600 text-white p-2 rounded-lg">
                        <i className="fa-solid fa-graduation-cap text-lg"></i>
                    </div>
                    <span className="font-bold text-gray-800 hidden sm:block">HSK Learner</span>
                </div>

                {/* Dropdown Giáo trình */}
                <div className="relative shrink-0" id="curriculum-dropdown">
                    <button
                        onClick={() => setOpenMenu(openMenu === 'curriculum' ? null : 'curriculum')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all
                            ${currentLanguage === 'zh'
                                ? (LEVELS.find(l => l.id === currentLevel)?.color || 'bg-indigo-500') + ' text-white border-transparent'
                                : (ENGLISH_LEVELS.find(l => l.id === currentLevel)?.color || 'bg-emerald-500') + ' text-white border-transparent'
                            }`}>
                        <span>{currentLanguage === 'zh' ? '🇨🇳' : '🇬🇧'}</span>
                        <span>
                            {currentLanguage === 'zh'
                                ? LEVELS.find(l => l.id === currentLevel)?.label
                                : ENGLISH_LEVELS.find(l => l.id === currentLevel)?.label}
                        </span>
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </button>

                    {openMenu === 'curriculum' && (
                        <div className="absolute top-11 left-0 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 w-[300px] overflow-hidden animate-fade-in">
                            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Chọn giáo trình</p>
                            </div>
                            <div className="grid grid-cols-2 divide-x divide-gray-100">
                                {/* Tiếng Trung */}
                                <div>
                                    <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border-b border-gray-100">
                                        <span className="text-base">🇨🇳</span>
                                        <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Tiếng Trung</span>
                                    </div>
                                    {LEVELS.map(lv => (
                                        <button key={lv.id} disabled={!lv.available}
                                            onClick={() => {
                                                if (!lv.available) return;
                                                setCurrentLanguage('zh'); setCurrentLevel(lv.id); setOpenMenu(null);
                                                router.push(`${pathname}?level=${lv.id}`);
                                            }}
                                            className={`w-full text-left px-3 py-2.5 text-sm flex items-center justify-between transition-colors
                                                ${!lv.available ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}
                                                ${currentLanguage === 'zh' && currentLevel === lv.id ? 'bg-indigo-50 font-bold text-indigo-600' : 'text-gray-700'}`}>
                                            <span>{lv.label}</span>
                                            <span>
                                                {!lv.available ? <i className="fa-solid fa-lock text-xs text-gray-300"></i>
                                                    : currentLanguage === 'zh' && currentLevel === lv.id ? <i className="fa-solid fa-check text-xs text-indigo-500"></i> : null}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                                {/* Tiếng Anh */}
                                <div>
                                    <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border-b border-gray-100">
                                        <span className="text-base">🇬🇧</span>
                                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Tiếng Anh</span>
                                    </div>
                                    {ENGLISH_LEVELS.map(lv => (
                                        <button key={lv.id} disabled={!lv.available}
                                            onClick={() => {
                                                if (!lv.available) return;
                                                setCurrentLanguage('en'); setCurrentLevel(lv.id); setOpenMenu(null);
                                            }}
                                            className={`w-full text-left px-3 py-2.5 text-sm flex items-center justify-between transition-colors
                                                ${!lv.available ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'}
                                                ${currentLanguage === 'en' && currentLevel === lv.id ? 'bg-indigo-50 font-bold text-indigo-600' : 'text-gray-700'}`}>
                                            <span>{lv.label}</span>
                                            <span>
                                                {!lv.available ? <i className="fa-solid fa-lock text-xs text-gray-300"></i>
                                                    : currentLanguage === 'en' && currentLevel === lv.id ? <i className="fa-solid fa-check text-xs text-indigo-500"></i> : null}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Desktop Nav */}
                <nav className="desktop-nav flex items-center gap-1 flex-1">
                    <Link href={`/dashboard?level=${currentLevel}`}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${activeTab === 'curriculum' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                        Trang chủ
                    </Link>

                    {/* Học tập */}
                    <div className="relative">
                        <button onClick={() => setOpenMenu(openMenu === 'hoctap' ? null : 'hoctap')}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${['vocab', 'grammar'].includes(activeTab) ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                            Học tập <i className="fa-solid fa-chevron-down text-xs"></i>
                        </button>
                        {openMenu === 'hoctap' && (
                            <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[180px] overflow-hidden animate-fade-in">
                                {[
                                    { id: 'curriculum', icon: 'fa-route', label: 'Giáo trình', route: '/dashboard' },
                                    { id: 'vocab', icon: 'fa-book-open', label: 'Từ vựng', route: '/vocab' },
                                    { id: 'grammar', icon: 'fa-layer-group', label: 'Ngữ pháp', route: '/grammar' },
                                ].map(item => (
                                    <Link href={`${item.route}?level=${currentLevel}`} key={item.id} onClick={() => setOpenMenu(null)}
                                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors hover:bg-gray-50
                                            ${activeTab === item.id ? 'text-indigo-600 font-medium bg-indigo-50' : 'text-gray-700'}`}>
                                        <i className={`fa-solid ${item.icon} w-4 text-center`}></i> {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Luyện tập */}
                    <div className="relative">
                        <button onClick={() => setOpenMenu(openMenu === 'luyentap' ? null : 'luyentap')}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${['flashcard', 'quiz', 'speaking-test', 'writing-test', 'mock-test', 'reading-test'].includes(activeTab)
                                    ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                            Luyện tập <i className="fa-solid fa-chevron-down text-xs"></i>
                        </button>
                        {openMenu === 'luyentap' && (
                            <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[200px] overflow-hidden animate-fade-in">
                                {[
                                    { id: 'flashcard', icon: 'fa-gamepad', label: 'Trò chơi', route: '/games' },
                                    { id: 'quiz', icon: 'fa-brain', label: 'Ôn tập SRS', route: '/practice' },
                                    { id: 'reading-test', icon: 'fa-microphone', label: 'Luyện Đọc', route: '/reading' },
                                    { id: 'speaking-test', icon: 'fa-headphones', label: 'Luyện Nghe', route: '/listening' },
                                    { id: 'writing-test', icon: 'fa-pencil-square', label: 'Luyện Viết', route: '/writing' },
                                    { id: 'mock-test', icon: 'fa-graduation-cap', label: 'Thi Thử', route: '/mock-test' },
                                ].map(item => (
                                    <Link href={`${item.route}?level=${currentLevel}`} key={item.id} onClick={() => setOpenMenu(null)}
                                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors hover:bg-gray-50
                                            ${activeTab === item.id ? 'text-indigo-600 font-medium bg-indigo-50' : 'text-gray-700'}`}>
                                        <i className={`fa-solid ${item.icon} w-4 text-center`}></i> {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Right Icons */}
                <div className="flex items-center gap-3 shrink-0 ml-auto relative">
                    {session ? (
                        <>
                            <button onClick={() => setOpenMenu(openMenu === 'user' ? null : 'user')} className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                                {(session.user?.name || session.user?.email || "U")[0].toUpperCase()}
                            </button>
                            {openMenu === 'user' && (
                                <div className="absolute top-11 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[200px] overflow-hidden animate-fade-in">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-bold text-gray-800 truncate">{session.user?.name || "Người dùng"}</p>
                                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                                    </div>
                                    <div className="p-1">
                                        {(session.user as any)?.role === 'ADMIN' && (
                                            <Link href="/admin" onClick={() => setOpenMenu(null)} className="w-full text-left px-3 py-2.5 text-sm flex items-center gap-3 text-indigo-600 font-medium hover:bg-gray-50 rounded-lg">
                                                <i className="fa-solid fa-shield-halved w-4"></i> Quản trị viên
                                            </Link>
                                        )}
                                        <button onClick={() => { setOpenMenu(null); signOut(); }} className="w-full text-left px-3 py-2.5 text-sm flex items-center gap-3 text-rose-600 hover:bg-rose-50 rounded-lg font-medium">
                                            <i className="fa-solid fa-right-from-bracket w-4"></i> Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="px-4 py-2 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors hidden sm:block">
                                Đăng nhập
                            </Link>
                            <Link href="/login" className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-sm transition-colors">
                                Đăng ký
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {openMenu && <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)}></div>}

            {/* Mobile Bottom Nav */}
            {showMore && <div className="fixed inset-0 bg-black/40 z-[90] md:hidden" onClick={() => setShowMore(false)}></div>}
            {showMore && (
                <div className="mobile-bottom-nav md:hidden fixed bottom-16 left-0 right-0 z-[95] bg-white rounded-t-3xl shadow-2xl p-4 slide-up">
                    <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="grid grid-cols-3 gap-3">
                        {moreTabs.map(tab => (
                            <Link href={`${tab.route}?level=${currentLevel}`} key={tab.id} onClick={() => setShowMore(false)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all
                                    ${activeTab === tab.id ? 'bg-indigo-50 border-2 border-indigo-300' : 'bg-gray-50 border-2 border-transparent'}`}>
                                <i className={`fa-solid ${tab.icon} text-2xl ${tab.color}`}></i>
                                <span className="text-xs font-medium text-gray-700">{tab.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <nav className="mobile-bottom-nav md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-lg flex items-center justify-around px-2 h-16">
                {mainTabs.map(tab => (
                    <Link href={`${tab.route}?level=${currentLevel}`} key={tab.id}
                        className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-xl transition-all ${activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${activeTab === tab.id ? 'bg-indigo-100' : ''}`}>
                            <i className={`fa-solid ${tab.icon} text-xl`}></i>
                        </div>
                        <span className="text-[10px] font-medium">{tab.label}</span>
                    </Link>
                ))}
                <button onClick={() => setShowMore(v => !v)}
                    className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-xl ${isMoreActive || showMore ? 'text-indigo-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isMoreActive || showMore ? 'bg-indigo-100' : ''}`}>
                        <i className={`fa-solid ${showMore ? 'fa-xmark' : 'fa-ellipsis'} text-xl`}></i>
                    </div>
                    <span className="text-[10px] font-medium">Thêm</span>
                </button>
            </nav>
        </header>
    );
}
