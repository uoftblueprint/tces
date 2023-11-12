const getOneClientRequestHandler = (req, res) => {
    console.log(req.params.client_id);

    return res.send(`One, ${req.params.client_id}`);
}

module.exports = getOneClientRequestHandler;