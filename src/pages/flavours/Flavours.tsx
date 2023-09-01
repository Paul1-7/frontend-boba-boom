import { DataTable } from "@/components";
import {
  COLUMNS_DATA_TABLE,
  DASHBOARD_CONTENT,
  TABLE_STATES,
} from "@/constants";
import { MainDashboardContainer } from "@/layout";
import { listFlavours } from "@/services";
import { useQuery } from "@tanstack/react-query";

const Orders = () => {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: listFlavours,
  });

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.flavours.default}>
      <DataTable
        columns={COLUMNS_DATA_TABLE.flavours}
        data={data}
        customData={[
          {
            field: "type",
            complement: TABLE_STATES.flavoursType,
          },
        ]}
      />
    </MainDashboardContainer>
  );
};

export default Orders;
