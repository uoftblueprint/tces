require("dotenv").config();
const { sequelize } = require("../../configs/sequelize");
const JobPosting = require("../../models/jobPosting.model");

describe("JobPosting Model Validations", () => {
  beforeAll(async () => {
    await sequelize.sync(); // Sync database
  });

  afterAll(async () => {
    await sequelize.close(); // Close database connection
  });

  it("should create a job posting with valid ENUM values", async () => {
    const jobPosting = await JobPosting.create({
      title: "Software Developer",
      employer: "Tech Solutions",
      location: "Remote",
      hours_per_week: 40,
      rate_of_pay_min: 60000,
      rate_of_pay_max: 80000,
      rate_of_pay_frequency: "Annually", // Valid ENUM value
      job_type: ["Full-time", "Permanent"], // Valid JSON array
      creator: 1, // Assuming creator ID 1 exists
      state: "Draft",
    });
    expect(jobPosting).toBeDefined();
    expect(jobPosting.title).toBe("Software Developer");
  });

  it("should fail to create a job posting with an invalid ENUM value", async () => {
    await expect(
      JobPosting.create({
        title: "QA Engineer",
        employer: "Testing Corp",
        rate_of_pay_frequency: "Daily", // Invalid ENUM value
        creator: 1,
        state: "Draft",
      })
    ).rejects.toThrow(); // Expect error due to invalid ENUM
  });

  it("should fail to create a job posting with an invalid job_type value", async () => {
    await expect(
      JobPosting.create({
        title: "Data Analyst",
        employer: "Analytics Inc.",
        job_type: ["Freelance"], // Invalid job type
        creator: 1,
        state: "Draft",
      })
    ).rejects.toThrow(); // Expect error due to invalid job_type
  });
});
