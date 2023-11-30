require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;

// Session storage imports
const passport = require("passport");
var session = require("express-session");
var SQLiteStore = require("connect-sqlite3")(session);

// Import passport configuration
require("./src/configs/passport");

// So that we can send and receive JSON through express
app.use(express.json());

// Import router for all authentication API endpoints
const authRouter = require("./src/routes/auth");
const employerRouter = require("./src/routes/employer");
const userRouter = require("./src/routes/user");
const clientRouter = require("./src/routes/client");

// Set up session for authorization
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  }),
);
app.use(passport.authenticate("session"));

app.get("/", (req, res) => {
  res.send("Helloooo World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use("/", authRouter);
app.use("/employers", employerRouter);
app.use("/users", userRouter);
app.use("/clients", clientRouter);
