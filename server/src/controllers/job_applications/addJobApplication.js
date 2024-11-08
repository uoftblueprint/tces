const JobPosting = require("../../models/job_posts.model");
const JobApplication = require("../../models/job_applications.model");

const addJobApplicationRequestHandler = async (req, res) => {
  // TODO JobApplication Model Summary:
  // TODO Represents a job application record in the database, linking to a job posting by job_posting_id.
  // TODO Fields:
  // TODO - id: Primary key, auto-incrementing integer.
  // TODO - job_posting_id: Foreign key linking to JobPosting model, required.
  // TODO - name: Applicant's name, required string.
  // TODO - email: Applicant's email, validated as a valid email format, required.
  // TODO - phone: Applicant's 10-digit phone number, validated format, required.
  // TODO - postal_code: Canadian postal code format, validated format, required.
  // TODO - resume: Path or filename for the applicant's resume, required string.
  // TODO - status_in_canada: Applicant's status in Canada, ENUM type (Citizen, PR, refugee, student visa, open work, other), required.
  // TODO - application_status: Current status of the application, ENUM type (Contacted, Rejected, R & I, Approved, In Progress, New), default is "New".
  // TODO - custom_responses: JSON field for storing additional applicant responses, defaults to an empty object.
  // TODO - applied_date: Date when application was submitted, defaults to current date.
  // TODO Timestamps are automatically added: createdAt and updatedAt.

  // ? JobPosting Model Summary:
  // ? Represents a job posting record in the database with details about a job listing.
  // ? Fields:
  // ? - id: Primary key, auto-incrementing integer.
  // ? - title: Job title, required string.
  // ? - employer: Employer name, required string.
  // ? - location: Job location, required string.
  // ? - hours_per_week: Weekly hours for the job, required integer, minimum 1.
  // ? - rate_of_pay_min: Minimum rate of pay, required decimal.
  // ? - rate_of_pay_max: Maximum rate of pay, required decimal.
  // ? - rate_of_pay_frequency: Frequency of pay rate, ENUM type (hourly, weekly, annually, commission, base & commission), required.
  // ? - job_type: Type of job, array of ENUMs (Part-time, Full-time, Contract, Permanent), required.
  // ? - close_date: Job posting close date, required date.
  // ? - job_description: Detailed description of the job, required text.
  // ? - custom_questions: Optional array of custom questions for applicants.
  // ? - creator: Foreign key referencing User model (creator's ID), required.
  // ? - state: Current job posting state, ENUM type (Draft, Active, Inactive), default is "Draft".
  // ? Hooks:
  // ? - beforeUpdate: Sets state to "Inactive" if the job is "Active" and close_date is in the past.
  // ? Timestamps are automatically added: createdAt and updatedAt.

  // Change some variable names when destructuring req.body to match camelCase to follow JS conventions
  const {
    job_posting_id: jobPostingId, // ! required
    name, // ! required
    email, // ! required
    phone, // ! required
    postal_code: postalCode, // ! required
    resume, //! required
    status_in_canada: statusInCanada, // ! required
    application_status: applicationStatus = "New", // TODO not required,
    custom_responses: customResponses = {}, // TODO not required.
    // applied_date: appliedDate = new Date(), // handled automatically by sequelize.
  } = req.body;

  // ! Confirm all required fields. If any are missing, return a 400 status code with an error message.
  // ! That is, check that all required fields are given.
  // ! Look through all attributes that are tagged as required and check if they're null.

  // List of required fields
  const requiredFields = {
    jobPostingId,
    name,
    email,
    phone,
    postalCode,
    resume,
  };

  // Check if any required field is undefined or empty
  if (
    Object.values(requiredFields).includes(undefined) ||
    Object.values(requiredFields).includes("")
  ) {
    return res
      .status(400)
      .json({ error: "One or more required fields are missing." });
  }

  // ! Confirm that the job posting exists before creating the job application
  // ! Query through the database with jobPostingId to see if it exists.

  const jobPosting = await JobPosting.findByPk(jobPostingId);

  // Check if the job posting was found
  if (!jobPosting) {
    // Return a 404 Not Found status if the job posting does not exist
    return res.status(404).json({ error: "Job posting not found." });
  }

  // ! application status - check if it is one of the these enums: ENUM type (Contacted, Rejected, R & I, Approved, In Progress, New)
  // ! Note that the default is "New".
  // ! Wait so let's say an incorrect value is given. Should we just default it to "new"?
  // ! I think I should just return an error message if the value is not one of the enums.
  // ! 400 status code with an error message

  const validApplicationStatuses = [
    "Contacted",
    "Rejected",
    "R & I",
    "Approved",
    "In Progress",
    "New",
  ];

  if (!validApplicationStatuses.includes(applicationStatus)) {
    return res
      .status(400)
      .json({ error: "Invalid application status provided." });
  }

  // ! check statusInCanada and see if it fits the following enums: ENUM type (Citizen, PR, refugee, student visa, open work, other)

  const validStatusInCanada = [
    "Citizen",
    "PR",
    "Refugee",
    "Student Visa",
    "Open Work",
    "Other",
  ];

  if (!validStatusInCanada.includes(statusInCanada)) {
    return res
      .status(400)
      .json({ error: "Invalid status in Canada provided." });
  }

  // ! check that customResponses is an object.
  // ! If it is not an object, return a 400 status code with an error message.

  if (typeof customResponses !== "object") {
    return res
      .status(400)
      .json({ error: "Custom responses must be an object." });
  }

  // ! Confirm that the job posting is still open before creating the job application
  // ! Check that the date of the job application is before the closing date in the job posting model.

  if (jobPosting.close_date < new Date()) {
    return res.status(400).json({ error: "Job posting is closed." });
  }

  // ! Confirm that the postalCode is valid

  if (!/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode)) {
    return res.status(400).json({ error: "Invalid postal code." });
  }

  // ! Confirm the phone number is valid.

  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: "Invalid phone number." });
  }

  // ! Confirm that the email is valid.

  if (!/^.+@.+\..+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email." });
  }

  // create the job application, and return the created job application object
  // use the id of the job application to set the resume field as `${id}_${name}`

  // ! Create the job application in the database

  const jobApplication = await JobApplication.create({
    job_posting_id: jobPostingId,
    name,
    email,
    phone,
    postal_code: postalCode,
    resume,
    status_in_canada: statusInCanada,
    application_status: applicationStatus,
    custom_responses: customResponses,
  });

  // ! Set resume as ${id}_${name}
  // ! I'm assuming this is the job application id? I think it is since it is unique.
  // ! and that the string is just the link to the URL of the pdf file in the S3 bucket.

  jobApplication.resume = `${jobApplication.id}_${name}`;

  // ! Save the job application with the updated resume field

  await jobApplication.save();

  // Return the created job application object

  // ! Maybe I shouldn't return the object? Just a success message?

  return res.status(201).json({
    message: "Job application created successfully.",
  });
};

module.exports = addJobApplicationRequestHandler;
