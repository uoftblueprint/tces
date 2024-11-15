const logger = require("pino")();

/**
 * JobPosting Schema
 *
 * Represents job postings in the application.
 *
 * Fields:
 * - id: INTEGER, Primary Key, Auto-Increment
 * - title: STRING, Required, Job title
 * - description: TEXT, Optional, General job description
 * - employer: STRING, Optional, Name of the employer
 * - location: STRING, Optional, Job location
 * - hours_per_week: INTEGER, Optional, Minimum 1 hour per week
 * - rate_of_pay_min: DECIMAL, Optional, Minimum pay rate
 * - rate_of_pay_max: DECIMAL, Optional, Maximum pay rate
 * - rate_of_pay_frequency: ENUM, Optional, Frequency of pay, options:
 *    - "Hourly", "Weekly", "Annually", "Commission", "Base and Commission"
 * - job_type: JSON, Optional, Array of job types with validation, options:
 *    - "Contract", "Freelance", "Full-time", "Internship", "Part-time",
 *      "Permanent", "Seasonal"
 * - close_date: DATE, Optional, Date the job posting closes
 * - job_description: TEXT, Optional, Detailed job description
 * - custom_questions: JSON, Optional, Custom questions for applicants
 * - creator: INTEGER, Required, Foreign Key referencing User model (User ID)
 * - state: ENUM, Required, Default: "Draft", Job state options:
 *    - "Draft", "Active", "Inactive"
 *
 * Hooks:
 * - beforeUpdate: Automatically sets the job state to "Inactive" if the
 *   job is "Active" and the close date is past.
 *
 * Options:
 * - timestamps: Automatically manages createdAt and updatedAt fields
 */

const addJobPostRequestHandler = async (req, res) => {
  // ! I think there are two different types of Job posts.
  // ! From this, there are different required attributes.
  // ! The two types is a Complete Job Post and a Draft Job Post
  // ! How will the two Draft types be distinguished from the client side?
  // ! Probably by a value in the request body.
  // * state: "Draft", "Active", "Inactive"
  // ! So the state is the attribute used to determine what type of Job Post object it is.
  // ! The default value is a draft if no other value is inputted for state.
  // ? Is there anything that needs to be done with the state is 'Inactive'?
  // ? I think I need to check if the current date is after the closing date for the state 'Inactive'
  // ? If this is the case, I set the state of the current Job Application to be Inactive.
  // ? Hypothetically, this 'Inactive' state should be done automatically in the Model file I'm assuming.
  // ? Okay, I checked and looks like it is already done.
  // ? It will automatically be updated when a single CRUD request tries to mutate the respective object.
  // TODO: Check in the request body what the state of the Job Post is.
  // TODO: If the Job Post is a Draft => Only the title is required. The creator field should also be filled
  // TODO with the current user ID. Apparently, since passport.js is used this can be done directly with
  // TODO req.user.id!
  // TODO: Otherwise, check if the state is active => In this case, I need to make sure that all required attributes
  // TODO are given.
  // TODO: These are the required attributes if the Job Posting is not a draft.
  /*
   * title
   * employer
   * location
   * hours_per_week
   * rate_of_pay_min
   * rate_of_pay_max
   * rate_of_pay_frequency
   * job_type
   * close_date
   * job_description
   */
  // TODO: Since the model file for Job Posts automatically checks if the current date is beyond the closing date
  // TODO I don't think I need to do anything then. I think it's mainly for GET requests where the state
  // TODO will be updated when the client gets the Job Posts.
  // TODO: Seems like GET requests won't update the 'state' attribute automatically, but there can be
  // TODO automatic background tasks (like a cron job) that can periodically check
  // TODO: I should ask about this to double check.
  // TODO: Looking into it, apparently it doesn't do the automatic status check when the object is first created too.
  // TODO: The beforeUpdate hook is used, and only corresponds for PUT and PATCH requests.
};
