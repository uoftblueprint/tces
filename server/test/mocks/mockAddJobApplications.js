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
  uploadFileToS3: async (file, fileName) => {
    if (!file || !file.buffer || !file.mimetype || !fileName) {
      throw new Error("Invalid file or file name");
    }

    // Simulate successful S3 upload
    console.log(`Mocked upload of ${fileName}`);
    return `Mocked upload of ${fileName}`;
  },
};
