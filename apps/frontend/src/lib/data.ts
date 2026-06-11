import { PrismaClient } from 'database';

const prisma = new PrismaClient();

// =====================================================
// Lấy chương trình theo code (không cần hardcode mapping)
// =====================================================
async function getProgramByCode(code: string) {
  return prisma.program.findUnique({ where: { code } });
}

// =====================================================
// Lấy tất cả Subject + Program để Navigation đọc động
// =====================================================
export async function getAllSubjectsWithPrograms() {
  try {
    return await prisma.subject.findMany({
      include: {
        programs: {
          where: { isAvailable: true },
          orderBy: { level: 'asc' }
        }
      },
      orderBy: { name: 'asc' }
    });
  } catch (e) {
    console.warn('DB fetch failed:', e);
    return [];
  }
}

// =====================================================
// Từ vựng
// =====================================================
export async function getAllVocabData(programCode: string) {
  try {
    const program = await getProgramByCode(programCode);
    if (!program) return [];

    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'THEORY',
        lesson: { programId: program.id }
      }
    });

    const uniqueVocabMap = new Map();
    contents.forEach((c) => {
      try {
        const w = JSON.parse(c.content);
        const key = w.hanzi || w.word;
        if (key && !uniqueVocabMap.has(key)) uniqueVocabMap.set(key, w);
      } catch {}
    });

    return Array.from(uniqueVocabMap.values()).map((w: any, i: number) => ({
      ...w,
      _uuid: w.id ? w.id.toString() : `vocab-${i}`
    }));
  } catch (e) {
    console.warn('DB fetch failed:', e);
    return [];
  }
}

// =====================================================
// Ngữ pháp
// =====================================================
export async function getAllGrammarData(programCode: string) {
  try {
    const program = await getProgramByCode(programCode);
    if (!program) return [];

    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'GRAMMAR',
        lesson: { programId: program.id }
      }
    });

    const uniqueMap = new Map();
    contents.forEach((c) => {
      try {
        const g = JSON.parse(c.content);
        if (g.id && !uniqueMap.has(g.id)) uniqueMap.set(g.id, g);
      } catch {}
    });

    return Array.from(uniqueMap.values());
  } catch (e) {
    console.warn('DB fetch failed:', e);
    return [];
  }
}

// =====================================================
// Bài học (dùng theme lưu trong DB, không hardcode)
// =====================================================
export async function getLessonsData(programCode: string) {
  try {
    const program = await prisma.program.findUnique({
      where: { code: programCode },
      include: {
        lessons: {
          where: { orderIndex: { not: 9999 } }, // bỏ bài kho từ vựng
          include: { contents: true },
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!program || program.lessons.length === 0) return null;

    const mappedLessons = program.lessons.map((l: any) => ({
      id: l.id,
      title: l.title,
      theme: l.theme || 'Bài học', // dùng theme từ DB, fallback nếu chưa có
      description: '',
      vocab: l.contents
        .filter((c: any) => c.contentType === 'THEORY')
        .map((c: any) => { try { return JSON.parse(c.content); } catch { return null; } })
        .filter(Boolean),
      grammar: l.contents
        .filter((c: any) => c.contentType === 'GRAMMAR')
        .map((c: any) => { try { return JSON.parse(c.content); } catch { return null; } })
        .filter(Boolean),
      dialogues: l.contents
        .filter((c: any) => c.contentType === 'DIALOGUE')
        .map((c: any) => { try { return JSON.parse(c.content); } catch { return null; } })
        .filter(Boolean)
    }));

    return { programName: program.name, programCode: program.code, lessons: mappedLessons };
  } catch (e) {
    console.warn('DB fetch failed:', e);
    return null;
  }
}

// =====================================================
// Hội thoại / Đoạn văn
// =====================================================
export async function getAllPassagesData(programCode: string) {
  try {
    const program = await getProgramByCode(programCode);
    if (!program) return [];

    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'DIALOGUE',
        lesson: { programId: program.id }
      }
    });

    const uniqueMap = new Map();
    contents.forEach((c) => {
      try {
        const p = JSON.parse(c.content);
        if (p.id && !uniqueMap.has(p.id)) uniqueMap.set(p.id, p);
      } catch {}
    });

    return Array.from(uniqueMap.values());
  } catch (e) {
    console.warn('DB fetch failed:', e);
    return [];
  }
}
