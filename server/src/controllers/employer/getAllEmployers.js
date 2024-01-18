const logger = require("pino")();
const { Op } = require("sequelize");
const Employer = require("../../models/employer.model");

const getAllEmployersRequestHandler = async (req, res) => {
  try {
    const page = req?.query?.page ? parseInt(req.query.page, 10) : 0;
    const pageSize = req?.query?.page ? parseInt(req.query.pageSize, 10) : 10;
    const offsetSize = page * pageSize;

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
      query.creation_date = { [Op.gte]: new Date(startDateAdded) };
    }

    if (endDateAdded) {
      query.creation_date = {
        ...query.creation_date,
        [Op.lte]: new Date(endDateAdded),
      };
    }

    if (ownerId && ownerId !== "-1") {
      query.creator = ownerId;
    }

    if (postalCode) {
      query.postal_code = { [Op.like]: `%${postalCode}%` };
    }
    const employers = await JobLead.findAll({
      where: query,
      limit: pageSize,
      offset: offsetSize,
    });

    const totalEmployers = await Employer.count({ where: query });

    return res.status(200).json({
      status: "success",
      message: "All employers found successfully",
      data: employers,
      total: totalEmployers,
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
