const mongoose = require("mongoose");

const UserSchema = require("./user.model");
const ChannelSchema = require("./channel.model");
const WaitListSchema = require("./waitList.model");


module.exports = {
  User: mongoose.model("User", UserSchema),
  Channel: mongoose.model("Channel", ChannelSchema),
  WaitList: mongoose.model("WaitList", WaitListSchema),
};
