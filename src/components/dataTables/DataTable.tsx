import { renderStrategies } from "@/strategies";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import { v4 as uuid } from "uuid";
import { ColumnsDataTable } from ".";

interface CustomData {
  field: string;
  complement: unknown;
}

interface Props<T> {
  columns: ColumnsDataTable[];
  data: T[];
  customData?: CustomData[];
}

const DataTable = <T,>({ columns, data, customData }: Props<T>) => {
  return (
    <Table aria-labelledby="table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.field}
            aria-labelledby={column.field}
            className="uppercase"
          >
            {column.header}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item: T) => (
          <TableRow key={uuid()}>
            {(columnValue) => {
              const column = columns.find(({ field }) => columnValue === field);

              const renderStrategy =
                renderStrategies?.[column?.type ?? "currency"];

              const props = {
                value: "",
                complement: {},
              };

              const { complement } =
                customData?.find(({ field }) => field === column?.field) ?? {};

              props.value = getKeyValue(item, column?.field ?? "");
              if (complement) {
                props.complement = complement;
              }

              return <TableCell>{renderStrategy.render(props)}</TableCell>;
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
