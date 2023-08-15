import { DASHBOARD_CONTENT } from "@/constants";
import { MainDashboardContainer } from "@/layout";

const Orders = () => {
  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.orders.default}>
      Orders
    </MainDashboardContainer>
  );
};

export default Orders;
