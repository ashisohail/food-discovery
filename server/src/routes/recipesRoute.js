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
router.post("/addRecipe", async (req, res) => {
  const newRecipe = new RecipeModel({
    _id: new mongoose.Types.ObjectId(),
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

// Edit a Recipe
router.put("/editRecipe", async (req, res) => {
  const recipe = await RecipeModel.findById(req.body._id);
  try {
    recipe.name = req.body.name;
    recipe.ingredients = req.body.ingredients;
    recipe.instructions = req.body.instructions;
    recipe.cookingTime = req.body.cookingTime;
    recipe.imageUrl = req.body.imageUrl;

    const user = await UserModel.findById(req.body.userID);
    await recipe.save();
    res.status(201).json({ updatedRecipe: recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

// Delete Myrecipes
router.delete("/myRecipes/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    await RecipeModel.findByIdAndDelete(recipeId);
    res.status(200).json({ message: "Recipe Deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as recipesRouter };
