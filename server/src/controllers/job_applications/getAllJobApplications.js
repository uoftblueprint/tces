const Sequelize = require("sequelize");
const logger = require("pino")();
const JobApplications = require("../../models/job_applications.model");

// TODO JobApplication Model Summary:
// TODO Represents a job application record in the database, linking to a job posting by job_posting_id.
// TODO Fields:
// TODO - id: Primary key, auto-incrementing integer.
// TODO - job_posting_id: Foreign key linking to JobPosting model, required.
// TODO - name: Applicant's name, required string.
// TODO - email: Applicant's email, validated as a valid email format, required.
// TODO - phone: Applicant's 10-digit phone number, validated format, required.
// TODO - postal_code: Canadian postal code format, validated format, required.
// TODO - resume: Path or filename for the applicant's resume, required string.
// TODO - status_in_canada: Applicant's status in Canada, ENUM type (Citizen, PR, refugee, student visa, open work, other), required.
// TODO - application_status: Current status of the application, ENUM type (Contacted, Rejected, R & I, Approved, In Progress, New), default is "New".
// TODO - custom_responses: JSON field for storing additional applicant responses, defaults to an empty object.
// TODO - applied_date: Date when application was submitted, defaults to current date.
// TODO Timestamps are automatically added: createdAt and updatedAt.

const getAllJobApplicationsRequestHandler = async (req, res) => {
  try {
    // ! Return all applications sorted in descending order by application date (newest first)
    // ! There is probably a sequelize function that can do this for me.
    const query = {};
    const order = [["applicationDate", "DESC"]];

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
      where: query,
      order,
    };

    if (page !== null && pageSize !== null) {
      searchConfig.limit = pageSize;
      searchConfig.offset = pageSize * page;
    }

    const jobApplications = await JobApplications.findAll(searchConfig);

    const uniqueApplicants = await JobApplications.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("name")), "name"]],
      raw: true,
    });

    const uniqueApplicationsObject = uniqueApplicants.map(
      (applicant) => applicant.name
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
