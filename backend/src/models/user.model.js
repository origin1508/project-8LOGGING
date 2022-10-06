const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    nickname: {
      type: String,
      required: true,
      unique: true
    },
    profPic: {
      type: String,
      required: false
    },
    channels: {
      type: Array,
      required: false,
      default: []
    },
    waitResList: {
      type: Array,
      required: false,
      default: []
    },
    waitReqList: {
      type: Array,
      required: false,
      default: []
    },
    following: {
      type: Array,
      required: false,
      default: []
    },
    description: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = UserSchema;