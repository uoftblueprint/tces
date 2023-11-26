const express = require("express");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const getOneJobLeadRequestHandler = require("../controllers/job_leads/getOneJobLead");
const getAllJobLeadsRequestHandler = require("../controllers/job_leads/getAllJobLeads");
const addJobLeadsRequestHandler = require("../controllers/job_leads/addJobleads");
const updateJobLeadHandler = require("../controllers/job_leads/updateJobLead");

const router = express.Router();

/**
 * Get a specific Job Leads's info, with id job_lead_id
 *
 * Expected parameters:
 * @type integer (in url) {params.job_lead_id}
 */
router.get("/:job_lead_id", isLoggedIn, getOneJobLeadRequestHandler);

/**
 * Get all client's info
 *
 * Expected parameters:
 */
router.get("/", isLoggedIn, getAllJobLeadsRequestHandler);

/**
 * Create a new job lead
 *
 * Expected body parameters:
 * @type JobLead || JobLead[] {params.body.job_lead}
 *   @type string {params.body.job_lead.employer_name}
 *   @type string {params.body.job_lead.job_title}
 *   @type integer {params.body.job_lead.compensation_max}
 *   @type integer {params.body.job_lead.compensation_min}
 *   @type integer {params.body.job_lead.hour_per_week}
 *   @type string {params.body.job_lead.national_occupation_code}
 *   @type string {params.body.job_lead.job_description}
 *   @type string {params.body.job_lead.creation_date}
 *   @type string {params.body.job_lead.expiration_date}
 *   @type string {params.body.job_lead.employment_type}
 */
router.post("/", isLoggedIn, addJobLeadsRequestHandler);

/**x
 * Update a specific Job Lead's info, with id job_lead_id
 *
 * Expected parameters:
 * @type string {params.job_lead_id}
 * Expected body parameters:
 * @type Client {params.body.values}
 */
router.put("/:client_id", isLoggedIn, updateJobLeadHandler);

module.exports = router;
