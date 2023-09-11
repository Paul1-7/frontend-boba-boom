import { DataTableColumnsMapping } from '@/components'
import { OrderStates } from '.'

export const COLUMNS_DATA_TABLE: DataTableColumnsMapping = {
  orders: [
    {
      field: 'customer',
      header: 'Cliente',
      type: 'default'
    },
    {
      field: 'total',
      header: 'Total',
      type: 'currency'
    },
    {
      field: 'createdAt',
      header: 'Hora del pedido',
      type: 'time'
    },
    {
      field: 'state',
      header: 'Estado',
      type: 'states'
    },
    {
      field: 'id',
      header: 'Acciones',
      type: 'actions'
    }
  ],
  reports: [
    {
      field: 'customer',
      header: 'Cliente',
      type: 'default'
    },
    {
      field: 'total',
      header: 'Total',
      type: 'currency'
    },
    {
      field: 'createdAt',
      header: 'Hora del pedido',
      type: 'time'
    }
  ],
  flavours: [
    {
      field: 'name',
      header: 'Nombre',
      type: 'default'
    },
    {
      field: 'price',
      header: 'Precio',
      type: 'currency'
    },
    {
      field: 'type',
      header: 'Tipo',
      type: 'states'
    },
    {
      field: 'id',
      header: 'Acciones',
      type: 'actions'
    }
  ]
}
const { CANCEL, COMPLETE, IN_PREPARATION, MODIFY, ON_STANDBY } = OrderStates
export const TABLE_STATES = {
  order: {
    [ON_STANDBY]: { name: ON_STANDBY, color: 'default' },
    [IN_PREPARATION]: { name: IN_PREPARATION, color: 'default' },
    [COMPLETE]: { name: COMPLETE, color: 'success' },
    [MODIFY]: { name: MODIFY, color: 'warning' },
    [CANCEL]: { name: CANCEL, color: 'danger' }
  },
  flavoursType: {
    FRUTALES: {
      name: 'FRUTALES',
      color: 'default'
    },
    ESPECIALES: {
      name: 'ESPECIALES',
      color: 'default'
    },
    'DE LA CASA': {
      name: 'DE LA CASA',
      color: 'default'
    },
    CUBIERTA: {
      name: 'CUBIERTA',
      color: 'default'
    },
    TOPPING: {
      name: 'TOPPING',
      color: 'default'
    }
  }
}
