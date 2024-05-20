const logger = require("pino")();
const Employer = require("../../models/employer.model");
const User = require("../../models/user.model");

const getOneEmployerRequestHandler = async (req, res) => {
  try {
    const { employer_id } = req.params;

    let employer = await Employer.findOne({ where: { id: employer_id } });
    if (employer) {
      const owner = await User.findOne({ where: { id: employer.owner } });
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

      const creator = await User.findOne({ where: { id: employer.creator } });

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
        employer = {
          ...employer.toJSON(),
          creator_details,
          owner_details,
        };
      }

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
