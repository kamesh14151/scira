import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { db } from '@/lib/db';
import { user } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function isAdmin(): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return false;
  }

  const userData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  return userData?.role === 'admin';
}

export async function requireAdmin(): Promise<void> {
  const admin = await isAdmin();
  
  if (!admin) {
    throw new Error('Unauthorized: Admin access required');
  }
}

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return null;
  }

  const userData = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  return userData;
}

export async function checkUserBanned(userId: string): Promise<boolean> {
  const userData = await db.query.user.findFirst({
    where: eq(user.id, userId),
  });

  return userData?.banned || false;
}
