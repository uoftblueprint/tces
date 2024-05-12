const logger = require("pino")();
const ClientTimelineEntry = require("../../models/client_timeline_entry.model");

const addClientTimelineEntryRequestHandler = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { type, title, body, client, job_lead, employer } = req.body.entry;

    const { user } = req;

    const validTypes = ["contact", "note"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        status: "fail",
        message: "Type not defined or is not valid",
        data: null,
      });
    }

    if (["contact"].includes(type) && (!user || !body || !client)) {
      return res.status(400).json({
        status: "fail",
        message: `For type ${type}, user, body, and client must be defined`,
        data: null,
      });
    }

    if (type === "note" && (!user || !client || !body)) {
      return res.status(400).json({
        status: "fail",
        message: "For type note, user, client, body must be defined",
        data: null,
      });
    }

    let bodyTitle = title;

    if (type === "note") {
      bodyTitle = `${user.first_name} ${user.last_name} Added Note`;
    }

    if (type === "contact") {
      bodyTitle = `${user.first_name} ${user.last_name} Contacted Client`;
    }

    const clientTimelineEntry = await ClientTimelineEntry.create({
      date_added: new Date(),
      type,
      title: bodyTitle,
      body,
      client,
      employer,
      // eslint-disable-next-line camelcase
      job_lead,
      user: user.id,
    });

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
