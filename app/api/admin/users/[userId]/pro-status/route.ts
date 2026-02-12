import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/server';
import { maindb } from '@/lib/db';
import { user } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Check if the requester is an admin
    await requireAdmin();

    const { userId } = await params;
    const body = await request.json();
    const { adminGrantedPro } = body;

    if (typeof adminGrantedPro !== 'boolean') {
      return NextResponse.json(
        { error: 'adminGrantedPro must be a boolean' },
        { status: 400 }
      );
    }

    // Update the user's admin granted pro status
    await maindb
      .update(user)
      .set({ 
        adminGrantedPro,
        updatedAt: new Date()
      })
      .where(eq(user.id, userId));

    // Revalidate the user detail page
    revalidatePath(`/admin/users/${userId}`);
    revalidatePath('/admin/users');

    return NextResponse.json({
      success: true,
      message: adminGrantedPro 
        ? 'Pro status granted successfully' 
        : 'Pro status revoked successfully',
      adminGrantedPro,
    });
  } catch (error: any) {
    console.error('Error updating admin pro status:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update pro status' },
      { status: 500 }
    );
  }
}
