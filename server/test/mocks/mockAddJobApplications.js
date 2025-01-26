module.exports = {
  create: async (data) => {
    if (
      !data.job_posting_id ||
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.postal_code
    ) {
      throw new Error("One or more required fields are missing.");
    }

    // Simulate successful job application creation
    return {
      ...data,
      id: Math.floor(Math.random() * 1000), // Mocked job application ID
      save: async function () {
        // Simulate successful save
        return this;
      },
    };
  },
  findAll: async (searchConfig) => {
    const mockData = [
      {
        id: 1,
        job_posting_id: 123,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        postal_code: "A1A 1A1",
        resume: "resume.pdf",
        status_in_canada: "Citizen",
        application_status: "New",
        custom_responses: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    if (searchConfig && searchConfig.where) {
      return mockData.filter((item) =>
        Object.entries(searchConfig.where).every(
          ([key, value]) => item[key] === value,
        ),
      );
    }
    return mockData;
  },
  uploadFileToS3: async (file, fileName) => {
    if (!file || !file.buffer || !file.mimetype || !fileName) {
      throw new Error("Invalid file or file name");
    }

    // Simulate successful S3 upload
    console.log(`Mocked upload of ${fileName}`);
    return `Mocked upload of ${fileName}`;
  },
};
