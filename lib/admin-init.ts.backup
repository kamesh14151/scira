import { db } from '@/lib/db';
import { user } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

const ADMIN_EMAIL = 'kamesh14151@gmail.com';

/**
 * Ensures the specified admin email has admin role
 * This is called during user data fetching to auto-promote admin
 */
export async function ensureAdminRole(userId: string, email: string): Promise<void> {
  if (email === ADMIN_EMAIL) {
    try {
      await db
        .update(user)
        .set({ role: 'admin' })
        .where(eq(user.id, userId));
      console.log(`✅ Ensured admin role for ${email}`);
    } catch (error) {
      console.error(`❌ Failed to ensure admin role for ${email}:`, error);
    }
  }
}
