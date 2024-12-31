const logger = require("pino")();
const JobPosting = require("../../models/job_posts.model");

/**
a) GET request (get a job post’s information, get all columns based on id) using the job post id parameter
Return all info about that specific job post
 */

const getJobPostRequestHandler = async (req, res) => {
  // check method is GET
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET methods allowed." });
  }

  try {
    // ------ Get Job Id
    const { job_post_id } = req.params;

    // Return to include id, title, employer, application_close_date, state
    const requiredFields = [
      "id",
      "title",
      "employer",
      "location",
      "hours_per_week",
      "rate_of_pay_min",
      "rate_of_pay_max",
      "rate_of_pay_frequency",
      "job_type",
      "close_date",
      "job_description",
      "custom_questions",
      "creator",
      "state",
    ];

    // Get one Job Posts
    const jobPost = await JobPosting.findOne({
      where: { id: job_post_id },
      attributes: requiredFields,
    });

    // -------- Response:
    const response = {
      status: "success",
      message: "All job posts found successfully",
      jobPost,
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

module.exports = getJobPostRequestHandler;
