import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { FullPageLoader } from "./components/LoadingSpinner";
import { ProtectedRoute } from "./components/ProtectedRoute";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignupPage = lazy(() => import("./pages/SignupPage"));
const StaffLoginPage = lazy(() => import("./pages/StaffLoginPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrderConfirmationPage = lazy(
  () => import("./pages/OrderConfirmationPage"),
);
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<FullPageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: ProductsPage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignupPage,
});
const staffLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/staff-login",
  component: StaffLoginPage,
});
const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  ),
});
const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation",
  component: () => (
    <ProtectedRoute>
      <OrderConfirmationPage />
    </ProtectedRoute>
  ),
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedRoute requireStaff>
      <AdminPage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  loginRoute,
  signupRoute,
  staffLoginRoute,
  cartRoute,
  checkoutRoute,
  orderConfirmationRoute,
  dashboardRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
