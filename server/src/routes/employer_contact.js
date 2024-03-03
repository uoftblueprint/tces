const express = require("express");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const addEmployerContactRequestHandler = require("../controllers/employer_contact/addEmployerContact");
const deleteEmployerContactRequestHandler = require("../controllers/employer_contact/deleteEmployerContact");
const getAllEmployerContactsRequestHandler = require("../controllers/employer_contact/getAllEmployerContacts");
const getOneEmployerContactRequestHandler = require("../controllers/employer_contact/getOneEmployerContact");
const updateEmployerContactRequestHandler = require("../controllers/employer_contact/updateEmployerContact");

const router = express.Router();

/**
 * Create a new employer Contact
 *
 * Expected body parameters:
 *   @type string {params.body.name}
 *   @type string {params.body.email}
 *   @type string {job_type} Not Manidtory
 *   @type string {phone_number}
 *   @type string {alt_phone_number} Not Manidtory
 *   @type string {employer}
 */
router.post("/", isLoggedIn, addEmployerContactRequestHandler);

/**
 * Create a new employer Contact
 *
 * Expected body parameters:
 *   @type string {params.body.name}
 *   @type string {params.body.email}
 *   @type string {job_type} Not Manidtory
 *   @type string {phone_number}
 *   @type string {alt_phone_number} Not Manidtory
 *   @type string {employer}
 */
router.get("/", isLoggedIn, getAllEmployerContactsRequestHandler);

/**
 * Get a specific employer contact's info, with id employer_contact_id
 *
 * Expected parameters:
 * @type string {params.employer_contact_id}
 */
router.get(
  "/:employer_contact_id",
  isLoggedIn,
  getOneEmployerContactRequestHandler,
);

/**
 * Update a specific employer contact's info, with id employer_contact_id
 *
 * Expected parameters:
 * @type string {params.employer_contact_id}
 * Expected body parameters (all optional):
 *   @type string {params.body.name}
 *   @type string {params.body.email}
 *   @type string {job_type}
 *   @type string {phone_number}
 *   @type string {alt_phone_number}
 *   @type string {employer}
 */
router.put(
  "/:employer_contact_id",
  isLoggedIn,
  updateEmployerContactRequestHandler,
);

/**
 * Delete a specific employer contact, with id employer_contact_id
 *
 * Expected parameters:
 * @type string {params.employer_contact_id}
 */
router.delete(
  "/:employer_contact_id",
  isLoggedIn,
  deleteEmployerContactRequestHandler,
);

module.exports = router;
