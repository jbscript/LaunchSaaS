import { Separator } from "@/components/ui/separator";

export default async function GeneralPage() {
  return (
    <div className="flex flex-col gap-8">
      <Separator />
      <div className="flex flex-col gap-2">
        <p>Workspace Slug</p>
        <p className="text-muted-foreground text-sm">
          The unique identifier for your workspace.
        </p>
      </div>
    </div>
  );
}
