import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeCard from "./RecipeCard";

function MyRecipes() {
  const { userId } = useParams();
  const [myRecipes, setMyRecipes] = useState([]);
  useEffect(() => {
    // Make a GET request to a URL
    axios
      .get(`http://localhost:3001/recipes/myRecipes/${userId}`)
      .then((response) => {
        // handle success
        if (response.status === 200) {
          setMyRecipes(response.data.myRecipes);
        }
      })
      .catch((error) => {
        // handle error
        alert(error.message);
      });
  }, []);

  return (
    <div className="flex w-full flex-wrap justify-around">
      {myRecipes?.map((myRecipe, index) => {
        return (
          <Link key={index} to={`/recipes/${myRecipe._id}`}>
            <RecipeCard
              name={myRecipe.name}
              imageUrl={myRecipe.imageUrl}
              id={myRecipe._id}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default MyRecipes;
