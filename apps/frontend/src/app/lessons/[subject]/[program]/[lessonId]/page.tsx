import { prisma } from 'database';
import LessonStepFlow from '@/components/LessonStepFlow';
import { getCompletedLessonIds } from '@/lib/getProgressIds';
import ProgramLocked from '@/components/ProgramLocked';

export const dynamic = 'force-dynamic';

export default async function LessonPage({
  params
}: {
  params: Promise<{ subject: string; program: string; lessonId: string }>
}) {
  const { lessonId } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      contents: { orderBy: { createdAt: 'asc' } },
      program: { include: { subject: true } }
    }
  });

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Không tìm thấy bài học.</p>
      </div>
    );
  }

  const { programLocked } = await getCompletedLessonIds(lesson.program.code);
  if (programLocked) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ProgramLocked />
      </div>
    );
  }

  const parse = (content: string) => {
    try { return JSON.parse(content); } catch { return {}; }
  };

  const vocabItems     = lesson.contents.filter((c: any) => c.contentType === 'THEORY').map((c: any) => parse(c.content));
  const grammarItems   = lesson.contents.filter((c: any) => c.contentType === 'GRAMMAR').map((c: any) => parse(c.content));
  const dialogueItems  = lesson.contents.filter((c: any) => c.contentType === 'DIALOGUE').map((c: any) => parse(c.content));
  const exerciseItems  = lesson.contents.filter((c: any) => c.contentType === 'EXERCISE').map((c: any) => parse(c.content));
  const readingItems   = lesson.contents.filter((c: any) => c.contentType === 'READING').map((c: any) => parse(c.content));
  const listeningItems = lesson.contents.filter((c: any) => c.contentType === 'LISTENING').map((c: any) => parse(c.content));
  const writingItems   = lesson.contents.filter((c: any) => c.contentType === 'WRITING').map((c: any) => parse(c.content));
  const speakingItems  = lesson.contents.filter((c: any) => c.contentType === 'SPEAKING').map((c: any) => parse(c.content));

  return (
    <div className="min-h-screen bg-gray-50">
      <LessonStepFlow
        vocabItems={vocabItems}
        grammarItems={grammarItems}
        dialogueItems={dialogueItems}
        exerciseItems={exerciseItems}
        readingItems={readingItems}
        listeningItems={listeningItems}
        writingItems={writingItems}
        speakingItems={speakingItems}
        lessonTitle={lesson.title}
        programCode={lesson.program.code}
        onComplete={undefined}
      />
    </div>
  );
}
