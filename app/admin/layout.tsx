import { PropsWithChildren } from 'react';
import { requireAdmin } from '@/lib/admin/server';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Dashboard - Scira',
  description: 'Admin dashboard for managing users and system settings',
};

export default async function AdminLayout({ children }: PropsWithChildren) {
  try {
    await requireAdmin();
  } catch {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage users, view analytics, and configure system settings</p>
        </div>
      </div>
      {children}
    </div>
  );
}
