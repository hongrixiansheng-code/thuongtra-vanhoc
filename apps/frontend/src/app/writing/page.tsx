export const dynamic = 'force-dynamic';
import { WritingTab } from "@/components/legacy/WritingTab";
import { getAllVocabData, getAllPassagesData } from "@/lib/data";
import { getCompletedLessonIds, getDefaultProgramCode } from '@/lib/getProgressIds';
import ProgramLocked from "@/components/ProgramLocked";
import PremiumLocked from "@/components/PremiumLocked";
import PracticeEmptyState from "@/components/PracticeEmptyState";
import { PenLine } from "lucide-react";

export default async function WritingPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : await getDefaultProgramCode();

  const { completedLessonIds, programLocked, isPremiumUser } = await getCompletedLessonIds(level);

  const [vocabData, passagesData] = await Promise.all([
    completedLessonIds.length > 0 ? getAllVocabData(level, completedLessonIds) : Promise.resolve([]),
    getAllPassagesData(level, completedLessonIds)
  ]);

  return (
    <div className="min-h-screen pb-20">
      {programLocked ? (
        <ProgramLocked />
      ) : !isPremiumUser ? (
        <PremiumLocked />
      ) : completedLessonIds.length === 0 ? (
        <PracticeEmptyState icon={PenLine} title="Chưa có từ vựng để luyện viết" />
      ) : (
        <WritingTab key={level} vocabData={vocabData} passagesData={passagesData} levelId={level} />
      )}
    </div>
  );
}
