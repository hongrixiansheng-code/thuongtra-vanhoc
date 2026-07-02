export const dynamic = 'force-dynamic';
import { ReadingTab } from "@/components/legacy/ReadingTab";
import { getAllVocabData, getAllPassagesData, getDialogueSentences } from "@/lib/data";
import { getCompletedLessonIds, getDefaultProgramCode } from '@/lib/getProgressIds';
import ProgramLocked from "@/components/ProgramLocked";
import PremiumLocked from "@/components/PremiumLocked";
import PracticeEmptyState from "@/components/PracticeEmptyState";
import { BookOpen } from "lucide-react";

export default async function ReadingPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : await getDefaultProgramCode();

  const { completedLessonIds, programLocked, isPremiumUser } = await getCompletedLessonIds(level);

  const [vocabData, passagesData, dialogueSentences] = await Promise.all([
    completedLessonIds.length > 0 ? getAllVocabData(level, completedLessonIds) : Promise.resolve([]),
    getAllPassagesData(level, completedLessonIds),
    getDialogueSentences(level)
  ]);

  return (
    <div className="min-h-screen pb-20">
      {programLocked ? (
        <ProgramLocked />
      ) : !isPremiumUser ? (
        <PremiumLocked />
      ) : completedLessonIds.length === 0 ? (
        <PracticeEmptyState icon={BookOpen} title="Chưa có nội dung để luyện đọc" />
      ) : (
        <ReadingTab key={level} vocabData={vocabData} passagesData={passagesData} dialogueSentences={dialogueSentences} levelId={level} />
      )}
    </div>
  );
}
