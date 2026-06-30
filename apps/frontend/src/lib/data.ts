import prisma from '@/lib/prisma';
import { generateMiniTestQuestions, generateFinalTestQuestions, type Question } from '@/lib/quizGenerator';

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
// Bài tập đúng định dạng đề thi (contentType: EXERCISE)
// title của exercise quyết định skillTag: "Reading ..." / "Listening ..." / "Writing ..." / "Mock ..."
// =====================================================
export async function getAllPassagesData(programCode: string, completedLessonIds?: string[]) {
  try {
    const program = await getProgramByCode(programCode);
    if (!program) return [];

    const contents = await prisma.lessonContent.findMany({
      where: {
        contentType: 'EXERCISE',
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
      orderBy: [{ lesson: { orderIndex: 'asc' } }, { createdAt: 'asc' }]
    });

    const results: any[] = [];
    contents.forEach((c: any) => {
      try {
        const ex = JSON.parse(c.content);
        const titleLower = (ex.title || '').toLowerCase();
        let skillTag: 'reading' | 'listening' | 'writing' | 'mock' = 'reading';
        if (titleLower.includes('listening')) skillTag = 'listening';
        else if (titleLower.includes('writing')) skillTag = 'writing';
        else if (titleLower.includes('mock')) skillTag = 'mock';

        results.push({
          ...ex,
          skillTag,
          _lessonId: c.lessonId,
          _lessonTitle: c.lesson?.title || '',
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
      orderBy: [{ lesson: { orderIndex: 'asc' } }, { createdAt: 'asc' }]
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
          include: { contents: { orderBy: { createdAt: 'asc' } } },
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
      orderBy: [{ lesson: { orderIndex: 'asc' } }, { createdAt: 'asc' }]
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

// =====================================================
// Trình chiếu (Teacher) — gộp content của 1 lesson thành
// 1 mảng slide theo thứ tự cố định, mỗi item 1 slide
// =====================================================

// Shape riêng của Khai Môn (xem KhaiMonClient.tsx) — THEORY ở đây KHÔNG phải
// vocab item (hanzi/pinyin/meaning) mà là {title, sections}.
interface KhaiMonSoundTableRow {
  tone: string;
  pinyin: string;
  hanzi: string;
  meaning: string;
}
interface KhaiMonSection {
  type: "text" | "sound_table" | "note" | "comparison";
  body?: string;
  label?: string;
  rows?: KhaiMonSoundTableRow[];
  vietnamese?: string;
  difference?: string;
}
interface KhaiMonWord {
  pinyin: string;
  hanzi: string;
  meaning: string;
}
interface KhaiMonWordGroup {
  sound: string;
  label: string;
  words: KhaiMonWord[];
}

export type PresentationSlide =
  | { type: 'vocab'; data: any[] }
  | { type: 'quiz'; data: Question[] }
  | { type: 'grammar' | 'dialogue' | 'reading' | 'listening' | 'writing' | 'speaking'; data: any }
  | { type: 'khaimon'; data: { sections?: KhaiMonSection[]; group?: KhaiMonWordGroup; instruction?: string } };

// Mỗi section "text" mở đầu 1 chủ đề mới (vd: âm A, âm O...) — giống thuật
// toán clusterTheorySections trong KhaiMonClient.tsx.
function clusterKhaiMonSections(sections: KhaiMonSection[]): KhaiMonSection[][] {
  const clusters: KhaiMonSection[][] = [];
  for (const section of sections) {
    if (section.type === "text" || clusters.length === 0) {
      clusters.push([section]);
    } else {
      clusters[clusters.length - 1].push(section);
    }
  }
  return clusters;
}

const SINGLE_ITEM_SLIDE_TYPES: Array<{ contentType: string; type: 'grammar' | 'dialogue' | 'reading' | 'listening' | 'writing' | 'speaking' }> = [
  { contentType: 'GRAMMAR', type: 'grammar' },
  { contentType: 'DIALOGUE', type: 'dialogue' },
  { contentType: 'READING', type: 'reading' },
  { contentType: 'LISTENING', type: 'listening' },
  { contentType: 'WRITING', type: 'writing' },
  { contentType: 'SPEAKING', type: 'speaking' },
];

export async function getPresentationSlides(lessonId: string): Promise<{ lessonTitle: string; programId: string; slides: PresentationSlide[] } | null> {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        contents: { orderBy: { createdAt: 'asc' } },
        program: { select: { code: true } }
      }
    });
    if (!lesson) return null;

    // Khai Môn dùng schema riêng (THEORY = {sections}, EXERCISE = {groups}) — không
    // phải vocab/quiz chuẩn nên tách hẳn khỏi pipeline chung dưới đây.
    if (lesson.program.code === 'khai-mon') {
      const theory = lesson.contents.find((c: any) => c.contentType === 'THEORY');
      const exercise = lesson.contents.find((c: any) => c.contentType === 'EXERCISE');
      const theoryData = theory ? (() => { try { return JSON.parse(theory.content); } catch { return null; } })() : null;
      const exerciseData = exercise ? (() => { try { return JSON.parse(exercise.content); } catch { return null; } })() : null;

      const clusters = theoryData?.sections ? clusterKhaiMonSections(theoryData.sections) : [];
      const groups: KhaiMonWordGroup[] = exerciseData?.groups ?? [];
      const instruction: string | undefined = exerciseData?.instruction;
      const slides: PresentationSlide[] = [];

      if (clusters.length > 0 && clusters.length === groups.length) {
        clusters.forEach((sections, i) => slides.push({ type: 'khaimon', data: { sections, group: groups[i], instruction } }));
      } else {
        clusters.forEach((sections) => slides.push({ type: 'khaimon', data: { sections } }));
        groups.forEach((group) => slides.push({ type: 'khaimon', data: { group, instruction } }));
      }

      return { lessonTitle: lesson.title, programId: lesson.programId, slides };
    }

    const skipAutoTest = lesson.program.code === 'en-epf';
    const slides: PresentationSlide[] = [];

    // Vocab: nhóm theo batch 5 từ/slide, giống LessonStepFlow.tsx (vocabItems.slice(i, i+5)),
    // chèn 1 slide quiz sau mỗi 2 batch — đúng quy tắc mini-test của luồng học sinh.
    const vocabItems = lesson.contents
      .filter((c: any) => c.contentType === 'THEORY')
      .map((c: any) => { try { return JSON.parse(c.content); } catch { return null; } })
      .filter(Boolean);
    const isZH = !!vocabItems?.[0]?.hanzi && !vocabItems?.[0]?.word;

    let batchCount = 0;
    for (let i = 0; i < vocabItems.length; i += 5) {
      slides.push({ type: 'vocab', data: vocabItems.slice(i, i + 5) });
      batchCount++;

      if (batchCount % 2 === 0 && !skipAutoTest) {
        const startIdx = Math.max(0, i - 4);
        const recentVocab = vocabItems.slice(startIdx, i + 5);
        const questions = generateMiniTestQuestions(recentVocab, vocabItems);
        if (questions.length > 0) {
          slides.push({ type: 'quiz', data: questions });
        }
      }
    }

    const grammarItems = lesson.contents
      .filter((c: any) => c.contentType === 'GRAMMAR')
      .map((c: any) => { try { return JSON.parse(c.content); } catch { return null; } })
      .filter(Boolean);

    for (const { contentType, type } of SINGLE_ITEM_SLIDE_TYPES) {
      lesson.contents
        .filter((c: any) => c.contentType === contentType)
        .forEach((c: any) => {
          try {
            const data = JSON.parse(c.content);
            slides.push({ type, data });
          } catch {}
        });
    }

    if (vocabItems.length > 0 && !skipAutoTest) {
      const finalExercises = generateFinalTestQuestions(vocabItems, grammarItems, isZH);
      if (finalExercises.length > 0) {
        slides.push({ type: 'quiz', data: finalExercises });
      }
    }

    return { lessonTitle: lesson.title, programId: lesson.programId, slides };
  } catch (e) {
    console.warn('DB fetch failed:', e);
    return null;
  }
}
