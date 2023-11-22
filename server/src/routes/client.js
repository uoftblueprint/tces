const express = require("express");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const getOneClientRequestHandler = require("../controllers/client/getOneClient");
const getAllClientsRequestHandler = require("../controllers/client/getAllClients");
const addClientsRequestHandler = require("../controllers/client/addClients");
const updateClientRequestHandler = require("../controllers/client/updateClient");

const router = express.Router();

/**
 * Get a specific client's info, with id client_id
 *
 * Expected parameters:
 * @type integer (in url) {params.client_id}
 */
router.get("/:client_id", isLoggedIn, getOneClientRequestHandler);

/**
 * Get all client's info
 *
 * Expected parameters:
 */
router.get("/", isLoggedIn, getAllClientsRequestHandler);

/**
 * Create a new client
 *
 * Expected body parameters:
 * @type Client || Client[] {params.body.client}
 *   @type integer {params.body.client.owner}
 *   @type integer {params.body.client.creator}
 *   @type string {params.body.client.name}
 *   @type string {params.body.client.email}
 *   @type string {params.body.client.phone_number}
 *   @type string {params.body.client.status}
 *   @type string {params.body.client.closure_date}
 */
router.post("/", isLoggedIn, addClientsRequestHandler);

/**
 * Update a specific client's info, with id client_id
 *
 * Expected parameters:
 * @type string {params.client_id}
 * Expected body parameters:
 * @type Client {params.body.values}
 */
router.put("/:client_id", isLoggedIn, updateClientRequestHandler);

module.exports = router;
