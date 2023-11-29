const express = require("express");
// PassportJS imports for auth
const passport = require("passport");

const router = express.Router();

const createUserRequestHandler = require("../controllers/auth/createUser");
const logoutRequestHandler = require("../controllers/auth/logout");
const isLoggedInRequestHandler = require("../controllers/auth/isLoggedIn");

// User logs in with password
/**
 * Note: you MUST use `username` as the JSON body key or else this will not work!
 *
 * Expected body parameters:
 * @type string {body.username}
 * @type string {body.password}
 */

router.post("/login", (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, () => {
      if (err) {
        return next(err);
      }

      return res.json({
        message: "Login successful",
        user: {
          userID: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          isAdmin: user.is_admin,
        },
      });
    });
  })(req, res, next); // IIFE to invoke the returned function immediately with req, res, and next
});

// User logs out
router.post("/logout", logoutRequestHandler);

// This endpoint is to verify the users login status
router.post("/is_logged_in", isLoggedInRequestHandler);

module.exports = router;
