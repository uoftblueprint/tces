require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

// So that we can send and receive JSON through express
app.use(express.json());

// Import router for all authentication API endpoints
const authRouter = require('./src/routes/auth');

app.get("/", (req, res) => {
  res.send("Helloooo World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Query all users from the db
// This will work once the users table is moved from the dev branch to the main branch for the db
app.get("/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

// All endpoints within this API will be found under the /auth subdirectory
app.use('/auth', authRouter);