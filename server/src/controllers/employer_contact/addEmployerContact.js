const logger = require("pino")();
const EmployerContact = require("../../models/employer_contact.model");
const Employer = require("../../models/employer.model");

const {
  addDefaultDates,
  setOwnerAndCreator,
} = require("../../utils/creation_util");

const addEmployerContactRequestHandler = async (req, res) => {
  try {
    if (req.body.employer_contact instanceof Array) {
      req.body.employer_contact.forEach((employer_contact) => {
        // validate each employer contact, and add values
        addDefaultDates(employer_contact);
        setOwnerAndCreator(employer_contact, req.user.id);
      });

      // bulk create employer contacts
      const employer_contacts = await EmployerContact.bulkCreate(
        req.body.employer_contact,
      );

      return { status: "success", data: { employer_contacts } };
    }

    const { name, email, job_type, phone_number, alt_phone_number, employer } =
      req.body;
    const errors = [];
    if (!name) {
      errors.push("name");
    }
    if (!email) {
      errors.push("email");
    }
    if (!phone_number) {
      errors.push("phone number");
    }
    if (errors.length > 0) {
      message = errors.join(", ");
      return res.status(400).json({
        status: "fail",
        message: `The following fields were missing: ${message}`,
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
