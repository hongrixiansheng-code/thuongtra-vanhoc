export const dynamic = 'force-dynamic';

import { GameTab } from "@/components/legacy/GameTab";
import { getAllVocabData } from "@/lib/data";

export default async function GamesPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  let vocabData = await getAllVocabData(level);

  if (!vocabData || vocabData.length === 0) {
    vocabData = [];
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <GameTab key={level} vocabData={vocabData} />
    </div>
  );
}
