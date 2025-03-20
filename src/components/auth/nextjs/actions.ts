"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { signInSchema, signUpSchema } from "./schemas";
import { db } from "@/drizzle/db";
import { OAuthProvider, UserTable, UserTokenTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import {
  comparePasswords,
  generateSalt,
  hashPassword,
} from "../core/passwordHasher";
import { cookies } from "next/headers";
import { createUserSession, removeUserFromSession } from "../core/session";
import { getOAuthClient } from "../core/oauth/base";
import { generateAndSendToken } from "../core/generateAndSendToken";

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) return "Unable to log you in";

  const user = await db.query.UserTable.findFirst({
    columns: {
      password: true,
      salt: true,
      id: true,
      email: true,
      emailVerified: true,
      role: true,
    },
    where: eq(UserTable.email, data.email),
  });

  if (user == null || user.password == null || user.salt == null) {
    return "Unable to log you in";
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
    salt: user.salt,
  });

  if (!isCorrectPassword) return "Unable to log you in";
  if (!user.emailVerified) return "Please verify your email before logging in";

  await createUserSession(user, await cookies());

  redirect("/app");
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return "Unable to create account";

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  });

  if (existingUser != null) return "Account already exists for this email";

  try {
    const salt = generateSalt();
    const hashedPassword = await hashPassword(data.password, salt);

    const [user] = await db
      .insert(UserTable)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        salt,
      })
      .returning({ id: UserTable.id, role: UserTable.role });

    if (user == null) return "Unable to create account";
    await generateAndSendToken({ email: data.email, userId: user.id });
  } catch {
    return "Unable to create account";
  }

  redirect(`/verify-email?email=${data.email}`);
}

export async function logOut() {
  await removeUserFromSession(await cookies());
  redirect("/sign-in");
}

export async function oAuthSignIn(provider: OAuthProvider) {
  const oAuthClient = getOAuthClient(provider);
  redirect(oAuthClient.createAuthUrl(await cookies()));
}

export async function verifyAndCreateSession(token: string) {
  // Fetch token record
  const tokenRecord = await db.query.UserTokenTable.findFirst({
    where: eq(UserTokenTable.token, token),
  });

  if (!tokenRecord) return { error: "Invalid token." };
  if (new Date(tokenRecord.expiresAt) < new Date())
    return { error: "Token has expired." };

  // Get user
  const user = await db.query.UserTable.findFirst({
    columns: { id: true, role: true },
    where: eq(UserTable.id, tokenRecord.userId),
  });

  if (!user) return { error: "Unable to create account." };

  // Verify email and delete token
  await db.transaction(async (trx) => {
    await trx
      .update(UserTable)
      .set({ emailVerified: true })
      .where(eq(UserTable.id, tokenRecord.userId));

    await trx
      .delete(UserTokenTable)
      .where(eq(UserTokenTable.id, tokenRecord.id));
  });

  await createUserSession(user, await cookies());

  redirect("/app");
}
