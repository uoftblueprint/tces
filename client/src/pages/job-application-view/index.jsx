import { useEffect, useState } from "react";
import {
  fetchJobTitles,
  fetchSearchIDs,
  fetchApplicantNames,
  fetchAllJobApplicationsMock,
  fetchPaginatedData,
} from "../../mock-data/mockJobApplications";
import JobApplicationDashboard from "../../components/job-applications-view-component/job-application-dashboard";

const START_PAGE = 0;
const START_ROWS = 5;
const initialState = {
  rows: START_ROWS,
  page: START_PAGE,
  searchID: null,
  applicant: null,
  jobTitle: null,
  sort: "ascending",
};

// Future TODOs --------
// 1. replace all instances of mock functions with actual functions that fetch filter dropdown values and job applications,
// 2. jobTitle is expected to be an object with job_posting_ids as keys and job titles as values, this
//    may need to change depending on the implementation of the api

function JobApplicationView() {
  const [jobApplications, setJobApplications] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [searchIDs, setSearchIDs] = useState([]);
  const [totalJobApplicationsNumber, setTotalJobApplications] = useState(0);
  const [jobApplicationQuery, setJobApplicationQuery] = useState(initialState);

  // Adds job title property to each job application and replaces string createdAt value to Date type
  // jobTitlesMap consists of key value pairs between job_posting_id (from jobApplication api call) and
  // the corresponding job title
  const formatJobApplications = (rawJobApplications, jobTitlesMap) =>
    rawJobApplications.map((jobApplication) => {
      return {
        ...jobApplication,
        title: jobTitlesMap[jobApplication.job_posting_id],
      };
    });

  // Used to get job titles on page load
  const fetchFormattedJobApplications = async (jobTitlesMap) => {
    // const response = await fetchAllJobApplications(START_PAGE, START_ROWS);
    const response = await fetchAllJobApplicationsMock(
      jobApplicationQuery.page,
      jobApplicationQuery.rows,
    );
    const rawJobApplications = response.jobApplications;
    const totalJobApps = parseInt(response.totalJobApplicationsNumber, 10);

    const formattedJobApplications = formatJobApplications(
      rawJobApplications,
      jobTitlesMap,
    );

    return { formattedJobApplications, totalJobApps };
  };

  const fetchFilteredApplications = async (newParams) => {
    const newApplicationQuery = { ...jobApplicationQuery, ...newParams };

    setJobApplicationQuery(newApplicationQuery);

    const jobApplicationData = fetchPaginatedData(newApplicationQuery);
    setTotalJobApplications(jobApplicationData.totalJobApplicationsNumber);
    setJobApplications(
      formatJobApplications(jobApplicationData.jobApplications, jobTitles),
    );
  };

  const firstTimeLoad = async () => {
    const newJobTitles = fetchJobTitles();
    const newApplicants = fetchApplicantNames();
    const newSearchIDs = fetchSearchIDs();

    setJobTitles(newJobTitles);
    setApplicants(newApplicants);
    setSearchIDs(newSearchIDs);

    const jobApplicationData =
      await fetchFormattedJobApplications(newJobTitles);

    // set table to initially show some rows
    setJobApplications(jobApplicationData.formattedJobApplications);
    setTotalJobApplications(jobApplicationData.totalJobApps);
  };

  useEffect(() => {
    firstTimeLoad();
  }, []);

  return (
    <JobApplicationDashboard
      jobApplications={jobApplications}
      jobApplicationQuery={jobApplicationQuery}
      fetchFilteredApplications={fetchFilteredApplications}
      jobTitles={jobTitles}
      applicants={applicants}
      searchIDs={searchIDs}
      totalJobApplicationsNumber={totalJobApplicationsNumber}
    />
  );
}

export default JobApplicationView;
