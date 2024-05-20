// this route will be responsible for handling the csv file upload
const express = require("express");
const multer = require("multer");
const {isAdmin} = require("../middlewares/auth/isAdmin");
const addEmployersFromUploadHandler = require("../controllers/upload/addEmployersFromUpload");
const addClientsAndContactsFromUploadHandler = require("../controllers/upload/addClientsAndContactsFromUpload");

const router = express.Router();

// Multer configuration
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage: storage });

/**
 * Expected body parameters:
 * @type file {body}
 */
router.post("/employers", isAdmin, upload.single('csvFile'), addEmployersFromUploadHandler);

/**
 * Expected body parameters:
 * @type file {body}
 */
router.post("/clients-contacts", isAdmin, upload.single('csvFile'), addClientsAndContactsFromUploadHandler);

module.exports = router;