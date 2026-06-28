"use server";
import prisma from '@/lib/prisma';

import { PrismaClient } from "database";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { computeExpiryDate, PREMIUM_DURATIONS, PremiumDurationKey } from "@/lib/subscription";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if ((session?.user as any)?.role !== "ADMIN") {
    throw new Error("Không có quyền thực hiện hành động này.");
  }
}

type PricedDurationKey = Exclude<PremiumDurationKey, "none">;

function isPricedDuration(value: string): value is PricedDurationKey {
  return value in PREMIUM_DURATIONS;
}

// "keep": giữ nguyên ngày hết hạn hiện tại (dùng khi sửa thông tin khác, không phải gia hạn)
function resolveSubscriptionEndDate(
  subscriptionStatus: string,
  premiumDuration: string,
  currentEndDate: Date | null
): Date | null {
  if (subscriptionStatus !== "PREMIUM") return null;
  if (premiumDuration === "keep") return currentEndDate;
  if (isPricedDuration(premiumDuration)) return computeExpiryDate(premiumDuration);
  return null; // "none" → vĩnh viễn
}

export async function createUser(formData: FormData) {
  await requireAdmin();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  const subscriptionStatus = formData.get("subscriptionStatus") as string;
  const premiumDuration = formData.get("premiumDuration") as string;

  if (!email || !password) {
    return { error: "Email và Mật khẩu là bắt buộc." };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "Email đã tồn tại trong hệ thống." };
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const resolvedStatus = subscriptionStatus || "FREE";

    const newUser = await prisma.user.create({
      data: {
        name: name || null,
        email,
        passwordHash,
        role: role || "USER",
        subscriptionStatus: resolvedStatus,
        subscriptionEndDate: resolveSubscriptionEndDate(resolvedStatus, premiumDuration, null)
      }
    });

    if (resolvedStatus === "PREMIUM" && isPricedDuration(premiumDuration)) {
      await prisma.payment.create({
        data: {
          userId: newUser.id,
          amount: PREMIUM_DURATIONS[premiumDuration].price,
          status: "SUCCESS",
          gatewayTransactionId: "MANUAL"
        }
      });
    }

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi tạo user:", error);
    return { error: "Đã xảy ra lỗi khi tạo người dùng." };
  }
}

export async function updateUser(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const subscriptionStatus = formData.get("subscriptionStatus") as string;
  const premiumDuration = formData.get("premiumDuration") as string;
  const password = formData.get("password") as string; // Optional for update

  if (!id) return { error: "Thiếu ID người dùng." };

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) return { error: "Không tìm thấy người dùng." };

    const resolvedStatus = subscriptionStatus || "FREE";
    const dataToUpdate: any = {
      name: name || null,
      role: role || "USER",
      subscriptionStatus: resolvedStatus,
      subscriptionEndDate: resolveSubscriptionEndDate(resolvedStatus, premiumDuration, existingUser.subscriptionEndDate)
    };

    if (password && password.trim() !== "") {
      dataToUpdate.passwordHash = await bcrypt.hash(password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: dataToUpdate
    });

    if (resolvedStatus === "PREMIUM" && isPricedDuration(premiumDuration)) {
      await prisma.payment.create({
        data: {
          userId: id,
          amount: PREMIUM_DURATIONS[premiumDuration].price,
          status: "SUCCESS",
          gatewayTransactionId: "MANUAL"
        }
      });
    }

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi cập nhật user:", error);
    return { error: "Đã xảy ra lỗi khi cập nhật." };
  }
}

export async function deleteUser(formData: FormData) {
  await requireAdmin();
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

export async function forceLogout(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;

  if (!id) return { error: "Thiếu ID người dùng." };

  try {
    await prisma.session.deleteMany({ where: { userId: id } });

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi đăng xuất người dùng:", error);
    return { error: "Đã xảy ra lỗi khi đăng xuất người dùng." };
  }
}
