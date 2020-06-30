const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.index);
router.get("/:userName", controller.getInfoUserByUserName);
router.post("/create", controller.create);
router.post("/authenticate", controller.authenticate);

module.exports = router;
