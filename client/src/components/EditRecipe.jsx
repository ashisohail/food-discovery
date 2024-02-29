import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditRecipe({ recipe }) {
  const { name, ingredients, instructions, imageUrl, cookingTime } = recipe;
  const [editRecipe, setEditRecipe] = useState(recipe);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Edit recepie in the DB
    axios
      .put("http://localhost:3001/recipes/editRecipe", editRecipe)
      .then((response) => {
        if (response.status === 201) {
          navigate(`/recipes/myRecipes/${recipe.userOwner}`);
        }
      })
      .catch(() => {
        alert(
          "There was an error while adding recepie to the database, Please try again."
        );
      });
  };

  const handleEditChange = (e) => {
    if (e.target.name === "name") {
      setEditRecipe({ ...editRecipe, [e.target.name]: e.target.value });
    }
    if (e.target.name === "ingredients") {
      setEditRecipe({ ...editRecipe, [e.target.name]: e.target.value });
    }
    if (e.target.name === "instructions") {
      setEditRecipe({ ...editRecipe, [e.target.name]: e.target.value });
    }
    if (e.target.name === "imageUrl") {
      setEditRecipe({
        ...editRecipe,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name === "cookingTime") {
      setEditRecipe({
        ...editRecipe,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 rounded-lg shadow-md p-4 mx-auto inline-block text-left w-2/3 flex justify-center items-center"
    >
      <div className="flex flex-col justify-center w-full">
        <label htmlFor="name">Name</label>
        <input
          onChange={handleEditChange}
          type="text"
          name="name"
          placeholder="Name"
          value={editRecipe.name}
          id="name"
          required
        />

        <label htmlFor="ingredients">Ingredients</label>
        <input
          onChange={handleEditChange}
          type="text"
          name="ingredients"
          value={editRecipe.ingredients}
          placeholder="Ingredients"
          id="ingredients"
          required
        />

        <label htmlFor="instructions">Instructions</label>
        <input
          onChange={handleEditChange}
          type="text"
          name="instructions"
          value={editRecipe.instructions}
          placeholder="Instructions"
          id="instructions"
          required
        />

        <label htmlFor="cookingTime">Cooking Time</label>
        <input
          onChange={handleEditChange}
          type="text"
          name="cookingTime"
          value={editRecipe.cookingTime}
          placeholder="Cooking Time"
          id="cookingTime"
          required
        />

        <label htmlFor="imageUrl">Image</label>
        <input
          onChange={handleEditChange}
          type="text"
          name="imageUrl"
          value={editRecipe.imageUrl}
          placeholder="Image-URL"
          id="imageUrl"
          required
        />
        <button
          className="mt-10 border-2 border-black bg-black text-slate-50 p-2 shadow-lg hover:bg-slate-50 hover:text-black text-xs"
          type="submit"
        >
          Save Recipe
        </button>
      </div>
    </form>
  );
}

export default EditRecipe;
