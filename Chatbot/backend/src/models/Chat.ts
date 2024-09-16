import mongoose, { Schema, Document } from "mongoose";

export interface ISingleMessage extends Document {
  role: string;
  content: string;
}

const singleMessageSchema = new Schema<ISingleMessage>({
  role: { type: String, required: true },
  content: { type: String, required: true },
});

export interface IChat extends Document {
  user: mongoose.Schema.Types.ObjectId;
  allChats: ISingleMessage[][];
}

const chatSchema = new Schema<IChat>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  allChats: { type: [[singleMessageSchema]], required: true },
});

const chatModel = mongoose.model<IChat>("Chat", chatSchema);

export default chatModel;
