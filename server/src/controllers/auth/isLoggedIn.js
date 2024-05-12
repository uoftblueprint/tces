const isLoggedInRequestHandler = (req, res) => {
  if (req.user) {
    if (req.user.is_admin) {
      res.json({
        status: "success",
        message: `User ${req.user.username} is logged in as admin`,
        data: {
          userID: req.user.id,
          firstName: req.user.first_name,
          lastName: req.user.last_name,
          email: req.user.username,
          is_admin: true,
        },
      });
      return;
    }
    res.json({
      status: "success",
      message: `User ${req.user} logged in, but not an admin`,
      data: {
        userID: req.user.id,
        firstName: req.user.first_name,
        lastName: req.user.last_name,
        email: req.user.username,
        is_admin: false,
      },
    });
    return;
  }
  res.json({
    status: "fail",
    message: "user not logged in",
    data: { is_admin: null },
  });
  return;
};

module.exports = isLoggedInRequestHandler;
