"use server";
import prisma from '@/lib/prisma';

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { computeExpiryDate, PREMIUM_DURATIONS, PremiumDurationKey } from "@/lib/subscription";
import { logAdminAction } from "@/lib/auditLog";

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

    await logAdminAction("CREATE", { id: newUser.id, email: newUser.email || "" }, {
      role: newUser.role,
      subscriptionStatus: newUser.subscriptionStatus
    });

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
    const resolvedRole = role || "USER";
    const resolvedEndDate = resolveSubscriptionEndDate(resolvedStatus, premiumDuration, existingUser.subscriptionEndDate);
    const resolvedName = name || null;

    const dataToUpdate: any = {
      name: resolvedName,
      role: resolvedRole,
      subscriptionStatus: resolvedStatus,
      subscriptionEndDate: resolvedEndDate
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

    const target = { id, email: existingUser.email || "" };
    if (existingUser.role !== resolvedRole) {
      await logAdminAction("ROLE_CHANGE", target, { before: existingUser.role, after: resolvedRole });
    }
    if (
      existingUser.subscriptionStatus !== resolvedStatus ||
      existingUser.subscriptionEndDate?.getTime() !== resolvedEndDate?.getTime()
    ) {
      await logAdminAction("SUBSCRIPTION_CHANGE", target, {
        before: { status: existingUser.subscriptionStatus, endDate: existingUser.subscriptionEndDate },
        after: { status: resolvedStatus, endDate: resolvedEndDate }
      });
    }
    if (existingUser.name !== resolvedName) {
      await logAdminAction("NAME_CHANGE", target, { before: existingUser.name, after: resolvedName });
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
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) return { error: "Không tìm thấy người dùng." };

    await logAdminAction("DELETE", { id, email: existingUser.email || "" }, {
      role: existingUser.role,
      subscriptionStatus: existingUser.subscriptionStatus
    });

    await prisma.user.delete({
      where: { id }
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa user:", error);
    return { error: "Đã xảy ra lỗi khi xóa người dùng. Có thể người dùng này còn giao dịch hoặc lớp học liên kết." };
  }
}

export async function forceLogout(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;

  if (!id) return { error: "Thiếu ID người dùng." };

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) return { error: "Không tìm thấy người dùng." };

    await prisma.user.update({
      where: { id },
      data: { sessionsInvalidatedAt: new Date() }
    });
    await prisma.session.deleteMany({ where: { userId: id } });

    await logAdminAction("FORCE_LOGOUT", { id, email: existingUser.email || "" });

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi đăng xuất người dùng:", error);
    return { error: "Đã xảy ra lỗi khi đăng xuất người dùng." };
  }
}

export async function banUser(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;

  if (!id) return { error: "Thiếu ID người dùng." };

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) return { error: "Không tìm thấy người dùng." };
    if (existingUser.role === "ADMIN") return { error: "Không thể khóa tài khoản quản trị viên." };

    await prisma.user.update({
      where: { id },
      data: { isBanned: true, sessionsInvalidatedAt: new Date() }
    });

    await logAdminAction("BAN", { id, email: existingUser.email || "" });

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi khóa người dùng:", error);
    return { error: "Đã xảy ra lỗi khi khóa người dùng." };
  }
}

export async function unbanUser(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;

  if (!id) return { error: "Thiếu ID người dùng." };

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) return { error: "Không tìm thấy người dùng." };

    await prisma.user.update({
      where: { id },
      data: { isBanned: false }
    });

    await logAdminAction("UNBAN", { id, email: existingUser.email || "" });

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi mở khóa người dùng:", error);
    return { error: "Đã xảy ra lỗi khi mở khóa người dùng." };
  }
}

export async function changeEmail(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const newEmail = ((formData.get("email") as string) || "").trim().toLowerCase();

  if (!id || !newEmail) return { error: "Thiếu thông tin." };

  try {
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) return { error: "Không tìm thấy người dùng." };

    const emailTaken = await prisma.user.findUnique({ where: { email: newEmail } });
    if (emailTaken && emailTaken.id !== id) {
      return { error: "Email này đã được dùng bởi tài khoản khác." };
    }

    await prisma.user.update({ where: { id }, data: { email: newEmail } });

    await logAdminAction("EMAIL_CHANGE", { id, email: newEmail }, {
      before: existingUser.email,
      after: newEmail
    });

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi đổi email:", error);
    return { error: "Đã xảy ra lỗi khi đổi email." };
  }
}

export async function bulkGrantPremium(formData: FormData) {
  await requireAdmin();
  const idsRaw = formData.get("ids") as string;
  const premiumDuration = formData.get("premiumDuration") as string;
  const ids = idsRaw ? idsRaw.split(",").filter(Boolean) : [];

  if (ids.length === 0) return { error: "Chưa chọn người dùng nào." };
  if (!isPricedDuration(premiumDuration) && premiumDuration !== "none") {
    return { error: "Gói Premium không hợp lệ." };
  }

  try {
    for (const id of ids) {
      const existingUser = await prisma.user.findUnique({ where: { id } });
      if (!existingUser) continue;

      const endDate = premiumDuration === "none" ? null : computeExpiryDate(premiumDuration as PricedDurationKey);
      await prisma.user.update({
        where: { id },
        data: { subscriptionStatus: "PREMIUM", subscriptionEndDate: endDate }
      });

      if (premiumDuration !== "none") {
        await prisma.payment.create({
          data: {
            userId: id,
            amount: PREMIUM_DURATIONS[premiumDuration as PricedDurationKey].price,
            status: "SUCCESS",
            gatewayTransactionId: "MANUAL_BULK"
          }
        });
      }

      await logAdminAction("SUBSCRIPTION_CHANGE", { id, email: existingUser.email || "" }, {
        before: { status: existingUser.subscriptionStatus, endDate: existingUser.subscriptionEndDate },
        after: { status: "PREMIUM", endDate }
      });
    }

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi cấp Premium hàng loạt:", error);
    return { error: "Đã xảy ra lỗi khi cấp Premium hàng loạt." };
  }
}

export async function bulkBanUsers(formData: FormData) {
  await requireAdmin();
  const idsRaw = formData.get("ids") as string;
  const ids = idsRaw ? idsRaw.split(",").filter(Boolean) : [];

  if (ids.length === 0) return { error: "Chưa chọn người dùng nào." };

  try {
    for (const id of ids) {
      const existingUser = await prisma.user.findUnique({ where: { id } });
      if (!existingUser || existingUser.role === "ADMIN") continue;

      await prisma.user.update({
        where: { id },
        data: { isBanned: true, sessionsInvalidatedAt: new Date() }
      });
      await logAdminAction("BAN", { id, email: existingUser.email || "" });
    }

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi khóa hàng loạt:", error);
    return { error: "Đã xảy ra lỗi khi khóa hàng loạt." };
  }
}

export async function addUserToClass(formData: FormData) {
  await requireAdmin();
  const userId = formData.get("userId") as string;
  const classId = formData.get("classId") as string;

  if (!userId || !classId) return { error: "Thiếu thông tin." };

  try {
    await prisma.classEnrollment.upsert({
      where: { classId_studentId: { classId, studentId: userId } },
      update: {},
      create: { classId, studentId: userId }
    });

    revalidatePath(`/admin/users/${userId}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi thêm học sinh vào lớp:", error);
    return { error: "Đã xảy ra lỗi khi thêm vào lớp." };
  }
}

export async function removeUserFromClass(formData: FormData) {
  await requireAdmin();
  const userId = formData.get("userId") as string;
  const enrollmentId = formData.get("enrollmentId") as string;

  if (!enrollmentId) return { error: "Thiếu thông tin." };

  try {
    await prisma.classEnrollment.delete({ where: { id: enrollmentId } });
    revalidatePath(`/admin/users/${userId}`);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi xóa học sinh khỏi lớp:", error);
    return { error: "Đã xảy ra lỗi khi xóa khỏi lớp." };
  }
}
