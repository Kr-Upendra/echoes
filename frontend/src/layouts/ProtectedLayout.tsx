import { Navigate, Outlet } from "react-router-dom";

type Props = { isAuthenticated: boolean };

export default function ProtectedLayout({ isAuthenticated }: Props) {
  if (isAuthenticated) return <Outlet />;
  return <Navigate to="/login" />;
}
