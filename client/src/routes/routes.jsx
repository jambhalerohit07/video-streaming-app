import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import Signup from "../pages/signup";
import ForgotPassword from "../pages/forgot-password";
import Loader from "./../components/Loader";
import LazyWrapper from "./LazyWrapper";
import Task from "../pages/task/Task";

const AuthLayout = lazy(() => import("./Layouts/AuthLayout"));
const MainLayout = lazy(() => import("./Layouts/MainLayout"));

const ProtectedRoute = lazy(() => import("./protectedRoutes/ProtectedRoutes"));
const PublicRoute = lazy(() => import("./publicRoutes/PublicRoutes"));
const RoleBasedRoute = lazy(() => import("./roleBasedRoutes/RoleBasedRoute"));

const Login = lazy(() => import("../pages/login"));
const Home = lazy(() => import("../pages/home"));
const Dashboard = lazy(() => import("../pages/dashboard/index"));

export default function AppRoutes() {
  const routes = [
    {
      element: (
        <LazyWrapper>
          <AuthLayout />
        </LazyWrapper>
      ),
      children: [
        {
          path: "/login",
          element: (
            <LazyWrapper>
              <PublicRoute>
                <Login />
                {/* <Task /> */}
              </PublicRoute>
            </LazyWrapper>
          ),
        },
        {
          path: "/register",
          element: (
            <LazyWrapper>
              <PublicRoute>
                <Signup />
              </PublicRoute>
            </LazyWrapper>
          ),
        },
        {
          path: "/forgot-password",
          element: (
            <LazyWrapper>
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            </LazyWrapper>
          ),
        },
      ],
    },

    {
      element: (
        <LazyWrapper>
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        </LazyWrapper>
      ),
      children: [
        {
          path: "/",
          element: (
            <LazyWrapper>
              <Dashboard />
            </LazyWrapper>
          ),
        },
      ],
    },
  ];

  return useRoutes(routes);
}
