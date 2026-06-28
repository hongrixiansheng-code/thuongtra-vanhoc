export const dynamic = 'force-dynamic';
import { getLessonsData } from "@/lib/data";
import { getCompletedLessonIds } from "@/lib/getProgressIds";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage(props: any) {
  const searchParams = await props.searchParams;
  const level = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';

  const data = await getLessonsData(level);
  const { completedLessonIds, isAdmin, isPremiumUser } = await getCompletedLessonIds(level);

  // Build progressMap từ completedLessonIds
  const progressMap: Record<string, boolean> = {};
  completedLessonIds.forEach(id => {
    progressMap[id] = true;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {data ? (
        <DashboardClient
          lessons={data.lessons}
          programName={data.programName}
          programCode={data.programCode}
          isPremiumUser={isPremiumUser}
          isAdmin={isAdmin}
          progressMap={progressMap}
        />
      ) : (
        <div className="p-8 text-center text-gray-500">
          Không tìm thấy chương trình học.
        </div>
      )}
    </div>
  );
}
