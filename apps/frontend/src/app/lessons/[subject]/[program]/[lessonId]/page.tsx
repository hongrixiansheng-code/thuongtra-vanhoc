import { prisma } from 'database';
import LessonStepFlow from '@/components/LessonStepFlow';

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

  const parse = (content: string) => {
    try { return JSON.parse(content); } catch { return {}; }
  };

  const vocabItems    = lesson.contents.filter(c => c.contentType === 'THEORY').map(c => parse(c.content));
  const grammarItems  = lesson.contents.filter(c => c.contentType === 'GRAMMAR').map(c => parse(c.content));
  const dialogueItems = lesson.contents.filter(c => c.contentType === 'DIALOGUE').map(c => parse(c.content));
  const exerciseItems = lesson.contents.filter(c => c.contentType === 'EXERCISE').map(c => parse(c.content));

  return (
    <div className="min-h-screen bg-gray-50">
      <LessonStepFlow
        vocabItems={vocabItems}
        grammarItems={grammarItems}
        dialogueItems={dialogueItems}
        exerciseItems={exerciseItems}
        lessonTitle={lesson.title}
        onComplete={undefined}
      />
    </div>
  );
}
