import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { redirect } from "next/navigation";
import { LogOutButton } from "@/auth/nextjs/components/LogOutButton";

export async function UserNav() {
  const fullUser = await getCurrentUser({ withFullUser: true });

  if (fullUser == null) {
    redirect("/sign-in");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt={fullUser.name}
            />
            <AvatarFallback className="bg-gradient-to-br from-foreground via-muted-foreground to-muted opacity-70">
              j
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="truncate font-medium text-sm leading-none">
              {fullUser?.name}
            </p>
            <p className="truncate text-muted-foreground text-xs leading-none">
              {fullUser?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/app/settings/billing`}>Billing</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/app/settings/user`}>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>{" "}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            {/* REMINDER: consider using that the data-state styles as default */}
            <DropdownMenuSubTrigger className="gap-1 [&_svg]:text-muted-foreground [&_svg]:data-[highlighted]:text-foreground [&_svg]:data-[state=open]:text-foreground">
              <div className="flex w-full flex-row items-center justify-between">
                <span>Switch theme</span>
                {/* <ThemeIcon theme={theme} /> */}
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                {["light", "dark", "system"].map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option}
                    // checked={theme === option}
                    // onClick={() => setTheme(option)}
                    className="justify-between capitalize [&_svg]:text-muted-foreground [&_svg]:data-[highlighted]:text-foreground [&_svg]:data-[state=open]:text-foreground"
                  >
                    {option}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
