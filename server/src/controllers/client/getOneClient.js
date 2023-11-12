const logger = require('pino')();
const Client = require("../../models/client.model");

const getOneClientRequestHandler = async (req, res) => {
    try {
        const client_id = req.params.client_id; 
                
        const client = await Client.findOne({where: {id: client_id}});
        if (client) {
            return res.status(200).json({status: "success", message: "Got client data successfully", data: {  }});
        }

        return res.status(404).json({status: "fail", message: `Client with id ${client_id} does not exist in the database`, data: null});
    } catch (err) {
        logger.error(`Unexpected server error thrown: ${err}`);
        return res.status(500).json({status: "error", message: "An unexpected error occured"});
    }
}

module.exports = getOneClientRequestHandler;