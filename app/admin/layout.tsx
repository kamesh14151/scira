import { PropsWithChildren } from 'react';
import { requireAdmin } from '@/lib/admin/server';
import { redirect } from 'next/navigation';
import { SidebarLayout } from '@/components/sidebar-layout';

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
    <SidebarLayout>
      <div className="flex h-screen flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-4">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col overflow-auto">
          {children}
        </div>
      </div>
    </SidebarLayout>
  );
}
