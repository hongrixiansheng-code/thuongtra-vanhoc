"use client";

import { Gem, BookOpen, Gamepad2, Headphones, PenSquare, Mic, GraduationCap, Check, X } from "lucide-react";

const FREE_FEATURES = [
  { label: "Toàn bộ nội dung giáo trình (HSK 1-4, Cambridge YLE)", included: true },
  { label: "Từ vựng, Ngữ pháp, Hội thoại", included: true },
  { label: "Mini-test sau mỗi bài", included: true },
  { label: "Viết chữ Hán (HanziWriter)", included: true },
];

const PREMIUM_FEATURES = [
  { label: "Trò chơi luyện từ vựng (Typing, Matching)", included: true },
  { label: "Ôn tập SRS (Spaced Repetition)", included: true },
  { label: "Luyện Đọc nâng cao", included: true },
  { label: "Luyện Nghe nâng cao", included: true },
  { label: "Luyện Viết nâng cao", included: true },
  { label: "Thi thử mô phỏng", included: true },
];

export function Paywall() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Gem className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">
          Nâng cấp <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Premium</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Mở khóa toàn bộ tính năng luyện tập nâng cao để đạt kết quả tốt nhất trong kỳ thi.
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {/* Free Card */}
        <div className="bg-white/80 dark:bg-slate-900/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Miễn phí</h3>
              <p className="text-xs text-slate-400">Vĩnh viễn, không giới hạn</p>
            </div>
          </div>
          <div className="space-y-3">
            {FREE_FEATURES.map((f) => (
              <div key={f.label} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-300">{f.label}</span>
              </div>
            ))}
            {PREMIUM_FEATURES.map((f) => (
              <div key={f.label} className="flex items-start gap-2.5 opacity-40">
                <X className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400 line-through">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Card */}
        <div className="relative bg-white/80 dark:bg-slate-900/60 rounded-2xl border-2 border-amber-400 dark:border-amber-500/50 p-6 shadow-lg shadow-amber-500/10 backdrop-blur-sm">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
            Premium
          </span>
          <div className="flex items-center gap-3 mb-4 mt-1">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Gem className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">Premium</h3>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Từ ~1.858đ/ngày</p>
            </div>
          </div>
          <div className="space-y-3">
            {FREE_FEATURES.map((f) => (
              <div key={f.label} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-300">{f.label}</span>
              </div>
            ))}
            {PREMIUM_FEATURES.map((f) => (
              <div key={f.label} className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="https://m.me/your-fanpage"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25 dark:shadow-amber-500/10 transition-all hover:scale-105"
        >
          <i className="fa-brands fa-facebook-messenger" />
          Liên hệ Admin để nâng cấp
        </a>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">Thanh toán nhanh qua Messenger</p>
      </div>
    </div>
  );
}
