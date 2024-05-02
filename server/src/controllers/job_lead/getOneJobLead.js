const logger = require("pino")();
const JobLead = require("../../models/job_lead.model");
const Employer = require("../../models/employer.model");
const Client = require("../../models/client.model");

const getOneJobLeadRequestHandler = async (req, res) => {
  try {
    const { job_lead_id } = req.params;

    const job_lead = await JobLead.findOne({ where: { id: job_lead_id } });

    const employerDetails = job_lead?.employer
      ? await Employer.findOne({ where: { id: job_lead.employer } })
      : null;

    const client_count = job_lead?.id
      ? await Client.count({
          where: { job_lead_placement: job_lead?.id },
        })
      : 0;

    const processedJobLead = employerDetails
      ? {
          ...job_lead.toJSON(),
          employer_details: employerDetails ? employerDetails.toJSON() : null,
          client_count,
        }
      : job_lead;

    if (job_lead) {
      return res.status(200).json({
        status: "success",
        message: "Got Job lead data successfully",
        data: { job_lead: processedJobLead },
      });
    }

    return res.status(404).json({
      status: "fail",
      message: `Job lead with id ${job_lead_id} does not exist in the database`,
      data: null,
    });
  } catch (err) {
    logger.error(`Unexpected server error thrown: ${err}`);
    return res
      .status(500)
      .json({ status: "error", message: "An unexpected error occured" });
  }
};

module.exports = getOneJobLeadRequestHandler;
