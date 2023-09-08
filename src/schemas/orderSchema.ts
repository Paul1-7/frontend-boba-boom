import { z } from 'zod'

const OrderI = z.object({
  id: z.string().optional(),
  customer: z
    .string()
    .min(1, { message: 'El campo del cliente es obligatorio.' }),
  total: z
    .number({ coerce: true })
    .min(0, { message: 'El total debe ser un número positivo.' })
})

const BobaOrderDetailI = z.object({
  idOrder: z.string().optional(),
  idShake: z.set(z.string({ required_error: 'requerido' })),
  idMenu: z.string().min(1, { message: 'El campo del menú es obligatorio.' }),
  idBoba: z
    .set(z.string({ required_error: 'requerido' }))
    .min(1, { message: 'Tiene que seleccionar al menos un sabor' })
    .max(3, { message: 'Como maximo se puede seleccionar 3 sabores' }),
  price: z.set(z.string({ required_error: 'requerido' })),
  subtotal: z
    .number({ coerce: true })
    .min(0, { message: 'El subtotal debe ser un número positivo.' })
})

export const OrderWithDetailsSchema = z.object({
  order: OrderI,
  bobaDetail: z.array(BobaOrderDetailI)
})
