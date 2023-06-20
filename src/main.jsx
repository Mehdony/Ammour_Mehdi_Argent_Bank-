import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Service/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  {/* provider de redux permet de rendre accessible les données à toute l'application */}
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
