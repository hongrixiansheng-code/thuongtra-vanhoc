export const dynamic = 'force-dynamic';
import { ReadingTab } from "@/components/legacy/ReadingTab";
import { getAllVocabData, getAllPassagesData, getDialogueSentences } from "@/lib/data";
import { getCompletedLessonIds } from '@/lib/getProgressIds';
import ProgramLocked from "@/components/ProgramLocked";
import PremiumLocked from "@/components/PremiumLocked";
import Link from "next/link";

export default async function ReadingPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

  const { completedLessonIds, programLocked, isPremiumUser } = await getCompletedLessonIds(level);

  const [vocabData, passagesData, dialogueSentences] = await Promise.all([
    completedLessonIds.length > 0 ? getAllVocabData(level, completedLessonIds) : Promise.resolve([]),
    getAllPassagesData(level, completedLessonIds),
    getDialogueSentences(level)
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {programLocked ? (
        <ProgramLocked />
      ) : !isPremiumUser ? (
        <PremiumLocked />
      ) : completedLessonIds.length === 0 ? (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Chưa có nội dung để luyện đọc</h2>
          <p className="text-slate-500 mb-6">Hãy hoàn thành ít nhất 1 bài học để mở khóa!</p>
          <Link href="/dashboard" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            Bắt đầu học ngay →
          </Link>
        </div>
      ) : (
        <ReadingTab key={level} vocabData={vocabData} passagesData={passagesData} dialogueSentences={dialogueSentences} levelId={level} />
      )}
    </div>
  );
}
