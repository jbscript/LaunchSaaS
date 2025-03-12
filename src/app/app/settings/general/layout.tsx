import { Header } from "@/components/header/headers";
import { getPageBySegment } from "@/config/pages";

const page = getPageBySegment(["settings", "general"]);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header title={page?.title} description={page?.description} />
      {children}
    </>
  );
}
