import "./App.css";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Recipes from "./components/Recipes";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div>
        <Nav />
      </div>
      <div>
        <Recipes />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
