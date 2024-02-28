const logger = require("pino")();
const ClientTimelineEntry = require("../../models/client_timeline_entry.model");
const {
  submitPlacementUpdateEntryInTimelines,
} = require("../../utils/placement_entry_util");

const addClientTimelineEntryRequestHandler = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { type, title, body, client, job_lead } = req.body.entry;

    const { user } = req;

    const validTypes = ["update", "contact", "placement", "note"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        status: "fail",
        message: "Type not defined or is not valid",
        data: null,
      });
    }

    if (
      ["update", "contact"].includes(type) &&
      (!user || !title || !body || !client)
    ) {
      return res.status(400).json({
        status: "fail",
        message: `For type ${type}, user, title, body, and client must be defined`,
        data: null,
      });
    }

    if (
      type === "placement" &&
      // eslint-disable-next-line camelcase
      (!user || !title || !body || !client || !job_lead)
    ) {
      return res.status(400).json({
        status: "fail",
        message:
          "For type placement, user, title, body, client, and job_lead must be defined",
        data: null,
      });
    }

    if (type === "note" && (!user || !title || !body)) {
      return res.status(400).json({
        status: "fail",
        message: "For type note, user, title, and body must be defined",
        data: null,
      });
    }

    let clientTimelineEntry;

    if (type === "placement") {
      clientTimelineEntry = submitPlacementUpdateEntryInTimelines(
        // eslint-disable-next-line camelcase
        { type, title, body, client, job_lead, user },
        "client",
      );
    } else {
      clientTimelineEntry = await ClientTimelineEntry.create({
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
      message: "created client timeline entry",
      data: { clientTimelineEntry },
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

module.exports = addClientTimelineEntryRequestHandler;
