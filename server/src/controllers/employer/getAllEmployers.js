const logger = require("pino")();
const { Op, Sequelize } = require("sequelize");
const Employer = require("../../models/employer.model");

const getAllEmployersRequestHandler = async (req, res) => {
  try {
    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    const {
      employerName,
      phoneNumber,
      startDateAdded,
      endDateAdded,
      ownerId,
      postalCode,
    } = req.query;

    const query = {};
    if (employerName) {
      query.name = { [Op.like]: `%${employerName}%` };
    }
    if (phoneNumber) {
      query.phone_number = { [Op.like]: `%${phoneNumber}%` };
    }
    if (startDateAdded) {
      const startDate = new Date(startDateAdded);
      startDate.setHours(0, 0, 0, 0);
      query.date_added = { [Op.gte]: startDate };
    }

    if (endDateAdded) {
      const endDate = new Date(endDateAdded);
      endDate.setHours(23, 59, 59, 999);
      query.date_added = {
        ...query.date_added,
        [Op.lte]: endDate,
      };
    }

    if (ownerId && ownerId !== "-1") {
      query.owner = ownerId;
    }

    if (postalCode) {
      query.postal_code = { [Op.like]: `%${postalCode}%` };
    }

    const searchConfig = {
      where: query,
    };

    if (page != null && pageSize != null) {
      searchConfig.limit = pageSize;
      searchConfig.offset = page * pageSize;
    }

    const employers = await Employer.findAll(searchConfig);

    const totalEmployers = await Employer.count({ where: query });

    const uniqueOwners = await Employer.findAll({
      attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("owner")), "owner"]],
      raw: true,
    });
    const uniqueOwnersList = Array.isArray(uniqueOwners)
      ? uniqueOwners.map((owner) => owner.owner)
      : [];

    return res.status(200).json({
      status: "success",
      message: "All employers found successfully",
      data: employers,
      total: totalEmployers,
      uniqueOwners: uniqueOwnersList,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected server error occured.",
    });
  }
};

module.exports = getAllEmployersRequestHandler;
