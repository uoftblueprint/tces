const logger = require("pino")();
const EmployerContact = require("../../models/employer_contact.model");

const updateEmployerContactRequestHandler = async (req, res) => {
  try {
    const employer_contact_id = req.params.employer_contact_id;
    const employer_contact = await EmployerContact.findOne({
      where: { id: employer_contact_id },
    });
    if (!employer_contact) {
      return res
        .status(404)
        .json({
          status: "fail",
          message: "Employer contact not found",
          data: null,
        });
    }
    if (req.body.employer) {
      return res.status(403).json({
        status: "fail",
        message: "You cannot change the employer of an employer contact.",
        data: null,
      });
    }

    employer_contact.set(req.body);
    await employer_contact.save();

    return res.status(200).json({
      status: "success",
      message: "Employer contact updated successfully",
      data: employer_contact,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res
      .status(500)
      .json({ status: "error", message: "Unexpected server error" });
  }
};

module.exports = updateEmployerContactRequestHandler;
