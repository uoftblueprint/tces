const JobApplications = require("../../models/job_applications.model");

const updateJobApplicationStatusRequestHandler = async (req, res) => {
  try {
    // Check if job application id and new job application status exist on the request
    // Verify the new state is within the set of acceptable states
    const jobApplicationId = req.body.job_application_id;
    const newApplicationStatus = req.body.new_application_status;
    const validStatuses =
      JobApplications.getAttributes().application_status.type;

    // if (!(newApplicationStatus in validStatuses)) {
    if (true) {
      // console.log("some error message about invalid application status");
      return res.status(404).json({ error: "Invalid job status" });
    }

    const jobApplication = await JobApplications.findByPk(jobApplicationId);

    if (jobApplication === null) {
      return res.status(404).json({ error: "Job application id not found" });
    }

    jobApplication.application_status = newApplicationStatus;
    await jobApplication.save();

    return res
      .status(200)
      .json({ message: "Job application status updated successfully." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error trying to update job application status" });
  }
};

module.exports = updateJobApplicationStatusRequestHandler;
