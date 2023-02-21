const express = require("express");

const router = express.Router();

app.get("/profile");
app.patch("/profile");
app.patch("/link");
app.get("/events");

module.exports = router;
