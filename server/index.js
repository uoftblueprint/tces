require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = 8000;

const corsOption = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

// Session storage imports
const passport = require("passport");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

// Import passport configuration
require("./src/configs/passport");

// So that we can send and receive JSON through express
app.use(express.json());

// Import router for all authentication API endpoints
const authRouter = require("./src/routes/auth");
const employerRouter = require("./src/routes/employer");
const userRouter = require("./src/routes/user");
const clientRouter = require("./src/routes/client");
const jobLeadRouter = require("./src/routes/job_lead");
const employerContactRouter = require("./src/routes/employer_contact");

const JobLeadTimelineRouter = require("./src/routes/job_lead_timeline_entries");
const EmployerTimelineRouter = require("./src/routes/employer_timeline_entries");
const ClientTimelineRouter = require("./src/routes/client_timeline_entries");

// Set up cors for local dev connection with frontend
app.use(cors(corsOption));

// Set up session for authorization
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: "sessions.db", dir: "./var/db" }),
    cookie: {
      httpOnly: true,
      secure: !process.env.FRONTEND_URL.includes("localhost"),
      sameSite: process.env.FRONTEND_URL.includes("localhost") ? "Lax" : "None",
    },
  }),
);

app.use(passport.initialize({}));
app.use(passport.session({}));

app.use("/", authRouter);
app.use("/employers", employerRouter);
app.use("/users", userRouter);
app.use("/clients", clientRouter);
app.use("/job_leads", jobLeadRouter);
app.use("/employer_contacts", employerContactRouter);
app.use("/job_leads_timeline", JobLeadTimelineRouter);
app.use("/employers_timeline", EmployerTimelineRouter);
app.use("/clients_timeline", ClientTimelineRouter);

app.listen(port, () => {
  console.log(`TCES Backend listening on port ${port}`);
  console.log(`Binded port with ${process.env.FRONTEND_URL}`);
});
