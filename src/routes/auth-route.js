require("../config/passport-jwt");

const express = require("express");

const googleLoginMiddleWare = require("../middlewares/google-login");
const googleRegisterMiddleWare = require("../middlewares/google-register");
const authController = require("../controllers/auth-controller");
const passportAuthenticate = require("../middlewares/passport-authen");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/login-with-google", googleLoginMiddleWare, authController.login);
router.post("/register-with-google", googleRegisterMiddleWare, authController.login);
router.get("/me", passportAuthenticate, (req, res) => {
  res.send(req.user);
});

module.exports = router;
