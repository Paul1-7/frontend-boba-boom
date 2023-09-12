import { z } from 'zod'

export const loginSchema = z.object({
  user: z.string().min(1, 'El usuario es requerido'),
  password: z.string().min(1, 'El usuario es requerido')
})
