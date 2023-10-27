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
    connection.get('SELECT * FROM users WHERE email = ?', [ username ], function(err, row) {
        if (err) { return cb(err); }
        if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
        
            return cb(null, row);
        });
    });
}));

// User logs in with password
router.post('/login/password', 
  // auth middleware
  passport.authenticate('local', {
    successRedirect: `${frontendUrl}/`,
    failureRedirect: `${frontendUrl}/login`
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
    res.status(200).send("TODO: Implement logout functionality");
});

module.exports = router;