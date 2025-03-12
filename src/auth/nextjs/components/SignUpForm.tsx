"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { oAuthSignIn, signUp } from "../actions";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signUpSchema } from "../schemas";
import { Separator } from "@/components/ui/separator";
import { Icons } from "@/icons";

const Github = Icons["github"];
const Discord = Icons["discord"];
const Google = Icons["google"];

export function SignUpForm() {
  const [error, setError] = useState<string>();
  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    const error = await signUp(data);
    setError(error);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {error && <p className="text-destructive">{error}</p>}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          onClick={async () => await oAuthSignIn("discord")}
        >
          <Discord className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          onClick={async () => await oAuthSignIn("github")}
        >
          <Github className="h-5 w-5" />
        </Button>
        <Button variant="outline">
          <Google className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
