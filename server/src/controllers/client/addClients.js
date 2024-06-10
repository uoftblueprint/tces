const logger = require("pino")();
const Client = require("../../models/client.model");
const {
  addDefaultDates,
  setOwnerAndCreator,
} = require("../../utils/creation_util");

const addClientsRequestHandler = async (req, res) => {
  try {
    if (req.body.client instanceof Array) {
      req.body.client.forEach((client) => {
        // validate each client, and add values
        addDefaultDates(client);
        setOwnerAndCreator(client, req.user.id);
      });

      // bulk create clients
      const clients = await Client.bulkCreate(req.body.client);

      return { status: "success", data: { clients } };
    }

    var closure_date = null;
    if (req.body.client.closure_date) {
      closure_date = new Date(req.body.client.closure_date);
    }

    addDefaultDates(req.body.client);
    setOwnerAndCreator(req.body.client, req.user.id);

    // create one client
    const client = await Client.create({
      owner: req.body.client.owner,
      creator: req.user.id,
      date_added: req.body.client.date_added,
      date_updated: req.body.client.date_updated,
      name: req.body.client.name,
      email: req.body.client.email || null,
      phone_number: req.body.client.phone_number || null,
      status: req.body.client.status || "active",
      closure_date: closure_date || null,
      status_at_exit: null,
      status_at_3_months: null,
      status_at_6_months: null,
      status_at_9_months: null,
      status_at_12_months: null,
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
