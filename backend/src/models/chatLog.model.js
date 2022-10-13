const { Schema } = require("mongoose");

const chatLogSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Room",
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
