const express = require("express");
const multer = require("multer");
const path = require("path");
const getAllJobApplicationsRequestHandler = require("../controllers/job_applications/getAllJobApplications");
const getOneJobApplicationRequestHandler = require("../controllers/job_applications/getOneJobApplication");
const addJobApplicationRequestHandler = require("../controllers/job_applications/addJobApplication");

const upload = multer({ dest: path.join(__dirname, "..", "uploads") });

const router = express.Router();

// Route to get all job applications, with optional job_posting_id filter
router.get("/", async (req, res) => {
  return getAllJobApplicationsRequestHandler(req, res);
});

// Route to get job applications by name
router.get("/:name", async (req, res) => {
  return getOneJobApplicationRequestHandler(req, res);
});

router.post("/", upload.single("resume"), async (req, res) => {
  return addJobApplicationRequestHandler(req, res);
});

module.exports = router;
