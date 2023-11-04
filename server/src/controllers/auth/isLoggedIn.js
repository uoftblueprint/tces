const isLoggedInRequestHandler = (req, res) => {
  if (req.user) {
    if (req.user.is_admin) {
      res.send(`User ${req.user.username} is logged in as admin`);
      return;
    }
    res.send(`User ${req.user} logged in, but not an admin`);
    return;
  }
  res.send("user not logged in");
  return;
};

module.exports = isLoggedInRequestHandler;
