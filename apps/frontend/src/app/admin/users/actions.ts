"use server";

import { PrismaClient } from "database";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  const subscriptionStatus = formData.get("subscriptionStatus") as string;

  if (!email || !password) {
    return { error: "Email và Mật khẩu là bắt buộc." };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "Email đã tồn tại trong hệ thống." };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    
    await prisma.user.create({
      data: {
        name: name || null,
        email,
        passwordHash,
        role: role || "USER",
        subscriptionStatus: subscriptionStatus || "FREE"
      }
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi tạo user:", error);
    return { error: "Đã xảy ra lỗi khi tạo người dùng." };
  }
}

export async function updateUser(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const subscriptionStatus = formData.get("subscriptionStatus") as string;
  const password = formData.get("password") as string; // Optional for update

  if (!id) return { error: "Thiếu ID người dùng." };

  try {
    const dataToUpdate: any = {
      name: name || null,
      role: role || "USER",
      subscriptionStatus: subscriptionStatus || "FREE"
    };

    if (password && password.trim() !== "") {
      dataToUpdate.passwordHash = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: dataToUpdate
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi cập nhật user:", error);
    return { error: "Đã xảy ra lỗi khi cập nhật." };
  }
}

export async function deleteUser(formData: FormData) {
  const id = formData.get("id") as string;
  
  if (!id) return { error: "Thiếu ID người dùng." };

  try {
    await prisma.user.delete({
      where: { id }
    });
    
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa user:", error);
    return { error: "Đã xảy ra lỗi khi xóa người dùng." };
  }
}
