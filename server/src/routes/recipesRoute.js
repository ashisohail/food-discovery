import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/recipesModel.js";
import { UserModel } from "../models/usersModel.js";
import { verifyToken } from "./usersRoute.js";

const router = express.Router();

router.get("/getRecipes", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    console.log("recipies", response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/addRecipe", async (req, res) => {
  //const newRecipe = new RecipeModel(req.body);
  const { name, ingredients, instructions, imageUrl, cookingTime, userOwner } =
    req.body;
  const newRecipe = new RecipeModel({
    name,
    ingredients,
    instructions,
    imageUrl,
    cookingTime,
    userOwner,
  });
  console.log("recipie", newRecipe);
  try {
    const response = await newRecipe.save();
    console.log("response", response);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.put("/addRecipe", async (req, res) => {
//   console.log("recipie", newRecipe);
//   try {
//     const newRecipe = await RecipeModel.findById(req.body.recipeId);
//     const user = await UserModel.findById(req.body.userId);
//     user.savedRecipes.push(newRecipe);

//     await newRecipe.save();
//     console.log("response", response);
//     res.json({ savedRecipes: user.savedRecipes });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// router.get("/savedRecipes/ids", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.body.userId);
//     res.json({ savedRecipes: user?.savedRecipes });
//   } catch (reeor) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/savedRecipes", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.body.userId);
//     const savedRecipes = await RecipeModel.find({
//       _id: { $in: user.savedRecipes },
//     });
//     res.json({ savedRecipes });
//   } catch (reeor) {
//     res.status(500).json({ message: error.message });
//   }
// });

export { router as recipesRouter };
