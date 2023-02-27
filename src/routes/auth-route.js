require("../config/passport-jwt");

const express = require("express");

const { User } = require("../models");
const googleLoginMiddleWare = require("../middlewares/google-login");
const googleRegisterMiddleWare = require("../middlewares/google-register");
const authController = require("../controllers/auth-controller");
const passportAuthenticate = require("../middlewares/passport-authen");
const crudController = require("../controllers/crud-controller");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/my-categories");
router.post("/login-with-google", googleLoginMiddleWare, authController.login);
router.post("/register-with-google", googleRegisterMiddleWare, authController.login);
router.get("/me", passportAuthenticate, (req, res) => {
  res.send(req.user);
});

router.get("/check-email", crudController.getAllRecords(User, "email"));

module.exports = router;
