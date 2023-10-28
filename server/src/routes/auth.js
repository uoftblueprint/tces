const express = require('express');
const router = express.Router();


const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

// PassportJS imports for auth
const passport = require('passport');
const LocalStrategy = require('passport-local');
// Encryption library
const crypto = require('crypto');
const { userTable } = require('../configs/user_config');
const { frontendUrl } = require('../configs/frontend_config');


// Local strategy configuration
passport.use(new LocalStrategy(function verify(username, password, cb) {
    connection.query(`SELECT * FROM ${userTable} WHERE email = ?`, [ username ], function(err, rows, fields) {
        if (err) { return cb(err); }
        if (!rows || rows.length == 0) { return cb(null, false, { message: 'Incorrect username or password.' }); }

        // get first row, here it will only be one row
        const row = rows[0];

        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(row.password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
        
            return cb(null, row);
        });
    });
}));

// Set up serialization and deserialization for the user's session
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        cb(null, { id: user.id, username: user.username });
    });
});
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

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
    try {
        // Generate salt value
        const salt = crypto.randomBytes(16);

        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
            if (err) { return next(err); } 

            connection.query(`INSERT INTO ${userTable} (first_name, last_name, email, password, salt) VALUES (?, ?, ?, ?, ?)`, [
                req.body.first_name,
                req.body.last_name,
                req.body.email,
                hashedPassword,
                salt
            ], (err) => {
                if (err) { return next(err); }
                var user = {
                    id: this.lastID,
                    email: req.body.email
                };
                req.login(user, (err) => {
                if (err) { return next(err); }
                    res.redirect('/');
                });
            });
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

module.exports = router;