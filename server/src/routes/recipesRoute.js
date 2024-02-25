import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/recipesModel.js";
import { UserModel } from "../models/usersModel.js";
import { verifyToken } from "./usersRoute.js";

const router = express.Router();

//Get all recipes
router.get("/getRecipes", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create a new recipe
router.post("/addRecipe", verifyToken, async (req, res) => {
  // const newRecipe = new RecipeModel(req.body);
  // const { name, ingredients, instructions, imageUrl, cookingTime, userOwner } =
  //   req.body;
  const newRecipe = new RecipeModel({
    _id: new mongoose.Types.Objectid(),
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    imageUrl: req.body.imageUrl,
    cookingTime: req.body.cookingTime,
    userOwner: req.body.userOwner,
  });

  try {
    const response = await newRecipe.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a recipe by ID
router.get("/:recipeId", async (req, res) => {
  try {
    const result = await RecipeModel.findById(req.params.recipeId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save a Recipe
router.put("/", async (req, res) => {
  const recipe = await RecipeModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get id of saved recipes
// router.get("/savedRecipes/ids/:userId", async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.userId);
//     res.status(201).json({ savedRecipes: user?.savedRecipes });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get Myrecipes
router.get("/myRecipes/:userId", async (req, res) => {
  try {
    const myRecipes = await RecipeModel.find({
      userOwner: { $in: req.params.userId },
    });
    res.status(200).json({ myRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as recipesRouter };
