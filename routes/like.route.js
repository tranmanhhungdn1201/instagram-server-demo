const express = require("express");
const router = express.Router();
const controller = require("../controllers/like.controller");

router.get("/", controller.index);
router.post("/like", controller.create);
router.post("/dislike", controller.destroy);
router.get("/user", controller.getLikeByUserId);

module.exports = router;
