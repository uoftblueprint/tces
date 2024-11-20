const express = require("express");
const deleteJobPostHandler = require("../controllers/job_posts/deleteJobPost"); // Update the path to match your project structure

const router = express.Router();

// Route for deleting a Job Post and its associated Job Applications
router.delete("/:job_posting_id", deleteJobPostHandler);

module.exports = router;
