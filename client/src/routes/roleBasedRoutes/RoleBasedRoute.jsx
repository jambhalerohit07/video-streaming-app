import { Navigate } from "react-router-dom";

export default function RoleBasedRoute({ children, allowedRoles }) {
  const role = ["admin", "user"];

  return allowedRoles.includes(role) ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
}
