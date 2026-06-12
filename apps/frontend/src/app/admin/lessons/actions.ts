"use server";

import { PrismaClient } from "database";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createLesson(formData: FormData) {
  const title = formData.get("title") as string;
  const theme = formData.get("theme") as string;
  const programId = formData.get("programId") as string;
  const orderIndexStr = formData.get("orderIndex") as string;
  const isPremium = formData.get("isPremium") === "true";

  if (!title || !programId) {
    return { error: "Tiêu đề và Chương trình học là bắt buộc." };
  }

  try {
    await prisma.lesson.create({
      data: {
        title,
        theme: theme || null,
        programId,
        orderIndex: parseInt(orderIndexStr) || 1,
        isPremium
      }
    });

    revalidatePath("/admin/lessons");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi tạo bài học:", error);
    return { error: "Đã xảy ra lỗi khi tạo bài học." };
  }
}

export async function updateLesson(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const theme = formData.get("theme") as string;
  const programId = formData.get("programId") as string;
  const orderIndexStr = formData.get("orderIndex") as string;
  const isPremium = formData.get("isPremium") === "true";

  if (!id || !title || !programId) {
    return { error: "Thiếu thông tin bắt buộc." };
  }

  try {
    await prisma.lesson.update({
      where: { id },
      data: {
        title,
        theme: theme || null,
        programId,
        orderIndex: parseInt(orderIndexStr) || 1,
        isPremium
      }
    });

    revalidatePath("/admin/lessons");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi cập nhật bài học:", error);
    return { error: "Đã xảy ra lỗi khi cập nhật." };
  }
}

export async function deleteLesson(formData: FormData) {
  const id = formData.get("id") as string;
  
  if (!id) return { error: "Thiếu ID bài học." };

  try {
    await prisma.lesson.delete({
      where: { id }
    });
    
    revalidatePath("/admin/lessons");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa bài học:", error);
    return { error: "Không thể xóa bài học (có thể do đang chứa dữ liệu nội dung hoặc tiến độ học viên)." };
  }
}
