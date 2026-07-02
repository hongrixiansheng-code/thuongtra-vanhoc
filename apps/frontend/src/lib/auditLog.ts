import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export type AdminAuditAction =
  | 'CREATE'
  | 'ROLE_CHANGE'
  | 'SUBSCRIPTION_CHANGE'
  | 'BAN'
  | 'UNBAN'
  | 'DELETE'
  | 'FORCE_LOGOUT'
  | 'NAME_CHANGE'
  | 'EMAIL_CHANGE';

export async function logAdminAction(
  action: AdminAuditAction,
  target: { id: string; email: string },
  detail?: Record<string, unknown>
) {
  const session = await getServerSession(authOptions);
  const adminId = (session?.user as any)?.id as string | undefined;
  const adminEmail = session?.user?.email || 'unknown';

  await prisma.adminAuditLog.create({
    data: {
      adminId,
      adminEmail,
      targetUserId: target.id,
      targetEmail: target.email,
      action,
      detail: detail ? JSON.parse(JSON.stringify(detail)) : undefined
    }
  });
}
