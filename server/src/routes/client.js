const express = require("express");
const isLoggedIn = require("../middlewares/auth/isLoggedIn");
const getOneClientRequestHandler = require("../controllers/client/getOneClient");
const getAllClientsRequestHandler = require("../controllers/client/getAllClients");
const addClientsRequestHandler = require("../controllers/client/addClients");

const router = express.Router();


router.get("/:client_id", isLoggedIn, getOneClientRequestHandler);
router.get("/", isLoggedIn, getAllClientsRequestHandler);
router.post("/", isLoggedIn, addClientsRequestHandler);


module.exports = router;