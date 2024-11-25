const express = require("express");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const getJobPostRequestHandler = require("../controllers/job_posts/getOneJobPost");
const getAllJobPostsRequestHandler = require("../controllers/job_posts/getAllJobPosts");

const router = express.Router();

/**
 * Get a specific job post's info, with id job_post_id
 *
 * Expected parameters:
 * @type integer (in url) {params.job_post_id}
 */
router.get("/:job_post_id", isLoggedIn, getJobPostRequestHandler);

/**
 * Get all job post's info
 * 
 * Expected parameters:
 * @type integer (in url) {params.page}
 * @type integer (in url) {params.pageSize}
 */
router.get("/", isLoggedIn, getAllJobPostsRequestHandler);

module.exports = router;
