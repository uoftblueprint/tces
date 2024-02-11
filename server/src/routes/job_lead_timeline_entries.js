const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/auth/isLoggedIn");

const addJobLeadTimelineEntryRequestHandler = require("../controllers/job_lead_timeline_entries/addJobLeadTimelineEntry");

const getAllJobLeadTimelineEntriesRequestHandler = require("../controllers/job_lead_timeline_entries/getAllJobLeadTimelineEntries");

/**
 * Add New Job Lead Timeline Entries
 * @type string {entry.type}
 * @type string {entry.title}
 * @type string {entry.body}
 * @type string {entry.client}
 * @type string {entry.job_lead}
 * @type string {entry.user}
 *
 * example body
 * {
 *   "entry": {
 *     "type": "note",
 *     "title": "test user added a note",
 *     "body": "hello world",
 *     "user": 1
 *   }
 * }
 */
router.post("", isLoggedIn, addJobLeadTimelineEntryRequestHandler);
/**
 * Get All Job Lead Timeline Entries
 *
 *
 * @type enum "placement", "note" {query.type}
 *
 *
 * example body
 * {
 *   "query": {
 *     "type": "update",
 *   }
 * }
 */
router.get("", isLoggedIn, getAllJobLeadTimelineEntriesRequestHandler);

module.exports = router;
