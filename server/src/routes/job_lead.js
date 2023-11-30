const express = require("express");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const getOneJobLeadRequestHandler = require("../controllers/job_lead/getOneJobLead");
const getAllJobLeadsRequestHandler = require("../controllers/job_lead/getAllJobLeads");
const addJobLeadsRequestHandler = require("../controllers/job_lead/addJobLeads");
const updateJobLeadHandler = require("../controllers/job_lead/updateJobLead");

const router = express.Router();

/**
 * Get a specific Job Leads's info, with id job_lead_id
 *
 * Expected parameters:
 * @type integer (in url) {params.job_lead_id}
 */
router.get("/:job_lead_id", isLoggedIn, getOneJobLeadRequestHandler);

/**
 * Get all job lead's info
 *
 * Expected parameters:
 */
router.get("/", isLoggedIn, getAllJobLeadsRequestHandler);

/**
 * Create a new job lead
 *
 * Expected body parameters:
 * @type JobLead || JobLead[] {params.body.job_lead}
 *   @type integer {params.body.client.owner}
 *   @type integer {params.body.client.creator}
 *   @type string {params.body.job_lead.employer_name}
 *   @type string {params.body.job_lead.job_title}
 *   @type integer {params.body.job_lead.compensation_max}
 *   @type integer {params.body.job_lead.compensation_min}
 *   @type integer {params.body.job_lead.hours_per_week}
 *   @type string {params.body.job_lead.national_occupation_code}
 *   @type string {params.body.job_lead.job_description}
 *   @type string {params.body.job_lead.creation_date} `YYYY-MM-DD`
 *   @type string {params.body.job_lead.expiration_date} `YYYY-MM-DD`
 *   @type string {params.body.job_lead.employment_type} ["Full Time", "Part Time", "Casual", "On-Call"]
 */

// Example Json body:

// {
//   "job_lead": {
//     "employer_name": "Someone new",
//     "job_title": "Software Developer In Test Intern",
//     "compensation_max": 50000,
//     "compensation_min": 40000,
//     "hours_per_week": 40,
//     "national_occupation_code": 231232,
//     "job_description": "full-stack testing.",
//     "creation_date": "2023-11-29",
//     "expiration_date": "2023-12-31",
//     "employment_type": "Full Time"
//   },
//   "client": {
//     "owner": 1
//   }
// }
router.post("/", isLoggedIn, addJobLeadsRequestHandler);

/**
 * Update a specific Job Lead's info, with id job_lead_id
 *
 * Expected parameters:
 * @type string {params.job_lead_id}
 * Expected body parameters:
 * @type JobLead {params.body.values}
 */

// Example json body:
// {
//   "values": {
//     "employer_name": "First Name",
//     "job_title": "Software Engineer Intern",
//     "compensation_max": 50000,
//     "compensation_min": 40000,
//     "hours_per_week": 40,
//     "national_occupation_code": 231232,
//     "job_description": "full-stack testing.",
//     "creation_date": "2023-11-29",
//     "expiration_date": "2023-12-31",
//     "employment_type": "Full Time"
//   }
// }
router.put("/:job_lead_id", isLoggedIn, updateJobLeadHandler);

module.exports = router;
