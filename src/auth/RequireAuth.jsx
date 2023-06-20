import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = () => {
  // eslint-disable-next-line no-unused-vars
  const selector = useSelector((state) => state.auth);
  const location = useLocation();
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // si token existe
  return token ? (
    //  alors on affiche les routes enfants de la route parenr
    <Outlet />
  ) : (
    // sinon on redirige vers la page d'accueil
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;

