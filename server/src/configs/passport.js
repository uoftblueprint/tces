const passport = require('passport');
const LocalStrategy = require('passport-local');

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

const { userTable } = require('./user_config');
const crypto = require('crypto');


// Local strategy configuration
passport.use(new LocalStrategy((username, password, cb) => {
    connection.query(`SELECT * FROM ${userTable} WHERE email = ?`, [ username ], (err, rows, fields) => {
        if (err) { return cb(err); }
        if (!rows || rows.length == 0) { return cb(null, false, { message: 'Incorrect username or password.' }); }

        // get first row, here it will only be one row
        const row = rows[0];

        crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', (err, hashedPassword) => {
            if (err) { return cb(err); }
            if (!crypto.timingSafeEqual(row.password, hashedPassword)) {
                return cb(null, false, { message: 'Incorrect username or password.' });
            }
        
            return cb(null, row);
        });
    });
}));

// Set up serialization and deserialization for the user's session
passport.serializeUser((user, cb) => {
    process.nextTick(() => {
        cb(null, { id: user.id, username: user.email, is_admin: user.is_admin });
    });
});
passport.deserializeUser((user, cb) => {
    process.nextTick(() => {
        return cb(null, user);
    });
});