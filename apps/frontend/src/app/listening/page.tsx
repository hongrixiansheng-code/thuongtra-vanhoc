export const dynamic = 'force-dynamic';
import { ListeningTab } from "@/components/legacy/ListeningTab";
import { getAllVocabData, getAllPassagesData } from "@/lib/data";
import { getCompletedLessonIds } from '@/lib/getProgressIds';
import ProgramLocked from "@/components/ProgramLocked";
import PremiumLocked from "@/components/PremiumLocked";
import PracticeEmptyState from "@/components/PracticeEmptyState";
import { Headphones } from "lucide-react";

export default async function ListeningPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

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
        <PracticeEmptyState icon={Headphones} title="Chưa có nội dung để luyện nghe" />
      ) : (
        <ListeningTab key={level} vocabData={vocabData} passagesData={passagesData} levelId={level} />
      )}
    </div>
  );
}
