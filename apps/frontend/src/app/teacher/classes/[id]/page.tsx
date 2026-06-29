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
      }
    }
  });

  if (!cls) notFound();
  if (!isAdmin && cls.teacherId !== userId) redirect("/teacher/classes");

  return (
    <div className="animate-fade-in">
      <ClassDetailClient cls={cls} />
    </div>
  );
}
