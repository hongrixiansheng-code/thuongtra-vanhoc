import prisma from '@/lib/prisma';
import { PrismaClient } from "database";
import { CreditCard, Clock, CheckCircle2, XCircle } from "lucide-react";

async function getPayments() {
  return prisma.payment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, email: true } } }
  });
}

const statusBadge: Record<string, { label: string; className: string; icon: any }> = {
  PENDING: { label: "Đang xử lý", className: "bg-amber-50 text-amber-700 border-amber-200", icon: Clock },
  SUCCESS: { label: "Thành công", className: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  FAILED: { label: "Thất bại", className: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
};

export default async function AdminPayments() {
  const payments = await getPayments();

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Giao dịch</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Người dùng</th>
                <th className="px-6 py-4">Số tiền</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Mã giao dịch</th>
                <th className="px-6 py-4">Ngày tạo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((payment) => {
                const badge = statusBadge[payment.status] || statusBadge.PENDING;
                const Icon = badge.icon;
                return (
                  <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{payment.user.name || "Chưa cập nhật"}</div>
                      <div className="text-gray-500">{payment.user.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {payment.amount.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${badge.className}`}>
                        <Icon className="w-3.5 h-3.5" /> {badge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{payment.gatewayTransactionId || "—"}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(payment.createdAt).toLocaleString('vi-VN')}
                    </td>
                  </tr>
                );
              })}

              {payments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <CreditCard className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    Chưa có giao dịch nào. Trang này sẽ hiển thị dữ liệu khi cổng thanh toán (MoMo/VNPay) được tích hợp.
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
