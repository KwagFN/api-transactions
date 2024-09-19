import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string({
    required_error: 'DATABASE_URL is NULL',
    invalid_type_error: 'DATABASE_URL must be a String.',
  }),
  PORT: z
    .number({
      required_error: 'PORT is NULL.',
      invalid_type_error: 'PORT must be a Number.',
    })
    .default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success == false) {
  console.error('Invalid environment variables!', _env.error?.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
