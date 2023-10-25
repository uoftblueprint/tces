const express = require('express');
const router = express.Router();

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