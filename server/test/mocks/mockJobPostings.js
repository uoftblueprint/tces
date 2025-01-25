module.exports = {
  findByPk: async (id) => {
    if (id === 123) {
      return {
        id: 123,
        title: "Frontend Developer",
        close_date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Closing date in the future
      };
    }
    return null; // Simulate job posting not found
  },
  findOne: async (criteria) => {
    if (criteria.where && criteria.where.id === 123) {
      return {
        id: 123,
        title: "Frontend Developer",
      };
    }
    return null;
  },
};
