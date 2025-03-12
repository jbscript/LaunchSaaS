import { LogOutButton } from "@/components/auth/nextjs/components/LogOutButton";
import { getCurrentUser } from "@/components/auth/nextjs/currentUser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function SettingPage() {
  const fullUser = await getCurrentUser({ withFullUser: true });

  if (fullUser == null) {
    redirect("/sign-in");
  }

  return (
    <div>
      <Card className="max-w-[500px] mt-4">
        <CardHeader>
          <CardTitle>User: {fullUser.name}</CardTitle>
          <CardDescription>Role: {fullUser.role}</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/private">Private Page</Link>
          </Button>
          {fullUser.role === "admin" && (
            <Button asChild variant="outline">
              <Link href="/admin">Admin Page</Link>
            </Button>
          )}
          <LogOutButton />
        </CardFooter>
      </Card>
    </div>
  );
}
