const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
      default: "자기소개",
    },
    profPic: {
      type: String,
      required: false,
    },
    channels: {
      type: Array,
      required: false,
      default: [],
    },
    waitResList: {
      type: Array,
      required: false,
      default: [],
    },
    waitReqList: {
      type: Array,
      required: false,
      default: [],
    },
    following: {
      type: Array,
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserSchema;
