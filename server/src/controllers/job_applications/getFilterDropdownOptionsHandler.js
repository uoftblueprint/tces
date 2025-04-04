const logger = require("pino")();
const { Op, fn, col, where } = require("sequelize");
const JobApplication = require("../../models/job_applications.model");
const JobPosting = require("../../models/job_posts.model");

const getFilterDropdownOptionsHandler = async (req, res) => {
  // Check method is GET
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET methods allowed." });
  }

  try {
    // The value selected in the dropdown, null if nothing is selected
    const { job_posting_id, name, email, jobTitle } = req.query;
    const baseQuery = {
      where: {}, // Build query attributes
      include: [
        {
          model: JobPosting,
          attributes: ["id", "title"],
        },
      ],
      attributes: ["name", "email", "job_posting_id"],
    };

    // Add filters to the base query
    if (job_posting_id) {
      baseQuery.where.job_posting_id = job_posting_id;
    }

    const andConditions = [];

    if (name) {
      andConditions.push(
        where(fn("LOWER", col("job_applications.name")), {
          [Op.like]: `%${name.toLowerCase()}%`,
        })
      );
    }

    if (email) {
      andConditions.push(
        where(fn("LOWER", col("job_applications.email")), {
          [Op.like]: `%${email.toLowerCase()}%`,
        })
      );
    }

    if (andConditions.length > 0) {
      baseQuery.where = {
        ...baseQuery.where,
        [Op.and]: andConditions,
      };
    }

    if (jobTitle) {
      baseQuery.include[0].where = {
        [Op.and]: where(fn("LOWER", col("job_posting.title")), {
          [Op.like]: `%${jobTitle.toLowerCase()}%`,
        }),
      };
    }

    // Fetch data from the database
    const applications = await JobApplication.findAll(baseQuery);

    // Extract unique values for dropdown options
    const names = [...new Set(applications.map((app) => app.name))].sort();
    const emails = [...new Set(applications.map((app) => app.email))].sort();
    const jobTitles = [
      ...new Set(applications.map((app) => app.job_posting?.title)),
    ].sort();
    const jobPostingIds = [
      ...new Set(applications.map((app) => app.job_posting_id)),
    ];

    // Return the response
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
