import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils";

export default function ProtectedLayout() {
  if (!isAuthenticated()) return <Navigate to="/login" />;
  return <Outlet />;
}
