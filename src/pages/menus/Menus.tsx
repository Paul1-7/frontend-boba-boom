import { DataTable } from "@/components";
import { COLUMNS_DATA_TABLE, DASHBOARD_CONTENT } from "@/constants";
import { MainDashboardContainer } from "@/layout";

const Menus = () => {
  const data = [{ nombre: "ss" }];
  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.menus.default}>
      <DataTable columns={COLUMNS_DATA_TABLE.menus} data={data} />
    </MainDashboardContainer>
  );
};

export default Menus;
