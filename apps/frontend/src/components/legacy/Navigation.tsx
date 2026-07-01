"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import ThemeSwitcher from '@/components/ThemeSwitcher';

// Fallback tĩnh khi API chưa load xong
const FALLBACK_SUBJECTS = [
    {
        id: 'zh', code: 'zh', name: 'Tiếng Trung', flag: '🇨🇳', color: 'bg-red-500',
        programs: [
            { id: 'hsk1', code: 'hsk1', name: 'HSK 1 - Cấp độ Cơ bản', level: 1, isAvailable: true },
            { id: 'hsk2', code: 'hsk2', name: 'HSK 2 - Cấp độ Sơ cấp', level: 2, isAvailable: true },
            { id: 'hsk3', code: 'hsk3', name: 'HSK 3 - Giao tiếp Trung cấp', level: 3, isAvailable: false },
            { id: 'hsk4', code: 'hsk4', name: 'HSK 4 - Giao tiếp Nâng cao', level: 4, isAvailable: false },
        ]
    },
    {
        id: 'en', code: 'en', name: 'Tiếng Anh', flag: '🇬🇧', color: 'bg-blue-500',
        programs: [
            { id: 'en-starters', code: 'en-starters', name: 'Starters', level: 1, isAvailable: true },
            { id: 'ielts-0-4', code: 'ielts-0-4', name: 'Get Ready', level: 1, isAvailable: false },
        ]
    },
];

// Rút gọn tên chương trình cho nút dropdown
function shortLabel(name: string, code: string): string {
    if (code.startsWith('hsk')) return code.toUpperCase().replace('HSK', 'HSK ');
    if (name === 'Starters') return 'Starters';
    if (code.includes('ielts')) return name;
    // Môn khác: lấy phần sau dấu " - " hoặc tên nguyên
    return name.split(' - ')[0];
}

export function Navigation() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const levelParam = searchParams?.get('level') || 'hsk1';

    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [currentLevel, setCurrentLevel] = useState(levelParam);
    const [showMore, setShowMore] = useState(false);
    const [subjects, setSubjects] = useState<any[]>(FALLBACK_SUBJECTS);
    const { data: session } = useSession();

    // Tự động detect subject hiện tại từ level code
    const currentSubject = subjects.find(s => s.programs.some((p: any) => p.code === currentLevel));
    const currentProgram = currentSubject?.programs.find((p: any) => p.code === currentLevel);

    // Load danh sách chương trình động từ API
    useEffect(() => {
        fetch('/api/subjects')
            .then(r => r.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) setSubjects(data);
            })
            .catch(() => {}); // giữ fallback nếu lỗi
    }, []);

    // Map routes → activeTab
    let activeTab = 'curriculum';
    if (pathname === '/') activeTab = 'home';
    if (pathname?.includes('/lessons')) activeTab = 'vocab';
    if (pathname?.includes('/games')) activeTab = 'flashcard';
    if (pathname?.includes('/practice')) activeTab = 'quiz';
    if (pathname?.includes('/listening')) activeTab = 'speaking-test';
    if (pathname?.includes('/writing')) activeTab = 'writing-test';
    if (pathname?.includes('/reading')) activeTab = 'reading-test';
    if (pathname?.includes('/mock-test')) activeTab = 'mock-test';
    if (pathname?.includes('/vocab')) activeTab = 'vocab';
    if (pathname?.includes('/grammar')) activeTab = 'grammar';
    if (pathname?.includes('/dialogue')) activeTab = 'dialogue';

    const mainTabs = [
        { id: 'home', icon: 'fa-house', label: 'Trang chủ', route: '/' },
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
    ];

    const isMoreActive = moreTabs.some(t => t.id === activeTab);

    const handleSelectProgram = (programCode: string) => {
        setCurrentLevel(programCode);
        setOpenMenu(null);
        router.push(`${pathname}?level=${programCode}`);
    };

    const handleClickProgram = (prog: any) => {
        if (!prog.isAvailable) {
            alert('Chương trình đang phát triển, sẽ sớm ra mắt');
            return;
        }
        handleSelectProgram(prog.code);
    };

    const btnColor = currentSubject?.color || 'bg-indigo-500';

    return (
        <header className="site-topnav bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <div className="bg-primary-600 text-white p-2 rounded-lg">
                        <i className="fa-solid fa-graduation-cap text-lg"></i>
                    </div>
                    <span className="font-bold text-gray-800 hidden sm:block">Thưởng Trà - Vấn Học</span>
                </Link>

                {/* Dropdown chọn chương trình — ĐỌC ĐỘNG TỪ DB */}
                <div className="relative shrink-0" id="curriculum-dropdown">
                    <button
                        onClick={() => setOpenMenu(openMenu === 'curriculum' ? null : 'curriculum')}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold border-2 transition-all ${btnColor} text-white border-transparent`}>
                        <span>{currentSubject?.flag || '🌐'}</span>
                        <span>{shortLabel(currentProgram?.name || currentLevel, currentLevel)}</span>
                        <i className="fa-solid fa-chevron-down text-xs"></i>
                    </button>

                    {openMenu === 'curriculum' && (
                        <div className="absolute top-11 left-0 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 min-w-[400px] max-w-[600px] overflow-hidden animate-fade-in">
                            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Chọn giáo trình</p>
                            </div>
                            <div className="flex divide-x divide-gray-100">
                                {subjects.map(subject => {
                                    if (subject.code === 'en') {
                                        return (
                                            <div key={subject.id || subject.code} className="flex-[2] min-w-0 bg-blue-50/30">
                                                <div className="flex items-center gap-2 px-3 py-2 border-b border-blue-100 bg-blue-100/50">
                                                    <span className="text-base">{subject.flag || '📚'}</span>
                                                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">{subject.name}</span>
                                                </div>
                                                <div className="flex divide-x divide-gray-100">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="px-3 py-1 bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100/50">Cambridge</div>
                                                        {subject.programs.filter((p: any) => !p.code.includes('ielts')).map((prog: any) => (
                                                            <button key={prog.id || prog.code}
                                                                onClick={() => handleClickProgram(prog)}
                                                                className={`w-full text-left px-3 py-2.5 text-sm flex items-center justify-between transition-colors
                                                                    ${!prog.isAvailable ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-100/50 cursor-pointer'}
                                                                    ${currentLevel === prog.code ? 'bg-primary-50 font-bold text-primary-600' : 'text-gray-700'}`}>
                                                                <span>{shortLabel(prog.name, prog.code)}</span>
                                                                <span>
                                                                    {!prog.isAvailable
                                                                        ? <i className="fa-solid fa-lock text-xs text-gray-300"></i>
                                                                        : currentLevel === prog.code
                                                                            ? <i className="fa-solid fa-check text-xs text-primary-500"></i>
                                                                            : null}
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="px-3 py-1 bg-blue-50 text-[10px] font-bold text-blue-600 uppercase tracking-wider border-b border-blue-100/50">IELTS</div>
                                                        {subject.programs.filter((p: any) => p.code.includes('ielts')).map((prog: any) => (
                                                            <button key={prog.id || prog.code}
                                                                onClick={() => handleClickProgram(prog)}
                                                                className={`w-full text-left px-3 py-2.5 text-sm flex items-center justify-between transition-colors
                                                                    ${!prog.isAvailable ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-100/50 cursor-pointer'}
                                                                    ${currentLevel === prog.code ? 'bg-primary-50 font-bold text-primary-600' : 'text-gray-700'}`}>
                                                                <span>{shortLabel(prog.name, prog.code)}</span>
                                                                <span>
                                                                    {!prog.isAvailable
                                                                        ? <i className="fa-solid fa-lock text-xs text-gray-300"></i>
                                                                        : currentLevel === prog.code
                                                                            ? <i className="fa-solid fa-check text-xs text-primary-500"></i>
                                                                            : null}
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div key={subject.id || subject.code} className="flex-1 min-w-0 bg-red-50/30">
                                                <div className="flex items-center gap-2 px-3 py-2 border-b border-red-100 bg-red-100/50">
                                                    <span className="text-base">{subject.flag || '📚'}</span>
                                                    <span className="text-xs font-bold text-red-800 uppercase tracking-wide">{subject.name}</span>
                                                </div>
                                                {subject.programs.map((prog: any) => (
                                                    <button key={prog.id || prog.code}
                                                        onClick={() => handleClickProgram(prog)}
                                                        className={`w-full text-left px-3 py-2.5 text-sm flex items-center justify-between transition-colors
                                                            ${!prog.isAvailable ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-red-100/50 cursor-pointer'}
                                                            ${currentLevel === prog.code ? 'bg-primary-50 font-bold text-primary-600' : 'text-gray-700'}`}>
                                                        <span>{shortLabel(prog.name, prog.code)}</span>
                                                        <span>
                                                            {!prog.isAvailable
                                                                ? <i className="fa-solid fa-lock text-xs text-gray-300"></i>
                                                                : currentLevel === prog.code
                                                                    ? <i className="fa-solid fa-check text-xs text-primary-500"></i>
                                                                    : null}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Desktop Nav */}
                <nav className="desktop-nav flex items-center gap-1 flex-1">
                    <Link href="/"
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${activeTab === 'home' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                        Trang chủ
                    </Link>

                    {/* Học tập */}
                    <div className="relative">
                        <button onClick={() => setOpenMenu(openMenu === 'hoctap' ? null : 'hoctap')}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors
                                ${['vocab', 'grammar', 'dialogue'].includes(activeTab) ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                            Học tập <i className="fa-solid fa-chevron-down text-xs"></i>
                        </button>
                        {openMenu === 'hoctap' && (
                            <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[180px] overflow-hidden animate-fade-in">
                                {[
                                    { id: 'curriculum', icon: 'fa-route', label: 'Giáo trình', route: '/dashboard' },
                                    { id: 'vocab', icon: 'fa-book-open', label: 'Từ vựng', route: '/vocab' },
                                    { id: 'grammar', icon: 'fa-layer-group', label: 'Ngữ pháp', route: '/grammar' },
                                    { id: 'dialogue', icon: 'fa-comments', label: 'Hội thoại', route: '/dialogue' },
                                ].map(item => (
                                    <Link href={`${item.route}?level=${currentLevel}`} key={item.id} onClick={() => setOpenMenu(null)}
                                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors hover:bg-gray-50
                                            ${activeTab === item.id ? 'text-primary-600 font-medium bg-primary-50' : 'text-gray-700'}`}>
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
                                    ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
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
                                            ${activeTab === item.id ? 'text-primary-600 font-medium bg-primary-50' : 'text-gray-700'}`}>
                                        <i className={`fa-solid ${item.icon} w-4 text-center`}></i> {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Right: user menu */}
                <div className="flex items-center gap-3 shrink-0 ml-auto relative">
                    <ThemeSwitcher />
                    {session ? (
                        <>
                            <button onClick={() => setOpenMenu(openMenu === 'user' ? null : 'user')}
                                className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                                {(session.user?.name || session.user?.email || 'U')[0].toUpperCase()}
                            </button>
                            {openMenu === 'user' && (
                                <div className="absolute top-11 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 min-w-[200px] overflow-hidden animate-fade-in">
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <p className="text-sm font-bold text-gray-800 truncate">{session.user?.name || 'Người dùng'}</p>
                                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                                    </div>
                                    <div className="p-1">
                                        {(session.user as any)?.role === 'ADMIN' && (
                                            <Link href="/admin" onClick={() => setOpenMenu(null)}
                                                className="w-full text-left px-3 py-2.5 text-sm flex items-center gap-3 text-primary-600 font-medium hover:bg-gray-50 rounded-lg">
                                                <i className="fa-solid fa-shield-halved w-4"></i> Quản trị viên
                                            </Link>
                                        )}
                                        {((session.user as any)?.role === 'TEACHER' || (session.user as any)?.role === 'ADMIN') && (
                                            <Link href="/teacher/classes" onClick={() => setOpenMenu(null)}
                                                className="w-full text-left px-3 py-2.5 text-sm flex items-center gap-3 text-primary-600 font-medium hover:bg-gray-50 rounded-lg">
                                                <i className="fa-solid fa-chalkboard-user w-4"></i> Lớp học của tôi
                                            </Link>
                                        )}
                                        <button onClick={() => { setOpenMenu(null); signOut(); }}
                                            className="w-full text-left px-3 py-2.5 text-sm flex items-center gap-3 text-rose-600 hover:bg-rose-50 rounded-lg font-medium">
                                            <i className="fa-solid fa-right-from-bracket w-4"></i> Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="px-4 py-2 text-sm font-bold text-primary-600 hover:bg-primary-50 rounded-full transition-colors hidden sm:block">
                                Đăng nhập
                            </Link>
                            <Link href="/register" className="px-4 py-2 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-full shadow-sm transition-colors">
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
                                    ${activeTab === tab.id ? 'bg-primary-50 border-2 border-primary-300' : 'bg-gray-50 border-2 border-transparent'}`}>
                                <i className={`fa-solid ${tab.icon} text-2xl ${tab.color}`}></i>
                                <span className="text-xs font-medium text-gray-700">{tab.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <nav className="mobile-bottom-nav md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-lg flex items-center justify-around px-2 h-16">
                {mainTabs.map(tab => (
                    <Link href={tab.route === '/' ? '/' : `${tab.route}?level=${currentLevel}`} key={tab.id}
                        className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-xl transition-all ${activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'}`}>
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${activeTab === tab.id ? 'bg-primary-100' : ''}`}>
                            <i className={`fa-solid ${tab.icon} text-xl`}></i>
                        </div>
                        <span className="text-[10px] font-medium">{tab.label}</span>
                    </Link>
                ))}
                <button onClick={() => setShowMore(v => !v)}
                    className={`flex flex-col items-center gap-1 flex-1 py-2 rounded-xl ${isMoreActive || showMore ? 'text-primary-600' : 'text-gray-400'}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isMoreActive || showMore ? 'bg-primary-100' : ''}`}>
                        <i className={`fa-solid ${showMore ? 'fa-xmark' : 'fa-ellipsis'} text-xl`}></i>
                    </div>
                    <span className="text-[10px] font-medium">Thêm</span>
                </button>
            </nav>
        </header>
    );
}
