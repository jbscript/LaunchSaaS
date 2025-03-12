import { env } from "@/data/env/server";
import { OAuthClient } from "./base";
import { z } from "zod";

export function createGoogleOAuthClient() {
  return new OAuthClient({
    provider: "google",
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    scopes: ["openid", "email", "profile"],
    urls: {
      auth: "https://accounts.google.com/o/oauth2/auth",
      token: "https://oauth2.googleapis.com/token",
      user: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    userInfo: {
      schema: z.object({
        sub: z.string(),
        name: z.string().nullable(),
        email: z.string().email(),
        picture: z.string().url().optional(),
      }),
      parser: (user) => ({
        id: user.sub,
        name: user.name ?? "",
        email: user.email,
      }),
    },
  });
}
