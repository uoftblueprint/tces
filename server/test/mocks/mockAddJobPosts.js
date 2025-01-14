module.exports = {
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
  create: async (data) => {
    if (!data.title && data.state === "Draft") {
      throw new Error("Title is required for Drafts");
    }
    if (data.rate_of_pay_min > data.rate_of_pay_max) {
      throw new Error(
        "Minimum rate of pay must be less than or equal to maximum rate of pay.",
      );
    }
    if (new Date(data.close_date) < new Date()) {
      throw new Error("Close date must be in the future.");
    }

    // Simulate successful job post creation
    return {
      ...data,
      id: Math.floor(Math.random() * 1000), // Mocked job post ID
    };
  },
};
