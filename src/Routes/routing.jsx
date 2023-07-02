import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Public from "../Pages/Public/Public";
import SignIn from "../Pages/SignIn/SignIn";
import RequireAuth from "../auth/RequireAuth";
import Profil from "../Pages/Profil/Profil";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route element={<RequireAuth />}>
          <Route path="profil" element={<Profil />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
