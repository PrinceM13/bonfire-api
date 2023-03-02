const express = require("express");

const userController = require("../controllers/user-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/profile", userController.getMyProfile);
router.patch("/profile/info", userController.editMyProfile);
router.patch("/profile/image", upload.single("profileImage"), userController.editMyProfileImage);
router.patch("/link", userController.editMyLink);
router.get("/events", userController.getMyEvent);

module.exports = router;
