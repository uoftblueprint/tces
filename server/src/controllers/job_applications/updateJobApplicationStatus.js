const logger = require("pino")();
const JobApplication = require("../../models/job_applications.model");

const updateJobApplicationStatusRequestHandler = async (req, res) => {
    try {
        const application_id = req.params.application_id;
        const application = await JobApplication.findOne({ where: { id: application_id } });
        if (!application) {
        return res
            .status(404)
            .json({ status: "fail", message: "Job application not found", data: null });
        }
        if (!req.body.status) {
        return res.status(401).json({
            status: "fail",
            message: "Missing status to update in parameters",
            data: null,
        });
        }
        await application.update({ application_status: req.body.status });
    
        return res.status(200).json({
        status: "success",
        message: "Job application updated successfully",
        data: application,
        });
    } catch (err) {
        logger.error(`Unexpected server error: ${err}`);
        return res
        .status(500)
        .json({ status: "error", message: "Unexpected server error" });
    }
};

module.exports = updateJobApplicationStatusRequestHandler;