import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import * as jose from "jose";
import { UserModel } from "../models/usersModel.js";

const router = express.Router();

//Get all users
router.get("/getUser", async (req, res) => {
  try {
    const response = await UserModel.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ username, password: hashedPassword });
  await newUser.save();
  res.json({ message: "User Registered Successfully!" });
});

router.post("/login", async (req, res) => {
  console.log("inside login now", req.body);
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Username is incorrect or does not exist! " });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Username or Password Is Incorrect!" });
    }
    const token = jwt.sign({ id: user._id, name: user.username }, "secret");
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        return res.sendStatus(403);
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export { router as userRouter };
