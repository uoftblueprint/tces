const logger = require("pino")();
const Employer = require("../../models/employer.model");

const updateEmployerRequestHandler = async (req, res) => {
  try {
    const employer_id = req.params.employer_id;
    const employer = await Employer.findOne({ where: { id: employer_id } });
    if (!employer) {
      return res
        .status(404)
        .json({ status: "fail", message: "Employer not found", data: null });
    }
    if (!req.body.values) {
      return res.status(401).json({
        status: "fail",
        message: "Missing values to update in parameters",
        data: null,
      });
    }

    await employer.set(req.body.values);
    await employer.save();

    return res.status(200).json({
      status: "success",
      message: "Employer updated successfully",
      data: employer,
    });
  } catch (err) {
    if (err.name == "SequelizeUniqueConstraintError") {
      // This means that either user or owner is not a valid user
      return res.status(400).json({
        status: "fail",
        message: "Either owner or creator is not a valid user",
        data: null,
      });
    }

    logger.error(`Unexpected server error: ${err}`);
    return res
      .status(500)
      .json({ status: "error", message: "Unexpected server error" });
  }
};

module.exports = updateEmployerRequestHandler;
