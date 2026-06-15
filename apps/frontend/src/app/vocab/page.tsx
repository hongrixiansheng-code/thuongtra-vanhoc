export const dynamic = 'force-dynamic';
import { VocabTab } from "@/components/legacy/VocabTab";
import { getAllVocabData } from "@/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "database";

export default async function VocabPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

  const session = await getServerSession(authOptions);
  let completedLessonIds: string[] = [];

  if (session?.user?.email) {
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
    if (user) completedLessonIds = user.progress.map(p => p.lessonId);
  }

  const vocabData = completedLessonIds.length > 0
    ? await getAllVocabData(level, completedLessonIds)
    : await getAllVocabData(level);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <VocabTab key={level} vocabData={vocabData || []} />
    </div>
  );
}
