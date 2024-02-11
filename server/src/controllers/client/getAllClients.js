const logger = require("pino")();
const Sequelize = require("sequelize");
const Client = require("../../models/client.model");

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
      query.phone_number = { [Op.like]: `%${phone_number}%` };
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
      console.log("hit");
      query_options = {
        ...query_options,
        limit: pageSize,
        offset: page * pageSize,
      };
    }

    const clients = await Client.findAndCountAll(query_options);

    const uniqueOwners = await Client.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("owner")), "owner"]],
      raw: true,
    });
    const uniqueOwnersList = Array.isArray(uniqueOwners)
      ? uniqueOwners.map((owner) => owner.owner)
      : [];

    return res.status(200).json({
      status: "success",
      message: "All clients found successfully",
      data: clients,
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
