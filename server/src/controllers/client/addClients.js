const logger = require("pino")();
const Client = require("../../models/client.model");

const addClientsRequestHandler = async (req, res) => {
  try {
    if (req.body.client instanceof Array) {
      // bulk create clients

      const clients = await Client.bulkCreate(req.body.client);

      return res.status(200).json({
        status: "success",
        message: "created clients",
        data: { clients },
      });
    }

    // create one client
    const client = await Client.create({
      owner: req.body.client.owner,
      creator: req.body.client.creator,
      name: req.body.client.name,
      email: req.body.client.email,
      phone_number: req.body.client.phone_number,
      status: req.body.client.status,
      closure_date: new Date(req.body.client.closure_date),
      status_at_exit: "active",
      status_at_3_months: "active",
      status_at_6_months: "active",
      status_at_12_months: "active",
    });
    return res
      .status(200)
      .json({ status: "success", message: "created client", data: { client } });
  } catch (err) {
    if (err.name == "SequelizeUniqueConstraintError") {
      // This means that either user or owner is not a valid user
      return res.status(400).json({
        status: "fail",
        message:
          "Either owner or creator is not a valid user, OR the email is already in use",
        data: null,
      });
    }

    logger.error(`Unexpected error thrown: ${err}`);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = addClientsRequestHandler;
