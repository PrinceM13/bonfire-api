const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const data = req.body;

    // check if email && googleId are already exist
    const user = await User.findOne({
      where: { email: data.email, googleId: data.googleId }
    });
    if (user) {
      req.googleId = data.googleId;
      next(); // ---> login
    } else {
      res.json({ ...data, needMoreInfo: true }); // ---> back to front for registeration
    }
  } catch (err) {
    next(err);
  }
};
