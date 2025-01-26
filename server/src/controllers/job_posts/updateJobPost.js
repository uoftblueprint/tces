const logger = require("pino")();
const User = require("../../models/user.model");
const JobPosting = require("../../models/job_posts.model");

const updateJobPostsRequestHandler = async (req, res) => {
  // check method is PUT
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only PUT methods allowed." });
  }

  try {
    // Get Job Id
    const jobPostId = req?.params?.job_post_id
      ? parseInt(req.params.job_post_id, 10)
      : null;

    if (!jobPostId) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid or missing job_post_id.",
      });
    }

    // Get one Job Posts
    const jobPost = await JobPosting.findOne({ where: { id: jobPostId } });
    if (!jobPost) {
      return res.status(404).json({
        status: "fail",
        message: "Job posting not found",
        data: null,
      });
    }

    if (req.body.id) {
      return res.status(403).json({
        status: "fail",
        message: "You cannot change the id of a job posting.",
        data: null,
      });
    }

    // Check that if state is being changed to "Active" and was previously "Draft", that all other fields are complete
    if (req.body.state === "Active" && jobPost.state === "Draft") {
      const requiredFields = [
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

      // Check for any missing required fields
      const missingField = requiredFields.find(
        (field) => !jobPost[field] && !req.body[field],
      );

      if (missingField) {
        return res.status(400).json({
          status: "fail",
          message: `Cannot change to Active: Missing required field "${missingField}"`,
          data: null,
        });
      }
    }

    // Validate `creator` if present in the request
    if ("creator" in req.body) {
      const creatorId = req.body.creator;

      // Check if the new creator exists
      const creatorExists = await User.findByPk(creatorId);
      if (!creatorExists) {
        return res.status(400).json({
          status: "fail",
          message: `Creator with ID ${creatorId} does not exist.`,
        });
      }
    }

    // update the jobPost and save
    jobPost.set(req.body);

    try {
      await jobPost.save();
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "An unexpected server error occurred.",
      });
    }

    // return success
    return res.status(200).json({
      status: "success",
      message: `Job Post ${jobPostId} updated successfully`,
      data: jobPost,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected server error occurred.",
    });
  }
};

module.exports = updateJobPostsRequestHandler;
