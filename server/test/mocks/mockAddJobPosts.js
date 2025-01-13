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
};
