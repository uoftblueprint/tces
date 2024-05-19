const logger = require("pino")();
const { Op } = require("sequelize");
const EmployerContact = require("../../models/employer_contact.model");

const getAllEmployerContactsRequestHandler = async (req, res) => {
  try {
    const { employer } = req.query;

    const query = {};
    if (employer) {
      query.employer = { [Op.eq]: Number(employer) };
    }

    const employer_contacts = await EmployerContact.findAll({ where: query });

    return res.status(200).json({
      status: "success",
      message: "All employer contacts found successfully",
      data: employer_contacts,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected server error occured.",
    });
  }
};

module.exports = getAllEmployerContactsRequestHandler;
