export const dynamic = 'force-dynamic';

import { ReadingTab } from "@/components/legacy/ReadingTab";
import { getAllVocabData, getAllPassagesData } from "@/lib/data";

export default async function ReadingPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  const vocabData = await getAllVocabData(level) || [];
  const passagesData = await getAllPassagesData(level) || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <ReadingTab key={level} vocabData={vocabData} passagesData={passagesData} levelId={level} />
    </div>
  );
}
