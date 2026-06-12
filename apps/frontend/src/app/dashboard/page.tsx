export const dynamic = 'force-dynamic';

import { CurriculumTab } from "@/components/legacy/CurriculumTab";
import { getLessonsData } from "@/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "database";

export default async function DashboardPage(props: any) {
  const searchParams = await props.searchParams;
  const levelStr = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  
  const data = await getLessonsData(levelStr);

  const session = await getServerSession(authOptions);
  let isPremiumUser = false;
  if (session?.user?.email) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (user && (user.role === "ADMIN" || user.subscriptionStatus === "PREMIUM")) {
      isPremiumUser = true;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {data ? (
        <CurriculumTab key={levelStr} lessons={data.lessons} programName={data.programName} isPremiumUser={isPremiumUser} />
      ) : (
        <div className="p-8 text-center text-gray-500">Đang cập nhật dữ liệu khóa học...</div>
      )}
    </div>
  );
}
