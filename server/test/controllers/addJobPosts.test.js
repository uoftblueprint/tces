require("dotenv").config();
const { sequelize } = require("../../src/configs/sequelize");
const JobPosting = require("../../src/models/job_posts.model");

async function testJobPosting() {
  try {
    // Sync database for testing purposes (optional, be careful if connected to a real database)
    await sequelize.sync({ force: false });

    console.log("Testing valid ENUM values...");

    // Test with valid ENUM values
    const validJob = await JobPosting.create({
      title: "Software Developer",
      employer: "Tech Solutions",
      location: "Remote",
      hours_per_week: 40,
      rate_of_pay_min: 60000,
      rate_of_pay_max: 80000,
      rate_of_pay_frequency: "Annually", // Valid ENUM value
      job_type: ["Full-time", "Permanent"], // Valid JSON array
      close_date: new Date("2024-12-31"),
      job_description: "Develop and maintain software applications.",
      custom_questions: [
        { question: "Describe your experience in software development.", type: "text" },
      ],
      creator: 1, // Assuming creator ID 1 exists in the User table
      state: "Draft", // Default state
    });
    console.log("Valid job posting created successfully:", validJob.toJSON());

    // Test with an invalid ENUM value for rate_of_pay_frequency
    console.log("Testing invalid ENUM value...");
    try {
      await JobPosting.create({
        title: "QA Engineer",
        employer: "Testing Corp",
        location: "On-site",
        rate_of_pay_frequency: "Daily", // Invalid ENUM value
        creator: 1,
        state: "Draft",
      });
    } catch (err) {
      console.error("Failed to create job posting with invalid ENUM value:", err.message);
    }

    // Test with an invalid job_type array element
    console.log("Testing invalid job_type value...");
    try {
      await JobPosting.create({
        title: "Data Analyst",
        employer: "Analytics Inc.",
        location: "Remote",
        job_type: ["Freelance"], // Invalid value
        creator: 1,
        state: "Draft",
      });
    } catch (err) {
      console.error("Failed to create job posting with invalid job_type value:", err.message);
    }
  } catch (error) {
    console.error("Unexpected error during testing:", error);
  } finally {
    await sequelize.close();
  }
}

testJobPosting();
