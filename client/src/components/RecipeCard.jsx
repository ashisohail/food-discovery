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

  const recipeDetailHandler = () => {
    axios
      .get(`http://localhost:3001/recipes/${id}`)
      .then((response) => {
        if (response.status === 200) {
        }
      })
      .catch(() => {
        alert(
          "There was an error while getting recepie from database, Please try again."
        );
      });
  };
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
    <div className="w-80">
      {isRecipe ? (
        <>
          {/* <img src={imageUrl} />
          <h3 className="mt-1">{name}</h3> */}
          <div className="flex flex-auto h-60 w-[100%] justify-center border-[1px] border-black items-center mx-2 my-1 overflow-hidden cursor-pointer">
            <div
              className="w-full h-full grid place-items-center hover:-translate-y-1 hover:scale-110 duration-[2000ms]"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
              }}
            >
              <div className="border-[1px] border-black px-3 py-2 flex flex-col items-center mx-auto w-3/6 bg-neutral-100 opacity-50">
                <h2 className="text-lg font-semibold">{name}</h2>
              </div>
            </div>
          </div>
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
