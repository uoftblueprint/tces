const logger = require("pino")();
const Sequelize = require("sequelize");
const JobPosting = require("../../models/job_posts.model");

const getAllLocationsRequestHandler = async (req, res) => {
  // check method is GET
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET methods allowed." });
  }

  try {
    const query = {};
    const searchConfig = {
      where: query,
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("location")), "location"],
      ],
    };
    query.state = "Active";
    const locations = await JobPosting.findAll(searchConfig);

    const response = {
      status: "success",
      message: "All locations retrieved successfully",
      data: locations.map((location) => location.location),
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
