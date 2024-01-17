const { REACT_APP_API_BASE_URL } = process.env;

const login = async (email, password) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  });
  return response;
};

const logout = async () => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const isUserLoggedIn = async () => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/is_logged_in`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const createUser = async (firstName, lastName, userEmail, userPassword) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/users`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: userEmail,
      password: userPassword,
    }),
  });
  return response;
};

const getAllUsers = async () => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/users`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const modifyUser = async (modifiedUser) => {
  const modifyUserBody = modifiedUser.password
    ? {
        first_name: modifiedUser.firstName,
        last_name: modifiedUser.lastName,
        email: modifiedUser.email,
        password: modifiedUser.password,
        is_admin: modifiedUser.isAdmin,
      }
    : {
        first_name: modifiedUser.firstName,
        last_name: modifiedUser.lastName,
        email: modifiedUser.email,
        is_admin: modifiedUser.isAdmin,
      };
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/users/${modifiedUser.userID}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifyUserBody),
    },
  );
  return response;
};

const deleteUser = async (userID) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/users/${userID}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const getAllEmployers = async () => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/employers`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const createJobLeads = async (jobLeads, ownerID, creatorID) => {
  const formattedJobLeads = jobLeads.map((jobLead) => {
    // validation to ensure min and max compensations are not swapped, if so we ensure correct values are passed into respective params
    const validateCompensation = (minCompensation, maxCompensation) => {
      if (minCompensation > maxCompensation) {
        return {
          minCompensation: maxCompensation,
          maxCompensation: minCompensation,
        };
      }
      return { minCompensation, maxCompensation };
    };

    const { minCompensation, maxCompensation } = validateCompensation(
      parseInt(jobLead.minCompensation, 10),
      parseInt(jobLead.maxCompensation, 10),
    );

    return {
      employer: jobLead.employer,
      job_title: jobLead.title,
      num_of_positions: parseInt(jobLead.numPositions, 10),
      compensation_max: maxCompensation ?? 0,
      compensation_min: minCompensation ?? 0,
      hours_per_week: parseInt(jobLead.hoursPerWeek, 10),
      national_occupation_code: parseInt(jobLead.nationalOC, 10),
      job_description: jobLead.description,
      creation_date: jobLead.creationDate
        ? jobLead.creationDate.toISOString().split("T")[0]
        : null,
      expiration_date: jobLead.expirationDate
        ? jobLead.expirationDate.toISOString().split("T")[0]
        : null,
      employment_type: jobLead.employmentType,
    };
  });

  const jobLeadsCreateBody = {
    client: {
      owner: ownerID,
      creator: creatorID,
    },
    job_lead: formattedJobLeads,
  };

  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/job_leads`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobLeadsCreateBody),
  });
  return response;
};

const getFilteredJobLeads = async (queryParams) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_leads?${queryParams}`,
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

const modifyJobLead = async (modifiedJobLead) => {
  const modifyJobLeadBody = {
    values: {
      owner: modifiedJobLead.owner,
      job_title: modifiedJobLead.jobTitle,
      compensation_min: modifiedJobLead.minCompensation,
      compensation_max: modifiedJobLead.maxCompensation,
      employment_type: modifiedJobLead.employmentType,
      hours_per_week: modifiedJobLead.hoursPerWeek,
      national_occupation_code: modifiedJobLead.noc,
      expiration_date: modifiedJobLead.expirationDate,
      number_of_positions: modifiedJobLead.numberOfPositions,
      job_description: modifiedJobLead.jobDescription,
    },
  };

  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_leads/${modifiedJobLead.jobLeadID}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifyJobLeadBody),
    },
  );
  return response;
};

export {
  login,
  logout,
  isUserLoggedIn,
  createUser,
  getAllUsers,
  modifyUser,
  deleteUser,
  getAllEmployers,
  createJobLeads,
  getFilteredJobLeads,
  modifyJobLead,
};
