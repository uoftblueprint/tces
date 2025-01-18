const logger = require("pino")();
const JobPosting = require("../../models/job_posts.model");

const getAllJobPostsSortedByDateRequestHandler = async (req, res) => {
    // check method is GET
    if (req.method !== "GET") {
      return res
        .status(405)
        .json({ message: "Method not allowed, only GET methods allowed." });
    }
  
    try {
      const { order = "descending" } = req.query;

      const sortOrder = order === "ascending" ? "DESC" : "ASC";

      // Pagination Configs
      const searchConfig = {
        order: [["close_date", sortOrder]],
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
    
    module.exports = getAllJobPostsSortedByDateRequestHandler;