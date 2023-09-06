import { DataTableColumnsMapping } from '@/components'

export const COLUMNS_DATA_TABLE: DataTableColumnsMapping = {
  orders: [
    {
      field: 'nombre',
      header: 'Nombre',
      type: 'currency'
    },
    {
      field: 'total',
      header: 'total',
      type: 'states'
    }
  ],
  menus: [
    {
      field: 'nombre',
      header: 'Nombre',
      type: 'default'
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

export const TABLE_STATES = {
  order: [
    { name: 'Pendiente', color: 'warning' },
    { name: 'En preparacion', color: 'primary' },
    { name: 'Preparado', color: 'primary' },
    { name: 'Completado', color: 'success' }
  ],
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
