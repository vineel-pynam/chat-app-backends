import { text } from "express";
import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

const conversationSchema = new mongoose.Schema({
  users: [{
    type: String,
    required: true
  }],
  msgs: [msgSchema]
});

const conversationModel = mongoose.model('conversation', conversationSchema);
export default conversationModel;