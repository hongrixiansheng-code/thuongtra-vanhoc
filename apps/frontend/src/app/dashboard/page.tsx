export const dynamic = 'force-dynamic';

import { getLessonsData } from "@/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "database";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage(props: any) {
  const searchParams = await props.searchParams;
  const levelStr = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

  const data = await getLessonsData(levelStr);
  const session = await getServerSession(authOptions);

  // Lấy progress của user
  let progressMap: Record<string, boolean> = {};
  if (session?.user?.email) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        progress: {
          select: { lessonId: true, completed: true, score: true }
        }
      }
    });
    if (user) {
      user.progress.forEach(p => {
        progressMap[p.lessonId] = p.completed;
      });
    }
  }

  let isPremiumUser = false;
  let isAdmin = false;
  if (session?.user?.email) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user && user.role === "ADMIN") {
      isAdmin = true;
      isPremiumUser = true;
    } else if (user && user.subscriptionStatus === "PREMIUM") {
      isPremiumUser = true;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {data ? (
        <DashboardClient
          lessons={data.lessons}
          programName={data.programName}
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
