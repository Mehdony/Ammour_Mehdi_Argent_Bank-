import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  const selector = useSelector((state) => state.auth);
  const location = useLocation();

  console.log(selector?.isAuthenticated);

  return selector.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;