export const dynamic = 'force-dynamic';
import { VocabTab } from "@/components/legacy/VocabTab";
import { getAllVocabData } from "@/lib/data";
import { getCompletedLessonIds } from '@/lib/getProgressIds';

export default async function VocabPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

  const { completedLessonIds } = await getCompletedLessonIds(level);

  const vocabData = await getAllVocabData(level,
    completedLessonIds.length > 0 ? completedLessonIds : undefined
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <VocabTab key={level} vocabData={vocabData || []} />
    </div>
  );
}
