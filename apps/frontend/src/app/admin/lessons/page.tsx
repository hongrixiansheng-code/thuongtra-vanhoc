import prisma from '@/lib/prisma';
import { PrismaClient } from "database";
import LessonClient from "./LessonClient";

async function getData() {


  const lessons = await prisma.lesson.findMany({
    include: { 
      program: {
        include: { subject: true }
      },
      _count: {
        select: { contents: true }
      }
    },
    orderBy: [
      { programId: 'asc' },
      { orderIndex: 'asc' }
    ]
  });

  const programs = await prisma.program.findMany({
    include: { subject: true },
    orderBy: [
      { subjectId: 'asc' },
      { level: 'asc' }
    ]
  });

  return { lessons, programs };
}

export default async function AdminLessons() {
  const { lessons, programs } = await getData();

  return (
    <div className="animate-fade-in">
      <LessonClient lessons={lessons} programs={programs} />
    </div>
  );
}
