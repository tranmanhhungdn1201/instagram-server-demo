const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const likeSchema = new Schema({
  userId: String,
  postId: String
});

const Like = mongoose.model("Like", likeSchema, "likes");

module.exports = Like;
