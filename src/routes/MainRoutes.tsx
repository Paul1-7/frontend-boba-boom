import { DASHBOARD_ROUTE, ROUTES } from "@/constants";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import { RoutesWithNotFound } from "@/pages";
import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
const Orders = lazy(() => import("@/pages/orders/Orders"));
const Menus = lazy(() => import("@/pages/menus/Menus"));
const Flavours = lazy(() => import("@/pages/flavours/Flavours"));

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
        <Route path={ROUTES.orders.default} element={<Orders />} />
        <Route path={ROUTES.menus.default} element={<Menus />} />
        <Route path={ROUTES.flavours.default} element={<Flavours />} />
      </Route>
    </RoutesWithNotFound>
  );
};

export default MainRoutes;
