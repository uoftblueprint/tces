module.exports = {
  // Mock JobPosting model methods
  findByPk: async (id) => {
    if (id === 123) {
      return {
        id: 123,
        title: "Frontend Developer",
        destroy: async () => 1, // Simulate successful deletion
      };
    }
    return null; // Simulate job post not found
  },
  destroy: async (criteria) => {
    if (!criteria || !criteria.where || !criteria.where.id) {
      throw new Error("Validation error: Missing criteria for deletion");
    }

    // Simulate successful deletion if ID is valid
    return 1; // Number of records deleted
  },

  // Mock JobApplication model methods
  mockJobApplications: {
    findAll: async (criteria) => {
      if (criteria.where.job_posting_id === 123) {
        return [{ resume: "resume1.pdf" }, { resume: "resume2.pdf" }];
      }
      return [];
    },
    destroy: async (criteria) => {
      if (criteria.where.job_posting_id === 123) {
        return 2; // Simulate 2 records deleted
      }
      return 0; // No records deleted
    },
  },
};
