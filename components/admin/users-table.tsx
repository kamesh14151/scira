"use client";

import { useTransition, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ChevronRight, X } from "lucide-react";
import { AdminUserListItem } from "@/lib/admin/server";
import { cn } from "@/lib/utils";
import { buildUserDetailUrl } from "@/lib/admin/navigation-utils";
import Form from "next/form";
import Link from "next/link";

const DEFAULT_SORT_BY = "createdAt";
const DEFAULT_SORT_DIRECTION = "desc";

interface UsersTableProps {
  users: AdminUserListItem[];
  currentUserId: string;
  total: number;
  page: number;
  limit: number;
  query?: string;
  baseUrl?: string;
  sortBy: string;
  sortDirection: "asc" | "desc";
}

function TablePagination({
  currentPage,
  totalPages,
  buildUrl,
}: {
  currentPage: number;
  totalPages: number;
  buildUrl: (params: { page: number }) => string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {currentPage > 1 && (
        <Link
          href={buildUrl({ page: currentPage - 1 })}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Previous
        </Link>
      )}
      <span className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={buildUrl({ page: currentPage + 1 })}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Next
        </Link>
      )}
    </div>
  );
}

function SortableHeader({
  field,
  currentSortBy,
  currentSortDirection,
  onSort,
  children,
}: {
  field: string;
  currentSortBy: string;
  currentSortDirection: "asc" | "desc";
  onSort: (field: string) => void;
  children: React.ReactNode;
}) {
  const isSorted = currentSortBy === field;

  return (
    <TableHead
      className="font-semibold cursor-pointer hover:bg-muted/50"
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        {isSorted && (
          <span className="text-xs">{currentSortDirection === "asc" ? "↑" : "↓"}</span>
        )}
      </div>
    </TableHead>
  );
}

export function UsersTable({
  users,
  currentUserId,
  total,
  page,
  limit,
  query,
  baseUrl = "/admin/users",
  sortBy = DEFAULT_SORT_BY,
  sortDirection = DEFAULT_SORT_DIRECTION,
}: UsersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [_, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const totalPages = Math.ceil(total / limit);

  const buildUrl = useCallback(
    (
      params: {
        page?: number;
        sortBy?: string;
        sortDirection?: "asc" | "desc";
        query?: string;
      } = {},
    ) => {
      const searchParams = new URLSearchParams();

      const finalPage = params.page ?? page;
      const finalSortBy = params.sortBy ?? sortBy;
      const finalSortDirection = params.sortDirection ?? sortDirection;
      const finalQuery = params.query ?? query;

      if (finalPage && finalPage !== 1) {
        searchParams.set("page", finalPage.toString());
      }
      if (finalSortBy && finalSortBy !== DEFAULT_SORT_BY) {
        searchParams.set("sortBy", finalSortBy);
      }
      if (finalSortDirection && finalSortDirection !== DEFAULT_SORT_DIRECTION) {
        searchParams.set("sortDirection", finalSortDirection);
      }
      if (finalQuery) {
        searchParams.set("query", finalQuery);
      }

      const queryString = searchParams.toString();
      return queryString ? `${baseUrl}?${queryString}` : baseUrl;
    },
    [baseUrl, page, sortBy, sortDirection, query],
  );

  const handleSort = useCallback(
    (field: string) => {
      const newSortDirection =
        sortBy === field && sortDirection === "asc" ? "desc" : "asc";

      router.push(
        buildUrl({
          sortBy: field,
          sortDirection: newSortDirection,
          page: 1,
        }),
      );
    },
    [sortBy, sortDirection, router, buildUrl],
  );

  const handleRowClick = (userId: string) => {
    startTransition(() => {
      const currentSearchString = searchParams.toString();
      const url = buildUserDetailUrl(userId, currentSearchString);
      router.push(url);
    });
  };

  const handleSearchChange = () => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      formRef.current?.requestSubmit();
    }, 300);
  };

  const getUserAvatar = (user: AdminUserListItem) => {
    return user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`;
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Form action={baseUrl} ref={formRef}>
            {page !== 1 && <input type="hidden" name="page" value={1} />}
            {sortBy !== DEFAULT_SORT_BY && (
              <input type="hidden" name="sortBy" value={sortBy} />
            )}
            {sortDirection !== DEFAULT_SORT_DIRECTION && (
              <input type="hidden" name="sortDirection" value={sortDirection} />
            )}
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="Search by name or email..."
              className="pl-9 w-full"
              name="query"
              defaultValue={query}
              onChange={handleSearchChange}
            />
          </Form>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(query ||
            sortBy !== DEFAULT_SORT_BY ||
            sortDirection !== DEFAULT_SORT_DIRECTION) && (
            <Link
              href={baseUrl}
              className={cn("shrink-0", buttonVariants({ variant: "outline", size: "sm" }))}
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Link>
          )}
          <div className="text-sm text-muted-foreground whitespace-nowrap ml-auto">
            Total: {total}
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card w-full overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[600px]">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <SortableHeader
                  field="name"
                  currentSortBy={sortBy}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                >
                  <span className="px-2">User</span>
                </SortableHeader>
                <SortableHeader
                  field="role"
                  currentSortBy={sortBy}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                >
                  Role
                </SortableHeader>
                <TableHead className="font-semibold">Status</TableHead>
                <SortableHeader
                  field="createdAt"
                  currentSortBy={sortBy}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                >
                  Joined
                </SortableHeader>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleRowClick(user.id)}
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3 px-2">
                        <Avatar className="size-8 rounded-full shrink-0">
                          <AvatarImage src={getUserAvatar(user)} />
                          <AvatarFallback className="text-sm">
                            {user.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="font-medium flex items-center gap-2">
                            <span className="truncate">{user.name}</span>
                            {user.id === currentUserId && (
                              <Badge variant="outline" className="text-xs shrink-0">
                                You
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.banned ? "destructive" : "outline"}
                        className={user.banned ? "" : "text-green-600 border-green-600"}
                      >
                        {user.banned ? "Banned" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground whitespace-nowrap">
                      {format(new Date(user.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <TablePagination
        currentPage={page}
        totalPages={totalPages}
        buildUrl={buildUrl}
      />
    </div>
  );
}
