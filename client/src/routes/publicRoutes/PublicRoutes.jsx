import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore/useAuthStore";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  // const isAuthenticated = false;

  return !isAuthenticated ? children : <Navigate to="/" />;
}
