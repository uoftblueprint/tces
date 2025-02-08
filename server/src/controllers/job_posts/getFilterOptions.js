const logger = require("pino")();
const { Op } = require("sequelize");
const JobApplication = require("../../models/job_applications.model");
const JobPosting = require("../../models/job_posts.model");

const getFilterOptionsRequestHandler = async (req, res) => {
  // Check method is GET
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET methods allowed." });
  }

