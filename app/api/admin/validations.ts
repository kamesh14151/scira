import { z } from "zod";

export const UpdateUserRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["user", "admin"]).optional(),
});

export const UpdateUserBanStatusSchema = z.object({
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
