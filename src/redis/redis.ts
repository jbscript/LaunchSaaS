import { env } from "@/data/env/server"
import { Redis } from "@upstash/redis"

export const redisClient = new Redis({
  url: env.REDIS_URL,
  token: env.REDIS_TOKEN,
})
