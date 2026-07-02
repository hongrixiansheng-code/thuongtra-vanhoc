export const dynamic = 'force-dynamic';
import { getAllDialogueData } from "@/lib/data";
import { getCompletedLessonIds, getDefaultProgramCode } from '@/lib/getProgressIds';
import DialogueClient from "@/components/DialogueClient";
import ProgramLocked from "@/components/ProgramLocked";
import { MessagesSquare } from "lucide-react";

export default async function DialoguePage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : await getDefaultProgramCode();

  const { completedLessonIds, programLocked } = await getCompletedLessonIds(level);

  const dialogueData = completedLessonIds.length > 0
    ? await getAllDialogueData(level, completedLessonIds)
    : [];

  return (
    <div className="min-h-screen pb-20">
      {programLocked ? (
        <ProgramLocked />
      ) : completedLessonIds.length === 0 ? (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
            <MessagesSquare className="w-8 h-8 text-primary-500 dark:text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Chưa có hội thoại</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">Hoàn thành ít nhất 1 bài học để mở khóa hội thoại!</p>
          <a href="/dashboard" className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-colors">
            Bắt đầu học ngay →
          </a>
        </div>
      ) : (
        <DialogueClient key={level} dialogueData={dialogueData} level={level} />
      )}
    </div>
  );
}
