const JobApplication = require("../../models/job_applications.model");
const JobPosting = require("../../models/job_posts.model");

const deleteJobPostHandler = async (req, res) => {
  // ! Delete a Job Post and all of its information regardless of close date.
  // ! Delete any Job Applications associated with this Job Post (i.e job_post_id === given ID in path parameters).

  const { job_posting_id: jobPostId } = req.params;

  // ! If the given job_posting_id is invalid, then return an error.

  if (!jobPostId || Number.isNaN(parseInt(jobPostId, 10))) {
    return res.status(400).json({ error: "Invalid or missing job_posting_id" });
  }

  try {
    const jobPosting = JobPosting.findByPk(jobPostId);

    // ! Search to see if the Job Post exists.

    // jobPosting will be null if there is no Job Posting found with the corresponding jobPosting Id.
    if (!jobPosting) {
      return res.status(404).json({ error: "Job Posting could not be found." });
    }

    // ! Delete all associated Job Applications.

    await JobApplication.destroy({
      where: { job_posting_id: jobPostId },
    });

    // ! Delete Job Post itself.

    await JobPosting.destroy({
      where: { id: jobPostId }, // Assuming `id` is the primary key for JobPosting
    });

    return res.status(200).json({
      status: "success",
      message: `Job Posts and all associated Job Applications have been successfully deleted`,
      data: null,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = deleteJobPostHandler;
