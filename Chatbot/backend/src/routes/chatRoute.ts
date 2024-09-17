import express from "express";
import jwt from "jsonwebtoken";
import chatModel from "../models/Chat";
import validateJWT from "../middlewares/validateJWT";
import axios from "axios";
import type { IChat } from "../models/Chat";
import type { ISingleMessage } from "../models/Chat";

const router = express.Router();

const WIT_API_URL = "https://api.wit.ai/event";
const WIT_ACCESS_TOKEN = "CE6IQX6MTDUBJSMF2ENQXEIZVB3UAS2H";

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

// a new chat
router.post("/new", validateJWT, async (req, res) => {
  try {
    const userMessage = req.body.message as string;
    if (!userMessage) {
      res.status(400).send("Invalid request body: 'message' must be provided");
      return;
    }
    const userID = res.locals.JWTData.id as string;
    const WitResponse = await axios.post(
      WIT_API_URL,
      {
        type: "message",
        message: userMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${WIT_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        params: {
          v: "20240916",
          session_id: "prodbmt",
          context_map: {},
        },
      }
    );
    const chats = [
      [
        {
          role: "user",
          content: userMessage,
        },
        { role: "bot", content: WitResponse.data.response.text },
      ],
    ];

    const chatDoc = await chatModel.create({
      user: userID,
      allChats: chats,
    });

    res.status(200).json(chatDoc);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
});

// an existing chat
router.post("/", validateJWT, async (req, res) => {
  try {
    const userMessage = req.body.message as string;
    if (!userMessage) {
      res.status(400).send("Invalid request body: 'message' must be provided");
      return;
    }
    const userID = res.locals.JWTData.id as string;
    const chatDoc: IChat | null = await chatModel.findOne({ user: userID });
    const chat = chatDoc?.allChats[chatDoc?.allChats.length - 1];
    chat?.push({ role: "user", content: userMessage } as ISingleMessage);

    const WitResponse = await axios.post(
      WIT_API_URL,
      {
        type: "message",
        message: userMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${WIT_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        params: {
          v: "20240916",
          session_id: "prodbmt",
          context_map: {},
        },
      }
    );
    chat?.push({
      role: "bot",
      content: WitResponse.data.response.text,
    } as ISingleMessage);

    await chatDoc?.save();

    res.status(200).json(WitResponse.data.response.text);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
});

export default router;
