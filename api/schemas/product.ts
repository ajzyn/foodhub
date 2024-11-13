import { Category } from '@prisma/client'
import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Nazwa produktu jest wymagana'),
  category: z.nativeEnum(Category, {
    errorMap: () => ({ message: 'Proszę wybrać kategorię produktu' })
  }),
  description: z.string().optional(),
  price: z.number().min(1, 'Cena musi być większa niż 0'),
  bulkPrice: z.string().optional(),
  minOrder: z.number().min(1, 'Minimalne zamówienie musi być większe niż 0'),
  leadTime: z.string().optional(),
  certifications: z.string().optional()
})

export type Product = z.infer<typeof productSchema>
