const express = require("express"),
  cors = require("cors"),
  app = express(),
  port = process.env.PORT || 8080,
  dotenv = require("dotenv").config(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  userRoute = require("../routes/user.route"),
  postRoute = require("../routes/post.route"),
  likeRoute = require("../routes/like.route"),
  notificationRoute = require("../routes/notification.route"),
  verifyToken = require("../middleware/serverAuth").verifyToken;
mongoose
  .connect(process.env.MONGO_CLUSTER_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connnection successful!"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api/users", userRoute);
app.use("/api/posts", verifyToken, postRoute);
app.use("/api/likes", verifyToken, likeRoute);
app.use("/api/notifications", verifyToken, notificationRoute);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
