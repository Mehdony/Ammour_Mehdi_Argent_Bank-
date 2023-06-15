import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  // eslint-disable-next-line no-unused-vars
  const selector = useSelector((state) => state.auth);
  const location = useLocation();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;