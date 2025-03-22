const logger = require("pino")();
const JobApplications = require("../../models/job_applications.model");
const JobPosting = require("../../models/job_posts.model");

const getAllJobApplicationsRequestHandler = async (req, res) => {
  try {
    // ! Return all applications sorted in descending order by application date (newest first)
    // ! There is probably a sequelize function that can do this for me.
    const query = {};
    const { job_posting_id, name, email, job_title, sort } = req.query;

    // ! Paginate the data (take a look at the existing API endpoints in the codebase for an example)
    // ! This pagination logic is from the existing code base. Maybe I should use this.

    const page = req?.query?.page ? parseInt(req.query.page, 10) - 1 : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    if (name) {
      query.name = name;
    }

    if (email) {
      query.email = email;
    }

    if (job_posting_id) {
      query.job_posting_id = job_posting_id;
    }

    const order = [["createdAt", sort === "asc" ? "ASC" : "DESC"]];

    // ! This is an example of how the pagination logic is used with the Job Lead model.

    const searchConfig = {
      where: query || {},
      order,
      attributes: [
        "id",
        "job_posting_id",
        "name",
        "email",
        "phone",
        "postal_code",
        "resume",
        "status_in_canada",
        "status_other",
        "application_status",
        "custom_responses",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: JobPosting,
          attributes: ["title"],
          where: job_title ? { title: job_title } : {},
        },
      ],
    };

    if (page !== null && pageSize !== null) {
      searchConfig.limit = parseInt(pageSize, 10);
      searchConfig.offset = parseInt(pageSize, 10) * parseInt(page, 10);
    }

    const jobApplications = await JobApplications.findAll(searchConfig);

    const totalJobApplicationsNumber = await JobApplications.count({
      where: query,
    });

    return res.status(200).json({
      status: "success",
      message: "All Job Applications found successfully",
      totalJobApplicationsNumber,
      jobApplications,
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
