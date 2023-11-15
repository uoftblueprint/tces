const logger = require("pino")();
const Employer = require("../../models/employer.model");

const addEmployersRequestHandler = async (req, res) => {
  try {
    if (req.body.employer instanceof Array) {
      // bulk create employers
      const employers = await Employer.bulkCreate(req.body.employer);

      return res.status(200).json({
        status: "success",
        message: "created employers",
        data: { employers },
      });
    }

    // create one employer
    const employer = await Employer.create({
      owner: req.body.client.owner,
      creator: req.body.client.creator,
      name: req.body.client.name || null,
      legal_name: req.body.client.legal_name || null,
      phone_number: req.body.client.phone_number || null,
      fax: req.body.client.fax || null,
      email: req.body.client.email || null,
      website: req.body.client.website || null,
      naics_code: req.body.client.naics_code || null,
      address: req.body.client.address || null,
      city: req.body.client.city || null,
      province: req.body.client.province || null,
      postal_code: req.body.client.postal_code || null,
      secondary_address: req.body.client.secondary_address || null,
      secondary_city: req.body.client.secondary_city || null,
      secondary_province: req.body.client.secondary_province || null,
      secondary_postal_code: req.body.client.secondary_postal_code || null,
    });
    return res
      .status(200)
      .json({ status: "success", message: "created employer", data: { employer } });
  } catch (err) {
    if (err.name == "SequelizeUniqueConstraintError") {
      // This means that either user or owner is not a valid user
      return res.status(400).json({
        status: "fail",
        message:
          "Either owner or creator is not a valid user",
        data: null,
      });
    }

    logger.error(`Unexpected error thrown: ${err}`);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = addEmployersRequestHandler;