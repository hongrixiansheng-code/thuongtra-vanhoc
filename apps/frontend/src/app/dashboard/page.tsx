import prisma from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import { getLessonsData } from "@/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "database";
import DashboardClient from "@/components/DashboardClient";
import ProgramLocked from "@/components/ProgramLocked";
import { syncExpiredSubscription, isSubscriptionActive } from "@/lib/subscription";

export default async function DashboardPage(props: any) {
  const searchParams = await props.searchParams;
  const levelStr = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  const data = await getLessonsData(levelStr);
  const session = await getServerSession(authOptions);

  let progressMap: Record<string, boolean> = {};
  let isPremiumUser = false;
  let isAdmin = false;
  let programLocked = false;

  if (session?.user?.email) {

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        progress: {
          select: { lessonId: true, completed: true, score: true }
        },
        enrollments: {
          where: { class: { isActive: true } },
          select: { class: { select: { program: { select: { code: true } } } } }
        }
      }
    });

    if (user) {
      user.progress.forEach(p => {
        progressMap[p.lessonId] = p.completed;
      });

      const syncedUser = await syncExpiredSubscription(user);

      if (user.role === "ADMIN") {
        isAdmin = true;
        isPremiumUser = true;
      } else if (isSubscriptionActive(syncedUser)) {
        isPremiumUser = true;
      }

      const enrolledProgramCodes = user.enrollments.map((e: any) => e.class.program.code);
      const isEnrolledInThisProgram = enrolledProgramCodes.includes(levelStr);
      if (!isAdmin && enrolledProgramCodes.length > 0 && !isEnrolledInThisProgram) {
        programLocked = true;
      } else if (!isAdmin && isEnrolledInThisProgram) {
        // Học sinh trong lớp được hưởng quyền Premium cho đúng program của lớp (mở bài isPremium),
        // nhưng vẫn mở dần theo progressMap thật — không bypass điều kiện điểm số.
        isPremiumUser = true;
      }
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {programLocked ? (
        <ProgramLocked />
      ) : data ? (
        <DashboardClient
          lessons={data.lessons}
          programName={data.programName}
          programCode={data.programCode}
          isPremiumUser={isPremiumUser}
          isAdmin={isAdmin}
          progressMap={progressMap}
        />
      ) : (
        <div className="p-8 text-center text-gray-500">Không tìm thấy chương trình học.</div>
      )}
    </div>
  );
}
