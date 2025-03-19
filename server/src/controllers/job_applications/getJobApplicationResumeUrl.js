const logger = require("pino")();
const JobApplications = require("../../models/job_applications.model");
const { getResumePresignedUrl } = require("../../utils/s3");

const getJobApplicationResumeRequestHandler = async (req, res) => {
  let jobApplicationId;
  try {
    jobApplicationId = req.params.job_application_id;

    // Get the resume key for the give job application id
    const JobApplication = await JobApplications.findOne({
      where: { id: jobApplicationId },
      attributes: ["resume"],
    });

    if (!JobApplication) {
      return res.status(404).json({
        status: "fail",
        message: `Job application with id ${jobApplicationId} not found.`,
      });
    }

    const resumeKey = JobApplication.resume; // Access the 'resume' attribute correctly.

    const presignedResumeUrl = await getResumePresignedUrl(resumeKey);

    const response = {
      status: "success",
      message: `Successfully created presigned url for job application id: ${jobApplicationId}`,
      resume_url: presignedResumeUrl,
    };

    return res.status(200).json(response);
  } catch (error) {
    logger.error(`Unexpected error thrown: ${error}`);

    return res.status(500).json({
      status: "fail",
      message: `An error has occurred while trying to fetch resume for Application id: ${jobApplicationId}`,
      data: null,
    });
  }
};

module.exports = getJobApplicationResumeRequestHandler;
