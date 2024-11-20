const JobPosting = require("../../models/job_posts.model");
const Employee = require("../../models/employer.model");

const addJobPostRequestHandler = async (req, res) => {
  try {
    // ! Obtain all given data in the request body.

    const {
      title,
      employer,
      location,
      hours_per_week: hoursPerWeek,
      rate_of_pay_min: rateOfPayMin,
      rate_of_pay_max: rateOfPayMax,
      rate_of_pay_frequency: rateOfPayFrequency,
      job_type: jobType,
      close_date: closeDate,
      job_description: jobDescription,
      custom_questions: customQuestions,
      state = "Draft",
      // The creator field is excluded because the backend can retrieve the current user's ID from req.user.id.
    } = req.body;

    // ! Check if the job posting is a draft. If so, only the title is required.

    if (state === "Draft") {
      if (!title) {
        return res.status(400).json({ error: "Title is required for Drafts" });
      }
    } else {
      // ! If the job posting is not a draft, the attributes below are required.

      const missingFields = [];
      if (!title) missingFields.push("title");
      if (!employer) missingFields.push("employer");
      if (!location) missingFields.push("location");
      if (!hoursPerWeek) missingFields.push("hours_per_week");
      if (!rateOfPayMin) missingFields.push("rate_of_pay_min");
      if (!rateOfPayMax) missingFields.push("rate_of_pay_max");
      if (!rateOfPayFrequency) missingFields.push("rate_of_pay_frequency");
      if (!jobType) missingFields.push("job_type");
      if (!closeDate) missingFields.push("close_date");
      if (!jobDescription) missingFields.push("job_description");

      // ! If there are any missing fields, let the client know.

      if (missingFields.length > 0) {
        return res.status(400).json({
          error: `The following fields are required for non-draft jobs: ${missingFields.join(
            ", ",
          )}.`,
        });
      }

      // Validation: Minimum rate of pay should be less than or equal to the maximum
      if (
        rateOfPayMin !== undefined &&
        rateOfPayMax !== undefined &&
        parseFloat(rateOfPayMin) > parseFloat(rateOfPayMax)
      ) {
        return res.status(400).json({
          error:
            "Minimum rate of pay must be less than or equal to maximum rate of pay.",
        });
      }

      // Validation: Close date must be in the future
      if (closeDate && new Date(closeDate) < new Date()) {
        return res
          .status(400)
          .json({ error: "Close date must be in the future." });
      }

      // ! Check if the employee exists in the database. This is only done when the job posting
      // ! is ont a draft.

      const potentialEmployee = await Employee.findOne({
        where: { name: employer },
      });

      if (!potentialEmployee) {
        return res.status(400).json({
          error: "Employee mentioned in the job posting does not exist. ",
        });
      }
    }

    // Create the job posting
    const jobPost = await JobPosting.create({
      title,
      employer,
      location,
      hours_per_week: hoursPerWeek,
      rate_of_pay_min: rateOfPayMin,
      rate_of_pay_max: rateOfPayMax,
      rate_of_pay_frequency: rateOfPayFrequency,
      job_type: !Array.isArray(jobType) ? [jobType] : jobType,
      close_date: closeDate,
      job_description: jobDescription,
      custom_questions: customQuestions,
      creator: 3,
      state: state === "Draft" ? "Draft" : "Active",
    });

    // ! Return a response stating that the object is successfully created.

    return res.status(201).json({
      status: "success",
      message: "Created job posting.",
      data: { jobPost },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = addJobPostRequestHandler;
