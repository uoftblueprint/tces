const { REACT_APP_API_BASE_URL } = process.env;

const fetchAllJobApplications = async ({
  page = 1,
  pageSize = 10,
  jobPostingId = null,
} = {}) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/job_applications`);

  // Set query parameters for pagination and filtering by job posting ID
  if (page) url.searchParams.append("page", page);
  if (pageSize) url.searchParams.append("pageSize", pageSize);
  if (jobPostingId) url.searchParams.append("job_posting_id", jobPostingId);

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include", // Include credentials for authentication if necessary
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch job applications");

    return await response.json();
  } catch (error) {
    console.error("Error fetching all job applications:", error);
    throw error;
  }
};

const fetchJobApplicationsByApplicantName = async ({
  name,
  page = 1,
  pageSize = 10,
} = {}) => {
  if (!name)
    throw new Error("Name is required to fetch job applications by applicant");

  const url = new URL(`${REACT_APP_API_BASE_URL}/job_applications/${name}`);

  // Set query parameters for pagination
  if (page) url.searchParams.append("page", page);
  if (pageSize) url.searchParams.append("pageSize", pageSize);

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include", // Include credentials if authentication is needed
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error("Failed to fetch job applications by applicant");

    return await response.json();
  } catch (error) {
    console.error("Error fetching job applications by applicant:", error);
    throw error;
  }
};

const uploadJobApplication = async (file) => {
  const formData = new FormData();
  formData.append("resume", file); // Assuming "resume" is the field name for the file

  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/job_applications`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  return response;
};

const getResumeUrl = async (jobApplicationId) => {
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_applications/${jobApplicationId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok)
    throw new Error(
      `Failed to fetch resume for job application with id: ${jobApplicationId}`,
    );

  const result = await response.json();
  return result;
}

const updateJobApplicationStatus = async (
  jobApplicationId,
  newApplicationStatus,
) => {
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_applications/${jobApplicationId}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        new_application_status: newApplicationStatus,
      },
    },
  );

  return response;
};

export {
  fetchAllJobApplications,
  fetchJobApplicationsByApplicantName,
  uploadJobApplication,
  getResumeUrl,
  updateJobApplicationStatus,
};
