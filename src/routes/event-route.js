const express = require("express");

const eventController = require("../controllers/event-controller");

const router = express.Router();

app.post("/", eventController.createEvent);
app.get("/", eventController.getAllEvents);
// app.get("/?category=category")
// app.get("/?date=date")
// app.get("/?location=location")
app.get("/:eventId", eventController.getEventsById);
app.patch("/:eventId", eventController.updateEvents);
app.delete("/:eventId", eventController.deleteEvents);

module.exports = router;
