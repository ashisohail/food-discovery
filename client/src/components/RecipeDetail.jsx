import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RecipeCard from "./RecipeCard.jsx";
import { useCookies } from "react-cookie";
import EditRecipe from "./EditRecipe";

function RecipeDetail() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({});
  const [cookies, setCookies] = useCookies(["token"]);
  const [isRecipe, setIsRecipe] = useState(true);

  const navigate = useNavigate();

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

  const handleDeleteRecipe = () => {
    // Make a Delete request to a URL
    axios
      .delete(`http://localhost:3001/recipes/myRecipes/${recipeId}`)
      .then((response) => {
        // handle success
        if (response.status === 200) {
          alert(response.data.message);
          navigate(`/recipes/myRecipes/${cookies.token.id}`);
        }
      })
      .catch((error) => {
        // handle error
        alert(
          "There was an error while deleting recipe from database, Please try again."
        );
      });
  };
  const handleEditRecipe = () => {
    setIsRecipe(false);
  };
  return (
    <>
      {isRecipe ? (
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
                      onClick={handleDeleteRecipe}
                      className="fa-solid fa-trash hover:text-orange-600 cursor-pointer"
                    ></i>

                    {/* Edit Recipe Icon */}
                    <i
                      onClick={handleEditRecipe}
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
          </div>
        </div>
      ) : (
        <EditRecipe recipe={recipe} />
      )}
    </>
  );
}

export default RecipeDetail;
