const JobApplication = require("../../models/job_applications.model");
const JobPosting = require("../../models/job_posts.model");
const { deleteFileFromS3 } = require("../../utils/s3");
const { sequelize } = require("../../configs/sequelize");

const deleteJobPostHandler = async (req, res) => {
  // ! Delete a Job Post and all of its information regardless of close date.
  // ! Delete any Job Applications associated with this Job Post (i.e job_post_id === given ID in path parameters).

  const { job_posting_id: jobPostId } = req.params;

  // ! If the given job_posting_id is invalid, then return an error.

  if (!jobPostId || Number.isNaN(parseInt(jobPostId, 10))) {
    return res.status(400).json({ error: "Invalid or missing job_posting_id" });
  }

  const transaction = await sequelize.transaction(); // Start transaction

  try {
    const jobPosting = await JobPosting.findByPk(jobPostId);

    // ! Search to see if the Job Post exists.

    // jobPosting will be null if there is no Job Posting found with the corresponding jobPosting Id.
    if (!jobPosting) {
      await transaction.rollback();
      return res.status(404).json({ error: "Job Posting could not be found." });
    }

    // ! Find all associated Job Applications.

    const jobApplications = await JobApplication.findAll({
      where: { job_posting_id: jobPostId },
      attributes: ["resume"],
    });

    // ! Delete all associated resumes with deleted Job Applications

    await Promise.all(
      jobApplications.map((app) => deleteFileFromS3(app.resume)),
    );

    // ! Delete all associated Job Applications with Job Post

    await JobApplication.destroy({
      where: { job_posting_id: jobPostId },
    });

    // ! Delete Job Post itself.

    await JobPosting.destroy({
      where: { id: jobPostId }, // Assuming `id` is the primary key for JobPosting
    });

    await transaction.commit(); // Commit transaction

    return res.status(200).json({
      status: "success",
      message: `Job Posts and all associated Job Applications have been successfully deleted`,
      data: null,
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(400).json({ error: error.message });
  }
};

module.exports = deleteJobPostHandler;
