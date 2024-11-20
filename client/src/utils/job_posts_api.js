const { REACT_APP_API_BASE_URL } = process.env;

const createJobPost = async (jobPostData) => {
  const response = await fetch(`${REACT_APP_API_BASE_URL}/job_postings`, {
    method: "POST",
    credentials: "include", // Include cookies for cross-origin requests if needed
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobPostData), // Convert jobPostData to JSON
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error creating job post: ${error.message}`);
  }

  const result = await response.json();
  return result;
};

module.exports = { createJobPost };
