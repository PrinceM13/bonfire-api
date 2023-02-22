const { Op } = require("sequelize");
const { User } = require("../models");
const createError = require("../utils/create-error");

module.exports = async (req, res, next) => {
  try {
    const data = req.body;

    // check if email is already exist (use email as username)
    const user = await User.findOne({
      where: { [Op.or]: [{ email: data.email || "" }, { googleId: data.googleId || "" }] }
    });
    // throw error (email already used)
    if (user) {
      createError("email is already in use", 400);
    }

    // create user in User table
    await User.create(data);

    // go to next middleware
    req.googleId = data.googleId;
    next();
  } catch (err) {
    next(err);
  }
};
