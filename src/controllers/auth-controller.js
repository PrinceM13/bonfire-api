const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { validateRegister, validateLogin } = require("../validators/auth-validator");

const { User } = require("../models");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    // get data from body
    const data = validateRegister(req.body);

    // check if email is already exist (use email as username)
    const user = await User.findOne({
      where: { [Op.or]: [{ email: data.email || "" }, { googleId: data.googleId || "" }] }
      // where: { email: data.email }
    });
    // throw error (email already used)
    if (user) {
      createError("email is already in use", 400);
    }

    // replace user's password with hashed password from bcrypt
    data.password = await bcrypt.hash(data.password, 12);

    // create user in User table
    await User.create(data);

    // response with success message
    res.status(201).json({ message: "account was successfully created" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    // get data from body
    const data = req.body; // need to fix validator
    // const data = validateLogin(req.body);

    // check if user exist in db
    let user;
    if (!req?.googleId) {
      user = await User.findOne({ where: { email: data.email } });
    } else {
      user = await User.findOne({ where: { googleId: data.googleId } });
    }
    // throw error (invalid user)
    if (!user) {
      createError("invalid email or password", 400);
    }

    // compare password
    if (!req?.googleId) {
      const isCorrect = await bcrypt.compare(data.password, user.password);
      // throw error (wrong password)
      if (!isCorrect) {
        createError("invalid email or password", 400);
      }
    }

    // generate token if both email and password are valid
    const accessToken = jwt.sign(
      {
        id: user.id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        birthDate: user.birthDate,
        bio: user.bio,
        username: user.username,
        education: user.education,
        company: user.company,
        googleId: user.googleId
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    // response with accessToken
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
