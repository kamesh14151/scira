import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { user, chat, message, subscription } from '@/lib/db/schema';
import { requireAdmin } from '@/lib/admin/server';
import { eq, desc, count, sql } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Get users with stats
    const users = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image,
        role: user.role,
        banned: user.banned,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        chatCount: count(chat.id),
      })
      .from(user)
      .leftJoin(chat, eq(user.id, chat.userId))
      .groupBy(user.id)
      .orderBy(desc(user.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const [{ total }] = await db.select({ total: count() }).from(user);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch users' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500 }
    );
  }
}
