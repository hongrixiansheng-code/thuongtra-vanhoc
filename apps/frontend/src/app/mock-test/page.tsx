export const dynamic = 'force-dynamic';
import { MockTestTab } from "@/components/legacy/MockTestTab";
import { getAllVocabData } from "@/lib/data";
import { getCompletedLessonIds, getDefaultProgramCode } from '@/lib/getProgressIds';
import ProgramLocked from "@/components/ProgramLocked";
import PremiumLocked from "@/components/PremiumLocked";
import PracticeEmptyState from "@/components/PracticeEmptyState";
import { ClipboardList } from "lucide-react";
import prisma from "@/lib/prisma";

export default async function MockTestPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : await getDefaultProgramCode();

  const { completedLessonIds, programLocked, isPremiumUser } = await getCompletedLessonIds(level);

  const [vocabData, program] = await Promise.all([
    completedLessonIds.length > 0 ? getAllVocabData(level, completedLessonIds) : Promise.resolve([]),
    prisma.program.findUnique({ where: { code: level }, select: { name: true } }),
  ]);

  return (
    <div className="min-h-screen pb-20">
      {programLocked ? (
        <ProgramLocked />
      ) : !isPremiumUser ? (
        <PremiumLocked />
      ) : completedLessonIds.length === 0 ? (
        <PracticeEmptyState icon={ClipboardList} title="Chưa có nội dung để kiểm tra" />
      ) : (
        <MockTestTab key={level} vocabData={vocabData} levelId={level} programName={program?.name} />
      )}
    </div>
  );
}
