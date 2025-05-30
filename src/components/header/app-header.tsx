import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { UserNav } from "./user-nav";
import { Breadcrumbs } from "./breadcrumbs";
import { AppTabs } from "./app-tabs";
import { Shell } from "./shell";
import { getCurrentUser } from "../auth/nextjs/currentUser";
import { redirect } from "next/navigation";

export async function AppHeader() {
  const fullUser = await getCurrentUser({ withFullUser: true });
  if (!fullUser) redirect("/sing-in");

  return (
    <header className="sticky top-2 z-50 w-full border-border">
      <Shell className="bg-background/70 px-3 py-3 backdrop-blur-lg md:px-6 md:py-3">
        <div className="flex w-full items-center justify-between">
          <Breadcrumbs />

          <div className="flex items-center gap-1">
            <ul className="hidden gap-1 sm:flex">
              <li className="w-full">
                <Button variant="link" asChild>
                  <Link href="/docs" target="_blank" className="group">
                    Docs
                    <ArrowUpRight className="ml-1 h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-foreground" />
                  </Link>
                </Button>
              </li>
            </ul>
            <div className="relative">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="absolute inset-0">
                <UserNav />
              </div>
            </div>
          </div>
        </div>
        <AppTabs role={fullUser?.role} />
      </Shell>
    </header>
  );
}
