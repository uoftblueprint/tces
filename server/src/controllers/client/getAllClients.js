const logger = require("pino")();
const Sequelize = require("sequelize");
const Client = require("../../models/client.model");
const User = require("../../models/user.model");
const JobLead = require("../../models/job_lead.model");

const { Op } = Sequelize;

const getAllClientsRequestHandler = async (req, res) => {
  try {
    const {
      name,
      phone_number,
      date_updated_from,
      date_updated_to,
      date_registered_from,
      date_registered_to,
      owner,
      active,
      r_and_i,
      closed,
      job_lead_placement,
    } = req.query;

    let query = {};
    let query_options = {};

    // build the query object
    if (name) {
      query = {
        ...query,
        [Op.and]: Sequelize.literal(`LOWER(name) LIKE :name`),
      };
      query_options = {
        replacements: { name: `%${name.toLowerCase()}%` },
      };
    }

    if (phone_number) {
      // Validate that phoneNumber only contains digits
      if (/^\d+$/.test(phoneNumber)) {
        query.phoneNumber = Sequelize.literal(
          `REGEXP_REPLACE(phone_number, '[^0-9]', '') REGEXP '${phoneNumber}'`,
        );
      } else {
        // Handle invalid phoneNumber
        logger.error("phoneNumber should only contain digits");
      }
    }

    if (date_updated_from) {
      const date = new Date(date_updated_from);
      date.setHours(0, 0, 0, 0);
      query.date_updated = {
        [Op.gte]: date,
      };
    }

    if (date_updated_to) {
      const date = new Date(date_updated_to);
      date.setUTCHours(23, 59, 59, 999);
      query.date_updated = {
        ...query.date_updated,
        [Op.lte]: date,
      };
    }

    if (date_registered_from) {
      const date = new Date(date_registered_from);
      date.setHours(0, 0, 0, 0);
      query.date_added = {
        [Op.gte]: date,
      };
    }

    if (date_registered_to) {
      const date = new Date(date_registered_to);
      date.setHours(23, 59, 59, 999);
      query.date_added = {
        ...query.date_added,
        [Op.lte]: date,
      };
    }

    if (owner) {
      query.owner = owner;
    }
    if (job_lead_placement) {
      query.job_lead_placement = job_lead_placement;
    }
    let status_options = [];
    if (active === "true") {
      status_options = ["active"];
    }
    if (r_and_i === "true") {
      status_options = [...status_options, "r_and_i"];
    }
    if (closed === "true") {
      status_options = [...status_options, "closed"];
    }

    query.status = {
      [Op.or]: status_options,
    };

    query_options = {
      ...query_options,
      where: query,
    };
    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    if (page != null && pageSize != null) {
      query_options = {
        ...query_options,
        limit: pageSize,
        offset: page * pageSize,
      };
    }

    const clientsCount = await Client.count(query_options);

    let clientsData = await Client.findAll(query_options);

    if (Array.isArray(clientsData)) {
      clientsData = await Promise.all(
        clientsData.map(async (client) => {
          const owner = await User.findOne({ where: { id: client.owner } });
          const userName = owner
            ? `${owner.first_name} ${owner.last_name}`
            : `Unknown`;

          const owner_details = owner
            ? {
                ownerID: owner.id,
                userName,
                firstName: owner.first_name,
                lastName: owner.last_name,
              }
            : null;

          return {
            ...client.toJSON(),
            ownerName: userName,
            // eslint-disable-next-line camelcase
            owner_details,
          };
        }),
      );
    }

    const uniqueOwners = await Client.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("owner")), "owner"]],
      raw: true,
    });
    const uniqueOwnersList = Array.isArray(uniqueOwners)
      ? await Promise.all(
          uniqueOwners.map(async (owner) => {
            const user = await User.findOne({ where: { id: owner.owner } });
            return {
              ownerID: owner.owner,
              userName: user
                ? `${user.first_name} ${user.last_name}`
                : `User ${owner.owner}`,
            };
          }),
        )
      : [];

    return res.status(200).json({
      status: "success",
      message: "All clients found successfully",
      data: {
        rows: clientsData,
        count: clientsCount,
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

module.exports = getAllClientsRequestHandler;
