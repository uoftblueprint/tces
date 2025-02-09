const logger = require("pino")();
const { Op } = require("sequelize");
const JobApplication = require("../../models/job_applications.model");
const JobPosting = require("../../models/job_posts.model");

const getFilterDropdownOptionsHandler = async (req, res) => {
  console.log("getFilterDropdownOptionsHandler called");
  // Check method is GET
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET methods allowed." });
  }

  try {
    const { job_posting_id, name, email, jobTitle } = req.query;

    const baseQuery = {
      where: {}, // build query attributes
      include: [
        {
          model: JobPosting,
          attributes: ["id", "title"],
          where: {
            state: "Active",
          },
        },
      ],
      attributes: ["name", "email", "hob_posting_id"],
    };

    if (job_posting_id) {
      baseQuery.where.job_posting_id = job_posting_id;
    }

    if (name) {
      baseQuery.where.name = { [Op.iLike]: `%${name}}` }; // assuming case insensitive
    }

    if (email) {
      baseQuery.where.email = { [Op.iLike]: `%${email}` }; // assuming case insensitive
    }

    if (jobTitle) {
      baseQuery[0].include.where = {
        ...baseQuery.include[0].where,
        title: { [Op.iLike]: `%${jobTitle}` },
      };
    }
    const applications = await JobApplication.findAll(baseQuery); // make databse query

    const names = [...new Set(applications.map((app) => app.name))].sort();
    const emails = [...new Set(applications.map((app) => app.email))].sort();
    const jobTitles = [
      ...new Set(applications.map((app) => app.job_posting.title)),
    ].sort();
    const jobPostingIds = [
      ...new Set(applications.map((app) => app.job_posting_id)),
    ];

    return res.status(200).json({
      status: "success",
      data: {
        names,
        emails,
        jobTitles,
        jobPostingIds,
      },
    });
  } catch (err) {
    logger.error(`Error in getFilterDropdownOptions: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

module.exports = getFilterDropdownOptionsHandler;
