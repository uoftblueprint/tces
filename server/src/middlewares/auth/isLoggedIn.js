const User = require("../../models/user.model");

const isLoggedIn = async (req, res, next) => {
  // First check the session, then check the database (to avoid database errors)
  if (!req.user) {
    return res
      .status(403)
      .json({ status: "error", message: "You are not logged in" });
  }
  const user = await User.findOne({ where: { email: req.user.username } });
  if (!user) {
    return res
      .status(403)
      .json({ status: "error", message: "You are not logged in" });
  }
  return next();
};

module.exports = isLoggedIn;
