const JobPosting = require("../../models/job_posting.model");
const logger = require("pino")();
/**
a) PUT request (update an existing job post)
Using the job post id parameter
Update the job post with the given information

b) PUT request (to change a job post from Draft to Active)
need to do a check that all fields are filled (since draft posts can be half-filled) when trying to update state to active
 */

const getJobPostsRequestHandler = async (req, res) => {
    // check method is PUT
    if (req.method !== 'PUT') {
        return res.status(405).json({ message: 'Method not allowed, only PUT methods allowed.' });
    }

    try{
        // Get Job Id
        const jobPostId = req?.query?.id ? parseInt(req.query.id, 10) : null;

        // Get one Job Posts
        const jobPost = await JobPosting.findOne({where: {id: jobPostId}});
        if (!jobPost) {
          return res.status(404).json({
            status: "fail",
            message: "Job posting not found",
            data: null,
          });
        }
        if (req.body.id) {
          return res.status(403).json({
            status: "fail",
            message: "You cannot change the id of a job posting.",
            data: null,
          });
        }

          // Check that if state is being changed to "Active" and was previously "Draft", that all other fields are complete
          if (req.body.state === "Active" && jobPost.state === "Draft"){
            const requiredFields = ['title', 'employer', 'location', 'hours_per_week', 'rate_of_pay_min', 'rate_of_pay_max', 'rate_of_pay_frequency', 'job_type', 'close_date', 'job_description', 'custom_questions', 'creator', 'state'];
            for (const field of requiredFields) {
                if (!req.body[field]) {
                    return res.status(400).json({
                        status: "fail",
                        message: `Cannot change to Active: Missing required field "${field}"`,
                        data: null,
                    });
                }
            }
          }

          // update the jobPost and save
          jobPost.set(req.body);
          await jobPost.save();
          
          // return success
          return res.status(200).json({
            status: "success",
            message: `Job Post ${id} updated successfully`,
            data: jobPost,
          });
      
    } catch(err){
        logger.error(`Unexpected server error: ${err}`);
        return res.status(500).json({
          status: "error",
          message: "An unexpected server error occurred.",
        });
    }
}

module.exports = getJobPostsRequestHandler;
