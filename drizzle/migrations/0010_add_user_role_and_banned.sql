-- Migration: Add role and banned fields to user table
-- Created: 2026-02-09

-- Add role column with default 'user'
ALTER TABLE "user" ADD COLUMN "role" varchar NOT NULL DEFAULT 'user';

-- Add check constraint for role enum
ALTER TABLE "user" ADD CONSTRAINT "user_role_check" CHECK ("role" IN ('user', 'admin'));

-- Add banned column with default false
ALTER TABLE "user" ADD COLUMN "banned" boolean NOT NULL DEFAULT false;

-- Create index for admin queries
CREATE INDEX IF NOT EXISTS "user_role_idx" ON "user"("role");
CREATE INDEX IF NOT EXISTS "user_banned_idx" ON "user"("banned");
