import { PropsWithChildren } from 'react';
import { isAdmin } from '@/lib/admin';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Dashboard - AJ',
  description: 'Admin dashboard for managing users and system settings',
};

export default async function AdminLayout({ children }: PropsWithChildren) {
  const admin = await isAdmin();

  if (!admin) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage users, view analytics, and configure system settings</p>
        </div>
      </div>
      {children}
    </div>
  );
}
