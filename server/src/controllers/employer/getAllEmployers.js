const logger = require("pino")();
const Employer = require("../../models/employer.model");

const getAllEmployersRequestHandler = async (req, res) => {
  try {
    const employers = await Employer.findAll();

    return res.status(200).json({
      status: "success",
      message: "All employers found successfully",
      data: employers,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
        status: "error",
        message: "An unexpected server error occured."
    })
  }
};

module.exports = getAllEmployersRequestHandler;