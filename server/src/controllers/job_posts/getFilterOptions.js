const logger = require("pino")();
const { Op } = require("sequelize");
const JobApplication = require("../../models/job_applications.model");
const JobPosting = require("../../models/job_posts.model");

const getFilterOptionsRequestHandler = async (req, res) => {
  // Check method is GET
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed, only GET methods allowed." });
  }

  try { 
    const { 
        job_posting_id,
        name, 
        email, 
        jobTitle 

    } = req.query; 

    const baseQuery = { 
        where: {}, 
        include: [
            { 
                model: JobPosting, 
                attributes: ['id', 'title'], 
                where: { 
                    state: 'Active'
                }
            }
        ], 
        attributes: ['name', 'email', 'hob_posting_id']
    }; 

    if (job_posting_id) { 
        baseQuery.where.job_posting_id = job_posting_id;
    }

    if (name) { 
        baseQuery.where.name = {[Op.iLike]: `%${name}}`};  // assuming case insensitive 
    }

    if (email) { 
        baseQuery.where.email = {[Op.iLike]: `%${email}`};  // assuming case insensitive 
    }

    if (jobTitle) { 
        baseQuery[0].include.where = { 
            ...baseQuery.include[0].where, 
            title: {[Op.iLike]: `%${jobTitle}`}
        };
    }
    const JobApplications = await JobApplication.findAll(baseQuery)
  }

