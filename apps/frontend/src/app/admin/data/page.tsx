import { prisma } from "database";
import DataClient from "./DataClient";

export const dynamic = 'force-dynamic';

async function getData() {

  const programs = await prisma.program.findMany({
    include: { subject: true },
    orderBy: [
      { subjectId: 'asc' },
      { level: 'asc' }
    ]
  });

  const lessons = await prisma.lesson.findMany({
    where: { orderIndex: { not: 9999 } },
    orderBy: [
      { programId: 'asc' },
      { orderIndex: 'asc' }
    ]
  });

  const contents = await prisma.lessonContent.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return { programs, lessons, contents };
}

export default async function AdminData() {
  const { programs, lessons, contents } = await getData();

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <DataClient programs={programs} lessons={lessons} contents={contents} />
    </div>
  );
}
