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
      <div className="flex-1 overflow-y-auto p-4 md:p-6 w-full">
        <div className="space-y-4 w-full max-w-7xl mx-auto">
          {/* Main Card */}
          <Card className="w-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold">All Users</CardTitle>
              <CardDescription className="text-base">View and manage all users in the system</CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-6 pb-6 w-full">{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
