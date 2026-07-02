import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { isSessionRevokedById } from "@/lib/sessionGuard";
import Link from "next/link";
import { GraduationCap, LogOut } from "lucide-react";

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const role = (session.user as any)?.role;
  if (role !== "TEACHER" && role !== "ADMIN") {
    redirect("/dashboard");
  }

  if (await isSessionRevokedById((session.user as any).id, (session.user as any).iat)) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <Link href="/teacher/classes" className="flex items-center gap-2 min-w-0">
          <GraduationCap className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0" />
          <span className="font-bold text-slate-800 dark:text-white text-base sm:text-lg truncate">Cổng giáo viên</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <span className="hidden sm:inline text-sm text-slate-500 dark:text-slate-400 truncate max-w-[220px]">{session.user?.email}</span>
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-1.5 text-sm font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400"
          >
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Đăng xuất</span>
          </Link>
        </div>
      </header>
      <main className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
