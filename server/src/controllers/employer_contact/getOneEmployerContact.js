const logger = require("pino")();
const EmployerContact = require("../../models/employer_contact.model");

const getOneEmployerContactRequestHandler = async (req, res) => {
  try {
    let employer_contact = req.params.employer_contact_id;

    employer_contact = await EmployerContact.findOne({
      where: { id: employer_contact },
    });
    if (employer_contact) {
      return res.status(200).json({
        status: "success",
        message: "Employer contact successfully retrieved",
        data: { employer_contact },
      });
    }

    return res.status(404).json({
      status: "fail",
      message: `Employer Contact with id ${req.params.employer_contact_id} does not exist in the database`,
      data: null,
    });
  } catch (err) {
    logger.error(`Unexpected server error thrown: ${err}`);
    return res
      .status(500)
      .json({ status: "error", message: "An unexpected error occured" });
  }
};

module.exports = getOneEmployerContactRequestHandler;
