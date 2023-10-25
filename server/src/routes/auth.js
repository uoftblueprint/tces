const express = require('express');
const router = express.Router();

// User logs in with password
router.post('/login/password', () => {
    return "TODO: Implement login functionality";
});

// User signs up
router.post('/signup', () => {
    return "TODO: Implement signup functionality";
});

// User logs out
router.post('/logout', () => {
    return "TODO: Implement logout functionality";
});

module.exports = router;