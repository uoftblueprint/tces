const express = require('express');
const router = express.Router();

// PassportJS imports for auth
const passport = require('passport');
const LocalStrategy = require('passport-local');
// Encryption library
const crypto = require('crypto');


// User logs in with password
router.post('/login/password', (req, res) => {
    res.status(200).send("TODO: Implement login functionality");
});

// User signs up
router.post('/signup', (req, res) => {
    res.status(200).send("TODO: Implement signup functionality");
});

// User logs out
router.post('/logout', (req, res) => {
    res.status(200).send("TODO: Implement logout functionality");
});

module.exports = router;