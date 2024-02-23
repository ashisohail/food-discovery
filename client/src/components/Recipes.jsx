import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard.jsx";
import axios from "axios";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    // Make a GET request to a URL
    axios
      .get("http://localhost:3001/recipes/getRecipes")
      .then((response) => {
        // handle success
        console.log("recipes", response.data);
        setRecipes(response.data);
      })
      .catch((error) => {
        // handle error
        alert(error.message);
      });
  }, []);

  return (
    <ul className="flex items-center justify-center ">
      {recipes?.map((recipe, index) => {
        return (
          <RecipeCard
            key={index}
            name={recipe.name}
            imageUrl={recipe.imageUrl}
            id={recipe.id}
          />
        );
      })}
    </ul>
  );
}

export default Recipes;
