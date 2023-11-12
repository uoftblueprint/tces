const logger = require('pino')();
const Client = require("../../models/client.model");

const addClientsRequestHandler = (req, res) => {
    try {
        if (typeof req.body.client == Array) {
            // bulk create clients
            return res.status(200).json({status: "success", message: "created clients", data: {  }});
        }

        
        // create one client
        Client.create({
            owner: req.body.client.owner,
            creator: req.body.client.creator,
            name: req.body.client.name,
            email: req.body.client.email,
            phone_number: req.body.client.phone_number,
            status: req.body.client.status,
            closure_date: new Date(req.body.client.closure_date),
            status_at_exit: "active",
            status_at_3_months: "active",
            status_at_6_months: "active",
            status_at_12_months: "active",
        });
        return res.status(200).json({status: "success", message: "created client", data: {  }});
    }
    catch (err) {
        logger.error(`Unexpected error thrown: ${err}`);
        res.status(500).json({status: "error", message: "Internal server error"});
    }


}

module.exports = addClientsRequestHandler;