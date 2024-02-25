import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecipeCard from "./RecipeCard.jsx";
import { useCookies } from "react-cookie";

function RecipeDetail() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [cookies, setCookies] = useCookies(["token"]);

  useEffect(() => {
    // Make a GET request to a URL
    axios
      .get(`http://localhost:3001/recipes/${recipeId}`)
      .then((response) => {
        // handle success
        setRecipe(response.data);
      })
      .catch((error) => {
        // handle error
        alert(
          "There was an error while getting recepie from database, Please try again."
        );
      });
  }, []);
  return (
    <div className="w-full flex justify-center">
      <div className="border border-gray-300 rounded-lg shadow-md p-4 m-4 inline-block text-left w-2/3">
        <div className="relative">
          <img
            className="max-w-48"
            src={recipe.imageUrl}
            alt={`This is a picture of ${recipe.name}`}
          />
          {recipe.userOwner === cookies.token.id && (
            <div className="absolute top-2 right-2">
              <div className="mb-3 flex justify-center items-center gap-x-1">
                <i
                  // onClick={handleDelete}
                  // name={id}
                  className="fa-solid fa-trash hover:text-orange-600 cursor-pointer"
                ></i>
                <i
                  // onClick={() => setIsTasks(false)}
                  className="pl-3 fa-solid fa-pencil hover:text-orange-600 cursor-pointer"
                ></i>
              </div>
            </div>
          )}
        </div>
        <h2>{recipe.name}</h2>
        <p>{recipe.ingredient}</p>
        <p>{recipe.instructions}</p>
        <p>{recipe.cookingTime}</p>
        {/* <p>{recipe.userOwner}</p> */}
      </div>
    </div>
  );
}

export default RecipeDetail;
