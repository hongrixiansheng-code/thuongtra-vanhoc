export const dynamic = 'force-dynamic';
import { VocabTab } from "@/components/legacy/VocabTab";
import { getAllVocabData } from "@/lib/data";
import { getCompletedLessonIds, getDefaultProgramCode } from '@/lib/getProgressIds';
import ProgramLocked from "@/components/ProgramLocked";

export default async function VocabPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : await getDefaultProgramCode();

  const { completedLessonIds, programLocked } = await getCompletedLessonIds(level);

  const vocabData = programLocked
    ? []
    : await getAllVocabData(level, completedLessonIds.length > 0 ? completedLessonIds : undefined);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {programLocked ? <ProgramLocked /> : <VocabTab key={level} vocabData={vocabData || []} />}
    </div>
  );
}
