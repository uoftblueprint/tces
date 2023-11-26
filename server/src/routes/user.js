const express = require("express");

const router = express.Router();

const getUserHandler = require("../controllers/user/getUser")

const isLoggedIn = require("../middlewares/auth/isLoggedIn")

const isAdmin = require("../middlewares/auth/isAdmin")

const getUserAuth = require("../middlewares/user/getUser")

const getAllUsersHandler = require("../controllers/user/getAllUsers")

// Get a singular user

/**
 * Get a singular user

 * Expected Parameters:
 * @type integer {params.user_id}
**/
router.get("/:user_id", isLoggedIn, getUserAuth, getUserHandler);

/*
 * Get All Users

 * Expected Query Params:
 * @type integer {query.page}
 * @type integer {query.limit}
*/
router.get("", isAdmin, getAllUsersHandler)

module.exports = router;