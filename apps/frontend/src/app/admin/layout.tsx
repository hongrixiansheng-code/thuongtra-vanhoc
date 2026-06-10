import { BookOpen, Users, Database, Settings, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }
  
  if ((session.user as any)?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const navItems = [
    { name: "Tổng quan", href: "/admin", icon: LayoutDashboard },
    { name: "Quản lý Người dùng", href: "/admin/users", icon: Users },
    { name: "Quản lý Dữ liệu", href: "/admin/data", icon: Database },
    { name: "Cài đặt", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 border-r border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <BookOpen className="w-6 h-6 text-indigo-400 mr-2" />
          <span className="font-bold text-white text-lg tracking-wide">Admin Portal</span>
        </div>
        
        <div className="p-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu quản trị</div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-slate-800 hover:text-white transition-colors">
                <item.icon className="w-5 h-5 mr-3 text-slate-400" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-64 border-t border-slate-800 p-4 bg-slate-900">
          <div className="flex items-center mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
              {(session.user?.name || session.user?.email || "A")[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{session.user?.name || "Admin User"}</p>
              <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
            </div>
          </div>
          <Link href="/api/auth/signout" className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Đăng xuất
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
