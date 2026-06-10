import { PrismaClient } from "database";
import path from "path";
import { UserCog, ShieldAlert, BadgeCheck } from "lucide-react";

async function getUsers() {
  
  const prisma = new PrismaClient();

  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export default async function AdminUsers() {
  const users = await getUsers();

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quản lý Người dùng</h1>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
          + Thêm người dùng
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Người dùng</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4">Ngày đăng ký</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3 shrink-0">
                        {(user.name || user.email || "U")[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name || "Chưa cập nhật"}</div>
                        <div className="text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.role === "ADMIN" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
                        <ShieldAlert className="w-3.5 h-3.5" /> Quản trị viên
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        <UserCog className="w-3.5 h-3.5" /> Học viên
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {user.subscriptionStatus === "PREMIUM" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <BadgeCheck className="w-3.5 h-3.5" /> Premium
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        Miễn phí
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 hover:text-indigo-900 font-medium text-sm mr-4">Sửa</button>
                    <button className="text-red-600 hover:text-red-900 font-medium text-sm">Xóa</button>
                  </td>
                </tr>
              ))}
              
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Chưa có người dùng nào trong hệ thống.
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
