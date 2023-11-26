const isGivenUser = require("./helpers").isGivenUser;
const isAdmin = require("../auth/helpers").isAdmin;

const getUserAuth = async (req, res, next) => {
  // First check the session, then check the database
  const current_user_id = req.user.id;
  const desired_user_id = Number(req.params.user_id);
  const is_admin = await isAdmin(current_user_id);
  const is_given_user = await isGivenUser(current_user_id, desired_user_id);

  if (!(is_admin || is_given_user)) {
    return res.status(403).json({
      status: "error",
      message: "You are not authorized to perform this action",
      data: { user: null },
    });
  }
  return next();
};

module.exports = getUserAuth;
