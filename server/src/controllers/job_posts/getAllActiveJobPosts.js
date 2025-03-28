const logger = require("pino")();
const Sequelize = require("sequelize");
const JobPosting = require("../../models/job_posts.model");

const getAllActiveJobPostsRequestHandler = async (req, res) => {
  // check method is GET
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET methods allowed." });
  }

  try {
    const { location, job_type, order = "descending" } = req.query;

    const query = {};

    if (location) {
      query.location = location;
    }

    if (job_type) {
      query.job_type = Sequelize.literal(
        `JSON_CONTAINS(job_postings.job_type, '["${job_type}"]')`,
      );
    }

    const sortOrder = order === "ascending" ? "ASC" : "DESC";

    query.state = "Active";

    const searchConfig = {
      order: [["close_date", sortOrder]],
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
      searchConfig.offset = (page - 1) * pageSize;
    }

    const allJobPosts = await JobPosting.findAndCountAll(searchConfig);

    // -------- Response:
    const response = {
      status: "success",
      message: "All active job posts found successfully",
      publicJobPosts: {
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

module.exports = getAllActiveJobPostsRequestHandler;
