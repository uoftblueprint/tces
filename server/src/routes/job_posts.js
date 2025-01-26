const express = require("express");

const router = express.Router();

const addJobPostRequestHandler = require("../controllers/job_posts/addJobPost");

const updateJobPostRequestHandler = require("../controllers/job_posts/updateJobPost");

const getJobPostRequestHandler = require("../controllers/job_posts/getOneJobPost");

const getAllJobPostsRequestHandler = require("../controllers/job_posts/getAllJobPosts");

const getAllActiveJobPostsRequestHandler = require("../controllers/job_posts/getAllActiveJobPosts");

const deleteJobPostHandler = require("../controllers/job_posts/deleteJobPost");

const isLoggedIn = require("../middlewares/auth/isLoggedIn");

const getAllLocationsRequestHandler = require("../controllers/job_posts/getAllLocations");

const getPublicJobPostRequestHandler = require("../controllers/job_posts/getOneActiveJobPost");

/**
 * Get Active Job Posts for a specific location and/or specific job type, and sort by application_close_date
 * Expected parameters:
 * @type string (in query) {query.location}
 * @type string (in query) {query.job_type}
 * @type string (in query) {query.order} - "ascending" or "descending"
 * @type integer (in query) {query.page}
 * @type integer (in query) {query.pageSize}
 */
router.get("/active", getAllActiveJobPostsRequestHandler);

/**
 * Get all possible locations across all jobs
 */
router.get("/locations", getAllLocationsRequestHandler);

/**
 * Get a public job posting
 * Expected parameters:
 * @type string {params.job_posting_id}
 */
router.get("/active/:job_posting_id", getPublicJobPostRequestHandler);

/**
 * Add a New Job Posting
 *
 * Creates a new job posting based on the provided data in the request body.
 * If the job is a draft, only the `title` is required. For active job postings,
 * additional fields are mandatory.
 *
 * @type POST
 *
 * @route /
 *
 * Example Request Body for Draft:
 * {
 *   "title": "Software Developer"
 * }
 *
 * Example Request Body for Active Job Posting:
 * {
 *   "title": "Software Developer",
 *   "employer": "Tech Corp",
 *   "location": "Remote",
 *   "hours_per_week": 40,
 *   "rate_of_pay_min": 30,
 *   "rate_of_pay_max": 50,
 *   "rate_of_pay_frequency": "hourly",
 *   "job_type": ["full-time", "remote"],
 *   "close_date": "2024-12-31",
 *   "job_description": "Develop and maintain web applications.",
 *   "custom_questions": ["What is your experience with React?"],
 *   "state": "Active"
 * }
 *
 * Example Successful Response:
 * {
 *   "status": "success",
 *   "message": "Created job posting.",
 *   "data": {
 *     "jobPost": {
 *       "id": 1,
 *       "title": "Software Developer",
 *       "employer": "Tech Corp",
 *       "location": "Remote",
 *       "hours_per_week": 40,
 *       "rate_of_pay_min": 30,
 *       "rate_of_pay_max": 50,
 *       "rate_of_pay_frequency": "hourly",
 *       "job_type": ["full-time", "remote"],
 *       "close_date": "2024-12-31",
 *       "job_description": "Develop and maintain web applications.",
 *       "custom_questions": ["What is your experience with React?"],
 *       "creator": 1,
 *       "state": "Active",
 *       "createdAt": "2024-11-25T12:00:00Z",
 *       "updatedAt": "2024-11-25T12:00:00Z"
 *     }
 *   }
 * }
 *
 * Example Validation Errors:
 * 1. Missing required fields for active jobs:
 * {
 *   "error": "The following fields are required for non-draft jobs: employer, location, hours_per_week."
 * }
 *
 * 2. Invalid rate of pay:
 * {
 *   "error": "Minimum rate of pay must be less than or equal to maximum rate of pay."
 * }
 *
 * 3. Invalid close date:
 * {
 *   "error": "Close date must be in the future."
 * }
 *
 * Middleware:
 * - isLoggedIn: Ensures that the user is authenticated before allowing the creation of job postings.
 */
router.post("/", isLoggedIn, addJobPostRequestHandler);

/**
 * Get Job Posts sorted by application_close_date and/or filter by status
 * Expected parameters:
 * @type string (in query) {query.status}
 * @type string (in query) {query.order} - "ascending" or "descending"
 * @type integer (in query) {query.page}
 * @type integer (in query) {query.pageSize}
 */
router.get("/", isLoggedIn, getAllJobPostsRequestHandler);

/*
 * Get a specific job post's info, with id job_posting_id
 *
 * Expected parameters:
 * @type integer (in url) {params.job_posting_id}
 */
router.get("/:job_posting_id", isLoggedIn, getJobPostRequestHandler);

/**
 * Update a specific job post's info, with id job_posting_id
 *
 * Expected parameters:
 * @type string {params.job_posting_id}
 * Expected body parameters:
 * @type JobPost {params.body}
 *    <--
 *      for instance, if you wanted to update the location you would pass in params.body.location = ...
 *      note: any value you do not pass in will be left unchanged
 *      For updating status from Draft to Active, all other fields must be filled in.
 */
router.put("/:job_posting_id", isLoggedIn, updateJobPostRequestHandler);

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
