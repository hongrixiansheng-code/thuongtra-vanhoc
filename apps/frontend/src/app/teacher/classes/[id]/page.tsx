import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import ClassDetailClient from "./ClassDetailClient";

export default async function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string;
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  const cls = await prisma.class.findUnique({
    where: { id },
    include: {
      program: {
        include: {
          subject: true,
          lessons: {
            where: { orderIndex: { not: 9999 } },
            orderBy: { orderIndex: "asc" },
            select: { id: true, title: true }
          }
        }
      },
      enrollments: {
        include: { student: { select: { id: true, name: true, email: true } } },
        orderBy: { joinedAt: "asc" }
      },
      assignments: {
        include: { lesson: { select: { id: true, title: true } } },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!cls) notFound();
  if (!isAdmin && cls.teacherId !== userId) redirect("/teacher/classes");

  const lessonIds = cls.program.lessons.map(l => l.id);
  const studentIds = cls.enrollments.map(e => e.studentId);

  const progressRows = lessonIds.length > 0 && studentIds.length > 0
    ? await prisma.userProgress.findMany({
        where: { lessonId: { in: lessonIds }, userId: { in: studentIds } },
        select: { userId: true, lessonId: true, completed: true, score: true }
      })
    : [];

  const progressByStudent = new Map<string, { completed: number; scoreSum: number; scoreCount: number }>();
  for (const row of progressRows) {
    const entry = progressByStudent.get(row.userId) || { completed: 0, scoreSum: 0, scoreCount: 0 };
    if (row.completed) {
      entry.completed += 1;
      entry.scoreSum += row.score;
      entry.scoreCount += 1;
    }
    progressByStudent.set(row.userId, entry);
  }

  const studentStats = Object.fromEntries(
    studentIds.map(sid => {
      const entry = progressByStudent.get(sid) || { completed: 0, scoreSum: 0, scoreCount: 0 };
      return [sid, {
        completed: entry.completed,
        total: lessonIds.length,
        avgScore: entry.scoreCount > 0 ? Math.round((entry.scoreSum / entry.scoreCount) * 10) / 10 : null
      }];
    })
  );

  // studentId nào đã hoàn thành từng lessonId — dùng để soi riêng theo bài được giao
  const completionByLesson: Record<string, string[]> = {};
  for (const row of progressRows) {
    if (!row.completed) continue;
    if (!completionByLesson[row.lessonId]) completionByLesson[row.lessonId] = [];
    completionByLesson[row.lessonId].push(row.userId);
  }

  return (
    <div className="animate-fade-in">
      <ClassDetailClient cls={cls} studentStats={studentStats} completionByLesson={completionByLesson} />
    </div>
  );
}
