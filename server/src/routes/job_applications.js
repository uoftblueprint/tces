const express = require("express");
const multer = require("multer");
const path = require("path");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const getAllJobApplicationsRequestHandler = require("../controllers/job_applications/getAllJobApplications");
const getOneJobApplicationRequestHandler = require("../controllers/job_applications/getOneJobApplication");
const addJobApplicationRequestHandler = require("../controllers/job_applications/addJobApplication");
const updateJobApplicationStatusRequestHandler = require("../controllers/job_applications/updateJobApplicationStatus");
const getOneJobApplicationByIdRequestHandler = require("../controllers/job_applications/getOneJobApplicationById");
const getJobApplicationResumeRequestHandler = require("../controllers/job_applications/getJobApplicationResumeUrl");

const upload = multer({ dest: path.join(__dirname, "..", "uploads") });

const router = express.Router();

// Route to get all job applications
router.get("/", isLoggedIn, async (req, res) => {
  return getAllJobApplicationsRequestHandler(req, res);
});

// Route to get job applications by name
// NOT CURRENTLY USED
router.get("/:name", isLoggedIn, async (req, res) => {
  return getOneJobApplicationRequestHandler(req, res);
});

router.post("/", isLoggedIn, upload.single("resume"), async (req, res) => {
  return addJobApplicationRequestHandler(req, res);
});

// Route to get one job application by id
router.get("/id/:application_id", async (req, res) => {
  return getOneJobApplicationByIdRequestHandler(req, res);
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
