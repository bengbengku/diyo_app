import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoutes() {
  const { pin } = useSelector((state) => ({ ...(state as any) }));

  return pin ? <Navigate to="/" /> : <Outlet />;
}
