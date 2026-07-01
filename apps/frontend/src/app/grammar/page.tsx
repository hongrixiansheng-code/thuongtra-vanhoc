export const dynamic = 'force-dynamic';
import GrammarClient from "@/components/GrammarClient";
import { getAllGrammarData } from "@/lib/data";
import { getCompletedLessonIds } from '@/lib/getProgressIds';
import ProgramLocked from "@/components/ProgramLocked";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default async function GrammarPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

  const { completedLessonIds, programLocked } = await getCompletedLessonIds(level);

  const grammarData = completedLessonIds.length > 0
    ? await getAllGrammarData(level, completedLessonIds)
    : [];

  return (
    <div className="min-h-screen pb-20">
      {programLocked ? (
        <ProgramLocked />
      ) : completedLessonIds.length === 0 ? (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-primary-500 dark:text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Chưa có ngữ pháp để ôn tập
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            Hãy hoàn thành ít nhất 1 bài học để mở khóa phần ngữ pháp!
          </p>
          <Link href="/dashboard"
            className="inline-block px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold transition-colors">
            Bắt đầu học ngay →
          </Link>
        </div>
      ) : (
        <GrammarClient grammarData={grammarData} level={level} />
      )}
    </div>
  );
}
