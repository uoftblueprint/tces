const logger = require("pino")();
const Employer = require("../../models/employer.model");
const {
  addDefaultDates,
  setOwnerAndCreator,
} = require("../../utils/creation_util");

const addEmployersRequestHandler = async (req, res) => {
  try {
    if (req.body.employer instanceof Array) {
      req.body.employer.forEach((employer) => {
        // validate each client, and add values
        addDefaultDates(employer);
        setOwnerAndCreator(employer, req.user.id);
      });

      // bulk create employers
      const employers = await Employer.bulkCreate(req.body.employer);

      return res.status(200).json({
        status: "success",
        message: "created employers",
        data: { employers },
      });
    }

    addDefaultDates(req.body.employer);
    setOwnerAndCreator(req.body.employer, req.user.id);

    // create one employer
    const employer = await Employer.create({
      owner: req.body.employer.owner,
      creator: req.body.employer.creator,
      date_added: req.body.employer.date_added,
      name: req.body.employer.name,
      legal_name: req.body.employer.legal_name || null,
      phone_number: req.body.employer.phone_number || null,
      fax: req.body.employer.fax || null,
      email: req.body.employer.email || null,
      website: req.body.employer.website || null,
      naics_code: req.body.employer.naics_code || null,
      address: req.body.employer.address || null,
      city: req.body.employer.city || null,
      province: req.body.employer.province || null,
      postal_code: req.body.employer.postal_code || null,
      secondary_address: req.body.employer.secondary_address || null,
      secondary_city: req.body.employer.secondary_city || null,
      secondary_province: req.body.employer.secondary_province || null,
      secondary_postal_code: req.body.employer.secondary_postal_code || null,
    });
    return res.status(200).json({
      status: "success",
      message: "created employer",
      data: { employer },
    });
  } catch (err) {
    if (err.name == "SequelizeUniqueConstraintError") {
      // This means that either user or owner is not a valid user
      return res.status(400).json({
        status: "fail",
        message: "Either owner or creator is not a valid user",
        data: null,
      });
    }

    logger.error(`Unexpected error thrown: ${err}`);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = addEmployersRequestHandler;
