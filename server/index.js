require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const corsOption = {
  origin: "http://localhost:3000",
  credentials: true
};

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
const clientRouter = require("./src/routes/client");

// Set up cors for local dev connection with frontend
app.use(cors(corsOption));

// Set up session for authorization
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
  })
);
app.use(passport.authenticate("session"));

app.get("/", (req, res) => {
  res.send("Helloooo World! Hi :)");
});

app.use("/", authRouter);

app.use("/clients", clientRouter);

app.listen(port, () => {
  console.log(`TCES Backend listening on port ${port}`);
});

