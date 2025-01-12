const JobApplications = require("../../models/job_applications.model");

const updateJobApplicationStatusRequestHandler = async (req, res) => {
  try {
    // Check if job application id and new job application status exist on the request
    const jobApplicationId = req.body.job_application_id;
    const newApplicationStatus = req.body.new_application_status;

    // Look into pulling this out into constants.js
    const validStatuses = [
      "Contacted",
      "Rejected",
      "R and I",
      "Approved",
      "In Progress",
      "New",
    ];

    // Verify the new state is within the set of acceptable states
    if (!validStatuses.includes(newApplicationStatus)) {
      return res.status(400).json({ error: "Invalid job status" });
    }

    const jobApplication = await JobApplications.findByPk(jobApplicationId);

    // Verify that the job application exists
    if (jobApplication === null) {
      return res.status(400).json({ error: "Job application not found" });
    }

    // Modify status and save changes
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
