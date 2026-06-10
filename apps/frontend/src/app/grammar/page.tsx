export const dynamic = 'force-dynamic';

import { GrammarTab } from "@/components/legacy/GrammarTab";

async function getAllGrammarData(levelStr: string) {
  try {
    const { PrismaClient } = require('database');
    const path = require('path');
    
    const prisma = new PrismaClient();
    const fs = require('fs');
    const isEnglish = levelStr.startsWith('en-');
    const levelNum = isEnglish ? 1 : parseInt(levelStr.replace('hsk', '')) || 1;
    const grammarFileName = isEnglish ? `${levelStr}-grammar.json` : `hsk${levelNum}-grammar.json`;
    const grammarPath = path.join(process.cwd(), `../../../Du_An_HSK1/data/${grammarFileName}`);
    if (fs.existsSync(grammarPath)) {
      const rawData = fs.readFileSync(grammarPath, 'utf-8');
      const allGrammar = JSON.parse(rawData);
      
      return allGrammar;
    }

    return [];
  } catch (e) {
    console.warn("DB fetch failed! Error details:", e);
    return [];
  }
}

export default async function GrammarPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  let grammarData = await getAllGrammarData(level);
  
  // Mock data fallback if DB is empty
  if (!grammarData || grammarData.length === 0) {
    grammarData = [
      {
        id: "g1",
        title: "Đại từ nhân xưng + 叫 + Tên",
        desc: "Dùng để giới thiệu tên gọi của ai đó.",
        formula: [
          { text: "Đại từ nhân xưng", classes: "border-blue-200 bg-blue-50 text-blue-700" },
          { text: "叫 (jiào)", classes: "border-red-200 bg-red-50 text-red-700" },
          { text: "Tên riêng", classes: "border-green-200 bg-green-50 text-green-700" }
        ],
        practiceList: [
          { correct: "我叫玛丽。", meaning: "Tôi tên là Mary.", vi: "Tôi tên là Mary." },
          { correct: "他叫大卫。", meaning: "Anh ấy tên là David.", vi: "Anh ấy tên là David." }
        ]
      }
    ];
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <GrammarTab key={level} grammarData={grammarData} />
    </div>
  );
}
