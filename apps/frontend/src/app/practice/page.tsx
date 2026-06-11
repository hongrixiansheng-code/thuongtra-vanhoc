export const dynamic = 'force-dynamic';

import { QuizTab } from "@/components/legacy/QuizTab";
import { getAllVocabData } from "@/lib/data";

export default async function PracticePage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  const vocabData = await getAllVocabData(level) || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <QuizTab key={level} vocabData={vocabData} levelId={level} />
    </div>
  );
}
