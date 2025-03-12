"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "../actions";

export function LogOutButton() {
  return (
    <Button
      variant="destructive"
      className="w-full"
      onClick={async () => await logOut()}
    >
      Log Out
    </Button>
  );
}
