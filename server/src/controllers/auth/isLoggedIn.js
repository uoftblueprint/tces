const isLoggedInRequestHandler = (req, res) => {
  if (req.user) {
    if (req.user.is_admin) {
      res.json({
        status: "success",
        message: `User ${req.user.username} is logged in as admin`,
        is_admin: true,
      });
      return;
    }
    res.json({
      status: "success",
      message: `User ${req.user} logged in, but not an admin`,
    });
    return;
  }
  res.json({ status: "failure", message: "user not logged in" });
  return;
};

module.exports = isLoggedInRequestHandler;
