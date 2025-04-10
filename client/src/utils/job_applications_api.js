const { REACT_APP_API_BASE_URL } = process.env;

const fetchAllJobApplications = async (queryParams = {}) => {
  const url = new URL(`${REACT_APP_API_BASE_URL}/job_applications`);

  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key] !== null && queryParams[key] !== undefined) {
      url.searchParams.append(key, queryParams[key]);
    }
  });

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

const uploadJobApplication = async (formData, token) => {
  // eslint-disable-next-line no-useless-catch

  const response = await fetch(`${REACT_APP_API_BASE_URL}/job_applications`, {
    method: "POST",
    credentials: "include",
    body: formData,
    token,
  });
  return response;
};

const getResumeUrl = async (jobApplicationId) => {
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_applications/resume/${jobApplicationId}`,
    {
      method: "GET",
      credentials: "include",
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
};

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
      body: JSON.stringify({
        job_application_id: jobApplicationId,
        new_application_status: newApplicationStatus,
      }),
    },
  );

  return response;
};

const getOneJobApplication = async (jobApplicationId) => {
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_applications/id/${jobApplicationId}`,
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

const getFilterOptions = async (queryParams = {}) => {
  // make a query string from given parameters, no queryString if empty
  const queryString = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/job_applications/filter-options?${queryString}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error retrieving filter options: ${error.message}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching filter options:", error);
    throw error;
  }
};

export {
  fetchAllJobApplications,
  fetchJobApplicationsByApplicantName,
  uploadJobApplication,
  getResumeUrl,
  updateJobApplicationStatus,
  getOneJobApplication,
  getFilterOptions,
};
