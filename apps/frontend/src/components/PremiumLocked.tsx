import Link from "next/link";

export default function PremiumLocked() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="text-6xl mb-4">💎</div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Tính năng dành cho thành viên Premium</h2>
      <p className="text-slate-500 mb-6">Nâng cấp Premium để mở khóa toàn bộ tính năng Luyện tập: trò chơi, ôn tập SRS, luyện đọc, luyện nghe, luyện viết và thi thử.</p>
      <Link
        href="/premium-tools"
        className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-yellow-700 transition"
      >
        Nâng cấp Premium →
      </Link>
    </div>
  );
}
