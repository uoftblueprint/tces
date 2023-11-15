const express = require("express");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const getOneEmployerRequestHandler = require("../controllers/employer/getOneEmployer");
const getAllEmployersRequestHandler = require("../controllers/employer/getAllEmployers");
const addEmployersRequestHandler = require("../controllers/employer/addEmployers");
const updateEmployerRequestHandler = require("../controllers/employer/updateEmployer");

const router = express.Router();

/**
 * Get a specific employer's info, with id employer_id
 *
 * Expected parameters:
 * @type integer (in url) {params.employer_id}
 */
router.get("/:employer_id", isLoggedIn, getOneEmployerRequestHandler);

/**
 * Get all employers' info
 *
 * Expected parameters:
 */
router.get("/", isLoggedIn, getAllEmployersRequestHandler);

/**
 * Create a new employer
 *
 * Expected body parameters:
 * @type Employer || Employer[] {params.body.employer}
 *   @type integer {params.body.employer.owner}
 *   @type integer {params.body.employer.creator}
 *   @type string {params.body.employer.name}
 *   @type string {params.body.employer.legal_name}
 *   @type string {params.body.employer.phone_number}
 *   @type string {params.body.employer.fax}
 *   @type string {params.body.employer.email}
 *   @type string {params.body.employer.website}
 *   @type string {params.body.employer.naics_code}
 *   @type string {params.body.employer.address}
 *   @type string {params.body.employer.city}
 *   @type string {params.body.employer.province}
 *   @type string {params.body.employer.postal_code}
 *   @type string {params.body.employer.secondary_address}
 *   @type string {params.body.employer.secondary_city}
 *   @type string {params.body.employer.secondary_province}
 *   @type string {params.body.employer.secondary_postal_code}
 */
router.post("/", isLoggedIn, addEmployersRequestHandler);

/**
 * Update a specific employer's info, with id employer_id
 *
 * Expected parameters:
 * @type string {params.employer_id}
 * Expected body parameters:
 * @type Employer {params.body.employer}
 */
router.put("/:employer_id", isLoggedIn, updateEmployerRequestHandler);

module.exports = router;