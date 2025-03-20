import { getCurrentUser } from "@/components/auth/nextjs/currentUser";
import { GeneralUserForm } from "@/components/settings/general/general-user-form";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";

export default async function GeneralPage() {
  const fullUser = await getCurrentUser({ withFullUser: true });
  if (fullUser == null) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-8">
      <GeneralUserForm defaultValues={fullUser} />
      <Separator />
    </div>
  );
}
