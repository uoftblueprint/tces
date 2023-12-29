const logger = require("pino")();
const Employer = require("../../models/employer.model");

const getOneEmployerRequestHandler = async (req, res) => {
  try {
    const employer_id = req.params.employer_id;

    const employer = await Employer.findOne({ where: { id: employer_id } });
    if (employer) {
      return res.status(200).json({
        status: "success",
        message: "Got employer data successfully",
        data: { employer },
      });
    }

    return res.status(404).json({
      status: "fail",
      message: `Employer with id ${employer_id} does not exist in the database`,
      data: null,
    });
  } catch (err) {
    logger.error(`Unexpected server error thrown: ${err}`);
    return res
      .status(500)
      .json({ status: "error", message: "An unexpected error occured" });
  }
};

module.exports = getOneEmployerRequestHandler;
