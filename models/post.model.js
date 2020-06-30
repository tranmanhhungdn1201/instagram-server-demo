const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const postSchema = new Schema({
  caption: String,
  imageUrl: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      username: String,
      content: String,
      date: Date
    }
  ]
});

const Post = mongoose.model("Post", postSchema, "posts");
module.exports = Post;
