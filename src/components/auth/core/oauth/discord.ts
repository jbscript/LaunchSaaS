import { env } from "@/data/env/server"
import { OAuthClient } from "./base"
import { z } from "zod"

export function createDiscordOAuthClient() {
  return new OAuthClient({
    provider: "discord",
    clientId: env.DISCORD_CLIENT_ID,
    clientSecret: env.DISCORD_CLIENT_SECRET,
    scopes: ["identify", "email"],
    urls: {
      auth: "https://discord.com/oauth2/authorize",
      token: "https://discord.com/api/oauth2/token",
      user: "https://discord.com/api/users/@me",
    },
    userInfo: {
      schema: z.object({
        id: z.string(),
        username: z.string(),
        global_name: z.string().nullable(),
        email: z.string().email(),
      }),
      parser: user => ({
        id: user.id,
        name: user.global_name ?? user.username,
        email: user.email,
      }),
    },
  })
}
