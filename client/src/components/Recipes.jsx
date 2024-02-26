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
    <>
      <h2 className="text-3xl text-orange-500 h-10 hover:text-orange-600">
        <span className="text-yellow-500">"Eating is a necessity,</span> but
        cooking is an art."
      </h2>
      <div className="flex w-full flex-wrap	justify-around mb-8">
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
    </>
  );
}

export default Recipes;
