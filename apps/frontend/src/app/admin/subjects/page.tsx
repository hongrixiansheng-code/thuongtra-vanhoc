import prisma from '@/lib/prisma';
import { PrismaClient } from "database";
import SubjectClient from "./SubjectClient";

async function getData() {


  const subjects = await prisma.subject.findMany({
    include: {
      _count: {
        select: { programs: true }
      }
    },
    orderBy: { name: 'asc' }
  });

  return subjects;
}

export default async function AdminSubjects() {
  const subjects = await getData();

  return (
    <div className="animate-fade-in">
      <SubjectClient subjects={subjects} />
    </div>
  );
}
