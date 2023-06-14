import "./App.css";
import Profil from "./Pages/Profil/Profil";
import Public from "./Pages/Public/Public";
import SignIn from "./Pages/SignIn/SignIn";
import RequireAuth from "./auth/RequireAuth";
import Footer from "./components/Footer/Footer";
import Layout from "./components/Layout";
import Nav from "./components/Nav/Nav";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="sign-in" element={<SignIn />} />
          {/* <Route path="signup" element={<Signup />} /> */}

          <Route element={<RequireAuth />}>
            <Route path="profil" element={<Profil />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
