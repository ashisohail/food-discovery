//Importing and configuring "dotenv" to load the environment variable from ".env"
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

// database.on("error", (error) => {
//   console.log(error);
// });

const app = express();
app.use(express.json());
app.use(cors());

const port = 8080;

//Get all Method
app.get("/", (req, res) => {
  res.send("I am ayesha");
});

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
