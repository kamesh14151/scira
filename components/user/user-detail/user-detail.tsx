"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface UserDetailProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    banned: boolean;
    createdAt: Date;
    emailVerified: boolean;
    image: string | null;
  };
  currentUserId: string;
  userAccountInfo?: any;
  userStatsSlot?: React.ReactNode;
  view: "admin" | "public";
}

export function UserDetail({ user, currentUserId, userStatsSlot }: UserDetailProps) {
  const getUserAvatar = () => {
    return user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={getUserAvatar()} />
              <AvatarFallback className="text-2xl">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                {user.id === currentUserId && (
                  <Badge variant="outline">You</Badge>
                )}
              </div>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Role</p>
              <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                {user.role}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <Badge
                variant={user.banned ? "destructive" : "outline"}
                className={user.banned ? "" : "text-green-600"}
              >
                {user.banned ? "Banned" : "Active"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email Verified</p>
              <Badge variant={user.emailVerified ? "outline" : "secondary"}>
                {user.emailVerified ? "Verified" : "Not Verified"}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Joined</p>
              <p className="text-sm">{format(new Date(user.createdAt), "PPP")}</p>
            </div>
          </div>

          {userStatsSlot && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Statistics</h3>
              {userStatsSlot}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function UserStatsCardLoaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-muted rounded w-24 mb-2" />
      <div className="h-8 bg-muted rounded w-16" />
    </div>
  );
}
