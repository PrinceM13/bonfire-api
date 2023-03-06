const express = require("express");

const eventController = require("../controllers/event-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", upload.single("image"), eventController.createEvent);
router.get("/", eventController.getAllEvents);
router.get("/:eventId", eventController.getEventsById);
// router.get("/?category=category")
// router.get("/?date=date")
// router.get("/?location=location")
router.patch("/:eventId", upload.single("image"), eventController.updateEvents);
router.delete("/:eventId", eventController.deleteEvents);

module.exports = router;
