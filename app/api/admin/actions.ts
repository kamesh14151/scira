"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { requireAdmin } from "@/lib/admin/server";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const UpdateUserRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["user", "admin"]),
});

const UpdateUserBanStatusSchema = z.object({
  userId: z.string(),
  banned: z.boolean(),
  banReason: z.string().optional(),
});

export interface ActionState {
  success: boolean;
  message: string;
  error?: string;
  user?: any;
}

export async function updateUserRoleAction(
  formData: FormData
): Promise<ActionState> {
  try {
    await requireAdmin();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const data = UpdateUserRoleSchema.parse({
      userId: formData.get("userId"),
      role: formData.get("role"),
    });

    if (session.user.id === data.userId) {
      return {
        success: false,
        message: "You cannot update your own role",
      };
    }

    await db
      .update(user)
      .set({ role: data.role })
      .where(eq(user.id, data.userId));

    const updatedUser = await db.query.user.findFirst({
      where: eq(user.id, data.userId),
    });

    return {
      success: true,
      message: `User role updated to ${data.role}`,
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      message: "Failed to update user role",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateUserBanStatusAction(
  formData: FormData
): Promise<ActionState> {
  try {
    await requireAdmin();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const data = UpdateUserBanStatusSchema.parse({
      userId: formData.get("userId"),
      banned: formData.get("banned") === "true",
      banReason: formData.get("banReason")?.toString(),
    });

    if (session.user.id === data.userId) {
      return {
        success: false,
        message: "You cannot ban/unban yourself",
      };
    }

    await db
      .update(user)
      .set({ banned: data.banned })
      .where(eq(user.id, data.userId));

    const updatedUser = await db.query.user.findFirst({
      where: eq(user.id, data.userId),
    });

    return {
      success: true,
      message: data.banned
        ? "User banned successfully"
        : "User unbanned successfully",
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error updating ban status:", error);
    return {
      success: false,
      message: "Failed to update user status",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
