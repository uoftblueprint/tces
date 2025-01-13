module.exports = {
  create: async (jobPostData) => {
    if (!jobPostData || !jobPostData.title || !jobPostData.state) {
      throw new Error("Validation error: Title and state are required");
    }

    return {
      id: Math.floor(Math.random() * 1000) + 1, // Simulated ID generation
      ...jobPostData,
      createdAt: new Date().toISOString(), // Simulate a timestamp for creation
      updatedAt: new Date().toISOString(), // Simulate a timestamp for updates
    };
  },
};
