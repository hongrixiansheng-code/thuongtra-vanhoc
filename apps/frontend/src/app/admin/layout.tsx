import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { isSessionRevokedById } from "@/lib/sessionGuard";
import AdminSidebar from "./AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if ((session.user as any)?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  if (await isSessionRevokedById((session.user as any).id, (session.user as any).iat)) {
    redirect("/login");
  }

  const navItems = [
    { name: "Tổng quan", href: "/admin", icon: "LayoutDashboard" },
    { name: "Người dùng", href: "/admin/users", icon: "Users" },
    { name: "Môn học", href: "/admin/subjects", icon: "BookMarked" },
    { name: "Chương trình học", href: "/admin/programs", icon: "GraduationCap" },
    { name: "Bài học", href: "/admin/lessons", icon: "BookOpen" },
    { name: "Quản lý Nội dung", href: "/admin/data", icon: "Database" },
    { name: "Giao dịch", href: "/admin/payments", icon: "CreditCard" },
    { name: "Cài đặt", href: "/admin/settings", icon: "Settings" },
  ];

  const user = {
    name: session.user?.name || "Admin User",
    email: session.user?.email || "",
    initial: (session.user?.name || session.user?.email || "A")[0].toUpperCase()
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar navItems={navItems} user={user} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
