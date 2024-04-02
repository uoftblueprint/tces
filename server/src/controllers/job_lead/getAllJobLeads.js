const logger = require("pino")();
const { Op, literal, Sequelize } = require("sequelize");
const { escape } = require("validator");
const JobLead = require("../../models/job_lead.model");
const Client = require("../../models/client.model");
const User = require("../../models/user.model");

function isValidNOCQuery(query) {
  // only numbers
  const regex = /^\d+$/;

  return regex.test(query);
}

const getAllJobLeadsRequestHandler = async (req, res) => {
  try {
    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

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
      const startDate = new Date(startDateCreated);
      startDate.setHours(0, 0, 0, 0);
      query.creation_date = { [Op.gte]: startDate };
    }

    if (endDateCreated) {
      const endDate = new Date(endDateCreated);
      endDate.setHours(23, 59, 59, 999);
      query.creation_date = {
        ...query.creation_date,
        [Op.lte]: endDate,
      };
    }

    if (startDateExpired) {
      const startDate = new Date(startDateExpired);
      startDate.setHours(0, 0, 0, 0);
      query.expiration_date = { [Op.gte]: startDate };
    }

    if (endDateExpired) {
      const endDate = new Date(endDateExpired);
      endDate.setHours(23, 59, 59, 999);
      query.expiration_date = {
        ...query.expiration_date,
        [Op.lte]: endDate,
      };
    }

    if (minCompensation !== undefined) {
      query.compensation_min = {
        [Op.or]: [{ [Op.gte]: minCompensation }, { [Op.is]: null }],
      };
    }

    if (maxCompensation !== undefined) {
      query.compensation_max = {
        [Op.or]: [{ [Op.lte]: maxCompensation }, { [Op.is]: null }],
      };
    }

    if (minHoursPerWeek !== undefined && maxHoursPerWeek !== undefined) {
      query.hours_per_week = {
        [Op.and]: [
          { [Op.gte]: minHoursPerWeek },
          { [Op.lte]: maxHoursPerWeek },
        ],
      };
    } else if (minHoursPerWeek !== undefined) {
      query.hours_per_week = { [Op.gte]: minHoursPerWeek };
    } else if (maxHoursPerWeek !== undefined) {
      query.hours_per_week = { [Op.lte]: maxHoursPerWeek };
    }

    if (ownerId && ownerId !== "-1") {
      query.owner = ownerId;
    }

    query[Op.and] = [...(query[Op.and] || [])];

    // make sure to only query if it is a valid NOC query (only numbers)
    if (searchNOCQuery && isValidNOCQuery(searchNOCQuery)) {
      const sanitizedNOCQuery = escape(searchNOCQuery);
      if (isValidNOCQuery(searchNOCQuery)) {
        query[Op.and].push(
          literal(
            `CAST(national_occupation_code AS CHAR) LIKE '%${sanitizedNOCQuery}%'`,
          ),
        );
      }
    }
    query[Op.and].push({
      [Op.or]: [
        { compensation_min: { [Op.ne]: null } },
        { compensation_max: { [Op.ne]: null } },
      ],
    });

    if (jobTypes) {
      const jobTypesFilter = JSON.parse(jobTypes);
      query.employment_type = {
        [Op.or]: Object.entries(jobTypesFilter)
          .filter(([, value]) => value)
          .map(([key]) => key),
      };
    }

    const searchConfig = {
      where: query,
    };
    if (page !== null && pageSize !== null) {
      searchConfig.limit = pageSize;
      searchConfig.offset = pageSize * page;
    }

    let jobLeads = await JobLead.findAll(searchConfig);

    if (Array.isArray(jobLeads)) {
      jobLeads = await Promise.all(
        jobLeads.map(async (jobLead) => {
          // eslint-disable-next-line camelcase
          const client_count = await Client.count({
            where: { job_lead_placement: jobLead.id },
          });
          return {
            ...jobLead.toJSON(),
            // eslint-disable-next-line camelcase
            client_count,
          };
        }),
      );
    }

    jobLeads = jobLeads.map((jl) => {
      return jl.get({ plain: true });
    });

    for (jl of jobLeads) {
      const owner = await User.findOne({ where: { id: jl.owner } });
      owner ? (jl.ownerName = `${owner.first_name} ${owner.last_name}`) : "";
    }

    const maxCompensationSoFar = await JobLead.max("compensation_max");
    const minCompensationSoFar = await JobLead.min("compensation_min");
    const minHoursPerWeekSoFar = await JobLead.min("hours_per_week");
    const maxHoursPerWeekSoFar = await JobLead.max("hours_per_week");

    const totalJobLeads = await JobLead.count({ where: query });

    const uniqueOwners = await JobLead.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("owner")), "owner"]],
      raw: true,
    });
    const uniqueOwnersList = Array.isArray(uniqueOwners)
      ? uniqueOwners.map((owner) => owner.owner)
      : [];

    return res.status(200).json({
      status: "success",
      message: "All Job Leads found successfully",
      data: jobLeads,
      total: totalJobLeads,
      aggregates: {
        maxCompensation: maxCompensationSoFar,
        minCompensation: minCompensationSoFar,
        minHoursPerWeek: minHoursPerWeekSoFar,
        maxHoursPerWeek: maxHoursPerWeekSoFar,
      },
      uniqueOwners: uniqueOwnersList,
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
