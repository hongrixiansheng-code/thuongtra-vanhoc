export const dynamic = 'force-dynamic';

import { QuizTab } from "@/components/legacy/QuizTab";

async function getPracticeVocabData(levelStr: string) {
  try {
    const fs = require('fs');
    const path = require('path');
    const isEnglish = levelStr.startsWith('en-');
    const levelNum = isEnglish ? 1 : parseInt(levelStr.replace('hsk', '')) || 1;
    const vocabFileName = isEnglish ? `${levelStr}-vocab.json` : `hsk${levelNum}-vocab.json`;
    const vocabPath = path.join(process.cwd(), `../../../Du_An_HSK1/data/${vocabFileName}`);
    if (fs.existsSync(vocabPath)) {
      const rawData = fs.readFileSync(vocabPath, 'utf-8');
      const allVocab = JSON.parse(rawData);
      
      const uniqueVocabMap = new Map();
      allVocab.forEach((w: any) => {
        const key = w.hanzi || w.word;
        if (key && !uniqueVocabMap.has(key)) {
          uniqueVocabMap.set(key, w);
        }
      });
      const uniqueVocab = Array.from(uniqueVocabMap.values());

      return uniqueVocab.map((w: any, index: number) => ({
        ...w,
        _uuid: w.id ? w.id.toString() : `vocab-${index}`
      }));
    }

    return [];
  } catch (e) {
    console.warn("FS fetch failed! Error details:", e);
    return [];
  }
}

export default async function PracticePage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  const vocabData = await getPracticeVocabData(level);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <QuizTab key={level} vocabData={vocabData} levelId={level} />
    </div>
  );
}
