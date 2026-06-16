export const dynamic = 'force-dynamic';
import GrammarClient from "@/components/GrammarClient";
import { getAllGrammarData } from "@/lib/data";
import { getCompletedLessonIds } from '@/lib/getProgressIds';
import Link from "next/link";

export default async function GrammarPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

  const { completedLessonIds } = await getCompletedLessonIds(level);

  const grammarData = completedLessonIds.length > 0
    ? await getAllGrammarData(level, completedLessonIds)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {completedLessonIds.length === 0 ? (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Chưa có ngữ pháp để ôn tập
          </h2>
          <p className="text-slate-500 mb-6">
            Hãy hoàn thành ít nhất 1 bài học để mở khóa phần ngữ pháp!
          </p>
          <Link href="/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            Bắt đầu học ngay →
          </Link>
        </div>
      ) : (
        <GrammarClient grammarData={grammarData} level={level} />
      )}
    </div>
  );
}
