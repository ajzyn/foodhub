import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  emptyStringAsUndefined: true,
  client: {
    NEXT_PUBLIC_DOMAIN: z.string(),
    NEXT_PUBLIC_SCHEME: z.string()
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    NEXT_PUBLIC_SCHEME: process.env.NEXT_PUBLIC_SCHEME
  }
})
