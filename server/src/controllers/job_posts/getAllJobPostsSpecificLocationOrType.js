const logger = require("pino")();
const JobPosting = require("../../models/job_posts.model");
const { Op } = require("sequelize");

const getJobPostsSpecificLocationOrTypeRequestHandler = async (req, res) => {
  // check method is GET
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET methods allowed." });
  }

  try {
    const { location, job_type } = req.query;

    // Ensure at least one of location or jobType is provided
    if (!location && !job_type) {
      return res
        .status(400)
        .json({ message: "At least one of location or job_type must be provided." });
    }

    const query = {};

    if (location) {
      query.location = location;
    }

    if (job_type) {
      query.job_type = {
        [Op.contains]: [job_type],
      };
    }

    // Pagination Configs
    const searchConfig = {
      where: query,
      attributes: [
        "id",
        "title",
        "employer",
        "location",
        "job_type",
        "close_date",
        "state",
      ],
    };

    // get pagination parameters:
    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    if (page != null && pageSize != null) {
      searchConfig.limit = pageSize;
      searchConfig.offset = page * pageSize;
    }

    // Get all Job Posts
    const allJobPosts = await JobPosting.findAndCountAll(searchConfig);

    // -------- Response:
    const response = {
      status: "success",
      message: "All job posts found successfully",
      allJobPosts: {
        totalPosts: allJobPosts.count,
        totalPages: pageSize ? Math.ceil(allJobPosts.count / pageSize) : 1,
        currentPage: page,
        data: allJobPosts.rows,
      },
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

module.exports = getAllJobPostsSpecificLocationOrTypeRequestHandler;