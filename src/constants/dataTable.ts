import { DataTableColumnsMapping } from "@/components";

export const COLUMNS_DATA_TABLE: DataTableColumnsMapping = {
  orders: [
    {
      field: "nombre",
      header: "Nombre",
      type: "currency",
    },
    {
      field: "estado",
      header: "Estado",
      type: "states",
    },
  ],
};

export const TABLE_STATES = {
  order: [
    { name: "Pendiente", color: "warning" },
    { name: "En preparacion", color: "primary" },
    { name: "Preparado", color: "primary" },
    { name: "Completado", color: "success" },
  ],
};
