import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { user, chat, message, subscription, messageUsage } from '@/lib/db/schema';
import { requireAdmin } from '@/lib/admin';
import { count, sql, desc, eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    // Get total users
    const [{ totalUsers }] = await db.select({ totalUsers: count() }).from(user);

    // Get total chats
    const [{ totalChats }] = await db.select({ totalChats: count() }).from(chat);

    // Get total messages
    const [{ totalMessages }] = await db.select({ totalMessages: count() }).from(message);

    // Get banned users count
    const [{ bannedUsers }] = await db
      .select({ bannedUsers: count() })
      .from(user)
      .where(eq(user.banned, true));

    // Get admin users count
    const [{ adminUsers }] = await db
      .select({ adminUsers: count() })
      .from(user)
      .where(eq(user.role, 'admin'));

    // Get active subscriptions count
    const [{ activeSubscriptions }] = await db
      .select({ activeSubscriptions: count() })
      .from(subscription)
      .where(eq(subscription.status, 'active'));

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const [{ recentUsers }] = await db
      .select({ recentUsers: count() })
      .from(user)
      .where(sql`${user.createdAt} >= ${sevenDaysAgo}`);

    // Get message usage stats by provider
    const messagesByProvider = await db
      .select({
        provider: messageUsage.provider,
        count: count(),
      })
      .from(messageUsage)
      .groupBy(messageUsage.provider);

    // Get most active users
    const topUsers = await db
      .select({
        userId: chat.userId,
        userName: user.name,
        userEmail: user.email,
        chatCount: count(chat.id),
      })
      .from(chat)
      .innerJoin(user, eq(chat.userId, user.id))
      .groupBy(chat.userId, user.name, user.email)
      .orderBy(desc(count(chat.id)))
      .limit(10);

    return NextResponse.json({
      stats: {
        totalUsers,
        totalChats,
        totalMessages,
        bannedUsers,
        adminUsers,
        activeSubscriptions,
        recentUsers,
      },
      messagesByProvider,
      topUsers,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch stats' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500 }
    );
  }
}
