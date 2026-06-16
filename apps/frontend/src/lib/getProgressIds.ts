import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from 'database';

export async function getCompletedLessonIds(programCode?: string): Promise<{
  completedLessonIds: string[];
  isAdmin: boolean;
  allLessonIds?: string[];
}> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { completedLessonIds: [], isAdmin: false };
  }

  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      progress: {
        where: { completed: true },
        select: { lessonId: true }
      }
    }
  });

  if (!user) return { completedLessonIds: [], isAdmin: false };

  const isAdmin = user.role === 'ADMIN';
  const completedLessonIds = user.progress.map(p => p.lessonId);

  // Admin lấy tất cả lessonId
  if (isAdmin) {
    const allLessons = await prisma.lesson.findMany({
      where: programCode
        ? { program: { code: programCode } }
        : {},
      select: { id: true }
    });
    return {
      completedLessonIds: allLessons.map(l => l.id),
      isAdmin: true,
      allLessonIds: allLessons.map(l => l.id)
    };
  }

  return { completedLessonIds, isAdmin: false };
}
