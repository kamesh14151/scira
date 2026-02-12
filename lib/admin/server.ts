import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq, or, ilike, sql, desc, asc } from "drizzle-orm";

export const ADMIN_USER_LIST_LIMIT = 10;
export const DEFAULT_SORT_BY = "createdAt";
export const DEFAULT_SORT_DIRECTION = "desc";

export interface AdminUsersQuery {
  searchValue?: string;
  searchField?: string;
  searchOperator?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
}

export interface AdminUserListItem {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  banned: boolean;
  createdAt: Date;
  emailVerified: boolean;
  image: string | null;
  lastLogin: Date | null;
}

export interface AdminUsersPaginated {
  users: AdminUserListItem[];
  total: number;
}

/**
 * Check if the current user is an admin
 */
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

  return userData?.role === "admin";
}

/**
 * Require admin session - throws if not admin
 */
export async function requireAdmin(): Promise<void> {
  const admin = await isAdmin();

  if (!admin) {
    throw new Error("Unauthorized: Admin access required");
  }
}

/**
 * Get a single user by ID
 * Only admins can access this
 */
export async function getUser(userId: string) {
  await requireAdmin();

  try {
    const userData = await db.query.user.findFirst({
      where: eq(user.id, userId),
    });

    return userData;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}

/**
 * Get paginated users with search capabilities
 * Only admins can list and search users
 */
export async function getAdminUsers(
  query?: AdminUsersQuery,
): Promise<AdminUsersPaginated> {
  await requireAdmin();

  const limit = query?.limit ?? ADMIN_USER_LIST_LIMIT;
  const offset = query?.offset ?? 0;
  const sortBy = query?.sortBy ?? DEFAULT_SORT_BY;
  const sortDirection = query?.sortDirection ?? DEFAULT_SORT_DIRECTION;

  try {
    // Build WHERE clause for search
    let whereClause;
    if (query?.searchValue) {
      const searchPattern = `%${query.searchValue}%`;
      whereClause = or(
        ilike(user.name, searchPattern),
        ilike(user.email, searchPattern)
      );
    }

    // Build ORDER BY clause
    const orderByClause =
      sortDirection === "asc"
        ? asc(user[sortBy as keyof typeof user] || user.createdAt)
        : desc(user[sortBy as keyof typeof user] || user.createdAt);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(user)
      .where(whereClause);

    const total = Number(countResult[0]?.count || 0);

    // Get paginated users
    const users = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        banned: user.banned,
        createdAt: user.createdAt,
        emailVerified: user.emailVerified,
        image: user.image,
      })
      .from(user)
      .where(whereClause)
      .orderBy(orderByClause)
      .limit(limit)
      .offset(offset);

    return {
      users: users.map((u) => ({
        ...u,
        lastLogin: null, // You can add lastLogin tracking later
      })),
      total,
    };
  } catch (error) {
    console.error("Error getting admin users", error);
    throw error;
  }
}
