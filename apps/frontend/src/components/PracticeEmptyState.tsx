import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface PracticeEmptyStateProps {
  icon: LucideIcon;
  title: string;
  desc?: string;
}

/**
 * Trạng thái rỗng dùng chung cho các trang Luyện tập (practice/games/reading/listening/writing/mock-test)
 * khi user chưa hoàn thành bài nào — đồng bộ icon/màu/dark mode thay vì lặp markup ở từng page.
 */
export default function PracticeEmptyState({ icon: Icon, title, desc }: PracticeEmptyStateProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
        <Icon className="w-8 h-8 text-primary-500 dark:text-primary-400" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        {desc || "Hãy hoàn thành ít nhất 1 bài học để mở khóa!"}
      </p>
      <Link
        href="/dashboard"
        className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-colors"
      >
        Bắt đầu học ngay →
      </Link>
    </div>
  );
}
