import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { syncExpiredSubscription, isSubscriptionActive } from '@/lib/subscription';

export async function getCompletedLessonIds(programCode?: string): Promise<{
  completedLessonIds: string[];
  isAdmin: boolean;
  isPremiumUser: boolean;
  allLessonIds?: string[];
  enrolledProgramCodes?: string[];
  programLocked?: boolean;
}> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return { completedLessonIds: [], isAdmin: false, isPremiumUser: false };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      progress: {
        where: { completed: true },
        select: { lessonId: true }
      },
      enrollments: {
        where: { class: { isActive: true } },
        select: { class: { select: { program: { select: { code: true } } } } }
      }
    }
  });

  if (!user) return { completedLessonIds: [], isAdmin: false, isPremiumUser: false };

  const syncedUser = await syncExpiredSubscription(user);

  const isAdmin = user.role === 'ADMIN';
  const isPremiumUser = isAdmin || isSubscriptionActive(syncedUser);
  const completedLessonIds = user.progress.map(p => p.lessonId);

  // Admin nhận toàn bộ lessonId của program (bypass mọi khóa)
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
      isPremiumUser: true,
      allLessonIds: allLessons.map(l => l.id)
    };
  }

  const enrolledProgramCodes = [...new Set(user.enrollments.map(e => e.class.program.code))];

  // Học sinh thuộc lớp học: chỉ được dùng đúng (các) chương trình của lớp, khóa hoàn toàn chương trình khác
  if (enrolledProgramCodes.length > 0) {
    if (!programCode || !enrolledProgramCodes.includes(programCode)) {
      return {
        completedLessonIds: [],
        isAdmin: false,
        isPremiumUser,
        enrolledProgramCodes,
        programLocked: true
      };
    }

    // Được hưởng quyền Premium (mở Luyện tập, mở bài isPremium) nhưng dữ liệu vẫn mở dần theo bài đã hoàn thành,
    // không mở full toàn bộ chương trình ngay từ đầu.
    return {
      completedLessonIds,
      isAdmin: false,
      isPremiumUser: true,
      enrolledProgramCodes,
      programLocked: false
    };
  }

  return { completedLessonIds, isAdmin: false, isPremiumUser };
}
