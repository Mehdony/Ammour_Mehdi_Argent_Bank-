import "./App.css";
import Routing from "./Utils/routing";
import Footer from "./components/Footer/Footer";
import Nav from "./components/Nav/Nav";


function App() {
  return (
    <>
      <Nav />
      <Routing />
      <Footer />
    </>
  );
}

export default App;
