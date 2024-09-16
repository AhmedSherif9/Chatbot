import express from "express";
import jwt from "jsonwebtoken";
import chatModel from "../models/Chat";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.get("/:index", validateJWT, async (request, response) => {
  try {
    const userID = response.locals.JWTData.id;
    const chat = await chatModel.findOne({ user: userID });
    if (!chat) {
      response.status(404).send("User has not started any Chat yet!!!");
    }
    const { index } = request.params;
    const chatIndex = Number(index);
    response.status(200).json(chat?.allChats?.[chatIndex]);
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

router.get("/", validateJWT, async (request, response) => {
  try {
    const userID = response.locals.JWTData.id;
    const chat = await chatModel.findOne({ user: userID });
    if (!chat) {
      response.status(404).send("User has not started any Chat yet!!!");
    }
    response.status(200).json(chat?.allChats);
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

router.post("/", validateJWT, async (request, response) => {
  try {
    const userID = response.locals.JWTData.id;
    const chat = await chatModel.findOne({ user: userID });
    if (!chat) {
      response.status(404).send("User has not started any Chat yet!!!");
    }
    const { message } = request.body;
    const currentChat = chat?.allChats[chat?.allChats.length - 1];
    currentChat?.push(message);
  } catch (error) {
    console.log("error has taken place");
    response.status(500).send("Something went wrong!");
  }
});

export default router;
