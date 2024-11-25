import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  emptyStringAsUndefined: true,
  server: {
    AUTH_SECRET: z.string().url(),
    POSTGRES_URL: z.string(),
    POSTGRES_PRISMA_URL: z.string(),
    POSTGRES_URL_NO_SSL: z.string(),
    POSTGRES_URL_NON_POOLING: z.string(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    AUTH_GITHUB_ID: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    NEXTAUTH_URL: z.string()
  },
  experimental__runtimeEnv: process.env
})
