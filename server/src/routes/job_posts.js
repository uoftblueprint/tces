const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/auth/isLoggedIn");

const deleteJobPostHandler = require("../controllers/job_posts/deleteJobPost");

/**
 * Delete a Job Post and its Associated Job Applications
 *
 * Deletes a job post identified by its `job_posting_id` along with all the associated job applications.
 *
 * @type DELETE
 *
 * @param {string} job_posting_id - The ID of the job posting to delete. This should be passed as a route parameter.
 *
 * Example Request:
 * DELETE /:job_posting_id
 *
 * Example Successful Response:
 * {
 *   "status": success,
 *   "message": "Job Posts and all associated Job Applications have been successfully deleted.",
 *   "data": null
 * }
 *
 * Example Error Response:
 * {
 *   "error": error.message
 * }
 *
 * Middleware:
 * - isLoggedIn: Ensures that the user is authenticated before allowing the deletion operation.
 */
router.delete("/:job_posting_id", isLoggedIn, deleteJobPostHandler);

module.exports = router;
