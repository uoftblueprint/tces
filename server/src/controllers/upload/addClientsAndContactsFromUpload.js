// Employer Import from Legacy System
// Structure the Excel Exported CSV file to match the following fields:
// name <- Full Name
// employer <- Company Name (For employer contact only)
// job_title <- Job Title (For employer contact only)
// email <- Email
// phone_number <- Business Phone (For employer contact only)
// phone_number <- Mobile Phone (For clients only)
// alt_phone_number <- Mobile Phone (For employer contact only)

const logger = require("pino")();
const Employer = require("../../models/employer.model");
const multer = require("multer");

const addClientsRequestHandler = require("../client/addClients");
const addEmployerContactRequestHandler = require("../employer_contact/addEmployerContact");

const EXPECTED_HEADERS = [
  "(Do Not Modify) Account",
  "(Do Not Modify) Row Checksum",
  "(Do Not Modify) Modified On",
  "Full Name",
  "Company Name",
  "Job Title",
  "Email",
  "Business Phone",
  "Mobile Phone",
];

function validateHeaders(headers) {
  const trimmedHeaders = headers.map((header) => header.trim());
  const trimmedExpectedHeaders = EXPECTED_HEADERS.map((header) =>
    header.trim(),
  );

  if (
    trimmedHeaders.length !== trimmedExpectedHeaders.length ||
    !trimmedHeaders.every(
      (header, index) => header === trimmedExpectedHeaders[index],
    )
  ) {
    throw new Error("Invalid file structure");
  }
}

const addClientsAndContactsFromUploadHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "No file uploaded",
      });
    }

    // Parse the csv file
    // If the object has the employer field set, we will create that as a contact
    // Otherwise, we will create it as a client
    const csv = req.file.buffer.toString("utf8");
    const rows = csv.split("\n");
    const headers = rows[0].split(",");

    try {
      validateHeaders(headers);
    } catch (err) {
      return res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }

    const clients = [];
    const employerContacts = [];
    // column 3 is the employer name
    // if column 3 is not empty, we will create an employer contact
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",");
      if (row[1] === "") {
        const client = {
          owner: req.user.id,
          creator: req.user.id,
          name: row[3],
          email: row[6],
          phone_number: row[8],
          status: "active",
        };
        clients.push(client);
      } else {
        // Since it is an employer contact, we need to find the id of the employer with the name that exactly matches the employer name
        // All employers will be imported before employer contacts
        // Should be very little chance of this causing an issue
        const employer = await Employer.findOne({ where: { name: row[1] } });
        if (!employer) {
          return res.status(400).json({
            status: "fail",
            message: "Employer not found, upload stopped",
          });
        }
        const employerContact = {
          owner: req.user.id,
          creator: req.user.id,
          name: row[3],
          employer: employer.id,
          job_title: row[5],
          email: row[6],
          phone_number: row[7],
          alt_phone_number: row[8],
        };
        employerContacts.push(employerContact);
      }
    }

    logger.info(
      `Parsed ${clients.length} clients and ${employerContacts.length} employer contacts from csv`,
    );

    // Send the parsed data to the respective handlers
    req.body.client = clients;
    const return_type_clients = await addClientsRequestHandler(req, res);

    req.body.employer_contact = employerContacts;
    const return_type_employer_contacts =
      await addEmployerContactRequestHandler(req, res);

    if (
      return_type_clients.status === "success" &&
      return_type_employer_contacts.status === "success"
    ) {
    req.file.buffer = null; // Clear the buffer
      return res.status(200).json({
        status: "success",
        message: "created clients and employer contacts",
        data: {
          clients: return_type_clients.data,
          employer_contacts: return_type_employer_contacts.data,
        },
      });
    }
  } catch (err) {
    req.file.buffer = null; // Clear the buffer
    if (err instanceof multer.MulterError) {
      logger.error(`Multer error thrown: ${err}`);
      return res
        .status(400)
        .json({ status: "error", message: "File uploading error" });
    }
    logger.error(`Unexpected error thrown: ${err}`);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

module.exports = addClientsAndContactsFromUploadHandler;
