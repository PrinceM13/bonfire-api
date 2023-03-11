const express = require("express");

const chatController = require("../controllers/chat-controller");

const router = express.Router();

router.get("/:eventId", chatController.getAllChatByEventId);

module.exports = router;
