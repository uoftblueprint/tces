const express = require("express");
const getAllJobApplicationsRequestHandler = require("../controllers/job_applications/getAllJobApplications");
const getOneJobApplicationRequestHandler = require("../controllers/job_applications/getOneJobApplication");

const router = express.Router();

// Route to get all job applications, with optional job_posting_id filter
router.get("/", async (req, res) => {
  return getAllJobApplicationsRequestHandler(req, res);
});

// Route to get job applications by name
router.get("/:name/applications", async (req, res) => {
  return getOneJobApplicationRequestHandler(req, res);
});

module.exports = router;
