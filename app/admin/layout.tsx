import { PropsWithChildren } from 'react';
import { requireAdmin } from '@/lib/admin/server';
import { redirect } from 'next/navigation';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { getUser } from '@/lib/auth-utils';
import { getComprehensiveUserData } from '@/lib/user-data-server';

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

  const user = await getUser();
  let userData = null;
  
  if (user) {
    userData = await getComprehensiveUserData();
  }

  return (
    <>
      <AppSidebar
        chatId={null}
        selectedVisibilityType="private"
        onVisibilityChange={() => {}}
        user={userData}
        onHistoryClick={() => {}}
        isOwner={true}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}
