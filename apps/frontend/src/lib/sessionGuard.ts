import prisma from '@/lib/prisma';

/**
 * true nếu phiên đăng nhập phải bị coi là hết hiệu lực: user đã bị ban,
 * hoặc admin đã Force Logout sau thời điểm token này được cấp.
 * tokenIssuedAt = session.user.iat (unix seconds, xem callback `session` trong lib/auth.ts).
 */
export function isRevoked(
  user: { isBanned: boolean; sessionsInvalidatedAt: Date | null },
  tokenIssuedAt?: number
): boolean {
  if (user.isBanned) return true;
  if (user.sessionsInvalidatedAt && tokenIssuedAt && tokenIssuedAt * 1000 < user.sessionsInvalidatedAt.getTime()) {
    return true;
  }
  return false;
}

/** Dùng khi chưa có sẵn user row đã fetch (vd admin/teacher layout) — tự query DB. */
export async function isSessionRevokedById(userId: string, tokenIssuedAt?: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isBanned: true, sessionsInvalidatedAt: true }
  });
  if (!user) return true;
  return isRevoked(user, tokenIssuedAt);
}
