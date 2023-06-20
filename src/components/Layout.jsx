import { Outlet } from "react-router-dom";

const Layout = () => {
  // permet de rendre les routes enfants de la route parent
  return <Outlet />;
};

export default Layout;
