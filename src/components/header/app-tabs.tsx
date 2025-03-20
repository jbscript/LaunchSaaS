"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import { TabsContainer, TabsLink } from "./tabs-link";
import { pagesConfig } from "@/config/pages";
import { UserRole } from "@/drizzle/schema";

export function AppTabs({ role }: { role: UserRole }) {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <div className="-mb-3">
      <TabsContainer>
        {pagesConfig.map(({ title, segment, href, role: allowedRoles }) => {
          const active = segment === selectedSegment;
          const isAllowed = allowedRoles?.includes(role);
          if (!isAllowed) return null;
          return (
            <TabsLink
              key={segment}
              active={active}
              href={"/app" + href}
              prefetch={false}
              className="relative"
            >
              {title}
            </TabsLink>
          );
        })}
      </TabsContainer>
    </div>
  );
}
