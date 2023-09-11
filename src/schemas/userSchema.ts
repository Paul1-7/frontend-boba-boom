import { z } from 'zod'

export const userSchema = z
  .object({
    id: z.string().optional(),
    user: z
      .string()
      .min(3, 'El campo debe tener al menos 3 caracteres.')
      .max(20, 'El campo no puede tener más de 20 caracteres.'),
    password: z
      .string()
      .optional()
      .refine((password) => !password || password.length >= 4, {
        message: 'El campo debe tener al menos 4 caracteres si se proporciona.'
      }),
    repeatPassword: z.string(),
    idRol: z.set(z.string()).min(1, { message: 'Tiene que seleccionar un rol' })
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['repeatPassword']
  })
