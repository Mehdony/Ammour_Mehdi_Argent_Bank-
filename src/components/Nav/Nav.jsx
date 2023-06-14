import { Link } from "react-router-dom";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../auth/auth";

const Nav = () => {
  const selector = useSelector((state) => state.auth);
  const { isAuthenticated } = selector;
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.user);
  const { firstname } = userSelector;

  const handleLogout = async (e) => {
    e.preventDefault();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isAuthenticated");
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div className="nav-link-container">
        {isAuthenticated ? (
          <>
            <Link className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i>
              {firstname}
            </Link>
            <Link className="main-nav-item" onClick={handleLogout} to="/">
            <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          </>
        ) : (
            <Link className="main-nav-item" to="/sign-in">
              <i className="fa fa-sign-in"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
