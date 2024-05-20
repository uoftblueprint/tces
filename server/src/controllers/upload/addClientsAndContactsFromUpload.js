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
const EmployerContact = require("../../models/employer_contact.model");

const addClientsRequestHandler = require("../client/addClients");
const addEmployerContactRequestHandler = require("../employer_contact/addEmployerContact");

const addClientsAndContactsFromUploadHandler = async (req, res) => {
  try {
    if(!req.file) {
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
    const clients = [];
    const employerContacts = [];
    // column 3 is the employer name
    // if column 3 is not empty, we will create an employer contact
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",");
      if(row[3] === "") {
        const client = {
          owner: req.user.id,
          creator: req.user.id,
          name: row[0],
          email: row[3],
          phone_number: row[5],
        };
        clients.push(client);
      } else {
        // Since it is an employer contact, we need to find the id of the employer with the name that exactly matches the employer name
        // All employers will be imported before employer contacts
        // Should be very little chance of this causing an issue
        const employer = await EmployerContact.findOne({ where: { name: row[1] } });
        if(!employer) {
          return res.status(400).json({
            status: "fail",
            message: "Employer not found",
          });
        }
        const employerContact = {
          owner: req.user.id,
          creator: req.user.id,
          name: row[0],
          employer: employer.id,
          job_title: row[2],
          email: row[3],
          phone_number: row[4],
          alt_phone_number: row[5],
        };
        employerContacts.push(employerContact);
      }
    }

    logger.info(`Parsed ${clients.length} clients and ${employerContacts.length} employer contacts from csv`);

    // Send the parsed data to the addClientsRequestHandler
    req.body.client = clients;
    req.body.employer_contact = employerContacts;
    const return_type_clients = await addClientsRequestHandler(req, res);
    const return_type_employer_contacts = await addEmployerContactRequestHandler(req, res);
    if (return_type_clients.status === "success" && return_type_employer_contacts.status === "success") {
      return res.status(200).json({
        status: "success",
        message: "created clients and employer contacts",
        data: { clients: return_type_clients.data.clients, employer_contacts: return_type_employer_contacts.data.employer_contacts },
      });
    }


  } catch (err) {
    logger.error(`Unexpected error thrown: ${err}`);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
}

module.exports = addClientsAndContactsFromUploadHandler;