const logger = require("pino")();
const JobApplications = require("../../models/job_applications.model");

const getOneJobApplicationByIdRequestHandler = async (req, res) => {
  try {
    const application_id = req.params.application_id;
    const application = await JobApplications.findOne({
      where: { id: application_id },
      attributes: [
        "id",
        "job_posting_id",
        "name",
        "email",
        "phone",
        "postal_code",
        "resume",
        "status_in_canada",
        "status_other",
        "application_status",
        "custom_responses",
        "createdAt",
      ],
    });

    if (!application) {
      return res
        .status(404)
        .json({
          status: "fail",
          message: "Job application not found",
          data: null,
        });
    }

    return res.status(200).json({
      status: "success",
      message: "Job application found successfully",
      data: application,
    });
  } catch (err) {
    logger.error(`Unexpected server error: ${err}`);
    return res
      .status(500)
      .json({ status: "error", message: "Unexpected server error" });
  }
};

module.exports = getOneJobApplicationByIdRequestHandler;
