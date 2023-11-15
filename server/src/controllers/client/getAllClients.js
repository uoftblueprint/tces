const logger = require("pino")();
const Client = require("../../models/client.model");

const getAllClientsRequestHandler = async (req, res) => {
  try {
    const clients = await Client.findAll();

    return res.status(200).json({
      status: "success",
      message: "All clients found successfully",
      data: clients,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occurred",
    });
  }
};

module.exports = getAllClientsRequestHandler;
