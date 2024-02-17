const logger = require("pino")();
const JobLeadTimelineEntry = require("../../models/job_lead_timeline_entry.model");
const {
  submitPlacementUpdateEntryInTimelines,
} = require("../../utils/placement_entry_util");

const addJobLeadTimelineEntryRequestHandler = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { type, title, body, client, job_lead, user, employer } =
      req.body.entry;

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
      (!user || !title || !body || !client || !job_lead || !employer)
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
      jobLeadTimelineEntry = await submitPlacementUpdateEntryInTimelines(
        // eslint-disable-next-line camelcase
        { type, title, body, client, job_lead, user, employer },
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
        user,
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
