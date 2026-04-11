import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import Signup from "../pages/signup";
import ForgotPassword from "../pages/forgot-password";
import Loader from "../components/loader/Loader";

const AuthLayout = lazy(() => import("./Layouts/AuthLayout"));
const MainLayout = lazy(() => import("./Layouts/MainLayout"));

const ProtectedRoute = lazy(() => import("./protectedRoutes/ProtectedRoutes"));
const PublicRoute = lazy(() => import("./publicRoutes/PublicRoutes"));
const RoleBasedRoute = lazy(() => import("./roleBasedRoutes/RoleBasedRoute"));

const Login = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));

export default function AppRoutes() {
  const routes = [
    {
      element: (
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <AuthLayout />
        </Suspense>
      ),
      children: [
        {
          path: "/login",
          element: (
            <Suspense
              fallback={
                <div>
                  <Loader />
                </div>
              }
            >
              <PublicRoute>
                <Login />
              </PublicRoute>
            </Suspense>
          ),
        },
        {
          path: "/register",
          element: (
            <Suspense
              fallback={
                <div>
                  <Loader />
                </div>
              }
            >
              <PublicRoute>
                <Signup />
              </PublicRoute>
            </Suspense>
          ),
        },
        {
          path: "/forgot-password",
          element: (
            <Suspense
              fallback={
                <div>
                  <Loader />
                </div>
              }
            >
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            </Suspense>
          ),
        },
      ],
    },

    {
      element: (
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense
              fallback={
                <div>
                  <Loader />
                </div>
              }
            >
              <Home />
            </Suspense>
          ),
        },
      ],
    },
  ];

  return useRoutes(routes);
}
