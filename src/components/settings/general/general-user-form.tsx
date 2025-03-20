"use client";
// import { ToggleRoleButton } from "@/app/_components/ToggleRoleButton";
import { updateUser } from "@/components/auth/nextjs/actions";
import { signUpSchema } from "@/components/auth/nextjs/schemas";
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
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const userNameSchema = signUpSchema.pick({ name: true });

type Schema = z.infer<typeof userNameSchema>;

export function GeneralUserForm({ defaultValues }: { defaultValues: Schema }) {
  const form = useForm<Schema>({
    resolver: zodResolver(userNameSchema),
    defaultValues,
  });

  const [isPending, startTransition] = useTransition();

  async function onSubmit(data: Schema) {
    startTransition(async () => {
      try {
        await updateUser(data);
      } catch {
        console.log("error");
      }
    });
  }

  return (
    <>
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

          <div className="sm:col-span-full">
            <Button className="w-full sm:w-auto" size="lg">
              {!isPending ? "Confirm" : "Loading..."}
            </Button>
          </div>
        </form>
      </Form>

      {/* <ToggleRoleButton /> */}
    </>
  );
}
