const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/auth/isLoggedIn");

const addEmployerTimelineEntryRequestHandler = require("../controllers/employer_timeline_entries/addEmployerTimelineEntry");

const getAllEmployerTimelineEntriesRequestHandler = require("../controllers/employer_timeline_entries/getAllEmployerTimelineEntries");

/**
 * Add New Employer Timeline Entries
 * @type string {entry.type}
 * @type string {entry.title}
 * @type string {entry.body}
 * @type string {entry.contact}
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
 *     "employer": 1,
 *   }
 * }
 */
router.post("", isLoggedIn, addEmployerTimelineEntryRequestHandler);
/**
 * Get All Employer Timeline Entries
 *
 *
 * @type enum "contact",
 *         "job_lead_add",
 *         "placement",
 *         "note", {query.type}
 *
 * example body
 * {
 *   "query": {
 *     "type": "update",
 *   }
 * }
 * example body for placement
 * {
 *   "entry": {
 *     "type": "placement",
 *     "title": "placement test",
 *     "body": "hello worlddd",
 *     "user": 1,
 *     "employer": 1,
 *     "client": 1,
 *     "job_lead": 1
 *   }
 * }
 */
router.get("", isLoggedIn, getAllEmployerTimelineEntriesRequestHandler);

module.exports = router;
