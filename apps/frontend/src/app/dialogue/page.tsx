export const dynamic = 'force-dynamic';
import { getAllDialogueData } from "@/lib/data";
import { getCompletedLessonIds } from '@/lib/getProgressIds';
import DialogueClient from "@/components/DialogueClient";

export default async function DialoguePage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

  const { completedLessonIds } = await getCompletedLessonIds(level);

  const dialogueData = completedLessonIds.length > 0
    ? await getAllDialogueData(level, completedLessonIds)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {completedLessonIds.length === 0 ? (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Chưa có hội thoại</h2>
          <p className="text-slate-500 mb-6">Hoàn thành ít nhất 1 bài học để mở khóa hội thoại!</p>
          <a href="/dashboard" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition">
            Bắt đầu học ngay →
          </a>
        </div>
      ) : (
        <DialogueClient dialogueData={dialogueData} level={level} />
      )}
    </div>
  );
}
