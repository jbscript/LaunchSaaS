"use client";

import { useSelectedLayoutSegment } from "next/navigation";

import { TabsContainer, TabsLink } from "./tabs-link";

export const pagesConfig = [
  { title: "Dashboard", segment: "dashboard", href: "/dashboard" },
  { title: "Settings", segment: "settings", href: "/settings" },
];

export function AppTabs() {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <div className="-mb-3">
      <TabsContainer>
        {pagesConfig.map(({ title, segment, href }) => {
          const active = segment === selectedSegment;
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
