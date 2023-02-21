const express = require("express");

const router = express.Router();

router.get("/profile");
router.patch("/profile");
router.patch("/link");
router.get("/events");

module.exports = router;
