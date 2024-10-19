const logger = require("pino")();
const { Op } = require("sequelize");
const EmployerTimelineEntry = require("../../models/employer_timeline_entry.model");
const JobLead = require("../../models/job_lead.model");
const Employer = require("../../models/employer.model");
const Client = require("../../models/client.model");

const getAllEmployerTimelineEntriesRequestHandler = async (req, res) => {
  try {
    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    const { type, employer, search_query } = req.query;

    const query = {};

    // Use `Op.eq` for `type` since it's an ENUM
    if (type) {
      query.type = { [Op.eq]: type };
    }

    // Use `Op.eq` for `employer` since it's an integer
    if (employer) {
      const employerId = parseInt(employer, 10);
      if (!isNaN(employerId)) {
        query.employer = { [Op.eq]: employerId };
      } else {
        return res.status(400).json({
          status: "error",
          message: "Invalid employer ID",
        });
      }
    }

    // Use `LIKE` for string fields like `title` and `body`
    if (search_query) {
      query[Op.or] = [
        { title: { [Op.like]: `%${search_query}%` } },
        { body: { [Op.like]: `%${search_query}%` } },
      ];
    }

    const totalCount = await EmployerTimelineEntry.count({
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

    const employerTimelineEntries =
      await EmployerTimelineEntry.findAll(searchConfig);

    const processedEmployerTimelineEntries = await Promise.all(
      employerTimelineEntries.map(async (entry) => {
        const jobLeadDetails = entry.job_lead
          ? await JobLead.findOne({ where: { id: entry.job_lead } })
          : null;
        const clientDetails = entry.client
          ? await Client.findOne({ where: { id: entry.client } })
          : null;
        const employerDetails = entry.employer
          ? await Employer.findOne({ where: { id: entry.employer } })
          : null;

        return {
          ...entry.toJSON(),
          job_lead_details: jobLeadDetails ? jobLeadDetails.toJSON() : null,
          client_details: clientDetails ? clientDetails.toJSON() : null,
          employer_details: employerDetails ? employerDetails.toJSON() : null,
        };
      })
    );

    return res.status(200).json({
      status: "success",
      message: "Employer timeline entries fetched successfully",
      data: processedEmployerTimelineEntries,
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

module.exports = getAllEmployerTimelineEntriesRequestHandler;
