const express = require("express");
// PassportJS imports for auth
const passport = require("passport");

const router = express.Router();

const createUserRequestHandler = require("../controllers/auth/createUser");
const logoutRequestHandler = require("../controllers/auth/logout");
const isLoggedInRequestHandler = require("../controllers/auth/isLoggedIn");
const isAdmin = require("../middlewares/auth/isAdmin");

// User logs in with password
/**
 * Note: you MUST use `username` as the JSON body key or else this will not work!
 *
 * Expected body parameters:
 * @type string {body.username}
 * @type string {body.password}
 */

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.json({
        message: "Login successful",
        user: { id: user.id, username: user.email, is_admin: user.is_admin },
      });
    });
  })(req, res, next); // IIFE to invoke the returned function immediately with req, res, and next
});

// Admin creates a user
/**
 * Expected body parameters:
 * @type string {body.first_name}
 * @type string {body.last_name}
 * @type string {body.email}
 * @type string {body.password}
 */
router.post("/create_user", isAdmin, createUserRequestHandler);

// User logs out
router.post("/logout", logoutRequestHandler);

// This endpoint is to verify the users login status
router.post("/is_logged_in", isLoggedInRequestHandler);

module.exports = router;
