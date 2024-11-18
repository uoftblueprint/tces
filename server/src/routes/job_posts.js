const express = require("express");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const updateJobPostRequestHandler = require("../controllers/employer/updateEmployer");

const router = express.Router();

/**
 * Update a specific job post's info, with id job_post_id
 *
 * Expected parameters:
 * @type string {params.job_post_id}
 * Expected body parameters:
 * @type JobPost {params.body.values}
 *    <-- each key in .values is a part of the Job Post you wish to update
 *      for instance, if you wanted to update the location you would pass in params.body.values.location = ...
 *      note: any value you do not pass in will be left unchanged
 *      For updating status from Draft to Active, all other fields must be filled in.
 */
router.put("/:job_post_id", isLoggedIn, updateJobPostRequestHandler);

module.exports = router;
