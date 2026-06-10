"use client";
import React, { useState, useEffect, useRef, useCallback, memo, useContext } from "react";
import ReactDOM from 'react-dom';
// ========== AUTH MODAL ==========
// Modal đăng nhập / đăng ký hiển thị trên app

/** @jsxRuntime classic */

export const AuthModal = memo(({ onClose, onSuccess }) => {
    const [mode, setMode] = React.useState('login');
    // login | register
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName]         = React.useState('');
    const [loading, setLoading]   = React.useState(false);
    const [error, setError]       = React.useState('');

    const handleSubmit = async () => {
        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        setLoading(true);
        setError('');

        let result;
        if (mode === 'login') {
            result = await AuthManager.signIn(email, password);
        } else {
            if (!name.trim()) { setError('Vui lòng nhập tên.'); setLoading(false); return; }
            result = await AuthManager.signUp(email, password, name);
        }

        setLoading(false);
        if (result.success) {
            onSuccess?.(result.user);
            onClose?.();
        } else {
            setError(result.error);
        }
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm
            flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md
                p-8 animate-fade-in">

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full
                        flex items-center justify-center mx-auto mb-4">
                        <i className="fa-solid fa-user text-indigo-600 text-2xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {mode === 'login'
                            ? 'Đăng nhập để lưu tiến độ học tập'
                            : 'Tạo tài khoản miễn phí'}
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    {mode === 'register' && (
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">
                                Tên của bạn
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Nguyễn Văn A"
                                className="w-full border-2 border-gray-200 rounded-xl
                                    px-4 py-3 outline-none focus:border-indigo-400 transition"
                            />
                        </div>
                    )}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="example@email.com"
                            className="w-full border-2 border-gray-200 rounded-xl
                                px-4 py-3 outline-none focus:border-indigo-400 transition"
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full border-2 border-gray-200 rounded-xl
                                px-4 py-3 outline-none focus:border-indigo-400 transition"
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl
                            p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl
                            font-bold hover:bg-indigo-700 transition disabled:opacity-50">
                        {loading
                            ? '⏳ Đang xử lý...'
                            : mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
                    </button>

                    {/* Chuyển mode */}
                    <p className="text-center text-sm text-gray-500">
                        {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                        <button
                            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                            className="ml-1 text-indigo-600 font-medium hover:underline">
                            {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
                        </button>
                    </p>

                    {/* Bỏ qua */}
                    <button
                        onClick={onClose}
                        className="w-full py-2 text-sm text-gray-400
                            hover:text-gray-600 transition">
                        Bỏ qua — học không cần tài khoản
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
});

// ── User Avatar / Button hiển thị trên header ──
export const UserButton = memo(({ onOpenAuth }) => {
    const [user, setUser]       = React.useState(null);
    const [showMenu, setShowMenu] = React.useState(false);
    const [profile, setProfile] = React.useState(null);

    React.useEffect(() => {
        AuthManager.onAuthChange(async (u) => {
            setUser(u);
            if (u) {
                const p = await AuthManager.getProfile();
                setProfile(p);
            } else {
                setProfile(null);
            }
        });
    }, []);

    if (!user) return (
        <button onClick={onOpenAuth}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full
                border-2 border-indigo-200 text-indigo-600 text-sm font-medium
                hover:bg-indigo-50 transition">
            <i className="fa-solid fa-user"></i>
            <span className="hidden sm:block">Đăng nhập</span>
        </button>
    );

    const initial = (profile?.displayName || user.email || '?')[0].toUpperCase();
    const isAdmin = AuthManager.isAdmin();

    return (
        <div className="relative">
            <button onClick={() => setShowMenu(v => !v)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full
                    bg-indigo-50 border-2 border-indigo-200 hover:bg-indigo-100 transition">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white
                    flex items-center justify-center text-sm font-bold">
                    {initial}
                </div>
                <span className="text-sm font-medium text-indigo-700 hidden sm:block max-w-[100px] truncate">
                    {profile?.displayName || user.email}
                </span>
                {isAdmin && (
                    <span className="text-xs bg-yellow-100 text-yellow-700
                        px-1.5 py-0.5 rounded-full font-medium hidden sm:block">
                        Admin
                    </span>
                )}
            </button>

            {showMenu && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)}></div>
                    <div className="absolute right-0 top-12 bg-white border border-gray-200
                        rounded-2xl shadow-lg z-50 min-w-[200px] overflow-hidden animate-fade-in">
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="font-medium text-gray-800 truncate">
                                {profile?.displayName || 'Người dùng'}
                            </p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                        {isAdmin && (
                            <a href="/Du_An_HSK1/admin/index.html"
                                className="flex items-center gap-3 px-4 py-3
                                    hover:bg-yellow-50 transition text-sm text-yellow-700 font-medium">
                                <i className="fa-solid fa-shield-halved w-4"></i>
                                Trang quản trị
                            </a>
                        )}
                        <button
                            onClick={async () => { await AuthManager.signOut(); setShowMenu(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3
                                hover:bg-red-50 transition text-sm text-red-500">
                            <i className="fa-solid fa-right-from-bracket w-4"></i>
                            Đăng xuất
                        </button>
                    </div>
                </>
            )}
        </div>
    );
});
