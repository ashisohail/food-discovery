import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    // Make a GET request to a URL
    axios
      .get("http://localhost:3001/recipes/getRecipes")
      .then((response) => {
        // handle success
        setRecipes(response.data);
      })
      .catch((error) => {
        // handle error
        alert(error.message);
      });
  }, []);

  return (
    <div className="flex items-center justify-center ">
      {recipes?.map((recipe, index) => {
        return (
          <Link key={index} to={`/recipes/${recipe._id}`}>
            <RecipeCard
              name={recipe.name}
              imageUrl={recipe.imageUrl}
              id={recipe._id}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default Recipes;
