const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const notificationSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userId: String,
  content: String,
  createAt: { type: Date, default: Date.now() }
});

const Notification = mongoose.model(
  "Notification",
  notificationSchema,
  "notifications"
);

module.exports = Notification;
