import { z } from 'zod'

export const userSchema = z.object({
  email: z.string().email('Nieprawidłowy adres e-mail'),
  password: z.string().min(8, 'Hasło musi mieć minimum 8 znaków')
})

export type User = z.infer<typeof userSchema>
