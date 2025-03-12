import { createEnv } from "@t3-oss/env-nextjs"

export const env = createEnv({
  client: {},
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
})
