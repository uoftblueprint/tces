const logger = require("pino")();
const { Op, literal } = require("sequelize");
const JobLead = require("../../models/job_lead.model");

const getAllJobLeadsRequestHandler = async (req, res) => {
  try {
    const page = req?.query?.page ? parseInt(req.query.page, 10) : 1;
    const pageSize = req?.query?.page ? parseInt(req.query.pageSize, 10) : 10;
    const offsetSize = (page-1) * pageSize;

    const {
      searchTitleQuery,
      startDateCreated,
      endDateCreated,
      startDateExpired,
      endDateExpired,
      minCompensation,
      maxCompensation,
      minHoursPerWeek,
      maxHoursPerWeek,
      ownerId,
      searchNOCQuery,
      jobTypes,
    } = req.query;

    const query = {};
    if (searchTitleQuery) {
      query.job_title = { [Op.like]: `%${searchTitleQuery}%` };
    }
    if (startDateCreated) {
      query.creation_date = { [Op.gte]: new Date(startDateCreated) };
    }

    if (endDateCreated) {
      query.creation_date = {
        ...query.creation_date,
        [Op.lte]: new Date(endDateCreated),
      };
    }

    if (startDateExpired) {
      query.expiration_date = { [Op.gte]: new Date(startDateExpired) };
    }

    if (endDateExpired) {
      query.expiration_date = {
        ...query.expiration_date,
        [Op.lte]: new Date(endDateExpired),
      };
    }

    if (minCompensation !== undefined) {
      query.compensation_min = { [Op.gte]: minCompensation };
    }

    if (maxCompensation !== undefined) {
      query.compensation_max = { [Op.lte]: maxCompensation };
    }

    if (minHoursPerWeek !== undefined) {
      query.hours_per_week = { [Op.gte]: minHoursPerWeek };
    }

    if (maxHoursPerWeek !== undefined) {
      query.hours_per_week = { [Op.lte]: maxHoursPerWeek };
    }

    if (ownerId && ownerId !== "-1") {
      query.creator = ownerId;
    }

    if (searchNOCQuery) {
      query[Op.and] = literal(
        `CAST(national_occupation_code AS CHAR) LIKE '%${searchNOCQuery}%'`,
      );
    }

    if (jobTypes) {
      const jobTypesFilter = JSON.parse(jobTypes);
      query.employment_type = {
        [Op.or]: Object.entries(jobTypesFilter)
          .filter(([, value]) => value)
          .map(([key]) => key),
      };
    }

    const jobLeads = await JobLead.findAll({
      where: query,
      limit: pageSize,
      offset: offsetSize,
    });

    const totalJobLeads = await JobLead.count({ where: query });

    return res.status(200).json({
      status: "success",
      message: "All Job Leads found successfully",
      data: jobLeads,
      total: totalJobLeads,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

module.exports = getAllJobLeadsRequestHandler;
