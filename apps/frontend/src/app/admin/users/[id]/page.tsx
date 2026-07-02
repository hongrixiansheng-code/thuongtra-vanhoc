import prisma from '@/lib/prisma';
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, UserCog, BadgeCheck, CreditCard, Clock, CheckCircle2, XCircle, Ban } from "lucide-react";
import UserDetailClient from "./UserDetailClient";
import ClassEnrollmentClient from "./ClassEnrollmentClient";
import EmailChangeClient from "./EmailChangeClient";
import UserEditClient from "./UserEditClient";

async function getUserDetail(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      progress: { include: { lesson: { include: { program: true } } } },
      payments: { orderBy: { createdAt: 'desc' } },
      enrollments: { include: { class: { include: { program: true } } } }
    }
  });

  if (!user) return null;

  const [auditLogs, activeClasses] = await Promise.all([
    prisma.adminAuditLog.findMany({
      where: { targetUserId: id },
      orderBy: { createdAt: 'desc' },
      take: 30
    }),
    prisma.class.findMany({
      where: { isActive: true },
      include: { program: true },
      orderBy: { name: 'asc' }
    })
  ]);

  const programIds = Array.from(new Set(user.progress.map(p => p.lesson.program.id)));
  const lessonCounts = await prisma.lesson.groupBy({
    by: ['programId'],
    where: { programId: { in: programIds } },
    _count: { id: true }
  });
  const totalByProgram = new Map(lessonCounts.map(l => [l.programId, l._count.id]));

  const programStats = programIds.map(programId => {
    const program = user.progress.find(p => p.lesson.program.id === programId)!.lesson.program;
    const completed = user.progress.filter(p => p.lesson.program.id === programId && p.completed).length;
    return {
      programId,
      programName: program.name,
      programCode: program.code,
      completed,
      total: totalByProgram.get(programId) || 0
    };
  });

  return { user, programStats, auditLogs, activeClasses };
}

const paymentStatusBadge: Record<string, { label: string; className: string; icon: any }> = {
  PENDING: { label: "Đang xử lý", className: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  SUCCESS: { label: "Thành công", className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  FAILED: { label: "Thất bại", className: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
};

const auditActionLabel: Record<string, string> = {
  CREATE: "Tạo tài khoản",
  ROLE_CHANGE: "Đổi vai trò",
  SUBSCRIPTION_CHANGE: "Đổi gói/thời hạn",
  BAN: "Khóa tài khoản",
  UNBAN: "Mở khóa tài khoản",
  DELETE: "Xóa tài khoản",
  FORCE_LOGOUT: "Buộc đăng xuất",
  NAME_CHANGE: "Đổi tên",
  EMAIL_CHANGE: "Đổi email",
};

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getUserDetail(id);

  if (!data) notFound();
  const { user, programStats, auditLogs, activeClasses } = data;

  return (
    <div className="animate-fade-in">
      <Link href="/admin/users" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl mr-4 shrink-0">
            {(user.name || user.email || "U")[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.name || "Chưa cập nhật"}</h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              Đăng nhập gần nhất: {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString('vi-VN') : "Chưa từng đăng nhập"}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {user.isBanned && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-100 text-rose-700 border border-rose-300">
                  <Ban className="w-3.5 h-3.5" /> Đã khóa
                </span>
              )}
              {user.role === "ADMIN" ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                  <ShieldAlert className="w-3.5 h-3.5" /> Quản trị viên
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  <UserCog className="w-3.5 h-3.5" /> Học viên
                </span>
              )}
              {user.subscriptionStatus === "PREMIUM" ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {user.subscriptionEndDate
                    ? `Premium · hết hạn ${new Date(user.subscriptionEndDate).toLocaleDateString('vi-VN')}`
                    : "Premium vĩnh viễn"}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                  Miễn phí
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <div className="flex gap-2">
            <UserEditClient
              user={{
                id: user.id,
                name: user.name,
                role: user.role,
                subscriptionStatus: user.subscriptionStatus,
                subscriptionEndDate: user.subscriptionEndDate
              }}
            />
            <UserDetailClient userId={user.id} isBanned={user.isBanned} />
          </div>
          <EmailChangeClient userId={user.id} currentEmail={user.email || ""} />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Lớp học (ClassEnrollment)</h2>
        <ClassEnrollmentClient
          userId={user.id}
          enrollments={user.enrollments.map(e => ({
            id: e.id,
            className: e.class.name,
            programName: e.class.program.name
          }))}
          availableClasses={activeClasses.map(c => ({
            id: c.id,
            name: c.name,
            programName: c.program.name
          }))}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Tiến độ học theo chương trình</h2>
        {programStats.length === 0 ? (
          <p className="text-gray-500 text-sm">Người dùng chưa bắt đầu học chương trình nào.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {programStats.map(stat => (
              <li key={stat.programId} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{stat.programName}</p>
                  <p className="text-xs text-gray-400">{stat.programCode}</p>
                </div>
                <span className="text-sm font-semibold text-gray-700">{stat.completed}/{stat.total} bài hoàn thành</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <h2 className="text-lg font-bold text-gray-900 p-6 pb-0">Lịch sử giao dịch</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left mt-4">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Số tiền</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Mã giao dịch</th>
                <th className="px-6 py-4">Ngày tạo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {user.payments.map(payment => {
                const badge = paymentStatusBadge[payment.status] || paymentStatusBadge.PENDING;
                const Icon = badge.icon;
                return (
                  <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{payment.amount.toLocaleString('vi-VN')}đ</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${badge.className}`}>
                        <Icon className="w-3.5 h-3.5" /> {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{payment.gatewayTransactionId || "—"}</td>
                    <td className="px-6 py-4 text-gray-500">{new Date(payment.createdAt).toLocaleString('vi-VN')}</td>
                  </tr>
                );
              })}

              {user.payments.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    <CreditCard className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    Chưa có giao dịch nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
        <h2 className="text-lg font-bold text-gray-900 p-6 pb-0">Lịch sử thao tác quản trị</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left mt-4">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Hành động</th>
                <th className="px-6 py-4">Admin thực hiện</th>
                <th className="px-6 py-4">Chi tiết</th>
                <th className="px-6 py-4">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{auditActionLabel[log.action] || log.action}</td>
                  <td className="px-6 py-4 text-gray-500">{log.adminEmail}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate" title={log.detail ? JSON.stringify(log.detail) : ""}>
                    {log.detail ? JSON.stringify(log.detail) : "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{new Date(log.createdAt).toLocaleString('vi-VN')}</td>
                </tr>
              ))}

              {auditLogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                    Chưa có thao tác quản trị nào được ghi nhận trên tài khoản này.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
