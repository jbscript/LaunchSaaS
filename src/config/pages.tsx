import { UserRole } from "@/drizzle/schema";
import { ValidIcon } from "@/icons";

export type Page = {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  icon: ValidIcon;
  disabled?: boolean;
  segment: string;
  children?: Page[];
  role?: UserRole[];
};

export const settingsPagesConfig: Page[] = [
  {
    title: "General",
    description: "General settings for the workspace.",
    href: "/settings/general",
    icon: "cog",
    segment: "general",
  },
  // {
  //   title: "Team",
  //   description: "Team settings for the workspace.",
  //   href: "/settings/team",
  //   icon: "users",
  //   segment: "team",
  // },

  // {
  //   title: "Billing",
  //   description: "Billing settings for the workspace.",
  //   href: "/settings/billing",
  //   icon: "credit-card",
  //   segment: "billing",
  // },
  // {
  //   title: "Appearance",
  //   description: "Appearance settings for the workspace.",
  //   href: "/settings/appearance",
  //   icon: "sun",
  //   segment: "appearance",
  // },
  // {
  //   title: "User",
  //   description: "Profile settings for the user.",
  //   href: "/settings/user",
  //   icon: "user",
  //   segment: "user",
  // },
];

export const monitorPagesConfig: Page[] = [
  {
    title: "Overview",
    description: "Dashboard with all the metrics and charts.",
    href: "/monitors/[id]/overview",
    icon: "line-chart",
    segment: "overview",
  },
  {
    title: "Response logs",
    description: "Data table with all response details.",
    href: "/monitors/[id]/data",
    icon: "table",
    segment: "data",
  },
  {
    title: "Settings",
    description: "Edit section for the monitor.",
    href: "/monitors/[id]/edit",
    icon: "cog",
    segment: "edit",
  },
];

export const statusPagesPagesConfig: Page[] = [
  {
    title: "Settings",
    description: "Edit section for the status page.",
    href: "/status-pages/[id]/edit",
    icon: "cog",
    segment: "edit",
  },
  {
    title: "Status Reports",
    description: "Inform your users about recent reports",
    href: "/status-pages/[id]/reports",
    icon: "megaphone",
    segment: "reports",
  },
  {
    title: "Domain",
    description: "Where you can see the domain settings.",
    href: "/status-pages/[id]/domain",
    icon: "globe",
    segment: "domain",
  },
  {
    title: "Subscribers",
    description: "Where you can see all the subscribers.",
    href: "/status-pages/[id]/subscribers",
    icon: "users",
    segment: "subscribers",
  },
  {
    title: "Maintenance",
    description: "Where you can see all the maintenance.",
    href: "/status-pages/[id]/maintenances",
    icon: "hammer",
    segment: "maintenances",
  },
];

export const statusReportsPagesConfig: Page[] = [
  {
    title: "Overview",
    description: "Overview of the status report.",
    href: "/status-reports/[id]/overview",
    icon: "megaphone",
    segment: "overview",
  },
  {
    title: "Settings",
    description: "Edit section for the status report.",
    href: "/status-reports/[id]/edit",
    icon: "cog",
    segment: "edit",
  },
];

export const notificationsPagesConfig: Page[] = [
  {
    title: "Settings",
    description: "Edit section for the notifications.",
    href: "/notifications/[id]/edit",
    icon: "cog",
    segment: "edit",
  },
];

export type PageId = (typeof pagesConfig)[number]["segment"];

export const pagesConfig = [
  {
    title: "Dashboard",
    description: "Check all the responses in one place.",
    href: "/dashboard",
    icon: "activity",
    segment: "dashboard",
    children: monitorPagesConfig,
    role: ["user", "admin"] as UserRole[],
  },
  {
    title: "Settings",
    description: "Your workspace settings",
    href: "/settings/general",
    icon: "cog",
    segment: "settings",
    children: settingsPagesConfig,
    role: ["user", "admin"] as UserRole[],
  },
  {
    title: "Admin",
    description: "Admin page",
    href: "/admin",
    icon: "cog",
    segment: "admin",
    role: ["admin"] as UserRole[],
  },
] as const satisfies readonly Page[];

type MarketingPageType = Page;

export const marketingProductPagesConfig = [
  {
    href: "/features/monitoring",
    title: "Synthetic Monitoring",
    subtitle:
      "Get insights of the latency of your API and website from all over the world.",
    description: "Monitor your API and website globally.",
    segment: "features",
    icon: "activity",
  },
  {
    href: "/features/status-page",
    title: "Status Page",
    subtitle:
      "Easily report to your users with our public or private status page.",
    description: "Create beautiful status pages within seconds.",
    segment: "features",
    icon: "panel-top",
  },
] as const satisfies MarketingPageType[];

export const marketingResourcePagesConfig = [
  {
    href: "/blog",
    title: "Blog",
    description: "All the latest articles and news from OpenStatus.",
    segment: "blog",
    icon: "book",
  },
  {
    href: "/changelog",
    title: "Changelog",
    description: "All the latest features, fixes and work to OpenStatus.",
    segment: "changelog",
    icon: "newspaper",
  },
  {
    href: "/play/checker",
    title: "Speed Checker",
    description: "Check your endpoints latency right away.",
    segment: "checker",
    icon: "gauge",
  },
  {
    href: "/play",
    title: "Playground",
    description: "All the latest tools build by OpenStatus.",
    segment: "play",
    icon: "toy-brick",
  },
] as const satisfies Page[];

export const marketingPagesConfig = [
  {
    href: "/product",
    title: "Product",
    description: "All product features for OpenStatus",
    segment: "",
    icon: "package",
    children: marketingProductPagesConfig,
  },
  {
    href: "/resources",
    description: "All resources for OpenStatus",
    title: "Resources",
    segment: "",
    icon: "library",
    children: marketingResourcePagesConfig,
  },
  {
    href: "/pricing",
    title: "Pricing",
    description: "The pricing for OpenStatus.",
    segment: "pricing",
    icon: "credit-card",
  },
  {
    href: "https://docs.openstatus.dev",
    description: "The documentation for OpenStatus.",
    title: "Docs",
    segment: "docs",
    icon: "book",
  },
] satisfies Page[];

export function getPageBySegment(
  segment: string | string[],
  currentPage: readonly Page[] = pagesConfig
): Page | undefined {
  if (typeof segment === "string") {
    const page = currentPage.find((page) => page.segment === segment);
    return page;
  }
  if (Array.isArray(segment) && segment.length > 0) {
    const [firstSegment, ...restSegments] = segment;
    const childPage = currentPage.find((page) => page.segment === firstSegment);
    if (childPage?.children) {
      return getPageBySegment(restSegments, childPage.children);
    }
    return childPage;
  }
  return undefined;
}
