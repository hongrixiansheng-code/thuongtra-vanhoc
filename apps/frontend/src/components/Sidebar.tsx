"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, Crown, LogIn } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "English Lessons", href: "/lessons/english/beginner/1", icon: BookOpen },
    { name: "Chinese Lessons", href: "/lessons/chinese/beginner/1", icon: BookOpen },
    { name: "Premium Tools", href: "/premium-tools", icon: Crown },
    { name: "Login", href: "/login", icon: LogIn },
  ];

  return (
    <aside className="w-64 bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] h-screen flex flex-col hidden md:flex sticky top-0">
      <div className="p-6 font-bold text-xl text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
        <BookOpen className="w-6 h-6" />
        EduPlatform
      </div>
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href) && item.href !== "/";
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-[var(--sidebar-border)] text-sm text-gray-500">
        &copy; 2024 EduPlatform Inc.
      </div>
    </aside>
  );
}
