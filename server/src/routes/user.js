const express = require("express");

const router = express.Router();

const getUserHandler = require("../controllers/user/getUser");

const isLoggedIn = require("../middlewares/auth/isLoggedIn");

const isAdmin = require("../middlewares/auth/isAdmin");

const getUserAuth = require("../middlewares/user/getUser");

const getAllUsersHandler = require("../controllers/user/getAllUsers");

const updateUserHandler = require("../controllers/user/updateUser");

const deleteUserHandler = require("../controllers/user/deleteUser");

const createUserRequestHandler = require("../controllers/user/createUser")

// Admin creates a user
/**
 * Expected body parameters:
 * @type string {body.first_name}
 * @type string {body.last_name}
 * @type string {body.email}
 * @type string {body.password}
 */
router.post("", isAdmin, createUserRequestHandler);

/**
 * Get a singular user

 * Expected Parameters:
 * @type integer {params.user_id}
**/
router.get("/:user_id", isLoggedIn, getUserAuth, getUserHandler);

/**
 * Get All Users

 * Expected Query Params:
 * @type integer {query.page}
 * @type integer {query.limit}
**/
router.get("", isAdmin, getAllUsersHandler);

/**
 * Update User

 * Expected Parameters:
 * @type integer {params.user_id}
 * 
 * Expected Body:
 * @type string {user.body.first_name}
 * @type string {user.body.last_name}
 * @type string {user.body.email}
 * @type string {user.body.password}
 * @type boolean {user.body.is_admin}
**/
router.put("/:user_id", isAdmin, updateUserHandler);

/**
 * Delete A User

 * Expected Params:
 * @type integer {params.user_id}
**/
router.delete("/:user_id", isAdmin, deleteUserHandler);

module.exports = router;