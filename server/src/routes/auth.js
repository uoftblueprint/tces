const express = require('express');
const router = express.Router();
// database connection
const connection = require('../../index');

// PassportJS imports for auth
const passport = require('passport');
const LocalStrategy = require('passport-local');
// Encryption library
const crypto = require('crypto');


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
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

// Admin creates a user 
// TODO: add permission handling to ensure the user is signed in as the admin
router.post('/create_user', (req, res, next) => {
    res.status(200).send("TODO: Implement signup functionality");
});

// User logs out
router.post('/logout', (req, res) => {
    res.status(200).send("TODO: Implement logout functionality");
});

module.exports = router;