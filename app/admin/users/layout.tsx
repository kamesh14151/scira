import type { ReactNode } from "react";

interface UsersLayoutProps {
  children: ReactNode;
}

export default function UsersLayout({ children }: UsersLayoutProps) {
  return (
    <div className="flex-1 w-full p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">All Users</h2>
        <p className="text-muted-foreground">View and manage all users in the system</p>
      </div>
      {children}
    </div>
  );
}
