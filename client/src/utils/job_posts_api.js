const { REACT_APP_API_BASE_URL } = process.env;

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

module.exports = { deleteJobPosting };
