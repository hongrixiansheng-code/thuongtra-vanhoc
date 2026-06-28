"use server";
import prisma from '@/lib/prisma';

import { PrismaClient } from "database";
import { revalidatePath } from "next/cache";


export async function createSubject(formData: FormData) {
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;
  const flag = formData.get("flag") as string;
  const color = formData.get("color") as string;

  if (!name || !code) {
    return { error: "Tên môn và Mã môn là bắt buộc." };
  }

  try {
    const existing = await prisma.subject.findUnique({ where: { code } });
    if (existing) {
      return { error: "Mã môn học (code) đã tồn tại." };
    }

    await prisma.subject.create({
      data: {
        name,
        code,
        flag: flag || null,
        color: color || null,
      }
    });

    revalidatePath("/admin/subjects");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi tạo subject:", error);
    return { error: "Đã xảy ra lỗi khi tạo môn học." };
  }
}

export async function updateSubject(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const code = formData.get("code") as string;
  const flag = formData.get("flag") as string;
  const color = formData.get("color") as string;

  if (!id || !name || !code) {
    return { error: "Thiếu thông tin bắt buộc." };
  }

  try {
    const existing = await prisma.subject.findUnique({ where: { code } });
    if (existing && existing.id !== id) {
      return { error: "Mã môn học (code) đã tồn tại." };
    }

    await prisma.subject.update({
      where: { id },
      data: {
        name,
        code,
        flag: flag || null,
        color: color || null,
      }
    });

    revalidatePath("/admin/subjects");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi cập nhật subject:", error);
    return { error: "Đã xảy ra lỗi khi cập nhật." };
  }
}

export async function deleteSubject(formData: FormData) {
  const id = formData.get("id") as string;
  
  if (!id) return { error: "Thiếu ID môn học." };

  try {
    await prisma.subject.delete({
      where: { id }
    });
    
    revalidatePath("/admin/subjects");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa subject:", error);
    return { error: "Không thể xóa môn học (có thể do đang chứa chương trình học)." };
  }
}
