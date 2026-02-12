import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface UsersLayoutProps {
  children: ReactNode;
}

export default function UsersLayout({ children }: UsersLayoutProps) {
  return (
    <div className="relative bg-background w-full flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto w-full">
        <div className="space-y-0 w-full">
          {/* Main Card - Full Width */}
          <Card className="w-full rounded-none border-x-0">
            <CardHeader className="pb-4 px-6 lg:px-8">
              <CardTitle className="text-2xl font-bold">All Users</CardTitle>
              <CardDescription className="text-base">View and manage all users in the system</CardDescription>
            </CardHeader>
            <CardContent className="px-6 lg:px-8 pb-6 w-full">{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
