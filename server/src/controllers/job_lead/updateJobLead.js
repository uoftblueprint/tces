const logger = require("pino")();
const JobLead = require("../../models/job_lead.model");

const updateJobLeadRequestHandler = async (req, res) => {
  try {
    const job_lead_id = req.params.job_lead_id;
    const job_lead = await JobLead.findOne({ where: { id: job_lead_id } });

    if (!job_lead) {
      return res
        .status(404)
        .json({ status: "fail", message: "Job lead not found", data: null });
    }
    if (!req.body.values) {
      return res.status(401).json({
        status: "fail",
        message: "Missing values to update in parameters",
        data: null,
      });
    }
    if (req.body.values.creator) {
      return res.status(403).json({
        status: "fail",
        message: "You cannot change the creator of a job lead.",
        data: null,
      });
    }
    await job_lead.set(req.body.values);
    await job_lead.save();

    return res.status(200).json({
      status: "success",
      message: "Job lead updated successfully",
      data: job_lead,
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

    logger.error(`Unexpected server error: ${err}`);
    return res
      .status(500)
      .json({ status: "error", message: "Unexpected server error" });
  }
};

module.exports = updateJobLeadRequestHandler;
