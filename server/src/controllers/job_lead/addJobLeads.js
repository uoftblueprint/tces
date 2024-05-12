const logger = require("pino")();
const JobLead = require("../../models/job_lead.model");
const EmployerTimelineEntry = require("../../models/employer_timeline_entry.model");
const User = require("../../models/user.model");

const addJobLeadsRequestHandler = async (req, res) => {
  try {
    if (req.body.job_lead instanceof Array) {
      // store all the job leads
      const jobLeads = [];
      // create each job lead while doing the needed checks for each one as well
      for (const jobLeadData of req.body.job_lead) {
        const jobLead = await createJobLead(jobLeadData, req.user.id);

        jobLeads.push(jobLead);
      }

      return res.status(200).json({
        status: "success",
        message: "created job leads",
        data: { jobLeads },
      });
    }
    const jobLead = await createJobLead(req.body.job_lead, req.user.id);

    return res.status(200).json({
      status: "success",
      message: "created job lead",
      data: { jobLead },
    });
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

const createJobLead = async (jobLeadData, userId) => {
  try {
    setOwnerAndCreator(jobLeadData, userId);

    const creationDateStr = jobLeadData.creation_date || null;
    const expirationDateStr = jobLeadData.expiration_date || null;

    const creationDate = creationDateStr ? new Date(creationDateStr) : null;
    let expirationDate;

    if (expirationDateStr) {
      expirationDate = new Date(jobLeadData.expiration_date);
    } else {
      // by default set to the expiration date to a month from the current date
      expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1, 0);
    }

    // create a single job lead
    const jobLead = await JobLead.create({
      owner: jobLeadData.owner,
      creator: userId,
      employer: jobLeadData.employer,
      job_title: jobLeadData.job_title || "",
      num_of_positions: jobLeadData.num_of_positions || 0,
      compensation_max: jobLeadData.compensation_max || 0,
      compensation_min: jobLeadData.compensation_min || 0,
      hours_per_week: jobLeadData.hours_per_week || null,
      national_occupation_code: jobLeadData.national_occupation_code || null,
      job_description: jobLeadData.job_description || "",
      creation_date: creationDate,
      expiration_date: expirationDate,
      employment_type: jobLeadData.employment_type,
    });

    const userObject = await User.findOne({ where: { id: userId } });

    const title = `${userObject.first_name} added Job Lead`;
    const body = jobLead ? `${jobLead.job_title}` : "";

    await EmployerTimelineEntry.create({
      date_added: new Date(),
      type: "job_lead_add",
      title,
      body,
      employer: jobLead ? jobLead.employer : -1,
      job_lead: jobLead ? jobLead.id : -1,
      user: userId,
    });

    return jobLead;
  } catch (err) {
    logger.error(`Error in createJobLead: ${err}`);
    throw err;
  }
};

const setOwnerAndCreator = (job_lead, user_id) => {
  job_lead.creator = user_id;
  job_lead.owner = job_lead.owner || user_id;
};

module.exports = addJobLeadsRequestHandler;
