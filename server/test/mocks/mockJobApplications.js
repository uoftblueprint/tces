module.exports = {
  create: async (data) => ({
    ...data,
    id: Math.floor(Math.random() * 1000),
    async save() {
      return this;
    },
  }),
  findAll: async (searchConfig) => {
    // Example mock implementation of findAll
    if (searchConfig.where && searchConfig.where.job_posting_id) {
      return [
        {
          id: 1,
          job_posting_id: searchConfig.where.job_posting_id,
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "1234567890",
          postal_code: "A1A 1A1",
          resume: "resume.pdf",
          status_in_canada: "Citizen",
          status_other: null,
          application_status: "New",
          custom_responses: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
    }

    // Return a default response
    return [
      {
        id: 1,
        job_posting_id: 123,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        postal_code: "A1A 1A1",
        resume: "resume.pdf",
        status_in_canada: "Citizen",
        status_other: null,
        application_status: "New",
        custom_responses: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  },
  count: async (query) => {
    // Example mock implementation of count
    return 10; // Total count of job applications
  },
};
