import { DASHBOARD_ROUTE, ROUTES } from "@/constants";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { NotFound, RoutesWithNotFound } from "@/pages";
import { Navigate, Route } from "react-router-dom";

const MainRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route
        path="/"
        element={
          <Navigate to={`${DASHBOARD_ROUTE}/${ROUTES.orders.default}`} />
        }
      />
      <Route path={DASHBOARD_ROUTE} element={<DashboardLayout />}>
        <Route path={ROUTES.orders.default} element={<NotFound />} />
      </Route>
    </RoutesWithNotFound>
  );
};

export default MainRoutes;
