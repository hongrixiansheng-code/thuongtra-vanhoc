export const dynamic = 'force-dynamic';
import { ReadingTab } from "@/components/legacy/ReadingTab";
import { getAllVocabData, getAllPassagesData, getDialogueSentences } from "@/lib/data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "database";
import Link from "next/link";

async function getCompletedLessonIds(email?: string | null): Promise<string[]> {
  if (!email) return [];
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { email },
    include: { progress: { where: { completed: true }, select: { lessonId: true } } }
  });
  return user?.progress.map(p => p.lessonId) || [];
}

export default async function ReadingPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

  const session = await getServerSession(authOptions);
  const completedLessonIds = await getCompletedLessonIds(session?.user?.email);

  const vocabData = completedLessonIds.length > 0
    ? await getAllVocabData(level, completedLessonIds)
    : [];
  const passagesData = await getAllPassagesData(level) || [];
  const dialogueSentences = await getDialogueSentences(level) || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {completedLessonIds.length === 0 ? (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">📖</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Chưa có nội dung để luyện đọc</h2>
          <p className="text-slate-500 mb-6">Hãy hoàn thành ít nhất 1 bài học để mở khóa!</p>
          <Link href="/dashboard" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            Bắt đầu học ngay →
          </Link>
        </div>
      ) : (
        <ReadingTab key={level} vocabData={vocabData} passagesData={passagesData} dialogueSentences={dialogueSentences} levelId={level} />
      )}
    </div>
  );
}
