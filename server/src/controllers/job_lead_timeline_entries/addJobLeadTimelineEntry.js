const logger = require("pino")();
const JobLeadTimelineEntry = require("../../models/job_lead_timeline_entry.model");
const {
  submitPlacementUpdateEntryInTimelines,
} = require("../../utils/placement_entry_util");
const Employer = require("../../models/employer.model");
const JobLead = require("../../models/job_lead.model");

const addJobLeadTimelineEntryRequestHandler = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { type, title, body, client, job_lead } = req.body.entry;

    const { user } = req;

    const validTypes = ["placement", "note"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        status: "fail",
        message: "Type not defined or is not valid",
        data: null,
      });
    }

    if (
      type === "placement" &&
      // eslint-disable-next-line camelcase
      (!user || !client || !job_lead)
    ) {
      return res.status(400).json({
        status: "fail",
        message:
          "For type placement, user, title, body, client, and job_lead must be defined",
        data: null,
      });
    }

    // eslint-disable-next-line camelcase
    if (type === "note" && (!user || !title || !body || !job_lead)) {
      return res.status(400).json({
        status: "fail",
        message: "For type note, user, title, and body must be defined",
        data: null,
      });
    }

    let jobLeadTimelineEntry;

    if (type === "placement") {
      const jobLeadObject = await JobLead.findOne({ where: { id: job_lead } });
      const employerObject = await Employer.findOne({
        where: { id: jobLeadObject.employer },
      });
      jobLeadTimelineEntry = await submitPlacementUpdateEntryInTimelines(
        // eslint-disable-next-line camelcase
        { type, client, job_lead, user: user.id, employer: employerObject.id },
        "job_lead",
      );
    } else {
      jobLeadTimelineEntry = await JobLeadTimelineEntry.create({
        date_added: new Date(),
        type,
        title,
        body,
        client,
        // eslint-disable-next-line camelcase
        job_lead,
        user: user.id,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "created job lead timeline entry",
      data: { jobLeadTimelineEntry },
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      // This means that either user or owner is not a valid user
      return res.status(400).json({
        status: "fail",
        message: "Either owner or creator is not a valid user",
        data: null,
      });
    }

    logger.error(`Unexpected error thrown: ${err}`);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = addJobLeadTimelineEntryRequestHandler;
