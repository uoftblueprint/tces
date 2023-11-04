const express = require('express');
const router = express.Router();

const User = require('../models/user.model');


// PassportJS imports for auth
const passport = require('passport');
// Encryption library
const crypto = require('crypto');


// User logs in with password
/**
 * Note: you MUST use `username` as the JSON body key or else this will not work! 
 * 
 * Expected body parameters:
 * @type string {body.username}
 * @type string {body.password}
 */
router.post('/login', 
  // auth middleware
  passport.authenticate('local', {
    successRedirect: `${process.env.FRONTEND_URL}/`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
  })
);

// Admin creates a user 
// TODO: add permission handling to ensure the user is signed in as the admin
/**
 * Expected body parameters:
 * @type string {body.first_name}
 * @type string {body.last_name}
 * @type string {body.email}
 * @type string {body.password} 
 */
router.post('/create_user', async (req, res, next) => {
    if (!req.user) { res.status(403).send("You are not logged in"); return; }
    if (!req.user.is_admin) { res.status(403).send("Only an admin can create users"); return; }

    // If you reach here, the user is an admin
    try {
        // Generate salt value
        const salt = crypto.randomBytes(16);

        // synchronous hashing function
        const hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256');
        
        await User.create({ 
            first_name: req.body.first_name, 
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            salt: salt
        });

        res.status(200).send("User created successfully");

    } catch (err) {
        if (err.name == "SequelizeUniqueConstraintError") {
            res.status(403).send("A user with this email already exists in the database");
            return;
        }
        res.status(500).send("Unexpected server error");
    }
});

// User logs out
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

// This endpoint is to verify the users login status
router.post('/test', (req, res) => {
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
});

module.exports = router;