const User = require('../models/user.model');
const crypto = require('crypto');

const createUserRequestHandler = async (req, res, next) => {
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
        console.log(err);
        res.status(500).send("Unexpected server error");
    }
}

const logoutRequestHandler = (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
}

const isLoggedInRequestHandler = (req, res) => {
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
}


module.exports = {
    createUserRequestHandler,
    logoutRequestHandler,
    isLoggedInRequestHandler
}