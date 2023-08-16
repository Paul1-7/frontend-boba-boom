import { DataTable } from "@/components";
import {
  COLUMNS_DATA_TABLE,
  DASHBOARD_CONTENT,
  TABLE_STATES,
} from "@/constants";
import { MainDashboardContainer } from "@/layout";

const data = [
  {
    id: 1,
    nombre: "hoar",
    estado: 1,
  },
];

const Orders = () => {
  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.orders.default}>
      <DataTable
        columns={COLUMNS_DATA_TABLE.orders}
        data={data}
        customData={[
          {
            field: "estado",
            complement: TABLE_STATES.order,
          },
        ]}
      />
    </MainDashboardContainer>
  );
};

export default Orders;
