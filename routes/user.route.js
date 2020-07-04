const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const verifyToken = require("../middleware/serverAuth").verifyToken;

router.get("/", verifyToken, controller.index);
router.get("/:userName", verifyToken, controller.getInfoUserByUserName);
router.post("/:userName/following", verifyToken, controller.followUser);
router.post("/create", verifyToken, controller.create);
router.post("/authenticate", controller.authenticate);

module.exports = router;
