import { cn } from "@/lib/utils";
import { Shell } from "@/components/header/shell";
import { AppMenu } from "@/components/settings/app-menu";
import { AppSidebar } from "@/components/settings/app-sidebar";
import { PageId, pagesConfig } from "./pageConfig";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppPageWithSidebarLayout id="settings">
      {children}
    </AppPageWithSidebarLayout>
  );
}

function AppPageWithSidebarLayout({
  id,
  className,
  children,
}: {
  id?: PageId;
  className?: string;
  children: React.ReactNode;
}) {
  const page = pagesConfig.find((page) => page.segment === id);
  console.log("🚀 ~ page:", page);

  return (
    <div className="flex w-full flex-1 flex-col gap-6 lg:flex-row lg:gap-8">
      <Shell className="block py-3 md:py-3 lg:hidden">
        <AppMenu page={page} />
      </Shell>
      <Shell className="hidden max-h-[calc(100vh-8rem)] max-w-min shrink-0 lg:sticky lg:top-28 lg:block">
        <AppSidebar page={page} />
      </Shell>
      <Shell className="relative flex-1 overflow-hidden">
        <div
          className={cn(
            "flex h-full flex-1 flex-col gap-6 md:gap-8",
            className
          )}
        >
          {children}
        </div>
      </Shell>
    </div>
  );
}
