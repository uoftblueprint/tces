const { REACT_APP_API_BASE_URL } = process.env;

const createJobPost = async (jobPostData) => {
  const response = await fetch(`${REACT_APP_API_BASE_URL}/job_postings`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobPostData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error creating job post: ${error.message}`);
  }

  const result = await response.json();
  return result;
};

const modifyJobPost = async (modifiedJobPost) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_postings/${modifiedJobPost.job_posting_id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifiedJobPost),
    },
  );
  return response;
};

async function deleteJobPost(jobPostingId) {
  try {
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/job_postings/${jobPostingId}`,
      {
        method: "DELETE",
        credentials: "include",
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

const getAllJobPosts = async (queryParams) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_postings?${queryParams}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

const getAllActiveJobPosts = async (queryParams) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_postings/active?${queryParams}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

const getOneJobPost = async (jobPostId) => {
  try {
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/job_postings/${jobPostId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching job application: ${errorText}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching job application:", error);
    throw error;
  }
};

const getOneActiveJobPost = async (jobPostId) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_postings/active/${jobPostId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

const getAllLocations = async () => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_postings/locations`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

module.exports = {
  createJobPost,
  deleteJobPost,
  modifyJobPost,
  getAllJobPosts,
  getAllActiveJobPosts,
  getOneJobPost,
  getAllLocations,
  getOneActiveJobPost,
};
