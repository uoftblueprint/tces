const express = require("express");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const getAllJobApplicationsRequestHandler = require("../controllers/job_applications/getAllJobApplications");
const getOneJobApplicationRequestHandler = require("../controllers/job_applications/getOneJobApplication");
const addJobApplicationRequestHandler = require("../controllers/job_applications/addJobApplication");
const updateJobApplicationStatusRequestHandler = require("../controllers/job_applications/updateJobApplicationStatus");
const getOneJobApplicationByIdRequestHandler = require("../controllers/job_applications/getOneJobApplicationById");
const getJobApplicationResumeRequestHandler = require("../controllers/job_applications/getJobApplicationResumeUrl");

const upload = require("../middlewares/multer/upload");

const router = express.Router();

// Route to get all job applications
router.get("/", isLoggedIn, async (req, res) => {
  return getAllJobApplicationsRequestHandler(req, res);
});

// Route to get job application by id (not job_posting_id since some job_posting_ids are duplicated)
router.get("/:job_posting_id", isLoggedIn, async (req, res) => {
  const jobPostingId = req.params.job_posting_id;
  return getAllJobApplicationsRequestHandler(req, res, jobPostingId);
});

// Route to get job applications by name
// NOT CURRENTLY USED
router.get("/:name", isLoggedIn, async (req, res) => {
  return getOneJobApplicationRequestHandler(req, res);
});

router.post("/", isLoggedIn, upload.single("resume"), async (req, res) => {
  return addJobApplicationRequestHandler(req, res);
});

router.get("/id/:application_id", async (req, res) => {
  return getOneJobApplicationByIdRequestHandler(req, res);
});

// Route to get the presigned resume URL for a job application
router.get("/resume/:job_application_id", isLoggedIn, async (req, res) => {
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
