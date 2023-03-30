import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";

export default function LoggedInRoutes() {
  const { pin } = useSelector((state) => ({ ...(state as any) }));
  return pin ? <Outlet /> : <Login />;
}
