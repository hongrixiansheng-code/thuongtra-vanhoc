import prisma from '@/lib/prisma';

export type PremiumDurationKey = 'none' | '3d' | '7d' | '15d' | '30d' | '90d' | '180d' | '360d';

export const PREMIUM_DURATIONS: Record<Exclude<PremiumDurationKey, 'none'>, { days: number; label: string; price: number }> = {
  '3d': { days: 3, label: '3 ngày', price: 30000 },
  '7d': { days: 7, label: '7 ngày', price: 50000 },
  '15d': { days: 15, label: '15 ngày', price: 75000 },
  '30d': { days: 30, label: '30 ngày', price: 99000 },
  '90d': { days: 90, label: '90 ngày', price: 249000 },
  '180d': { days: 180, label: '180 ngày', price: 449000 },
  '360d': { days: 360, label: '360 ngày', price: 669000 },
};

export function computeExpiryDate(durationKey: Exclude<PremiumDurationKey, 'none'>, from: Date = new Date()): Date {
  const { days } = PREMIUM_DURATIONS[durationKey];
  const result = new Date(from);
  result.setDate(result.getDate() + days);
  return result;
}

export function isSubscriptionActive(user: { subscriptionStatus: string; subscriptionEndDate: Date | null }): boolean {
  if (user.subscriptionStatus !== 'PREMIUM') return false;
  if (!user.subscriptionEndDate) return true;
  return user.subscriptionEndDate.getTime() >= Date.now();
}

export async function syncExpiredSubscription<T extends { id: string; subscriptionStatus: string; subscriptionEndDate: Date | null }>(
  user: T
): Promise<T> {
  if (user.subscriptionStatus === 'PREMIUM' && user.subscriptionEndDate && user.subscriptionEndDate.getTime() < Date.now()) {
    await prisma.user.update({
      where: { id: user.id },
      data: { subscriptionStatus: 'FREE', subscriptionEndDate: null },
    });
    return { ...user, subscriptionStatus: 'FREE', subscriptionEndDate: null };
  }
  return user;
}
