const logger = require("pino")();
const Client = require("../../models/client.model");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const getAllClientsRequestHandler = async (req, res) => {
  try {
    const {
      name,
      phone_number,
      date_updated_from,
      date_updated_to,
      date_registered_from,
      date_registered_to,
      owner_id,
      active,
      r_and_i,
      closed
    } = req.query;

    let query = {}
    let query_options = {}

    // build the query object
    if (name) {
      query = {
        ...query,
        [Op.and]: sequelize.literal(
          `LOWER(name) LIKE :name`,
        ),
      }
      query_options = {
        replacements: { name: `%${name.toLowerCase()}%` },
      }
    }

    if (phone_number) {
      query.phone_number = { [Op.like]: `%${phone_number}` }
    }

    if (date_updated_from) {
      query.date_updated = {
        [Op.gte]: new Date(date_updated_from),
      }
    }

    if (date_updated_to) {
      const date = new Date(date_updated_to)
      date.setUTCHours(23, 59, 59, 999);
      query.date_updated = {
        [Op.lte]: date,
      }
    }

    if (date_registered_from) {
      query.date_registered = {
        [Op.gte]: new Date(date_registered_from),
      }
    }

    if (date_registered_to) {
      const date = new Date(date_registered_to)
      date.setHours(23, 59, 59, 999);
      query.date_registered = {
        [Op.lte]: date,
      }
    }

    if (owner_id) {
      query.owner = owner_id
    }
    let status_options = []
    if (active === "true") { status_options = ["active"] }
    if (r_and_i === "true") { status_options = [...status_options, "r_and_i"] }
    if (closed === "true") { status_options = [...status_options, "closed"] }

    query.status = {
      [Op.or]: status_options
    }

    query_options = {
      ...query_options,
      where: query
    }
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    if (page && limit) {
      query_options = {
        ...query_options,
        limit: limit,
        offset: (page - 1) * limit,
      }
    }
    console.log(query_options)
    const clients = await Client.findAndCountAll(query_options);

    return res.status(200).json({
      status: "success",
      message: "All clients found successfully",
      data: clients,
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
