const logger = require("pino")();
const JobPosting = require("../../models/job_posts.model");

const getAllJobPostsRequestHandler = async (req, res) => {
  // check method is GET
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET methods allowed." });
  }

  try {
    const locations = await JobPosting.findAll({
        attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("location")), "location"]],
      });

    const response = {
        status: "success",
        message: "All locations retrieved successfully",
        data: locations.map(location => location.location),
    };

    return res.status(200).json(response);

  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected server error occurred.",
    });
  }
};

module.exports = getAllLocationsRequestHandler;