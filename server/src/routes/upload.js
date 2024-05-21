// this route will be responsible for handling the csv file upload
const express = require("express");
const multer = require("multer");
const isAdmin = require("../middlewares/auth/isAdmin");
const addEmployersFromUploadHandler = require("../controllers/upload/addEmployersFromUpload");
const addClientsAndContactsFromUploadHandler = require("../controllers/upload/addClientsAndContactsFromUpload");

const router = express.Router();

// Multer configuration
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

/**
 * Expected body parameters:
 * @type csv file {body}
 */
router.post("/employers", upload.single("file"), isAdmin, addEmployersFromUploadHandler);

/**
 * Expected body parameters:
 * @type csv file {body}
 */
router.post("/clients-contacts", upload.single("file"), isAdmin, addClientsAndContactsFromUploadHandler);

module.exports = router;