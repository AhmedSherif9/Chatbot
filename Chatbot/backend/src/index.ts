import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRoute";
// import chatRouter from "./routes/chatRoute";
import chatRouter from "./routes/chatRoute";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.log("Failed to connect!", err));

app.use("/user", userRouter);
app.use("/chats", chatRouter);

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
