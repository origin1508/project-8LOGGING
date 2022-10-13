const { Schema } = require("mongoose");

const chatLogSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ChatRoom",
    },
    chatLog: {
      type: String,
    },
    user: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = chatLogSchema;