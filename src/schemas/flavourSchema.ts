import { z } from 'zod'

export const flavourSchema = z.object({
  id: z.string().optional(),
  type: z.set(z.string()).min(1, { message: 'El tipo es requerido' }),
  name: z.string().min(1, { message: 'El nombre es requerido' }),
  idMenu: z.set(z.string()).min(1, { message: 'El ID del menú es requerido' }),
  price: z.number({
    coerce: true,
    invalid_type_error: 'solo se permiten numeros',
    required_error: 'El campo es requerido'
  })
})
