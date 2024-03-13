const logger = require("pino")();
const { Op } = require("sequelize");
const ClientTimelineEntry = require("../../models/client_timeline_entry.model");

const getAllClientTimelineEntriesRequestHandler = async (req, res) => {
  try {
    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    const { type, client } = req.query;

    const query = {};
    if (type) {
      query.type = { [Op.like]: `%${type}%` };
    }

    if (client) {
      query.client = { [Op.like]: `%${client}%` };
    }

    const searchConfig = {
      where: query,
    };

    if (page != null && pageSize != null) {
      searchConfig.limit = pageSize;
      searchConfig.offset = page * pageSize;
    }

    const clientTimelineEntries =
      await ClientTimelineEntry.findAll(searchConfig);

    return res.status(200).json({
      status: "success",
      message: "Client timeline entries fetched successfully",
      data: clientTimelineEntries,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected server error occured.",
    });
  }
};

module.exports = getAllClientTimelineEntriesRequestHandler;
