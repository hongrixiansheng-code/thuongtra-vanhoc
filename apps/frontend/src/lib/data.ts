import prisma from '@/lib/prisma';

// =====================================================
// Lấy chương trình theo code
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
export async function getAllVocabData(programCode: string, completedLessonIds?: string[]) {
  try {
    const program = await getProgramByCode(programCode);
    if (!program) return [];

    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'THEORY',
        lesson: {
          programId: program.id,
          ...(completedLessonIds && completedLessonIds.length > 0
            ? { id: { in: completedLessonIds } }
            : {})
        }
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
// Đoạn văn luyện nghe/đọc (CHƯA có nguồn dữ liệu trong DB)
// =====================================================
export async function getAllPassagesData(programCode: string) {
  return [];
}

// =====================================================
// Ngữ pháp
// =====================================================
export async function getAllGrammarData(programCode: string, completedLessonIds?: string[]) {
  try {
    const program = await getProgramByCode(programCode);
    if (!program) return [];

    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'GRAMMAR',
        lesson: {
          programId: program.id,
          ...(completedLessonIds && completedLessonIds.length > 0
            ? { id: { in: completedLessonIds } }
            : {})
        }
      },
      include: {
        lesson: { select: { title: true, orderIndex: true } }
      },
      orderBy: { lesson: { orderIndex: 'asc' } }
    });

    const results: any[] = [];
    contents.forEach((c: any) => {
      try {
        const g = JSON.parse(c.content);
        results.push({
          ...g,
          _lessonId: c.lessonId,
          _lessonTitle: c.lesson?.title || '',
          _lessonOrderIndex: c.lesson?.orderIndex || 0,
        });
      } catch {}
    });
    return results;
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
          where: { orderIndex: { not: 9999 } },
          include: { contents: true },
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!program || program.lessons.length === 0) return null;

    const mappedLessons = program.lessons.map((l: any) => ({
      id: l.id,
      title: l.title,
      theme: l.theme || 'Bài học',
      description: '',
      isPremium: l.isPremium,
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
        .filter(Boolean),
      exercises: l.contents
        .filter((c: any) => c.contentType === 'EXERCISE')
        .map((c: any) => { try { return JSON.parse(c.content); } catch { return null; } })
        .filter(Boolean),
      reading: l.contents
        .filter((c: any) => c.contentType === 'READING')
        .map((c: any) => { try { return JSON.parse(c.content); } catch { return null; } })
        .filter(Boolean),
      listening: l.contents
        .filter((c: any) => c.contentType === 'LISTENING')
        .map((c: any) => { try { return JSON.parse(c.content); } catch { return null; } })
        .filter(Boolean),
      writing: l.contents
        .filter((c: any) => c.contentType === 'WRITING')
        .map((c: any) => { try { return JSON.parse(c.content); } catch { return null; } })
        .filter(Boolean),
      speaking: l.contents
        .filter((c: any) => c.contentType === 'SPEAKING')
        .map((c: any) => { try { return JSON.parse(c.content); } catch { return null; } })
        .filter(Boolean),
    }));

    return { programName: program.name, programCode: program.code, lessons: mappedLessons };
  } catch (e) {
    console.warn('DB fetch failed:', e);
    return null;
  }
}

// =====================================================
// Hội thoại — lấy từng câu (dùng cho listening/reading)
// =====================================================
export async function getDialogueSentences(programCode: string) {
  try {
    const program = await getProgramByCode(programCode);
    if (!program) return [];

    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'DIALOGUE',
        lesson: { programId: program.id }
      }
    });

    const sentences: any[] = [];
    contents.forEach((c) => {
      try {
        const dialogue = JSON.parse(c.content);
        const dialogueTitle = dialogue.title || 'Hội thoại';
        if (dialogue.lines && Array.isArray(dialogue.lines)) {
          dialogue.lines.forEach((line: any) => {
            const text = line.zh || line.en;
            if (text) {
              sentences.push({
                zh: text,
                py: line.py || '',
                vi: line.vi || '',
                title: dialogueTitle
              });
            }
          });
        }
      } catch {}
    });

    return sentences; // ← fix: hàm cũ thiếu dòng này
  } catch (e) {
    console.warn('DB fetch failed:', e);
    return [];
  }
}

// =====================================================
// Hội thoại — lấy theo bài đã hoàn thành
// =====================================================
export async function getAllDialogueData(programCode: string, completedLessonIds?: string[]) {
  try {
    const program = await getProgramByCode(programCode);
    if (!program) return [];

    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'DIALOGUE',
        lesson: {
          programId: program.id,
          ...(completedLessonIds && completedLessonIds.length > 0
            ? { id: { in: completedLessonIds } }
            : {})
        }
      },
      include: {
        lesson: { select: { id: true, title: true, orderIndex: true } }
      },
      orderBy: { lesson: { orderIndex: 'asc' } }
    });

    return contents.map(c => {
      try {
        const data = JSON.parse(c.content);
        return {
          ...data,
          lessonId: c.lesson.id,
          lessonTitle: c.lesson.title,
          lessonOrderIndex: c.lesson.orderIndex
        };
      } catch { return null; }
    }).filter(Boolean);
  } catch (e) {
    console.warn('DB fetch failed:', e);
    return [];
  }
}
