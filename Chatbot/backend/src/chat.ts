import express from "express";
import axios from "axios";

const app = express();

const WIT_API_URL = "https://api.wit.ai/event";
const WIT_ACCESS_TOKEN = "CE6IQX6MTDUBJSMF2ENQXEIZVB3UAS2H";

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const userMessage = req.body.message as string;

    if (!userMessage) {
      res.status(400).send("Invalid request body: 'message' must be provided");
      return;
    }

    const response = await axios.post(
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

    res.status(200).json(response.data);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
});

export default app;
