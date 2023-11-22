const logger = require("pino")();
const Client = require("../../models/client.model");

const updateClientRequestHandler = async (req, res) => {
  try {
    const client_id = req.params.client_id;
    const client = await Client.findOne({ where: { id: client_id } });
    if (!client) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found", data: null });
    }
    if (!req.body.values) {
      return res.status(401).json({
        status: "fail",
        message: "Missing values to update in parameters",
        data: null,
      });
    }
    if (req.body.values.creator) {
      return res.status(403).json({
        status: "fail",
        message: "You cannot change the creator of a client.",
        data: null,
      });
    }
    if (req.body.values.status == "closed") {
      // Case: we are closing a client
      if (!req.body.values.status_at_exit) {
        return res.status(403).json({
          status: "fail",
          message: "You must provide a status_at_exit when closing a client",
          data: null,
        });
      }

      req.body.values.closed_date = new Date();
    }

    await client.set(req.body.values);
    await client.save();

    return res.status(200).json({
      status: "success",
      message: "Client updated successfully",
      data: client,
    });
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

    logger.error(`Unexpected server error: ${err}`);
    return res
      .status(500)
      .json({ status: "error", message: "Unexpected server error" });
  }
};

module.exports = updateClientRequestHandler;