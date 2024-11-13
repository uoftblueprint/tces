const multer = require("multer");
const path = require("path");

const upload = multer({ dest: path.join(__dirname, "..", "uploads") });

const express = require("express");
const addJobApplicationRequestHandler = require("../controllers/job_applications/addJobApplication");

const router = express.Router();

router.post("/", upload.single("resume"), async (req, res) => {
  return addJobApplicationRequestHandler(req, res);
});

module.exports = router;
