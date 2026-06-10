export const dynamic = 'force-dynamic';

import { ListeningTab } from "@/components/legacy/ListeningTab";

async function getListeningData(levelStr: string) {
  try {
    const fs = require('fs');
    const path = require('path');
    const isEnglish = levelStr.startsWith('en-');
    const levelNum = isEnglish ? 1 : parseInt(levelStr.replace('hsk', '')) || 1;
    const vocabFileName = isEnglish ? `${levelStr}-vocab.json` : `hsk${levelNum}-vocab.json`;
    
    // Đọc vocab
    const vocabPath = path.join(process.cwd(), `../../../Du_An_HSK1/data/${vocabFileName}`);
    let vocabData = [];
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

      vocabData = uniqueVocab.map((w: any, index: number) => ({
        ...w,
        _uuid: w.id ? w.id.toString() : `vocab-${index}`
      }));
    }

    // Đọc passages
    const passagesFileName = isEnglish ? `${levelStr}-passages.json` : `hsk${levelNum}-passages.json`;
    let passagePath = path.join(process.cwd(), `../../../Du_An_HSK1/data/${passagesFileName}`);
    
    // Nếu không tồn tại file đặc thù, thử đọc file passages.json chung
    if (!fs.existsSync(passagePath)) {
        passagePath = path.join(process.cwd(), '../../../Du_An_HSK1/data/passages.json');
    }

    let passagesData = [];
    if (fs.existsSync(passagePath)) {
        const pData = fs.readFileSync(passagePath, 'utf-8');
        passagesData = JSON.parse(pData);
    }

    return { vocabData, passagesData };
  } catch (e) {
    console.warn("FS fetch failed! Error details:", e);
    return { vocabData: [], passagesData: [] };
  }
}

export default async function ListeningPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  const { vocabData, passagesData } = await getListeningData(level);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20 py-8">
      <ListeningTab key={level} vocabData={vocabData} passagesData={passagesData} levelId={level} />
    </div>
  );
}
