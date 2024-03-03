const logger = require("pino")();
const ClientTimelineEntry = require("../../models/client_timeline_entry.model");
const JobLead = require("../../models/job_lead.model");
const Employer = require("../../models/employer.model");

const addClientTimelineEntryRequestHandler = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { type, title, body, client, job_lead } = req.body.entry;

    const { user } = req;

    const validTypes = ["contact", "note"];
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

    if (type === "note" && (!user || !title || !body)) {
      return res.status(400).json({
        status: "fail",
        message: "For type note, user, title, and body must be defined",
        data: null,
      });
    }

    const jobLead = await JobLead.findOne({ where: { id: job_lead } });
    const employer = await Employer.findOne({ where: {id: jobLead.employer }})

    const clientTimelineEntry = await ClientTimelineEntry.create({
      date_added: new Date(),
      type,
      title,
      body,
      client,
      employer: employer.id,
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
