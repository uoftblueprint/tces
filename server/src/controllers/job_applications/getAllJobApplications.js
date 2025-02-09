const Sequelize = require("sequelize");
const logger = require("pino")();
const JobApplications = require("../../models/job_applications.model");
const JobPostings = require("../../models/job_posts.model");

const getAllJobApplicationsRequestHandler = async (req, res, jobPostingId, name, email, title) => {
  try {
    // ! Return all applications sorted in descending order by application date (newest first)
    // ! There is probably a sequelize function that can do this for me.
    const query = {};

    // ! Paginate the data (take a look at the existing API endpoints in the codebase for an example)
    // ! This pagination logic is from the existing code base. Maybe I should use this.

    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    if (jobPostingId) {
      query.id = jobPostingId;
    }
    if (name) {
      query.name = name;
    }
    if (email) {
      query.email = email;
    }
    
    console.log(title)

    // ! This is an example of how the pagination logic is used with the Job Lead model.

    const searchConfig = {
      where: query || {},
      order: [["createdAt", "DESC"]],
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
        "createdAt", // Include createdAt explicitly
        "updatedAt", // Include updatedAt explicitly
      ],
      include: [
        {
          model: JobPostings,
          attributes: ["title"],
          required: true, 
          where: {
          },
        }
      ],
    };

    if (title) {
      searchConfig.include[0].where.title = title
    }

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

    console.log(jobApplications);
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
