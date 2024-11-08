const express = require("express");
const addJobApplicationRequestHandler = require("../controllers/job_applications/addJobApplication");

const router = express.Router();

router.post("/", async (req, res) => {
  return addJobApplicationRequestHandler(req, res);
});

module.exports = router;
