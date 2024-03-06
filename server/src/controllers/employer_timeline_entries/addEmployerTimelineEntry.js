const logger = require("pino")();
const EmployerTimelineEntry = require("../../models/employer_timeline_entry.model");
const {
  submitPlacementUpdateEntryInTimelines,
} = require("../../utils/placement_entry_util");

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

    if (
      ["contact"].includes(type) &&
      (!user || !title || !body || !client || !employer)
    ) {
      return res.status(400).json({
        status: "fail",
        message: `For type ${type}, user, title, employer, body, and client must be defined`,
        data: null,
      });
    }

    if (
      type === "placement" &&
      // eslint-disable-next-line camelcase
      (!user || !client || !job_lead || !employer)
    ) {
      return res.status(400).json({
        status: "fail",
        message:
          "For type placement, user, title, employer, body, client, and job_lead must be defined",
        data: null,
      });
    }

    if (type === "contact" && (!user || !title || !body || !contact)) {
      return res.status(400).json({
        status: "fail",
        message:
          "For type note, user, employer, title, contact and body must be defined",
        data: null,
      });
    }

    if (type === "note" && (!user || !title || !body || !employer)) {
      return res.status(400).json({
        status: "fail",
        message:
          "For type note, user, employer, title, and body must be defined",
        data: null,
      });
    }

    let employerTimelineEntry;

    if (type === "placement") {
      employerTimelineEntry = await submitPlacementUpdateEntryInTimelines(
        // eslint-disable-next-line camelcase
        { type, client, job_lead, user: user.id, employer },
        "employer",
      );
    } else {
      employerTimelineEntry = await EmployerTimelineEntry.create({
        date_added: new Date(),
        type,
        title,
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
