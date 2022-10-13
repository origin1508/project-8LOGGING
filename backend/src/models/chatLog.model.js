const { Schema } = require("mongoose");

const chatLogSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ChatRoom",
    },
    chat: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = chatLogSchema;