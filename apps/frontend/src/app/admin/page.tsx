import prisma from '@/lib/prisma';
import { PrismaClient } from "database";
import { Users, GraduationCap, BookMarked, FileText, Activity, Wallet, UserPlus, CheckCircle2 } from "lucide-react";

async function getStats() {

  const totalUsers = await prisma.user.count();
  const totalPremium = await prisma.user.count({
    where: {
      subscriptionStatus: "PREMIUM",
      OR: [{ subscriptionEndDate: null }, { subscriptionEndDate: { gte: new Date() } }]
    }
  });
  const totalSubjects = await prisma.subject.count();
  const totalPrograms = await prisma.program.count();
  const totalLessons = await prisma.lesson.count();
  const revenue = await prisma.payment.aggregate({
    where: { status: "SUCCESS" },
    _sum: { amount: true }
  });

  return { totalUsers, totalPremium, totalSubjects, totalPrograms, totalLessons, totalRevenue: revenue._sum.amount || 0 };
}

async function getRecentActivity() {
  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, email: true, createdAt: true }
  });

  const recentCompletions = await prisma.userProgress.findMany({
    where: { completed: true },
    orderBy: { completedAt: "desc" },
    take: 5,
    include: { user: { select: { name: true, email: true } }, lesson: { select: { title: true } } }
  });

  const events = [
    ...recentUsers.map(u => ({
      type: "signup" as const,
      at: u.createdAt,
      label: `${u.name || u.email} vừa đăng ký tài khoản`
    })),
    ...recentCompletions
      .filter(c => c.completedAt)
      .map(c => ({
        type: "completion" as const,
        at: c.completedAt as Date,
        label: `${c.user.name || c.user.email} đã hoàn thành bài "${c.lesson.title}"`
      }))
  ].sort((a, b) => b.at.getTime() - a.at.getTime()).slice(0, 8);

  return events;
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const activity = await getRecentActivity();

  const cards = [
    { title: "Tổng Người dùng", value: stats.totalUsers, icon: Users, color: "bg-blue-500" },
    { title: "Người dùng Premium", value: stats.totalPremium, icon: Activity, color: "bg-emerald-500" },
    { title: "Doanh thu", value: `${stats.totalRevenue.toLocaleString('vi-VN')}đ`, icon: Wallet, color: "bg-amber-500" },
    { title: "Tổng Môn học", value: stats.totalSubjects, icon: BookMarked, color: "bg-indigo-500" },
    { title: "Tổng Chương trình", value: stats.totalPrograms, icon: GraduationCap, color: "bg-purple-500" },
    { title: "Tổng Bài học", value: stats.totalLessons, icon: FileText, color: "bg-orange-500" },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tổng quan hệ thống</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center">
            <div className={`w-14 h-14 ${card.color} text-white rounded-xl flex items-center justify-center mr-4 shadow-sm`}>
              <card.icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Hoạt động gần đây</h2>
        {activity.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <Activity className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500">Chưa có hoạt động nào đáng chú ý.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {activity.map((event, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                {event.type === "signup" ? (
                  <UserPlus className="w-5 h-5 text-blue-500 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                )}
                <span className="text-sm text-gray-700 flex-1">{event.label}</span>
                <span className="text-xs text-gray-400 shrink-0">{new Date(event.at).toLocaleString('vi-VN')}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
