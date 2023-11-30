const JobLead = require("../../models/job_lead.model");

const getAllJobLeadsRequestHandler = async (req, res) => {
  try {
    const job_leads = await JobLead.findAll();

    return res.status(200).json({
      status: "success",
      message: "All Job Leads found successfully",
      data: job_leads,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

module.exports = getAllJobLeadsRequestHandler;