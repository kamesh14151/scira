import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { user } from '@/lib/db/schema';
import { requireAdmin } from '@/lib/admin';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await requireAdmin();

    const { userId } = params;
    const body = await request.json();
    const { role, banned, name, email } = body;

    const updates: Partial<typeof user.$inferInsert> = {};
    
    if (role !== undefined) updates.role = role;
    if (banned !== undefined) updates.banned = banned;
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;

    const [updatedUser] = await db
      .update(user)
      .set(updates)
      .where(eq(user.id, userId))
      .returning();

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update user' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await requireAdmin();

    const { userId } = params;

    await db.delete(user).where(eq(user.id, userId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete user' },
      { status: error instanceof Error && error.message.includes('Unauthorized') ? 403 : 500 }
    );
  }
}
