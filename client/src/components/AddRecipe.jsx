import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["token"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.userOwner = cookies.token.id;
    console.log("Data", data);

    // Adding a recipe to the DB
    axios
      .post(
        "https://food-discovery-backend.onrender.com/recipes/addRecipe",
        data
      )
      .then((response) => {
        if (response.status === 201) {
          navigate("/");
        }
      })
      .catch(() => {
        alert(
          "There was an error while adding recepie to the database, Please try again."
        );
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 rounded-lg shadow-md p-4 mx-auto inline-block text-left w-2/3 flex justify-center items-center"
    >
      <div className="flex flex-col justify-center w-full">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" placeholder="Name" id="name" required />

        <label htmlFor="ingredients">Ingredients</label>
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients"
          id="ingredients"
          required
        />

        <label htmlFor="instructions">Instructions</label>
        <input
          type="text"
          name="instructions"
          placeholder="Instructions"
          id="instructions"
          required
        />

        <label htmlFor="cookingTime">Cooking Time</label>
        <input
          type="text"
          name="cookingTime"
          placeholder="Cooking Time"
          id="cookingTime"
          required
        />

        <label htmlFor="imageUrl">Image</label>
        <input
          type="text"
          name="imageUrl"
          placeholder="Image-URL"
          id="imageUrl"
          required
        />
        <button
          className="mt-10 border-2 border-black bg-black text-slate-50 p-2 shadow-lg hover:bg-slate-50 hover:text-black text-xs"
          type="submit"
        >
          Add Recipe
        </button>
      </div>
    </form>
  );
}

export default AddRecipe;
