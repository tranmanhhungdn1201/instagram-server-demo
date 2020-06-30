const express = require("express");
const router = express.Router();
const controller = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

router.get("/", controller.index);
router.get("/:userName", controller.getPostByUser);
router.post("/create", upload.any(), controller.create);
router.post("/comment", controller.comment);

module.exports = router;
