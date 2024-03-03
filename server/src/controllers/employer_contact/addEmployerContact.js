const logger = require("pino")();
const EmployerContact = require("../../models/employer_contact.model");
const Employer = require("../../models/employer.model");

const addEmployerContactRequestHandler = async (req, res) => {
  try {
    const { name, email, job_type, phone_number, alt_phone_number, employer } =
      req.body;
    if (!name || !email || !phone_number) {
      return res.status(400).json({
        status: "fail",
        message:
          "Name, email and phone_number should be specified when creating an employer contact",
        data: null,
      });
    }
    const employerObject = await Employer.findByPk(Number(employer));

    if (!employerObject) {
      return res.status(400).json({
        status: "fail",
        message:
          "Employer should be specified when creating an employer contact",
        data: null,
      });
    }
    // create one employer
    const employer_contact = await EmployerContact.create({
      name,
      email,
      job_type,
      phone_number,
      alt_phone_number,
      employer,
    });
    return res.status(200).json({
      status: "success",
      message: "created employer contact",
      data: { employer_contact },
    });
  } catch (err) {
    logger.error(`Unexpected error thrown: ${err}`);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = addEmployerContactRequestHandler;
