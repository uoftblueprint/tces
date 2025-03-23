const logger = require("pino")();
const fs = require("fs");
const path = require("path");
const JobPosting = require("../../models/job_posts.model");
const JobApplication = require("../../models/job_applications.model");
const { uploadFileToS3 } = require("../../utils/s3");
const validateRecaptchaToken = require("../../utils/validateRecaptchaToken");

const addJobApplicationRequestHandler = async (req, res) => {
  try {
    const {
      job_posting_id: jobPostingId,
      name,
      email,
      phone,
      postal_code: postalCode,
      status_in_canada: statusInCanada,
      status_other: statusOther,
      application_status: applicationStatus = "New",
      custom_responses: customResponses = {},
      token,
    } = req.body;

    const validation = await validateRecaptchaToken(token);

    if (!validation) {
      return res
        .status(400)
        .json({ error: "Could not validate reCAPTCHA token." });
    }

    const resume = req.file;

    // ! Confirm all required fields. If any are missing, return a 400 status code with an error message.
    // ! That is, check that all required fields are given.
    // ! Look through all attributes that are tagged as required and check if they're null.

    // ! List of required fields
    const requiredFields = {
      jobPostingId,
      name,
      email,
      phone,
      postalCode,
      resume,
    };

    // ! Check if any required field is undefined or empty
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

    const jobPosting = await JobPosting.findByPk(parseInt(jobPostingId, 10));

    // Check if the job posting was found
    if (!jobPosting) {
      // Return a 404 Not Found status if the job posting does not exist
      return res.status(404).json({ error: "Job posting not found." });
    }

    // ! 400 status code with an error message is returned if the value is not one of the enums for application_status

    const validApplicationStatuses = [
      "Contacted",
      "Rejected",
      "R and I",
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

    if (
      Array.isArray(customResponses) &&
      customResponses.every(
        (item) => typeof item === "object" && !Array.isArray(item),
      )
    ) {
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

    // Validate statusOther if statusInCanada is "other"
    if (statusInCanada === "Other" && statusOther === undefined) {
      return res.status(400).json({ error: "statusOther attribute needed" });
    }

    // Create the job application
    const jobApplication = await JobApplication.create({
      job_posting_id: jobPostingId,
      name,
      email,
      phone,
      postal_code: postalCode,
      resume: `temp`,
      status_in_canada: statusInCanada,
      application_status: applicationStatus,
      custom_responses: customResponses,
      status_other: statusInCanada === "other" ? statusOther : null, // Include statusOther only if required
    });

    // ! Find the associated job post with this Job Application to find the title
    // ! for the filename.

    const associatedJobPost = await JobPosting.findOne({
      where: {
        id: parseInt(jobPostingId, 10),
      },
    });

    // ! use the uploadFileToS3 function to upload the resume to the S3 bucket on AWS

    const sanitizedJobTitle = associatedJobPost.title.replace(
      /[^a-zA-Z0-9_-]/g,
      "_",
    );
    const fileName = `${jobApplication.id}_${parseInt(
      jobPostingId,
      10,
    )}_${name}_${sanitizedJobTitle}`;

    uploadFileToS3(resume, fileName);

    jobApplication.resume = fileName;

    // ! Save the job application with the updated resume field

    await jobApplication.save();

    // ! Send successful response status.

    return res.status(201).json({
      message: "Job application created successfully.",
    });
  } catch (error) {
    logger.error(`Unexpected error thrown: ${error}`);

    return res.status(500).json({
      status: "fail",
      message: `An error has occurred while trying to create a job application. ${error}`,
      data: null,
    });
  }
};

module.exports = addJobApplicationRequestHandler;
