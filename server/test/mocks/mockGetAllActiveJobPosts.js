module.exports = {
  findAndCountAll: (query) => {
    const mockJobPosts = [
      { id: 1, title: "Software Engineer", state: "Active" },
      { id: 2, title: "Data Scientist", state: "Active" },
      { id: 3, title: "Web Developer", state: "Active" },
      { id: 4, title: "DevOps Engineer", state: "Draft" },
    ];

    const offset = query.offset || 0;
    const limit = query.limit || mockJobPosts.length;

    // Filter posts by state if specified
    let filteredPosts = mockJobPosts;
    if (query.where?.state) {
      filteredPosts = filteredPosts.filter(
        (job) => job.state === query.where.state,
      );
    }

    return {
      count: filteredPosts.length,
      rows: filteredPosts.slice(offset, offset + limit),
    };
  },
};
