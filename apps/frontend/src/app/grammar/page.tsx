export const dynamic = 'force-dynamic';

import { GrammarTab } from "@/components/legacy/GrammarTab";
import { getAllGrammarData } from "@/lib/data";

export default async function GrammarPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  let grammarData = await getAllGrammarData(level);

  if (!grammarData || grammarData.length === 0) {
    grammarData = [];
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <GrammarTab key={level} grammarData={grammarData} />
    </div>
  );
}
