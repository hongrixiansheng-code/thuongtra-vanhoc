export const dynamic = 'force-dynamic';
import { QuizTab } from "@/components/legacy/QuizTab";
import { getAllVocabData } from "@/lib/data";
import { getCompletedLessonIds, getDefaultProgramCode } from '@/lib/getProgressIds';
import ProgramLocked from "@/components/ProgramLocked";
import PremiumLocked from "@/components/PremiumLocked";
import PracticeEmptyState from "@/components/PracticeEmptyState";
import { Dumbbell } from "lucide-react";

export default async function PracticePage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : await getDefaultProgramCode();

  const { completedLessonIds, programLocked, isPremiumUser } = await getCompletedLessonIds(level);

  const vocabData = completedLessonIds.length > 0
    ? await getAllVocabData(level, completedLessonIds)
    : [];

  return (
    <div className="min-h-screen pb-20">
      {programLocked ? (
        <ProgramLocked />
      ) : !isPremiumUser ? (
        <PremiumLocked />
      ) : completedLessonIds.length === 0 ? (
        <PracticeEmptyState
          icon={Dumbbell}
          title="Chưa có từ vựng để luyện tập"
          desc="Hãy hoàn thành ít nhất 1 bài học để mở khóa tính năng luyện tập!"
        />
      ) : (
        <QuizTab key={level} vocabData={vocabData} levelId={level} />
      )}
    </div>
  );
}
