const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  avatar: String,
  email: String,
  password: String,
  followers: [
    {
      username: String,
      isAccept: Boolean
    }
  ],
  following: [
    {
      username: String,
      isAccept: Boolean
    }
  ]
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
