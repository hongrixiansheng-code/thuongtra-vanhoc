export const dynamic = 'force-dynamic';

import { VocabTab } from "@/components/legacy/VocabTab";
import { getAllVocabData } from "@/lib/data";

export default async function VocabPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  let vocabData = await getAllVocabData(level);
  
  if (!vocabData || vocabData.length === 0) {
    vocabData = [];
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <VocabTab key={level} vocabData={vocabData} />
    </div>
  );
}
