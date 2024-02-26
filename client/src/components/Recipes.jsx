import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import image from "../assets/images/Fooddiscovery.jpg";

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
      <div className="flex items-center justify-start mb-10">
        <img
          className="rounded-full h-[300px] w-[300px] pl-10"
          src={image}
          alt="Image of Food"
        />
        <h1 className="text-3xl text-orange-500 h-10 hover:text-orange-600 ml-5">
          "Eating is a necessity, but cooking is an art."
        </h1>
      </div>
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
