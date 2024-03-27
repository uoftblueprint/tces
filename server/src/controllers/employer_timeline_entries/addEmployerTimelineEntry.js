const logger = require("pino")();
const EmployerTimelineEntry = require("../../models/employer_timeline_entry.model");
const {
  submitPlacementUpdateEntryInTimelines,
} = require("../../utils/placement_entry_util");
const JobLead = require("../../models/job_lead.model");

const addEmployerTimelineEntryRequestHandler = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { type, title, body, contact, client, job_lead, employer } =
      req.body.entry;

    const { user } = req;

    const validTypes = ["contact", "placement", "note"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        status: "fail",
        message: "Type not defined or is not valid",
        data: null,
      });
    }

    if (["contact"].includes(type) && (!user || !body || !employer)) {
      return res.status(400).json({
        status: "fail",
        message: `For type ${type}, user, employer, and body must be defined`,
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
          "For type placement, user, client, and job_lead must be defined",
        data: null,
      });
    }

    if (type === "note" && (!user || !body || !employer)) {
      return res.status(400).json({
        status: "fail",
        message: "For type note, user, employer, and body must be defined",
        data: null,
      });
    }

    let employerTimelineEntry;

    if (type === "placement") {
      const jobLeadObject = await JobLead.findOne({ where: { id: job_lead } });
      employerTimelineEntry = await submitPlacementUpdateEntryInTimelines(
        // eslint-disable-next-line camelcase
        {
          type,
          client,
          job_lead,
          user: user.id,
          employer: jobLeadObject.employer,
        },
        "employer",
      );
    } else {
      let bodyTitle = title;

      if (type === "note") {
        bodyTitle = `${user.first_name} ${user.last_name} Added Note`;
      }

      if (type === "contact") {
        bodyTitle = `${user.first_name} ${user.last_name} Contacted Employer`;
      }

      employerTimelineEntry = await EmployerTimelineEntry.create({
        date_added: new Date(),
        type,
        title: bodyTitle,
        body,
        contact,
        client,
        employer,
        // eslint-disable-next-line camelcase
        job_lead,
        user: user.id,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "created employer timeline entry",
      data: { employerTimelineEntry },
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

module.exports = addEmployerTimelineEntryRequestHandler;
