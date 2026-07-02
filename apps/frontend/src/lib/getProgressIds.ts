import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { syncExpiredSubscription, isSubscriptionActive } from '@/lib/subscription';
import { isRevoked } from '@/lib/sessionGuard';

// Chương trình mặc định khi user không truyền ?level= — ưu tiên program của lớp đang active,
// sau đó program học gần nhất (lastReviewedAt), cuối cùng mới fallback về hsk1. Tránh việc học sinh
// lớp en-ket/... bị đẩy nhầm vào HSK1 (và dính programLocked) chỉ vì thiếu query param.
export async function getDefaultProgramCode(): Promise<string> {
  const FALLBACK = 'hsk1';
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return FALLBACK;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      enrollments: {
        where: { class: { isActive: true } },
        select: { class: { select: { program: { select: { code: true } } } } }
      },
      progress: {
        where: { completed: true },
        orderBy: { lastReviewedAt: 'desc' },
        take: 1,
        select: { lesson: { select: { program: { select: { code: true } } } } }
      }
    }
  });
  if (!user) return FALLBACK;

  if (user.enrollments.length > 0) {
    return user.enrollments[0].class.program.code;
  }
  if (user.progress.length > 0) {
    return user.progress[0].lesson.program.code;
  }
  return FALLBACK;
}

export async function getCompletedLessonIds(programCode?: string): Promise<{
  completedLessonIds: string[];
  isAdmin: boolean;
  isPremiumUser: boolean;
  allLessonIds?: string[];
  enrolledProgramCodes?: string[];
  programLocked?: boolean;
  scoreByLessonId?: Record<string, number>;
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
        select: { lessonId: true, score: true }
      },
      enrollments: {
        where: { class: { isActive: true } },
        select: { class: { select: { program: { select: { code: true } } } } }
      }
    }
  });

  if (!user) return { completedLessonIds: [], isAdmin: false, isPremiumUser: false };

  if (isRevoked(user, (session.user as any).iat)) {
    redirect('/login');
  }

  const syncedUser = await syncExpiredSubscription(user);

  const isAdmin = user.role === 'ADMIN';
  const isTeacher = user.role === 'TEACHER';
  const bypassLock = isAdmin || isTeacher; // Giáo viên cũng được mở hết bài học như admin, để xem trước nội dung mọi chương trình
  const isPremiumUser = bypassLock || isSubscriptionActive(syncedUser);
  const completedLessonIds = user.progress.map(p => p.lessonId);
  const scoreByLessonId = Object.fromEntries(user.progress.map(p => [p.lessonId, p.score]));

  // Admin/Teacher nhận toàn bộ lessonId của program (bypass mọi khóa)
  if (bypassLock) {
    const allLessons = await prisma.lesson.findMany({
      where: programCode
        ? { program: { code: programCode } }
        : {},
      select: { id: true }
    });
    return {
      completedLessonIds: allLessons.map(l => l.id),
      isAdmin,
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
      programLocked: false,
      scoreByLessonId
    };
  }

  return { completedLessonIds, isAdmin: false, isPremiumUser, scoreByLessonId };
}
