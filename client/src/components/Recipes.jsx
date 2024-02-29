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
      <div className="flex items-center mb-10 ">
        {/* flex items-center justify-items-center mb-10 */}

        <img
          className="rounded-full h-[300px] w-[300px] pl-10"
          src={image}
          alt="Image of Food"
        />

        <div className="pl-10 max-w-[60%]">
          <h1 className="text-3xl text-orange-500">
            Eating is a necessity, but cooking is an art.
          </h1>
          <p className="text-black text-sm">
            Food is more than just sustenance; it is a language that speaks to
            our senses and brings people together. Whether you're a food
            enthusiast, a passionate chef, or simply someone who appreciates the
            art of cuisine, sharing your culinary adventures around the globe
            has become a delightful ritual. <br />
            <span className="text-orange-700 text-base">
              So are you ready to Share and Discover your taste!!!
            </span>
          </p>
          <form action="">
            <label htmlFor="serachBar" name="searchBar"></label>
            <input
              className="mt-[6]inline-block self-end text-black font-bold rounded-lg px-6 py-2 uppercase text-sm outline-none"
              type="text"
              // value={searchInput}
              name="searchBar"
              id="searchBar"
              placeholder="search"
              // onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>
      </div>

      <div className="flex w-full flex-wrap	justify-around mb-8 gap-y-6 ">
        {recipes?.map((recipe, index) => {
          return (
            <Link key={index} to={`/recipes/${recipe._id}`}>
              <RecipeCard
                name={recipe.name}
                imageUrl={recipe.imageUrl}
                // id={recipe._id}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Recipes;
