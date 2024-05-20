const logger = require("pino")();
const Client = require("../../models/client.model");
const User = require("../../models/user.model");

const getOneClientRequestHandler = async (req, res) => {
  try {
    const { client_id } = req.params;

    let client = await Client.findOne({ where: { id: client_id } });

    if (client) {
      const owner = await User.findOne({ where: { id: client.owner } });

      const ownerUserName = owner
        ? `${owner.first_name} ${owner.last_name}`
        : `Unknown`;

      const owner_details = owner
        ? {
            ownerID: owner.id,
            ownerUserName,
            firstName: owner.first_name,
            lastName: owner.last_name,
          }
        : null;

      const creator = await User.findOne({ where: { id: client.creator } });

      const creatorUserName = creator
        ? `${creator.first_name} ${creator.last_name}`
        : `Unknown`;

      const creator_details = creator
        ? {
            creatorID: creator.id,
            creatorUserName,
            firstName: creator.first_name,
            lastName: creator.last_name,
          }
        : null;

      if (creator_details || owner_details) {
        client = {
          ...client.toJSON(),
          owner_details,
          creator_details,
        };
      }

      return res.status(200).json({
        status: "success",
        message: "Got client data successfully",
        data: { client },
      });
    }

    return res.status(404).json({
      status: "fail",
      message: `Client with id ${client_id} does not exist in the database`,
      data: null,
    });
  } catch (err) {
    logger.error(`Unexpected server error thrown: ${err}`);
    return res
      .status(500)
      .json({ status: "error", message: "An unexpected error occured" });
  }
};

module.exports = getOneClientRequestHandler;
