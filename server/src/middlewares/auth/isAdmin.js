const User = require("../../models/user.model");

const isAdmin = async (req, res, next) => {
  // First check the session, then check the database
  if (!req.user) {
    return res
      .status(403)
      .json({
        status: "fail",
        message: "You are not logged in",
        data: { user: null },
      });
  }
  if (!req.user.is_admin) {
    return res
      .status(403)
      .json({
        status: "fail",
        message: "You are not an admin",
        data: { user: { is_admin: false } },
      });
  }
  const user = await User.findOne({ where: { email: req.user.username } });
  if (!user || !user.is_admin) {
    return res
      .status(403)
      .json({
        status: "error",
        message: "You are not logged in",
        data: { user: null },
      });
  }
  return next();
};

module.exports = isAdmin;
