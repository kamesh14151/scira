"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Edit2, Trash2, ShieldCheck, User, Lock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";

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

export function UserDetail({ user, currentUserId, userStatsSlot, view }: UserDetailProps) {
  const getUserAvatar = () => {
    return user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);

  return (
    <div className="flex-1 w-full p-6">
      <div className="space-y-6 max-w-7xl">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Users
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
          <p className="text-muted-foreground">Manage user information, permissions, and account settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Details Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <CardTitle>User Details</CardTitle>
              </div>
              <CardDescription>Update user information and view account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={getUserAvatar()} />
                    <AvatarFallback className="text-3xl">
                      {user.name.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-background border rounded-full hover:bg-accent">
                    <Edit2 className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Joined</Label>
                    <Input value={format(new Date(user.createdAt), "MMMM do, yyyy")} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Updated</Label>
                    <Input value={format(new Date(user.createdAt), "MMMM do, yyyy")} disabled />
                  </div>
                </div>
              </div>

              <Button className="w-full" disabled={!isEditing}>
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Access & Account Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <CardTitle>Access & Account</CardTitle>
              </div>
              <CardDescription>Manage user permissions, account status, and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Roles Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-semibold">Roles</Label>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Edit Roles
                  </Button>
                </div>
                <div>
                  <Badge 
                    variant={user.role === "admin" ? "default" : "secondary"} 
                    className="text-sm capitalize"
                  >
                    {user.role}
                    <Edit2 className="h-3 w-3 ml-1" />
                  </Badge>
                </div>
              </div>

              <div className="border-t" />

              {/* Account Status Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm font-semibold">Account Status</Label>
                </div>
                <div>
                  <Badge 
                    variant={user.banned ? "destructive" : "outline"}
                    className={user.banned ? "text-sm" : "text-sm text-green-600 border-green-600"}
                  >
                    {user.banned ? "Banned" : "Active"}
                    <Edit2 className="h-3 w-3 ml-1" />
                  </Badge>
                </div>
              </div>

              <div className="border-t" />

              {/* Security Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm font-semibold">Security</Label>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Password Management</p>
                      <p className="text-xs text-muted-foreground">User has a password set</p>
                    </div>
                    <Button variant="outline" size="sm" className="h-8">
                      <Lock className="h-3 w-3 mr-1" />
                      Reset Password
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t" />

              {/* Danger Zone */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-destructive" />
                  <Label className="text-sm font-semibold text-destructive">Danger Zone</Label>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Delete User</p>
                    <p className="text-xs text-muted-foreground mb-2">Permanently remove this user and all associated data</p>
                    <Button variant="destructive" size="sm" className="w-full">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete User
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Section */}
        {userStatsSlot && (
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>User activity and usage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              {userStatsSlot}
            </CardContent>
          </Card>
        )}
      </div>
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
