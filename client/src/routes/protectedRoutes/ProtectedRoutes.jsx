import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore/useAuthStore";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  // const isAuthenticated = false;

  return isAuthenticated ? children : <Navigate to="/login" />;
}
