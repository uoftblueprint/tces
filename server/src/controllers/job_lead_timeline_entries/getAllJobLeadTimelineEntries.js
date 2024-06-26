const logger = require("pino")();
const { Op } = require("sequelize");
const JobLeadTimelineEntry = require("../../models/job_lead_timeline_entry.model");
const Client = require("../../models/client.model");
const JobLead = require("../../models/job_lead.model");

const getAllJobLeadTimelineEntriesRequestHandler = async (req, res) => {
  try {
    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    const { type, job_lead, search_query } = req.query;

    const query = {};
    if (type) {
      query.type = { [Op.like]: `%${type}%` };
    }

    if (job_lead) {
      query.job_lead = job_lead;
    }

    if (search_query) {
      query[Op.or] = [
        { title: { [Op.like]: `%${search_query}%` } },
        { body: { [Op.like]: `%${search_query}%` } },
      ];
    }

    const totalCount = await JobLeadTimelineEntry.count({
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

    const rawJobLeadTimelineEntries =
      await JobLeadTimelineEntry.findAll(searchConfig);

    const processedJobLeadTimelineEntries = await Promise.all(
      rawJobLeadTimelineEntries.map(async (entry) => {
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
      }),
    );

    return res.status(200).json({
      status: "success",
      message: "Job lead timeline entries fetched successfully",
      data: processedJobLeadTimelineEntries,
      totalCount,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected server error occured.",
    });
  }
};

module.exports = getAllJobLeadTimelineEntriesRequestHandler;
