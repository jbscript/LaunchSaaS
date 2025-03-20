import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCurrentUser } from "@/components/auth/nextjs/currentUser";
import { redirect } from "next/navigation";
import { LogOutButton } from "@/components/auth/nextjs/components/LogOutButton";
import { ModeToggle } from "../mode-toggle";
import { Moon, Sun } from "lucide-react";

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
        <DropdownMenuGroup className="p-0">
          <ModeToggle>
            <DropdownMenuItem>
              <div>Theme</div>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:hidden" />
              <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuItem>
          </ModeToggle>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
