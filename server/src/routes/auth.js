const express = require('express');
const router = express.Router();


const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  'blueprint-tces',
  'username',
  'password',
  {
    host: 'aws.connect.psdb.cloud',
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true
      },
    }
  }
);


// PassportJS imports for auth
const passport = require('passport');
// Encryption library
const crypto = require('crypto');
const { userTable } = require('../configs/user_config');
const { frontendUrl } = require('../configs/frontend_config');


// User logs in with password
/**
 * Note: you MUST use `username` as the JSON body key or else this will not work! 
 * 
 * Expected body parameters:
 * @type string {body.username}
 * @type string {body.password}
 */
router.post('/login/password', 
  // auth middleware
  passport.authenticate('local', {
    successRedirect: "/success",//`${frontendUrl}/`,
    failureRedirect: "/failure" //`${frontendUrl}/login`
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
router.post('/create_user', (req, res, next) => {
    if (!req.user) { res.status(403).send("You are not logged in"); }
    if (!req.user.is_admin) { res.status(403).send("Only an admin can create users"); }

    // If you reach here, the user is an admin
    try {
        // Generate salt value
        const salt = crypto.randomBytes(16);

        // synchronous hashing function
        const hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 310000, 32, 'sha256');
        
        connection.query(`INSERT INTO ${userTable} (first_name, last_name, email, password, salt) VALUES (?, ?, ?, ?, ?)`, [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            hashedPassword,
            salt
        ], (err) => {
            if (err) { return next(err); }
            res.status(200).send("User created successfully");
        });

    } catch (err) {
        console.log(err);
        res.status(500).send("error");
    }
});

// User logs out
router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


router.post('/test', (req, res) => {
    if (req.user) {
        if (req.user.is_admin) {
            res.send(`User ${req.user.username} is logged in as admin`);
        }
        res.send(`User ${req.user} logged in, but not an admin`);
    }
    res.send("user not logged in");
})

module.exports = router;