export const dynamic = 'force-dynamic';

import { CurriculumTab } from "@/components/legacy/CurriculumTab";

// This is a Server Component, so we can securely fetch data here.
async function getLessonsData(levelStr: string) {
  const isEnglish = levelStr.startsWith('en-');
  const levelNum = isEnglish ? 1 : parseInt(levelStr.replace('hsk', '')) || 1;

  // Try to fetch from actual DB if Prisma is available and it's not English
  if (!isEnglish) {
    try {
    const { PrismaClient } = require('database');
    const path = require('path');
    // Sửa lại cho đúng vị trí dev.db nằm trong thư mục prisma
    const dbPath = path.join(process.cwd(), '../../packages/database/prisma/dev.db');
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: `file:${dbPath}`
        }
      }
    });
    
    // Fetch the Program that has lessons
    const program = await prisma.program.findFirst({
      where: {
        level: levelNum,
        lessons: { some: {} }
      },
      include: {
        lessons: {
          include: {
            contents: true
          },
          orderBy: {
            orderIndex: 'asc'
          }
        }
      }
    });

    if (program && program.lessons.length > 0) {
      // Map DB schema to Legacy UI expected schema
      const mappedLessons = program.lessons.map((l: any) => ({
        id: l.id,
        title: l.title,
        theme: l.title.includes("Mở Đầu") ? "CHUYÊN ĐỀ MỞ ĐẦU: NGỮ ÂM" : 
               (l.title.includes("Bài 1:") || l.title.includes("Bài 2:") || l.title.includes("Bài 3:")) ? "CHỦ ĐỀ I: CHÀO HỎI & LÀM QUEN" : 
               (l.title.includes("Bài 4:") || l.title.includes("Bài 5:") || l.title.includes("Bài 6:")) ? "CHỦ ĐỀ II: THỜI GIAN & ĐỜI SỐNG" :
               (l.title.includes("Bài 7:") || l.title.includes("Bài 8:") || l.title.includes("Bài 9:")) ? "CHỦ ĐỀ III: MUA SẮM & GIAO DỊCH" :
               (l.title.includes("Bài 10:") || l.title.includes("Bài 11:") || l.title.includes("Bài 12:")) ? "CHỦ ĐỀ IV: GIAO THÔNG & PHƯƠNG HƯỚNG" :
               "CHỦ ĐỀ V: HOẠT ĐỘNG KHÁC",
        description: "",
        vocab: l.contents.filter((c: any) => c.contentType === "THEORY").map((c: any) => {
           try { return JSON.parse(c.content); } catch { return { word: "Lỗi data", meaning: "Lỗi data" }; }
        }),
        grammar: l.contents.filter((c: any) => c.contentType === "GRAMMAR").map((c: any) => {
           try { return JSON.parse(c.content); } catch { return null; }
        }).filter(Boolean),
        dialogues: l.contents.filter((c: any) => c.contentType === "DIALOGUE").map((c: any) => {
           try { return JSON.parse(c.content); } catch { return null; }
        }).filter(Boolean)
      }));
      return { programName: program.name, lessons: mappedLessons };
    }
  } catch (e) {
    console.warn("DB fetch failed! Error details:", e);
  }
  }

  // Fallback to rich mock data to show the beautiful UI
  if (isEnglish || levelNum === 2) {
    const fs = require('fs');
    const path = require('path');
    
    try {
      const dataDir = path.join(process.cwd(), '../../../Du_An_HSK1/data');
      
      const lessonsData = JSON.parse(fs.readFileSync(path.join(dataDir, isEnglish ? `${levelStr}-lessons.json` : `hsk${levelNum}-lessons.json`), 'utf-8'));
      const vocabData = JSON.parse(fs.readFileSync(path.join(dataDir, isEnglish ? `${levelStr}-vocab.json` : `hsk${levelNum}-vocab.json`), 'utf-8'));
      const grammarData = JSON.parse(fs.readFileSync(path.join(dataDir, isEnglish ? `${levelStr}-grammar.json` : `hsk${levelNum}-grammar.json`), 'utf-8'));
      
      const vocabMap = new Map();
      vocabData.forEach((v: any) => { if(v.hanzi || v.word) vocabMap.set(v.hanzi || v.word, v); });
      
      const grammarMap = new Map();
      grammarData.forEach((g: any) => { if(g.id) grammarMap.set(g.id, g); });

      // Build lessons structure exactly as UI expects
      const formattedLessons = lessonsData.filter((l: any) => l.id > 0).map((l: any) => {
        const vocabKeys = l.vocab_hanzi || l.vocab_words || [];
        return {
          id: `${isEnglish ? levelStr : 'hsk' + levelNum}-${l.id}`,
          title: l.title,
          theme: l.theme || (isEnglish ? `CHỦ ĐỀ ${levelStr.toUpperCase()}` : `CHỦ ĐỀ HSK ${levelNum}`),
          description: l.desc || "",
          vocab: vocabKeys.map((hz: string) => vocabMap.get(hz)).filter(Boolean),
          grammar: l.grammar_ids ? l.grammar_ids.map((gid: any) => grammarMap.get(gid)).filter(Boolean) : [],
          dialogues: l.dialogues || []
        };
      });

      return {
        programName: isEnglish ? `Tiếng Anh - ${levelStr.replace('en-', '').toUpperCase()}` : `HSK ${levelNum} - Cấp độ Tiền Trung Cấp`,
        lessons: formattedLessons
      };
    } catch (err) {
      console.warn("Failed to load HSK 2 from old data:", err);
    }
  }

  return {
    programName: "HSK 1 - Cấp độ Cơ bản",
    lessons: [
      {
        id: "intro",
        title: "Bài Mở Đầu: Làm quen hệ thống ngữ âm",
        theme: "CHUYÊN ĐỀ MỞ ĐẦU: NGỮ ÂM",
        description: "Hệ thống hóa 21 thanh mẫu, 2 phụ âm bán nguyên âm, 36 vận mẫu và 4 thanh điệu.",
        vocab: [
          { id: 1, hanzi: "mā", pinyin: "mā (Thanh 1)", meaning: "Mẹ", type: "Noun" },
          { id: 2, hanzi: "má", pinyin: "má (Thanh 2)", meaning: "Tê (cảm giác)", type: "Adjective" },
          { id: 3, hanzi: "mǎ", pinyin: "mǎ (Thanh 3)", meaning: "Con ngựa", type: "Noun" },
          { id: 4, hanzi: "mà", pinyin: "mà (Thanh 4)", meaning: "Mắng chửi", type: "Verb" },
          { id: 5, hanzi: "ma", pinyin: "ma (Khinh thanh)", meaning: "Trợ từ nghi vấn", type: "Particle" },
        ]
      },
      {
        id: "1",
        title: "Bài 1: Xin chào! Bạn tên là gì?",
        theme: "CHỦ ĐỀ 1: CHÀO HỎI & LÀM QUEN",
        description: "Học cách chào hỏi cơ bản và hỏi tên người khác.",
        vocab: [
          { id: 10, hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào", type: "Phrase" },
          { id: 11, hanzi: "叫", pinyin: "jiào", meaning: "Gọi là, tên là", type: "Verb" },
          { id: 12, hanzi: "什么", pinyin: "shén me", meaning: "Cái gì", type: "Pronoun" },
          { id: 13, hanzi: "名字", pinyin: "míng zi", meaning: "Tên", type: "Noun" },
        ]
      },
      {
        id: "2",
        title: "Bài 2: Bạn là người nước nào?",
        theme: "CHỦ ĐỀ 1: CHÀO HỎI & LÀM QUEN",
        description: "Học cách hỏi và trả lời về quốc tịch.",
        vocab: []
      }
    ]
  };
}

export default async function DashboardPage({ searchParams }: { searchParams: { level?: string } }) {
  const level = searchParams.level || 'hsk1';
  const data = await getLessonsData(level);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <CurriculumTab programName={data.programName} lessons={data.lessons} />
    </div>
  );
}
