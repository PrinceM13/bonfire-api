const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { User } = require("../models");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
};

// sequelize style
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    const user = await User.findOne({
      where: { id: jwt_payload.id },
      attributes: { exclude: ["password"] }
    });
    if (!user) {
      return done(new Error("user not found"), false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);
