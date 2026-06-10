export const dynamic = 'force-dynamic';

import { CurriculumTab } from "@/components/legacy/CurriculumTab";
import { getLessonsData } from "@/lib/data";

export default async function DashboardPage(props: any) {
  const searchParams = await props.searchParams;
  const levelStr = (searchParams && searchParams.level) ? searchParams.level : 'hsk1';
  
  const data = await getLessonsData(levelStr);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {data ? (
        <CurriculumTab key={levelStr} lessons={data.lessons} programName={data.programName} />
      ) : (
        <div className="p-8 text-center text-gray-500">Đang cập nhật dữ liệu khóa học...</div>
      )}
    </div>
  );
}
