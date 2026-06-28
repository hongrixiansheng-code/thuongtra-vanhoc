export const dynamic = 'force-dynamic';
import { WritingTab } from "@/components/legacy/WritingTab";
import { getAllVocabData } from "@/lib/data";
import { getCompletedLessonIds } from '@/lib/getProgressIds';
import ProgramLocked from "@/components/ProgramLocked";
import PremiumLocked from "@/components/PremiumLocked";
import Link from "next/link";

export default async function WritingPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

  const { completedLessonIds, programLocked, isPremiumUser } = await getCompletedLessonIds(level);

  const vocabData = completedLessonIds.length > 0
    ? await getAllVocabData(level, completedLessonIds)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {programLocked ? (
        <ProgramLocked />
      ) : !isPremiumUser ? (
        <PremiumLocked />
      ) : completedLessonIds.length === 0 ? (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">✍️</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Chưa có từ vựng để luyện viết</h2>
          <p className="text-slate-500 mb-6">Hãy hoàn thành ít nhất 1 bài học để mở khóa!</p>
          <Link href="/dashboard" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            Bắt đầu học ngay →
          </Link>
        </div>
      ) : (
        <WritingTab key={level} vocabData={vocabData} levelId={level} />
      )}
    </div>
  );
}
