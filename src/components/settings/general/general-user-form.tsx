"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// or insertWorkspaceSchema.pick({ name: true }) and updating name to not be nullable
const schema = z.object({
  name: z.string().min(3, "workspace names must contain at least 3 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(3, "role must contain at least 3 characters"),
});
type Schema = z.infer<typeof schema>;

export function GeneralUserForm({ defaultValues }: { defaultValues: Schema }) {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function onSubmit(data: Schema) {
    startTransition(async () => {
      try {
        console.log("data==>", data);
        router.refresh();
      } catch {
        console.log("error");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 items-center gap-6 sm:grid-cols-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="sm:col-span-4">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormDescription>The name of your workspace.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="sm:col-span-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" disabled {...field} />
              </FormControl>
              <FormDescription>
                The email address of the workspace owner.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sm:col-span-full">
          <Button className="w-full sm:w-auto" size="lg">
            {!isPending ? "Confirm" : "Loading..."}
          </Button>
        </div>
      </form>
    </Form>
  );
}
