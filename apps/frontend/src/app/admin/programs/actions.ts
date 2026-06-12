"use server";

import { PrismaClient } from "database";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function createProgram(formData: FormData) {
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;
  const levelStr = formData.get("level") as string;
  const subjectId = formData.get("subjectId") as string;
  const isAvailable = formData.get("isAvailable") === "true";

  if (!name || !code || !subjectId) {
    return { error: "Tên, Mã chương trình và Môn học là bắt buộc." };
  }

  try {
    const existing = await prisma.program.findUnique({ where: { code } });
    if (existing) {
      return { error: "Mã chương trình (code) đã tồn tại." };
    }

    await prisma.program.create({
      data: {
        name,
        code,
        level: parseInt(levelStr) || 1,
        subjectId,
        isAvailable
      }
    });

    revalidatePath("/admin/programs");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi tạo program:", error);
    return { error: "Đã xảy ra lỗi khi tạo chương trình." };
  }
}

export async function updateProgram(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;
  const levelStr = formData.get("level") as string;
  const subjectId = formData.get("subjectId") as string;
  const isAvailable = formData.get("isAvailable") === "true";

  if (!id || !name || !code || !subjectId) {
    return { error: "Thiếu thông tin bắt buộc." };
  }

  try {
    const existing = await prisma.program.findUnique({ where: { code } });
    if (existing && existing.id !== id) {
      return { error: "Mã chương trình (code) đã tồn tại." };
    }

    await prisma.program.update({
      where: { id },
      data: {
        name,
        code,
        level: parseInt(levelStr) || 1,
        subjectId,
        isAvailable
      }
    });

    revalidatePath("/admin/programs");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi cập nhật program:", error);
    return { error: "Đã xảy ra lỗi khi cập nhật." };
  }
}

export async function deleteProgram(formData: FormData) {
  const id = formData.get("id") as string;
  
  if (!id) return { error: "Thiếu ID chương trình." };

  try {
    await prisma.program.delete({
      where: { id }
    });
    
    revalidatePath("/admin/programs");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa program:", error);
    return { error: "Không thể xóa chương trình (có thể do đang chứa bài học)." };
  }
}
