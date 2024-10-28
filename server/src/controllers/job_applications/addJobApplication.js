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
    job_posting_id: jobPostingId,
    name,
    email,
    phone,
    postal_code: postalCode,
    resume,
    status_in_canada: statusInCanada,
    application_status: applicationStatus = "New", // default value
    custom_responses: customResponses = {}, // default value
    applied_date: appliedDate = new Date(), // default value
  } = req.body;

  // ! Confirm all required fields. If any are missing, return a 400 status code with an error message.
  // ! That is, check that all required fields are given.
  // ! Look through all attributes that are tagged as required and check if they're null.

  // ! Confirm that the job posting exists before creating the job application
  // ! Query through the database with jobPostingId to see if it exists.

  // ! Confirm that the job posting is still open before creating the job application
  // ! Check that the date of the job application is before the closing date in the job posting model.

  // ! Confirm that the postalCode is valid

  // ! Confirm the phone number is valid.

  // ! Confirm that the email is valid.

  // ! Set resume as ${id}_${name}
  // ! I'm assuming that the resume is stored in a S3 bucket with the id of the job posting
  // ! and that the string is just the link to the URL of the pdf file in the S3 bucket.
};

module.exports = addJobApplicationRequestHandler;
