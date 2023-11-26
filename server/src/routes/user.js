const express = require("express");

const router = express.Router();

const getUserHandler = require("../controllers/user/getUser")

const isLoggedIn = require("../middlewares/auth/isLoggedIn")

const getUserAuth = require("../middlewares/user/getUser")

// Get a singular user

/**
 * Get a singular user

 * Expected Parameters:
 * @type integer {params.user_id}
**/
router.get("/:user_id", isLoggedIn, getUserAuth, getUserHandler);

module.exports = router;