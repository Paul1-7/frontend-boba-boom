import { z } from 'zod'

const OrderI = z.object({
  id: z.string().optional(),
  customer: z.string({
    required_error: 'El campo del cliente es obligatorio.'
  }),
  total: z
    .number({
      coerce: true,
      invalid_type_error: 'El valor tiene que ser un número'
    })
    .min(0, { message: 'El total debe ser un número positivo.' })
})

const BobaOrderDetailI = z.object({
  idOrder: z.string().optional(),
  idShake: z.set(z.string({ required_error: 'requerido' })),
  idMenu: z
    .string()
    .min(1, { message: 'El campo del menú es obligatorio.' })
    .optional(),
  idBoba: z
    .set(z.string({ required_error: 'requerido' }))
    .min(1, { message: 'Tiene que seleccionar al menos un sabor' })
    .max(3, { message: 'Como maximo se puede seleccionar 3 sabores' }),
  idPrice: z
    .set(z.string({ required_error: 'requerido' }))
    .min(1, { message: 'Tiene que seleccionar el tamaño' })
})

const WaffleOrderDetailI = z.object({
  idOrder: z.string().optional(),
  idFruit: z
    .set(z.string({ required_error: 'requerido' }))
    .min(1, { message: 'Tiene que seleccionar una fruta' }),
  idMenu: z
    .string()
    .min(1, { message: 'El campo del menú es obligatorio.' })
    .optional(),
  idCoating: z
    .set(z.string({ required_error: 'requerido' }))
    .min(1, { message: 'Tiene que seleccionar una cubierta' }),
  idTopping: z.set(z.string({ required_error: 'requerido' })).optional(),
  idPrice: z
    .set(z.string({ required_error: 'requerido' }))
    .min(1, { message: 'Tiene que seleccionar el tamaño' })
})

export const OrderWithDetailsSchema = z.object({
  order: OrderI,
  bobaDetail: z.array(BobaOrderDetailI),
  waffleeDetail: z.array(WaffleOrderDetailI)
})
