require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const https = require("https");
const fs = require("node:fs");

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

// const JobPostings = require("./src/models/job_posts.model");
// const JobApplications = require("./src/models/job_applications.model");

// Import passport configuration
require("./src/configs/passport");

// Compress all routes
app.use(compression());

// https://www.npmjs.com/package/helmet sets http headers
app.use(helmet());

// Set up rate limiter: maximum of 100 requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});

// Apply rate limiter to all requests
app.use(limiter);

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
const jobApplicationsRouter = require("./src/routes/job_applications");

const uploadRouter = require("./src/routes/upload");

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
      sameSite: "Lax",
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(passport.authenticate("session"));

app.use("/", authRouter);
app.use("/employers", employerRouter);
app.use("/users", userRouter);
app.use("/clients", clientRouter);
app.use("/job_leads", jobLeadRouter);
app.use("/employer_contacts", employerContactRouter);
app.use("/job_leads_timeline", JobLeadTimelineRouter);
app.use("/employers_timeline", EmployerTimelineRouter);
app.use("/clients_timeline", ClientTimelineRouter);
app.use("/upload", uploadRouter);
app.use("/job_applications", jobApplicationsRouter);

const beginScheduler =
  require("./src/middlewares/email/emailSender").beginScheduler;
beginScheduler();

app.listen(port, () => {
  console.log(`TCES Backend listening on port ${port}`);
});
