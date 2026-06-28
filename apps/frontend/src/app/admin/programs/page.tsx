import prisma from '@/lib/prisma';
import { PrismaClient } from "database";
import ProgramClient from "./ProgramClient";

async function getData() {


  const programs = await prisma.program.findMany({
    include: { subject: true },
    orderBy: [
      { subjectId: 'asc' },
      { level: 'asc' }
    ]
  });

  const subjects = await prisma.subject.findMany({
    orderBy: { name: 'asc' }
  });

  return { programs, subjects };
}

export default async function AdminPrograms() {
  const { programs, subjects } = await getData();

  return (
    <div className="animate-fade-in">
      <ProgramClient programs={programs} subjects={subjects} />
    </div>
  );
}
