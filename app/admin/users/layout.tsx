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
      <div className="flex-1 overflow-y-auto p-6 w-full">
        <div className="space-y-4 w-full max-w-none">
          {/* Main Card */}
          <Card className="w-full border-none bg-transparent">
            <CardHeader>
              <CardTitle className="text-2xl">All Users</CardTitle>
              <CardDescription>View and manage all users in the system</CardDescription>
            </CardHeader>
            <CardContent className="p-2 md:p-6 w-full">{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
