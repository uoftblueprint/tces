const express = require("express");

const router = express.Router();

// PassportJS imports for auth
const passport = require("passport");

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
router.post(
  "/login",
  // auth middleware
  passport.authenticate("local", {
    successRedirect: `${process.env.FRONTEND_URL}/`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
);

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
