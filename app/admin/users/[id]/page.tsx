import { notFound, redirect } from "next/navigation";
import { getUser } from "@/lib/admin/server";
import { UserDetail } from "@/components/user/user-detail/user-detail";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { requireAdmin } from "@/lib/admin/server";
import { Suspense } from "react";
import { UserStatsCardLoaderSkeleton } from "@/components/user/user-detail/user-stats-card-loader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  try {
    await requireAdmin();
  } catch {
    redirect("/");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  return (
    <UserDetail
      user={user}
      currentUserId={session.user.id}
      userAccountInfo={null}
      userStatsSlot={
        <Suspense fallback={<UserStatsCardLoaderSkeleton />}>
          <div>User Stats</div>
        </Suspense>
      }
      view="admin"
    />
  );
}
