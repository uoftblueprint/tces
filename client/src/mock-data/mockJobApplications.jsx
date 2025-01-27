const fetchJobTitles = () => {
  return { 23: "frontend dev", 4: "backend dev" };
};
const fetchApplicantNames = () => ["olya jaworsky"];
const fetchSearchIDs = () => ["1", "2", "3"];
const fetchAllJobApplicationsMock = (START_PAGE = 1, START_ROWS = 10) => {
  return {
    jobApplications: [
      {
        id: 1,
        job_posting_id: 23,
        name: "olya jaworsky",
        email: "test@mail.com",
        phone: "1234567890",
        postal_code: "q1w2e3",
        resume: "temp",
        status_in_canada: "Citizen",
        status_other: null,
        application_status: "Rejected",
        custom_responses: {},
        createdAt: "2025-01-12T03:50:22.000Z",
        updatedAt: "2025-01-12T17:55:29.000Z",
      },
      {
        id: 2,
        job_posting_id: 23,
        name: "qwr",
        email: "test@mail.com",
        phone: "1234567890",
        postal_code: "q1w2e3",
        resume: "temp",
        status_in_canada: "Citizen",
        status_other: null,
        application_status: "Approved",
        custom_responses: {},
        createdAt: "2025-01-12T03:50:22.000Z",
        updatedAt: "2025-01-12T17:55:29.000Z",
      },
      {
        id: 3,
        job_posting_id: 23,
        name: "dfgh",
        email: "test@mail.com",
        phone: "1234567890",
        postal_code: "q1w2e3",
        resume: "temp",
        status_in_canada: "Citizen",
        status_other: null,
        application_status: "New",
        custom_responses: {},
        createdAt: "2025-01-12T03:50:22.000Z",
        updatedAt: "2025-01-12T17:55:29.000Z",
      },
      {
        id: 4,
        job_posting_id: 23,
        name: "asdf",
        email: "test@mail.com",
        phone: "1234567890",
        postal_code: "q1w2e3",
        resume: "temp",
        status_in_canada: "Citizen",
        status_other: null,
        application_status: "Contacted",
        custom_responses: {},
        createdAt: "2025-01-12T03:50:22.000Z",
        updatedAt: "2025-01-12T17:55:29.000Z",
      },
      {
        id: 5,
        job_posting_id: 23,
        name: "asdf",
        email: "test@mail.com",
        phone: "1234567890",
        postal_code: "q1w2e3",
        resume: "temp",
        status_in_canada: "Citizen",
        status_other: null,
        application_status: "R and I",
        custom_responses: {},
        createdAt: "2025-01-12T03:50:22.000Z",
        updatedAt: "2025-01-12T17:55:29.000Z",
      },
    ],
    ok: true,
    START_PAGE,
    START_ROWS,
    totalJobApplicationsNumber: 20,
  };
};
const fetchPaginatedData = (queryParams) => {
  console.log(queryParams);
  if (queryParams.page === 1) {
    return {
      jobApplications: [
        {
          id: 6,
          job_posting_id: 23,
          name: "olya jaworsky",
          email: "test@mail.com",
          phone: "1234567890",
          postal_code: "q1w2e3",
          resume: "temp",
          status_in_canada: "Citizen",
          status_other: null,
          application_status: "In Progress",
          custom_responses: {},
          createdAt: "2025-01-12T03:50:22.000Z",
          updatedAt: "2025-01-12T17:55:29.000Z",
        },
      ],
      totalJobApplicationsNumber: 20,
    };
  }
  if (queryParams.page === 2) {
    return {
      jobApplications: [
        {
          id: 7,
          job_posting_id: 23,
          name: "olya jaworsky",
          email: "test@mail.com",
          phone: "1234567890",
          postal_code: "q1w2e3",
          resume: "temp",
          status_in_canada: "Citizen",
          status_other: null,
          application_status: "Rejected",
          custom_responses: {},
          createdAt: "2025-01-12T03:50:22.000Z",
          updatedAt: "2025-01-12T17:55:29.000Z",
        },
        {
          id: 8,
          job_posting_id: 23,
          name: "olya jaworsky",
          email: "test@mail.com",
          phone: "1234567890",
          postal_code: "q1w2e3",
          resume: "temp",
          status_in_canada: "Citizen",
          status_other: null,
          application_status: "Rejected",
          custom_responses: {},
          createdAt: "2025-01-12T03:50:22.000Z",
          updatedAt: "2025-01-12T17:55:29.000Z",
        },
        {
          id: 9,
          job_posting_id: 23,
          name: "olya jaworsky",
          email: "test@mail.com",
          phone: "1234567890",
          postal_code: "q1w2e3",
          resume: "temp",
          status_in_canada: "Citizen",
          status_other: null,
          application_status: "Rejected",
          custom_responses: {},
          createdAt: "2025-01-12T03:50:22.000Z",
          updatedAt: "2025-01-12T17:55:29.000Z",
        },
      ],
      totalJobApplicationsNumber: 20,
    };
  }
  return fetchAllJobApplicationsMock();
};

export {
  fetchJobTitles,
  fetchApplicantNames,
  fetchSearchIDs,
  fetchAllJobApplicationsMock,
  fetchPaginatedData,
};
