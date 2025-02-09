const express = require("express");
const multer = require("multer");
const path = require("path");
const getAllJobApplicationsRequestHandler = require("../controllers/job_applications/getAllJobApplications");
const getOneJobApplicationRequestHandler = require("../controllers/job_applications/getOneJobApplication");
const addJobApplicationRequestHandler = require("../controllers/job_applications/addJobApplication");
const getJobApplicationResumeRequestHandler = require("../controllers/job_applications/getJobApplicationResumeUrl");
const updateJobApplicationStatusRequestHandler = require("../controllers/job_applications/updateJobApplicationStatus");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");

const upload = multer({ dest: path.join(__dirname, "..", "uploads") });

const router = express.Router();

// Route to get all job applications
router.get("/", isLoggedIn, async (req, res) => {
  return getAllJobApplicationsRequestHandler(req, res);
});

// Route to get job application by id (not job_posting_id since some job_posting_ids are duplicated)
router.get("/:job_posting_id", isLoggedIn, async (req, res) => {
  const jobPostingId = req.params.job_posting_id;
  return getAllJobApplicationsRequestHandler(req, res, jobPostingId, null, null, null);
});

// Route to get job applications by applicant name
// NOT CURRENTLY USED
router.get("/name/:name", isLoggedIn, async (req, res) => {
  const name = req.params.name;
  return getAllJobApplicationsRequestHandler(req, res, null, name, null, null);
});

// Route to get job applications by applicant email
router.get("/email/:email", isLoggedIn, async (req, res) => {
  const email = req.params.email;
  return getAllJobApplicationsRequestHandler(req, res, null, null, email, null);
});

// Route to get job applications by job title
router.get("/title/:title", isLoggedIn, async (req, res) => {
  const title = req.params.title;
  return getAllJobApplicationsRequestHandler(req, res, null, null, null, title);
});

router.post("/", isLoggedIn, upload.single("resume"), async (req, res) => {
  return addJobApplicationRequestHandler(req, res);
});

// Route to get the presigned resume URL for a job application
router.get("resume/:job_application_id", isLoggedIn, async (req, res) => {
  return getJobApplicationResumeRequestHandler(req, res);
});

/**
 * Modifies a job application's status
 * Example Request Body:
 * {
 *   "new_application_status": "Approved"
 * }
 */
router.put(
  "/:job_application_id",
  isLoggedIn,
  updateJobApplicationStatusRequestHandler,
);

module.exports = router;
