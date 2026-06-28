"use server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function requireTeacher() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  const userId = (session?.user as any)?.id as string | undefined;
  if (!userId || (role !== "TEACHER" && role !== "ADMIN")) {
    throw new Error("Không có quyền thực hiện hành động này.");
  }
  return { userId, isAdmin: role === "ADMIN" };
}

async function requireOwnedClass(classId: string) {
  const { userId, isAdmin } = await requireTeacher();
  const cls = await prisma.class.findUnique({ where: { id: classId } });
  if (!cls) return { error: "Không tìm thấy lớp học." } as const;
  if (!isAdmin && cls.teacherId !== userId) {
    return { error: "Bạn không phải giáo viên phụ trách lớp này." } as const;
  }
  return { cls } as const;
}

export async function createClass(formData: FormData) {
  const { userId } = await requireTeacher();
  const name = (formData.get("name") as string)?.trim();
  const programId = formData.get("programId") as string;

  if (!name || !programId) {
    return { error: "Vui lòng nhập tên lớp và chọn chương trình." };
  }

  try {
    await prisma.class.create({
      data: { name, programId, teacherId: userId }
    });
    revalidatePath("/teacher/classes");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi tạo lớp:", error);
    return { error: "Đã xảy ra lỗi khi tạo lớp học." };
  }
}

export async function updateClass(formData: FormData) {
  const classId = formData.get("classId") as string;
  const result = await requireOwnedClass(classId);
  if ("error" in result) return result;

  const name = (formData.get("name") as string)?.trim();
  const isActive = formData.get("isActive") === "true";

  if (!name) return { error: "Tên lớp không được để trống." };

  try {
    await prisma.class.update({ where: { id: classId }, data: { name, isActive } });
    revalidatePath("/teacher/classes");
    revalidatePath(`/teacher/classes/${classId}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi cập nhật lớp:", error);
    return { error: "Đã xảy ra lỗi khi cập nhật lớp học." };
  }
}

export async function deleteClass(formData: FormData) {
  const classId = formData.get("classId") as string;
  const result = await requireOwnedClass(classId);
  if ("error" in result) return result;

  try {
    await prisma.class.delete({ where: { id: classId } });
    revalidatePath("/teacher/classes");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa lớp:", error);
    return { error: "Đã xảy ra lỗi khi xóa lớp học." };
  }
}

export async function addStudentToClass(formData: FormData) {
  const classId = formData.get("classId") as string;
  const result = await requireOwnedClass(classId);
  if ("error" in result) return result;

  const email = (formData.get("email") as string)?.trim().toLowerCase();
  if (!email) return { error: "Vui lòng nhập email học sinh." };

  try {
    const student = await prisma.user.findUnique({ where: { email } });
    if (!student) {
      return { error: "Không tìm thấy học sinh đã đăng ký với email này." };
    }

    await prisma.classEnrollment.upsert({
      where: { classId_studentId: { classId, studentId: student.id } },
      update: {},
      create: { classId, studentId: student.id }
    });

    revalidatePath(`/teacher/classes/${classId}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi thêm học sinh:", error);
    return { error: "Đã xảy ra lỗi khi thêm học sinh." };
  }
}

export async function removeStudentFromClass(formData: FormData) {
  const classId = formData.get("classId") as string;
  const enrollmentId = formData.get("enrollmentId") as string;
  const result = await requireOwnedClass(classId);
  if ("error" in result) return result;

  try {
    await prisma.classEnrollment.delete({ where: { id: enrollmentId } });
    revalidatePath(`/teacher/classes/${classId}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa học sinh khỏi lớp:", error);
    return { error: "Đã xảy ra lỗi khi xóa học sinh khỏi lớp." };
  }
}
