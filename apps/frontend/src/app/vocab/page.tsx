export const dynamic = 'force-dynamic';

import { VocabTab } from "@/components/legacy/VocabTab";

async function getAllVocabData(levelStr: string) {
  try {
    const { PrismaClient } = require('database');
    const path = require('path');
    
    const prisma = new PrismaClient();
    // Thay vì lấy từ bài học, ta lấy toàn bộ từ vựng chuẩn từ file gốc của dự án cũ
    const fs = require('fs');
    const isEnglish = levelStr.startsWith('en-');
    const levelNum = isEnglish ? 1 : parseInt(levelStr.replace('hsk', '')) || 1;
    const vocabFileName = isEnglish ? `${levelStr}-vocab.json` : `hsk${levelNum}-vocab.json`;
    const vocabPath = path.join(process.cwd(), `../../../Du_An_HSK1/data/${vocabFileName}`);
    fs.writeFileSync(path.join(process.cwd(), 'vocab-debug.log'), `Executed getAllVocabData with levelStr=${levelStr} at ${new Date().toISOString()}\n`, { flag: 'a' });
    if (fs.existsSync(vocabPath)) {
      const rawData = fs.readFileSync(vocabPath, 'utf-8');
      const allVocab = JSON.parse(rawData);
      
      // Lọc trùng lặp chữ Hán (vì dữ liệu gốc có từ "听" bị lặp) hoặc từ tiếng Anh
      const uniqueVocabMap = new Map();
      allVocab.forEach((w: any) => {
        const key = w.hanzi || w.word;
        if (key && !uniqueVocabMap.has(key)) {
          uniqueVocabMap.set(key, w);
        }
      });
      const uniqueVocab = Array.from(uniqueVocabMap.values());

      // Thêm _uuid ổn định cho tất cả từ vựng để React không bị lỗi lặp thẻ (trùng DOM)
      return uniqueVocab.map((w: any, index: number) => ({
        ...w,
        _uuid: w.id ? w.id.toString() : `vocab-${index}`
      }));
    }

    return [];
  } catch (e) {
    console.warn("getAllVocabData failed! Error details:", e);
    return []; // Trả về mảng rỗng nếu lỗi để VocabTab tự fallback nếu cần, hoặc ta có thể mock data
  }
}

export default async function VocabPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  let vocabData = await getAllVocabData(level);
  const fs = require('fs');
  fs.appendFileSync('vocab-debug.log', `VocabPage render searchParams=${JSON.stringify(searchParams)}, level=${level}, dataLength=${vocabData?.length}\n`);
  
  // Mock data fallback if DB is empty
  if (!vocabData || vocabData.length === 0) {
    vocabData = [];
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <VocabTab key={level} vocabData={vocabData} />
    </div>
  );
}
