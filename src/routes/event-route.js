const express = require("express");

const eventController = require("../controllers/event-controller");

const router = express.Router();

router.post("/", eventController.createEvent);
router.get("/", eventController.getAllEvents);
// router.get("/?category=category")
// router.get("/?date=date")
// router.get("/?location=location")
router.get("/:eventId", eventController.getEventsById);
router.patch("/:eventId", eventController.updateEvents);
router.delete("/:eventId", eventController.deleteEvents);

module.exports = router;
