export const dynamic = 'force-dynamic';

import { MockTestTab } from "@/components/legacy/MockTestTab";
import { getAllVocabData } from "@/lib/data";

export default async function MockTestPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  const vocabData = await getAllVocabData(level) || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MockTestTab key={level} vocabData={vocabData} />
    </div>
  );
}
