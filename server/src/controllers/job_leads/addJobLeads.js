const logger = require("pino")();
const JobLead = require("../../models/job_lead.model");

const addJobLeadsRequestHandler = async (req, res) => {
  try {
    if (req.body.job_lead instanceof Array) {
      req.body.job_lead.forEach(job_lead => {
        // validate each job lead, and add values
        console.log(job_lead);
      });

      // bulk create job_leads
      const job_leads = await JobLead.bulkCreate(req.body.job_lead);

      return res.status(200).json({
        status: "success",
        message: "created job leads",
        data: { job_leads },
      });
    }

    // create one job lead
    const job_lead = await JobLead.create({
      owner: req.body.client.owner,
      creator: req.user.id,
      employer_name: req.body.job_lead.employer_name || null,
      job_title: req.body.job_lead.job_title || null,
      compensation_max: req.body.job_lead.compensation_max || null,
      compensation_min: req.body.job_lead.compensation_min || null,
      hour_per_week: req.body.job_lead.hour_per_week || null,
      national_occupation_code: req.body.job_lead.national_occupation_code || null,
      job_description: req.body.job_lead.job_description || null,
      creation_date: new Date(),
      expiration_date: req.body.job_lead.expiration_date || null,
      employment_type: req.body.job_lead.employment_type,
    });
    return res
      .status(200)
      .json({ status: "success", message: "created job lead", data: { job_lead } });
  } catch (err) {
    if (err.name == "SequelizeUniqueConstraintError") {
      // This means that either user or owner is not a valid user
      return res.status(400).json({
        status: "fail",
        message:
          "Either owner or creator is not a valid user, OR the email is already in use",
        data: null,
      });
    }

    logger.error(`Unexpected error thrown: ${err}`);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = addJobLeadsRequestHandler;
