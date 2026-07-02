import prisma from '@/lib/prisma';
import UserClient from "./UserClient";

async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

async function getStats() {
  const now = new Date();
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [total, premium, newLast7Days, newLast30Days, expiringSoon] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { subscriptionStatus: 'PREMIUM' } }),
    prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.user.findMany({
      where: {
        subscriptionStatus: 'PREMIUM',
        subscriptionEndDate: { gte: now, lte: in7Days }
      },
      select: { id: true, name: true, email: true, subscriptionEndDate: true },
      orderBy: { subscriptionEndDate: 'asc' }
    })
  ]);

  return { total, premium, free: total - premium, newLast7Days, newLast30Days, expiringSoon };
}

export default async function AdminUsers() {
  const [users, stats] = await Promise.all([getUsers(), getStats()]);

  return (
    <div className="animate-fade-in">
      <UserClient users={users} stats={stats} />
    </div>
  );
}
