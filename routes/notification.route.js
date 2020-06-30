const express = require("express");
const router = express.Router();
const controller = require("../controllers/notification.controller");

router.route("/:id").get(controller.index);
router.route("/").post(controller.create);

module.exports = router;
