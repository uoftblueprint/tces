require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

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
