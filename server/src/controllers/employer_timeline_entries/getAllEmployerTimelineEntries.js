const logger = require("pino")();
const { Op } = require("sequelize");
const EmployerTimelineEntry = require("../../models/employer_timeline_entry.model");

const getAllEmployerTimelineEntriesRequestHandler = async (req, res) => {
  try {
    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    const { type } = req.query;

    const query = {};
    if (type) {
      query.type = { [Op.like]: `%${type}%` };
    }

    const searchConfig = {
      where: query,
    };

    if (page != null && pageSize != null) {
      searchConfig.limit = pageSize;
      searchConfig.offset = page * pageSize;
    }

    const employerTimelineEntries =
      await EmployerTimelineEntry.findAll(searchConfig);

    return res.status(200).json({
      status: "success",
      message: "Employer timeline entries fetched successfully",
      data: employerTimelineEntries,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected server error occured.",
    });
  }
};

module.exports = getAllEmployerTimelineEntriesRequestHandler;
