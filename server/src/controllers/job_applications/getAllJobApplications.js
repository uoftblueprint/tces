const Sequelize = require("sequelize");
const logger = require("pino")();
const JobApplications = require("../../models/job_applications.model");

const getAllJobApplicationsRequestHandler = async (req, res) => {
  try {
    // ! Return all applications sorted in descending order by application date (newest first)
    // ! There is probably a sequelize function that can do this for me.
    const query = {};
    const order = [["createdAt", "DESC"]];

    // ! Paginate the data (take a look at the existing API endpoints in the codebase for an example)
    // ! This pagination logic is from the existing code base. Maybe I should use this.

    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    const { job_posting_id: jobPostingId } = req.query;

    if (jobPostingId) {
      query.job_posting_id = jobPostingId;
    }

    // ! This is an example of how the pagination logic is used with the Job Lead model.

    const searchConfig = {
      where: query || {},
      order,
      attributes: { exclude: [] }, // Explicitly include all fields
    };

    if (page !== null && pageSize !== null) {
      searchConfig.limit = parseInt(pageSize, 10);
      searchConfig.offset = parseInt(pageSize, 10) * parseInt(page, 10);
    }

    const jobApplications = await JobApplications.findAll(searchConfig);

    const uniqueApplicants = await JobApplications.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("name")), "name"]],
      raw: true,
    });

    const uniqueApplicationsObject = uniqueApplicants.map(
      (applicant) => applicant.name,
    );

    const totalJobApplicationsNumber = await JobApplications.count({
      where: query,
    });

    return res.status(200).json({
      status: "success",
      message: "All Job Applications found successfully",
      totalJobApplicationsNumber,
      jobApplications,
      uniqueApplicants: uniqueApplicationsObject,
    });
  } catch (error) {
    logger.error(error);
    // Catch any error and send a 500 response with the error message
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching job applications",
      error: error.message,
    });
  }
};

module.exports = getAllJobApplicationsRequestHandler;
