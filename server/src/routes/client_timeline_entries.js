const express = require("express");

const router = express.Router();

const isLoggedIn = require("../middlewares/auth/isLoggedIn");

const addClientTimelineEntryRequestHandler = require("../controllers/client_timeline_entries/addClientTimelineEntry");

const getAllClientTimelineEntriesRequestHandler = require("../controllers/client_timeline_entries/getAllClientTimelineEntries");

/**
 * Add New Client Timeline Entries
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
router.post("", isLoggedIn, addClientTimelineEntryRequestHandler);
/**
 * Get All Client Timeline Entries
 *
 *
 * @type enum "update", "contact", "placement", "note" {query.type}
 *
 * example body
 * {
 *   "query": {
 *     "type": "update",
 *   }
 * }
 */
router.get("", isLoggedIn, getAllClientTimelineEntriesRequestHandler);

module.exports = router;
