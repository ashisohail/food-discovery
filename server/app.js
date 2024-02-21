//Importing and configuring "dotenv" to load the environment variable from ".env"
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { userRouter } from "./src/routes/usersRoute.js";
import { recipesRouter } from "./src/routes/recipesRoute.js";

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const port = 3001;

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
