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
  })
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
app.use("/job_applications", jobApplicationsRouter);
app.use("/upload", uploadRouter);

// const User = require("./src/models/user.model"); // Assuming your user model is here
// const JobPosting = require("./src/models/job_posts.model");

// async function createFakeJobPosting() {
//   try {
//     // Check or create the user with ID 1 for the `creator` foreign key
//     const [user, userCreated] = await User.findOrCreate({
//       where: { id: 1 },
//       defaults: {
//         first_name: 'John',
//         last_name: 'Doe',
//         email: 'johndoe@example.com',
//         password: Buffer.from('hashedpassword'), // Use an actual hashed password here
//         salt: Buffer.from('saltvalue'), // Use the actual salt value
//         is_admin: false, // or true if this user is an admin
//       },
//     });

//     if (userCreated) {
//       console.log("User created:", user.toJSON());
//     } else {
//       console.log("User already exists:", user.toJSON());
//     }

//     // Now create the JobPosting, referencing the existing user
//     const [job, jobCreated] = await JobPosting.findOrCreate({
//       where: { id: 1 },
//       defaults: {
//         title: 'Software Engineer',
//         employer: 'Tech Solutions Inc.',
//         location: 'Remote',
//         hours_per_week: 40,
//         rate_of_pay_min: 40.0,
//         rate_of_pay_max: 60.0,
//         rate_of_pay_frequency: 'Hourly',
//         job_type: ['Full-time'],
//         close_date: new Date(new Date().setMonth(new Date().getMonth() + 1)), // One month from now
//         job_description: 'We are looking for a talented Software Engineer to join our dynamic team.',
//         custom_questions: ['Why do you want to work here?', 'What are your career goals?'],
//         creator: user.id, // Reference to the user we just ensured exists
//         state: 'Draft',
//       },
//     });

//     if (jobCreated) {
//       console.log("Fake job posting created:", job.toJSON());
//     } else {
//       console.log("Job posting with ID 1 already exists:", job.toJSON());
//     }
//   } catch (error) {
//     console.error("Error creating fake job posting:", error);
//   }
// }

// createFakeJobPosting();

const beginScheduler =
  require("./src/middlewares/email/emailSender").beginScheduler;
beginScheduler();

app.listen(port, () => {
  console.log(`TCES Backend listening on port ${port}`);
});
