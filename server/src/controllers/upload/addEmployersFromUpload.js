// Employer Import from Legacy System
// Structure the Excel Exported CSV file to match the following fields:
// - name <- Trade Name
// - legal name <- Registered Name
// - phone_number <- Main Phone
// - fax <- Fax
// - email <- Email (Primary Contact)
// - website <- Website
// - naics_code <- NASICS Code
// - address <- Address 1: Street 1
// - city <- Address 1: City
// - province <- Address 1: State/Province
// - postal_code <- Address 1: ZIP/Postal Code
// - secondary_address <- null
// - secondary_city <- null
// - secondary_province <- null
// - secondary_postal_code <- null

// This controller is going to be taking in a csv and needs to parse it to create a bulk of employers that need to be created
// The csv file data will not exactly match the model, so we need to map the csv data to the model data manually
// Above is the necessary information to map the csv data to the model data. If the field is not present in the csv, it should be set to null

const logger = require("pino")();
const addEmployersRequestHandler = require("../employer/addEmployers");
const multer = require("multer");

const addEmployersFromUploadHandler = async (req, res) => {
  try {
    // We will be using addEmployersRequestHandler to actually create the employers
    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "No file uploaded",
      });
    }

    // Parse the csv file
    // The header names do not match the model names, so we need to map the csv data to the model data manually
    // If the field is not present in the csv, it should be set to null
    const csv = req.file.buffer.toString("utf8");
    const rows = csv.split("\n");
    const headers = rows[0].split(",");
    const employers = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",");
      const employer = {
        owner: req.user.id,
        creator: req.user.id,
        name: row[0],
        legal_name: row[1] || null,
        phone_number: row[2] || null,
        fax: row[3] || null,
        email: row[4] || null,
        website: row[5] || null,
        naics_code: row[6] || null,
        address: row[7] || null,
        city: row[8] || null,
        province: row[9] || null,
        postal_code: row[10] || null,
        secondary_address: null,
        secondary_city: null,
        secondary_province: null,
        secondary_postal_code: null,
      };
      employers.push(employer);
    }
    logger.info(`Parsed ${employers.length} employers from csv`);

    // Send the parsed data to the addEmployersRequestHandler
    req.body.employer = employers;
    const return_type = await addEmployersRequestHandler(req, res);
    return return_type;

  } catch (err) {
    if (err instanceof multer.MulterError) {
      logger.error(`Multer error thrown: ${err}`);
      return res.status(400).json({ status: "error", message: "Invalid file uploaded" });
    }
    logger.error(`Unexpected error thrown: ${err}`);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = addEmployersFromUploadHandler;