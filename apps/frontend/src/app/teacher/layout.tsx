import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="h-16 flex items-center justify-between px-6 border-b border-gray-200 bg-white">
        <Link href="/teacher/classes" className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-indigo-600" />
          <span className="font-bold text-slate-800 text-lg">Cổng giáo viên</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{session.user?.email}</span>
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-1.5 text-sm font-medium text-rose-600 hover:text-rose-700"
          >
            <LogOut className="w-4 h-4" /> Đăng xuất
          </Link>
        </div>
      </header>
      <main className="p-6 md:p-8 max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
