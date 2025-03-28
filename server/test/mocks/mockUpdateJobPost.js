module.exports = {
  // Mock JobPosting model methods
  findOne: async (criteria) => {
    if (criteria.where.id === 123) {
      return {
        id: 123,
        title: "Software Engineer",
        employer: "Tech Corp",
        location: "Remote",
        hours_per_week: 40,
        rate_of_pay_min: 50,
        rate_of_pay_max: 100,
        rate_of_pay_frequency: "hourly",
        job_type: ["Full-time"],
        close_date: "2025-01-31",
        job_description: "Develop and maintain software applications.",
        custom_questions: ["What is your experience with JavaScript?"],
        creator: 1,
        state: "Draft",
        set: function (data) {
          Object.assign(this, data);
        },
        save: async function () {
          return this; // Simulate successful save
        },
      };
    }
    return null; // Simulate job post not found
  },

  // Mock User model methods
  findByPk: async (id) => {
    if (id === 1) {
      return { id: 1, name: "Test User" };
    }
    return null; // Simulate user not found
  },
};
