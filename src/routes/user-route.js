const express = require("express");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/profile", userController.getMyProfile);
router.patch("/profile", userController.editMyProfile);
router.patch("/link", userController.editMyLink);
router.get("/events", userController.getMyEvent);

module.exports = router;
