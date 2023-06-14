import "./SignIn.css"
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../auth/authSlice";
import { useLoginMutation } from "../../auth/api";
import { useNavigate } from "react-router-dom";




const SignIn = () => {

    const dispatch = useDispatch();
 
    // permet de gérer les inputs
    const [credentials, setCredentials] = useState({
      email: "",
      password: "",
    });
    // permet de gérer les erreurs
    const [errorMessage, setErrorMessage] = useState("");
  
    // usenavigate
    const navigate = useNavigate();
  
    // permet de gérer les inputs
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      // console.log(name, value);
      setCredentials((prevState) => ({ ...prevState, [name]: value }));
    };
  
    // permet de gérer la soumission du formulaire
    const [login, { data }] = useLoginMutation();
    
    
  
    // permet de gérer la soumission du formulaire
    const handleLogin = async (event) => {
      console.log("hello");
      event.preventDefault();
      try {
        // fetch l'email et le mdp ( login ) --> voir api.js (methode login)
        const result = await login(credentials);
        console.log("login res", result);
        // fetch avec le token qu'on vient de récupérer avec login pour récupérer les infos utilisateur --> voir api.js (methode getUserInfos)
        dispatch(loginSuccess(result.data.body.token));
        // save token in session storage
        sessionStorage.setItem("token", result.data.body.token);
        sessionStorage.setItem("isAuthenticated", true);
        navigate("/profil");
  
        // TODO: handle successful login
      } catch (error) {
        setErrorMessage("Invalid email or password");
      }
    };
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input 
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            type="text" id="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
            type="password" id="password" />
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          <div className="input-remember">
            <input   type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>


          <button onClick={handleLogin} className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
