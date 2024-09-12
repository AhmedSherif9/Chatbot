import express from "express";
import UserModel from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validateJWT from "../middlewares/validateJWT";
import { IUser } from "../models/User";

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const UserFound: IUser | null = await UserModel.findOne({ email });
    if (UserFound) {
      response.status(500).send("User already registered");
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const User: IUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: User._id }, process.env.SECRET_KEY || "");
    response.cookie("token", token, {
      path: "/",
      httpOnly: true,
      signed: true,
    });
    response.status(201).json({ name: User.name, email: User.email });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const userFound: IUser | null = await UserModel.findOne({ email });
    if (!userFound) {
      response.status(404).send("email is incorrect");
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      response.status(404).send("password is incorrect");
      return;
    }
    const token = jwt.sign({ id: userFound._id }, process.env.SECRET_KEY || "");
    response.cookie("token", token, {
      path: "/",
      httpOnly: true,
      signed: true,
    });

    response.status(200).json({ name: userFound.name, email: userFound.email });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

router.post("/logout", validateJWT, async (request, response) => {
  response.clearCookie("token", {
    path: "/",
    signed: true,
  });
  response.status(200).send("Logout successfully done");
});

router.get("/profile", validateJWT, async (request, response) => {
  try {
    const userID = response.locals.JWTData.id;
    const user: IUser | null = await UserModel.findById(userID);
    response.status(200).json({ name: user?.name, email: user?.email });
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

export default router;
