"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { BookOpen, Users, Database, Settings, LogOut, LayoutDashboard, GraduationCap, BookMarked, CreditCard } from "lucide-react";

const iconMap: Record<string, any> = {
  LayoutDashboard, Users, BookMarked, GraduationCap, BookOpen, Database, Settings, CreditCard,
};

export default function AdminSidebar({ navItems, user }: { 
  navItems: { name: string; href: string; icon: string }[];
  user: { name: string; email: string; initial: string };
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950 shrink-0">
        <BookOpen className="w-6 h-6 text-indigo-400 mr-2" />
        <span className="font-bold text-white text-lg tracking-wide">Admin Portal</span>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu quản trị</div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon];
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  active
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {Icon && (
                  <Icon className={`w-5 h-5 mr-3 ${active ? "text-white" : "text-slate-400"}`} />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="border-t border-slate-800 p-4 bg-slate-900 shrink-0">
        <div className="flex items-center mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3 shrink-0">
            {user.initial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
        </div>
        <Link
          href="/api/auth/signout"
          className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Đăng xuất
        </Link>
      </div>
    </aside>
  );
}
