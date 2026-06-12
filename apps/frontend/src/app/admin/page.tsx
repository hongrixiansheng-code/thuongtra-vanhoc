import { PrismaClient } from "database";
import { Users, GraduationCap, BookMarked, FileText, Activity } from "lucide-react";

async function getStats() {
  
  const prisma = new PrismaClient();

  const totalUsers = await prisma.user.count();
  const totalPremium = await prisma.user.count({
    where: { subscriptionStatus: "PREMIUM" }
  });
  const totalSubjects = await prisma.subject.count();
  const totalPrograms = await prisma.program.count();
  const totalLessons = await prisma.lesson.count();

  return { totalUsers, totalPremium, totalSubjects, totalPrograms, totalLessons };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { title: "Tổng Người dùng", value: stats.totalUsers, icon: Users, color: "bg-blue-500" },
    { title: "Người dùng Premium", value: stats.totalPremium, icon: Activity, color: "bg-emerald-500" },
    { title: "Tổng Môn học", value: stats.totalSubjects, icon: BookMarked, color: "bg-indigo-500" },
    { title: "Tổng Chương trình", value: stats.totalPrograms, icon: GraduationCap, color: "bg-purple-500" },
    { title: "Tổng Bài học", value: stats.totalLessons, icon: FileText, color: "bg-orange-500" },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tổng quan hệ thống</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Activity className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-500">Chưa có hoạt động nào đáng chú ý.</p>
        </div>
      </div>
    </div>
  );
}
