// Get All Job Posts
// a) GET request to get all job posts [id, title, employer, application_close_date, state]
// Return the id, title, employer, application_close_date, state values of ALL job posts

// b) GET request to get all public job posts
// Return the id, title, employer, location, application_close_date of job posts where state is "Active"

// c) GET request by job type using job type parameter
// Return all job posts with that job type and state = "Active"

// const { query } = require("express");
const logger = require("pino")();
const JobPosting = require("../../models/job_posts.model");

const getAllActiveJobPostsRequestHandler = async (req, res) => {
  // check method is GET
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET methods allowed." });
  }

  try {
    const query = {};

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

    // a) Get all Public Job Posts
    query.state = "Active";
    const allActiveJobPosts = await JobPosting.findAndCountAll(searchConfig);

    // // c)
    // query.job_type = req?.query?.job_type
    // const allActiveJobPostsByType = await JobPosting.findAndCountAll(searchConfig);

    // -------- Response:
    const response = {
      status: "success",
      message: "All active job posts found successfully",
      publicJobPosts: {
        totalPosts: allActiveJobPosts.count,
        totalPages: Math.ceil(allActiveJobPosts.count / searchConfig.limit),
        currentPage: page,
        data: allActiveJobPosts.rows,
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
