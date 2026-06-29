import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { getPresentationSlides } from "@/lib/data";
import PresentationClient from "./PresentationClient";

export default async function PresentLessonPage({ params }: { params: Promise<{ id: string; lessonId: string }> }) {
  const { id, lessonId } = await params;
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string;
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  const cls = await prisma.class.findUnique({
    where: { id },
    select: { id: true, teacherId: true, programId: true, name: true }
  });

  if (!cls) notFound();
  if (!isAdmin && cls.teacherId !== userId) redirect("/teacher/classes");

  const presentation = await getPresentationSlides(lessonId);
  if (!presentation || presentation.programId !== cls.programId) notFound();
  if (presentation.slides.length === 0) notFound();

  return (
    <PresentationClient
      slides={presentation.slides}
      lessonTitle={presentation.lessonTitle}
      classId={cls.id}
    />
  );
}
