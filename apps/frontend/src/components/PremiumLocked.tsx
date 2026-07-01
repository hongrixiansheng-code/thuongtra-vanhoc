import Link from "next/link";
import { Gem } from "lucide-react";

export default function PremiumLocked() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
        <Gem className="w-8 h-8 text-amber-500 dark:text-amber-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Tính năng dành cho thành viên Premium</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6">Nâng cấp Premium để mở khóa toàn bộ tính năng Luyện tập: trò chơi, ôn tập SRS, luyện đọc, luyện nghe, luyện viết và thi thử.</p>
      <Link
        href="/premium-tools"
        className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors"
      >
        Nâng cấp Premium →
      </Link>
    </div>
  );
}
