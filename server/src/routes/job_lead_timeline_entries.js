const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/auth/isLoggedIn");

const addJobLeadTimelineEntryRequestHandler = require("../controllers/job_lead_timeline_entries/addJobLeadTimelineEntry");

const getAllJobLeadTimelineEntriesRequestHandler = require("../controllers/job_lead_timeline_entries/getAllJobLeadTimelineEntries");

/**
 * Expected body parameters:
 * @type string {body.first_name}
 * @type string {body.last_name}
 * @type string {body.email}
 * @type string {body.password}
 */
router.post("", isLoggedIn, addJobLeadTimelineEntryRequestHandler);
/**
 * Get All Users
 *
 *
 * Note: Removing isAdmin to getAllUsers handler to generate user
 *       options in other pages (e.g Job Leads Table Owner Filter)  that non-admins have access to
 *
 *
 * Expected Query Params:
 * @type integer {query.page}
 * @type integer {query.limit}
 * @type string {query.name}
 */
router.get("", isLoggedIn, getAllJobLeadTimelineEntriesRequestHandler);

module.exports = router;
