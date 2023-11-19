require("dotenv").config();

const passport = require("passport");
const LocalStrategy = require("passport-local");

const crypto = require("crypto");

const User = require("../models/user.model");

// Local strategy configuration
passport.use(
  new LocalStrategy(async (username, password, cb) => {
    const user = await User.findOne({ where: { email: username } });
    if (user === null) {
      return cb(null, false, { message: "Incorrect username or password." });
    }

    const hashedPassword = crypto.pbkdf2Sync(
      password,
      user.salt,
      310000,
      32,
      "sha256",
    );

    if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
      return cb(null, false, { message: "Incorrect username or password." });
    }

    return cb(null, user);
  }),
);

// Set up serialization and deserialization for the user's session
passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.email, is_admin: user.is_admin });
  });
});
passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});
