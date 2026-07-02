import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ClassesClient from "./ClassesClient";

export default async function TeacherClassesPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string;

  const classes = await prisma.class.findMany({
    where: { teacherId: userId },
    include: {
      program: {
        include: {
          subject: true,
          lessons: { where: { orderIndex: { not: 9999 } }, select: { id: true } }
        }
      },
      enrollments: { include: { student: { select: { id: true, name: true, email: true } } } },
      _count: { select: { enrollments: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  const programs = await prisma.program.findMany({
    include: { subject: true },
    orderBy: [{ subjectId: "asc" }, { level: "asc" }]
  });

  // Gộp lessonId + studentId của TẤT CẢ lớp giáo viên này để query UserProgress 1 lần duy nhất
  const allLessonIds = Array.from(new Set(classes.flatMap(c => c.program.lessons.map(l => l.id))));
  const allStudentIds = Array.from(new Set(classes.flatMap(c => c.enrollments.map(e => e.studentId))));

  const progressRows = allLessonIds.length > 0 && allStudentIds.length > 0
    ? await prisma.userProgress.findMany({
        where: { lessonId: { in: allLessonIds }, userId: { in: allStudentIds } },
        select: { userId: true, lessonId: true, completed: true, score: true, lastReviewedAt: true }
      })
    : [];

  const progressByUser = new Map<string, Map<string, { completed: boolean; score: number; lastReviewedAt: Date }>>();
  for (const row of progressRows) {
    if (!progressByUser.has(row.userId)) progressByUser.set(row.userId, new Map());
    progressByUser.get(row.userId)!.set(row.lessonId, row);
  }

  // Danh sách phẳng toàn bộ học sinh của mọi lớp, kèm tiến độ tính riêng theo chương trình của lớp đó
  const studentOverview = classes.flatMap(cls => {
    const lessonIds = cls.program.lessons.map(l => l.id);
    return cls.enrollments.map(enr => {
      const userRows = progressByUser.get(enr.studentId);
      let completed = 0, scoreSum = 0, scoreCount = 0;
      let lastActivity: Date | null = null;
      for (const lessonId of lessonIds) {
        const row = userRows?.get(lessonId);
        if (!row) continue;
        if (row.completed) { completed += 1; scoreSum += row.score; scoreCount += 1; }
        if (!lastActivity || row.lastReviewedAt > lastActivity) lastActivity = row.lastReviewedAt;
      }
      return {
        enrollmentId: enr.id,
        studentId: enr.studentId,
        studentName: enr.student.name,
        studentEmail: enr.student.email,
        classId: cls.id,
        className: cls.name,
        completed,
        total: lessonIds.length,
        avgScore: scoreCount > 0 ? Math.round((scoreSum / scoreCount) * 10) / 10 : null,
        lastActivity
      };
    });
  });

  return (
    <div className="animate-fade-in">
      <ClassesClient classes={classes} programs={programs} studentOverview={studentOverview} />
    </div>
  );
}
