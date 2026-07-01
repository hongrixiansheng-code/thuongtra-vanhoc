export const dynamic = 'force-dynamic';
import { getLessonsData } from "@/lib/data";
import { getCompletedLessonIds } from "@/lib/getProgressIds";
import DashboardClient from "@/components/DashboardClient";
import ProgramLocked from "@/components/ProgramLocked";

export default async function DashboardPage(props: any) {
  const searchParams = await props.searchParams;
  const levelStr = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

  const [data, { completedLessonIds, isAdmin, isPremiumUser, programLocked, scoreByLessonId }] = await Promise.all([
    getLessonsData(levelStr),
    getCompletedLessonIds(levelStr),
  ]);

  const progressMap: Record<string, boolean> = {};
  completedLessonIds.forEach(id => { progressMap[id] = true; });

  return (
    <div className="min-h-screen">
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
          scoreMap={scoreByLessonId}
        />
      ) : (
        <div className="p-8 text-center text-gray-500">Không tìm thấy chương trình học.</div>
      )}
    </div>
  );
}
