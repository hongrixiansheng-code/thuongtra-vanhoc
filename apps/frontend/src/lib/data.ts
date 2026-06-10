import { PrismaClient } from 'database';

const prisma = new PrismaClient();

const PROGRAM_MAPPING: Record<string, string> = {
  'hsk1': 'HSK 1 - Cấp độ Cơ bản',
  'hsk2': 'HSK 2 - Cấp độ Sơ cấp',
  'en-starters': 'Starters'
};

export async function getAllVocabData(levelStr: string) {
  try {
    const programName = PROGRAM_MAPPING[levelStr];
    if (!programName) return [];

    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'THEORY',
        lesson: {
          program: {
            name: programName
          }
        }
      }
    });

    const uniqueVocabMap = new Map();
    contents.forEach((c) => {
      try {
        const w = JSON.parse(c.content);
        const key = w.hanzi || w.word;
        if (key && !uniqueVocabMap.has(key)) {
          uniqueVocabMap.set(key, w);
        }
      } catch (e) {
        // ignore JSON parse error
      }
    });

    const uniqueVocab = Array.from(uniqueVocabMap.values());

    return uniqueVocab.map((w: any, index: number) => ({
      ...w,
      _uuid: w.id ? w.id.toString() : `vocab-${index}`
    }));
  } catch (e) {
    console.warn("DB fetch failed! Error details:", e);
    return [];
  }
}

export async function getAllGrammarData(levelStr: string) {
  try {
    const programName = PROGRAM_MAPPING[levelStr];
    if (!programName) return [];

    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'GRAMMAR',
        lesson: {
          program: {
            name: programName
          }
        }
      }
    });

    const uniqueMap = new Map();
    contents.forEach((c) => {
      try {
        const g = JSON.parse(c.content);
        if (g.id && !uniqueMap.has(g.id)) {
          uniqueMap.set(g.id, g);
        }
      } catch (e) {
        // ignore
      }
    });

    return Array.from(uniqueMap.values());
  } catch (e) {
    console.warn("DB fetch failed! Error details:", e);
    return [];
  }
}

export async function getLessonsData(levelStr: string) {
  try {
    const programName = PROGRAM_MAPPING[levelStr];
    if (!programName) return null;

    const program = await prisma.program.findFirst({
      where: {
        name: programName,
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
           try { return JSON.parse(c.content); } catch { return null; }
        }).filter(Boolean),
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
  return null;
}

export async function getAllPassagesData(levelStr: string) {
  try {
    const programName = PROGRAM_MAPPING[levelStr];
    if (!programName) return [];

    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'DIALOGUE',
        lesson: {
          program: {
            name: programName
          }
        }
      }
    });

    const uniqueMap = new Map();
    contents.forEach((c) => {
      try {
        const p = JSON.parse(c.content);
        if (p.id && !uniqueMap.has(p.id)) {
          uniqueMap.set(p.id, p);
        }
      } catch (e) {
        // ignore
      }
    });

    return Array.from(uniqueMap.values());
  } catch (e) {
    console.warn("DB fetch failed! Error details:", e);
    return [];
  }
}
