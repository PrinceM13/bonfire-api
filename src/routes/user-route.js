const express = require("express");

const userController = require("../controllers/user-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/profile", userController.getMyProfile);

router.get("/profile/:userId", userController.getProfileById);
router.patch("/profile", upload.single("profileImage"), userController.editMyProfile);
router.patch("/link", userController.editMyLink);
router.get("/events", userController.getMyEvent);
router.get("/event-users", userController.getMyEventUsers);

module.exports = router;
