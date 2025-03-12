import { getCurrentUser } from "@/components/auth/nextjs/currentUser";
import { Button } from "@/components/ui/button";
import React from "react";
const auth = {
  login: { text: "Sign in", url: "/sign-in" },
  signup: { text: "Sign up", url: "/sign-up" },
};
export default async function AuthNavButtons() {
  const fullUser = await getCurrentUser();

  if (fullUser == null) {
    return (
      <>
        <Button asChild variant="outline" size="sm">
          <a href={auth.login.url}>{auth.login.text}</a>
        </Button>
        <Button asChild size="sm">
          <a href={auth.signup.url}>{auth.signup.text}</a>
        </Button>
      </>
    );
  } else {
    return (
      <Button asChild size="sm" variant="outline">
        <a href="/app">Dashboard</a>
      </Button>
    );
  }
}
