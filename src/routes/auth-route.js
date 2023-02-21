require("../config/passport-jwt");

const express = require("express");

const authController = require("../controllers/auth-controller");
const passportAuthenticate = require("../middlewares/passport-authen");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", passportAuthenticate, (req, res) => {
  res.send(req.user);
});

module.exports = router;
