import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export type ActiveAssignment = {
  id: string;
  lessonId: string;
  lessonTitle: string;
  className: string;
  dueDate: Date | null;
  note: string | null;
};

/** Bài tập giáo viên giao cho lớp mà user đang học, cho đúng chương trình, loại trừ bài đã hoàn thành. */
export async function getActiveAssignmentsForUser(programCode: string, completedLessonIds: string[]): Promise<ActiveAssignment[]> {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId) return [];

  const where: any = {
    class: {
      isActive: true,
      program: { code: programCode },
      enrollments: { some: { studentId: userId } }
    }
  };
  if (completedLessonIds.length > 0) {
    where.lessonId = { notIn: completedLessonIds };
  }

  const assignments = await prisma.assignment.findMany({
    where,
    include: {
      lesson: { select: { id: true, title: true } },
      class: { select: { name: true } }
    },
    orderBy: { dueDate: 'asc' }
  });

  return assignments.map(a => ({
    id: a.id,
    lessonId: a.lessonId,
    lessonTitle: a.lesson.title,
    className: a.class.name,
    dueDate: a.dueDate,
    note: a.note
  }));
}
