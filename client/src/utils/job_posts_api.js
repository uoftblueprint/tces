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

async function deleteJobPosting(jobPostingId) {
  try {
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/job_postings/${jobPostingId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Include headers if needed
        },
      },
    );

    if (!response.ok) {
      // Handle errors
      const errorData = await response.json();
      console.error("Error deleting job posting:", errorData);
      throw new Error(errorData.error || "Failed to delete job posting");
    }

    // Handle success
    console.log("Job posting deleted successfully");
    return await response.json(); // Return response if needed
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

module.exports = { createJobPost, deleteJobPosting };
