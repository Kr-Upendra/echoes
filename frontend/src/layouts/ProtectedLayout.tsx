import { Navigate, Outlet } from "react-router-dom";

type Props = { isAuthenticated: boolean };

export default function ProtectedLayout({ isAuthenticated }: Props) {
  console.log(isAuthenticated);
  if (isAuthenticated) return <Outlet />;
  return <Navigate to="/login" />;
}
