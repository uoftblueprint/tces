const express = require("express");
const addJobPostRequestHandler = require("../controllers/job_posts/addJobPost");

const router = express.Router();

router.post("/", addJobPostRequestHandler);

module.exports = router;
