const logger = require("pino")();
const { Op } = require("sequelize");
const ClientTimelineEntry = require("../../models/client_timeline_entry.model");
const JobLead = require("../../models/job_lead.model");
const Client = require("../../models/client.model");

const getAllClientTimelineEntriesRequestHandler = async (req, res) => {
  try {
    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    const { type, client, search_query } = req.query;

    const query = {};

    // Use `Op.eq` for `type` since it's an ENUM field
    if (type) {
      query.type = { [Op.eq]: type };
    }

    // Use `Op.eq` for `client` since it's an integer field
    if (client) {
      query.client = { [Op.eq]: client };
    }

    // Use `LIKE` for string fields like `title` and `body` for search queries
    if (search_query) {
      query[Op.or] = [
        { title: { [Op.like]: `%${search_query}%` } },
        { body: { [Op.like]: `%${search_query}%` } },
      ];
    }

    const totalCount = await ClientTimelineEntry.count({
      where: query,
    });

    const searchConfig = {
      where: query,
      order: [["date_added", "DESC"]],
    };

    if (page != null && pageSize != null) {
      searchConfig.limit = pageSize;
      searchConfig.offset = page * pageSize;
    }

    const clientTimelineEntries =
      await ClientTimelineEntry.findAll(searchConfig);

    const processedClientTimelineEntries = await Promise.all(
      clientTimelineEntries.map(async (entry) => {
        const jobLeadDetails = entry.job_lead
          ? await JobLead.findOne({ where: { id: entry.job_lead } })
          : null;
        const clientDetails = entry.client
          ? await Client.findOne({ where: { id: entry.client } })
          : null;
        return {
          ...entry.toJSON(),
          job_lead_details: jobLeadDetails ? jobLeadDetails.toJSON() : null,
          client_details: clientDetails ? clientDetails.toJSON() : null,
        };
      })
    );

    return res.status(200).json({
      status: "success",
      message: "Client timeline entries fetched successfully",
      data: processedClientTimelineEntries,
      totalCount,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected server error occurred.",
    });
  }
};

module.exports = getAllClientTimelineEntriesRequestHandler;
