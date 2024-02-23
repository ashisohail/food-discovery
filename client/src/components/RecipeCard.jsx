import { useState } from "react";
// import EditProduct from "./EditProduct";
import axios from "axios";

function RecipeCard({
  name,
  imageUrl,
  id,
  index,
  //   setFilteredProducts,
}) {
  const [isRecipe, setIsRecipe] = useState(true);
  //   const handleDelete = () => {
  //     axios
  //       .delete(`http://localhost:3001/recipes/${id}`)
  //       .then((response) => {
  //         if (response.status === 200) {
  //           setFilteredRecipes((preRecipes) => {
  //             return preRecipes.filter((recipe, ind) => index !== ind);
  //           });
  //         } else {
  //           setFilteredRecipes((preRecipes) => {
  //             return [...preRecipes];
  //           });
  //         }
  //       })
  //       .catch(() => {
  //         alert(
  //           "There was an error while deleting recepie to the database, Please try again."
  //         );
  //       });
  //   };
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 m-4 inline-block text-left w-48">
      {isRecipe ? (
        <>
          <img src={imageUrl} />
          <h3 className="mt-1">{name}</h3>
        </>
      ) : (
        <p>Edit</p>
        // <EditRecipe
        //   setFilteredRecipes={setFilteredRecipes}
        //   name={name}
        //   category={category}
        //   price={price}
        //   setIsProduct={setIsProduct}
        //   index={index}
        //   id={id}
        // />
      )}
    </div>
  );
}

export default RecipeCard;
