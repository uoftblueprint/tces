const logger = require("pino")();
const Client = require("../../models/client.model");
const ClientTimelineEntry = require("../../models/client_timeline_entry.model");
const User = require("../../models/user.model");

const updateClientRequestHandler = async (req, res) => {
  try {
    const { client_id } = req.params;
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
    if (req.body.values.status == "active") {
      // Case: we are setting a client back to active
      req.body.values.status_at_exit = null;
      req.body.values.status_at_3_months = null;
      req.body.values.status_at_6_months = null;
      req.body.values.status_at_9_months = null;
      req.body.values.status_at_12_months = null;
      req.body.values.closed_date = null;
    }

    req.body.values.date_updated = new Date();

    await client.set(req.body.values);
    await client.save();

    const { name, email, phone_number, status, closure_date } = req.body.values;

    const userObject = await User.findOne({
      where: { id: client.first_name },
    });

    const createTimelineEntry = async (field, value) => {
      const title = `${userObject.first_name} updated ${field} to "${value}" for ${clientObject.name}`;
      const body = `${userObject.first_name} has updated the ${field} to "${value}" for ${clientObject.name}.`;

      await ClientTimelineEntry.create({
        date_added: new Date(),
        type: "update",
        title,
        body,
        client,
        user: userObject.id,
      });
    };

    if (name && userObject) await createTimelineEntry("name", name);
    if (email && userObject) await createTimelineEntry("email", email);
    if (phone_number && userObject)
      await createTimelineEntry("phone number", phone_number);
    if (status && userObject) await createTimelineEntry("status", status);
    if (closure_date && userObject)
      await createTimelineEntry("closure date", closure_date);

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
