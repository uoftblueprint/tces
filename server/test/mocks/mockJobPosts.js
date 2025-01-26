module.exports = {
  findByPk: async (id) => {
    const jobPostings = [
      {
        id: 1,
        title: "Frontend Developer",
        close_date: new Date(Date.now() + 86400000), // Open job posting
      },
      {
        id: 2,
        title: "Backend Developer",
        close_date: new Date(Date.now() - 86400000), // Closed job posting
      },
    ];

    // Return the mock job posting based on ID
    return jobPostings.find((post) => post.id === id) || null;
  },
  findOne: async (criteria) => {
    const jobPostings = [
      {
        id: 1,
        title: "Frontend Developer",
        close_date: new Date(Date.now() + 86400000), // Open job posting
      },
    ];

    if (criteria && criteria.where && criteria.where.id) {
      return jobPostings.find((post) => post.id === criteria.where.id) || null;
    }

    return null;
  },
};
