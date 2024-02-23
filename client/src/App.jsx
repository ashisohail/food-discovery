import "./App.css";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div>
        <Nav />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
