const logger = require("pino")();
const { Op } = require("sequelize");
const JobLeadTimelineEntry = require("../../models/job_lead_timeline_entry.model");

const getAllJobLeadTimelineEntriesRequestHandler = async (req, res) => {
  try {
    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    const { type, job_lead } = req.query;

    const query = {};
    if (type) {
      query.type = { [Op.like]: `%${type}%` };
    }

    if (job_lead) {
      query.job_lead = { [Op.like]: `%${job_lead}%` };
    }

    const searchConfig = {
      where: query,
    };

    if (page != null && pageSize != null) {
      searchConfig.limit = pageSize;
      searchConfig.offset = page * pageSize;
    }

    const jobLeadTimelineEntries =
      await JobLeadTimelineEntry.findAll(searchConfig);

    return res.status(200).json({
      status: "success",
      message: "Job lead timeline entries fetched successfully",
      data: jobLeadTimelineEntries,
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
