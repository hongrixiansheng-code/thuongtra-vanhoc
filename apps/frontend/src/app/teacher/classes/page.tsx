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
      program: { include: { subject: true } },
      _count: { select: { enrollments: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  const programs = await prisma.program.findMany({
    include: { subject: true },
    orderBy: [{ subjectId: "asc" }, { level: "asc" }]
  });

  return (
    <div className="animate-fade-in">
      <ClassesClient classes={classes} programs={programs} />
    </div>
  );
}
