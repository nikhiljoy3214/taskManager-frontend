import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { isLoggedIn } = useSelector((state) => state.user); // Use state.user to access the user slice
  return isLoggedIn ? <Outlet /> : <Navigate to={"/"} />;
}