const mongoose = require("mongoose");

const UserSchema = require("./user.model");

module.exports = {
  User: mongoose.model("User", UserSchema),
};
