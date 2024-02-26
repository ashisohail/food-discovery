import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import RecipeDetail from "./components/RecipeDetail";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import MyRecipes from "./components/MyRecipes";
import AddRecipe from "./components/AddRecipe";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Nav />
      <div className="mt-40">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/recipes/myRecipes/:userId" element={<MyRecipes />} />
          <Route path="/recipes/addRecipe" element={<AddRecipe />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
