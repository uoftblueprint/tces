import mockEmployerContacts from "../mock-data/mockEmployerContacts";

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

const createEmployer = async (employer, ownerID, creatorID) => {
  const employerBody = {
    owner: ownerID,
    creator: creatorID,
    date_added: new Date(),
    name: employer.businessName,
    legal_name: employer.businessLegalName || null,
    phone_number: employer.phoneNumber || null,
    fax: employer.faxNumber || null,
    email: employer.generalEmail || null,
    website: employer.website || null,
    naics_code: employer.naicsCode || null,
    address: employer.employerAddress || null,
    city: employer.city || null,
    province: employer.province || null,
    postal_code: employer.postalCode || null,
    secondary_address: employer.secondaryAddress || null,
    secondary_city: employer.secondaryCity || null,
    secondary_province: employer.secondaryProvince || null,
    secondary_postal_code: employer.secondaryPostalCode || null,
  };

  const employerCreateBody = {
    client: {
      owner: ownerID,
      creator: creatorID,
    },
    employer: employerBody,
  };

  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/employers`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employerCreateBody),
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

const getFilteredEmployers = async (queryParams) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/employers?${queryParams}`,
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

const createJobLeads = async (jobLeads, ownerID, creatorID) => {
  const formattedJobLeads = jobLeads.map((jobLead) => {
    return {
      employer: jobLead.employer,
      job_title: jobLead.title,
      num_of_positions: parseInt(jobLead.numPositions, 10),
      compensation_max: jobLead.maxCompensation ?? 0,
      compensation_min: jobLead.minCompensation ?? 0,
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

const getJobLead = async (jobLeadID) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_leads/${jobLeadID}`,
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

const getEmployer = async (employerID) => {
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/employers/${employerID}`,
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

const getUserName = async (userID) => {
  const response = await fetch(`${REACT_APP_API_BASE_URL}/users/${userID}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    return "";
  }

  const json = await response.json();
  return json.data
    ? `${json.data.user.first_name} ${json.data.user.last_name}`
    : "";
};

// eslint-disable-next-line no-unused-vars
const getEmployerContacts = async (employerID) => {
  const response = mockEmployerContacts;

  return response;
};

const modifyEmployerInfo = async (modifiedEmployerInfo) => {
  const modifyEmployerBody = {
    values: {
      owner: modifiedEmployerInfo.owner,
      name: modifiedEmployerInfo.name,
      phone_number: modifiedEmployerInfo.phone_number,
      fax: modifiedEmployerInfo.fax,
      email: modifiedEmployerInfo.email,
      website: modifiedEmployerInfo.website,
      naics_code: modifiedEmployerInfo.naics_code,
      address: modifiedEmployerInfo.address,
    },
  };

  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/employers/${modifiedEmployerInfo.id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifyEmployerBody),
    },
  );
  return response;
};

const getFilteredClients = async (queryParams) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/clients?${queryParams}`,
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

const createClients = async (clients, userID) => {
  const formattedClients = clients.map((client) => {
    return {
      email: client.email,
      phone_number: client.phoneNumber,
      name: client.fullName,
      owner: userID,
      creator: userID,
      date_added: new Date(),
      date_updated: new Date(),
      status: "Active", // newly created clients will be active by default
    };
  });

  const clientsCreateBody = {
    client: formattedClients,
  };

  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/clients`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clientsCreateBody),
  });
  return response;
};

const fetchClientById = async (clientID) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/clients/${clientID}`,
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

const modifyClient = async (modifiedClient) => {
  const modifyClientBody = {
    values: {
      email: modifiedClient.email,
      phone_number: modifiedClient.phone,
      name: modifiedClient.name,
      owner: modifiedClient.owner,
      status: modifiedClient.status?.toLowerCase(),
      status_at_exit: modifiedClient.status_at_exit
        ?.toLowerCase()
        ?.replace(/ /g, "_"),
      status_at_3_months: modifiedClient.status_at_3?.toLowerCase(),
      status_at_6_months: modifiedClient.status_at_6?.toLowerCase(),
      status_at_9_months: modifiedClient.status_at_9?.toLowerCase(),
      status_at_12_months: modifiedClient.status_at_12?.toLowerCase(),
      job_lead_placement: modifiedClient.jobLeadPlacement,
    },
  };

  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/clients/${modifiedClient.clientID}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modifyClientBody),
    },
  );
  return response;
};

const getFilteredJobLeadsTimelineEntries = async (queryParams) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/job_leads_timeline?${queryParams}`,
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

const addJobLeadTimelineEntry = async (entryObject) => {
  const jobLeadEntryBody = {
    entry: entryObject,
  };

  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/job_leads_timeline`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobLeadEntryBody),
  });
  return response;
};

const getFilteredClientTimelineEntries = async (queryParams) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/clients_timeline?${queryParams}`,
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

const addClientTimelineEntry = async (entryObject) => {
  const jobLeadEntryBody = {
    entry: entryObject,
  };

  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/clients_timeline`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobLeadEntryBody),
  });
  return response;
};

const getFilteredEmployerTimelineEntries = async (queryParams) => {
  // eslint-disable-next-line no-useless-catch
  const response = await fetch(
    `${REACT_APP_API_BASE_URL}/employers_timeline?${queryParams}`,
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

const addEmployerTimelineEntry = async (entryObject) => {
  const jobLeadEntryBody = {
    entry: entryObject,
  };

  // eslint-disable-next-line no-useless-catch
  const response = await fetch(`${REACT_APP_API_BASE_URL}/employers_timeline`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobLeadEntryBody),
  });
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
  createEmployer,
  getFilteredEmployers,
  createJobLeads,
  getFilteredJobLeads,
  getJobLead,
  modifyJobLead,
  getFilteredClients,
  createClients,
  fetchClientById,
  modifyClient,
  getEmployer,
  getUserName,
  getEmployerContacts,
  modifyEmployerInfo,
  getFilteredJobLeadsTimelineEntries,
  addJobLeadTimelineEntry,
  getFilteredClientTimelineEntries,
  addClientTimelineEntry,
  getFilteredEmployerTimelineEntries,
  addEmployerTimelineEntry,
};
