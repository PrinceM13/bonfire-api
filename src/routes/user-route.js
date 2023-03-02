const express = require("express");

const userController = require("../controllers/user-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/profile", userController.getMyProfile);
router.patch("/profile", upload.single("profileImage"), userController.editMyProfile);
router.patch("/link", userController.editMyLink);
router.get("/events", userController.getMyEvent);

module.exports = router;
