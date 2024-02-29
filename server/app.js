//Importing and configuring "dotenv" to load the environment variable from ".env"
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { userRouter } from "./src/routes/usersRoute.js";
import { recipesRouter } from "./src/routes/recipesRoute.js";

// retrieve the MongoDB connection string from the environment variables.
const mongoString = process.env.DATABASE_URL;

// establish a connection to the MongoDB database using Mongoose.
mongoose.connect(mongoString);
const database = mongoose.connection;

const app = express();

// configure Express to parse JSON request bodies
app.use(express.json());

// enable Cross-Origin Resource Sharing for all routes.
app.use(cors());

// mounts the user authentication routes at the /auth endpoint.
app.use("/auth", userRouter);

// mounts the recipes routes at the /recipes endpoint.
app.use("/recipes", recipesRouter);

const port = 3001;

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
