import { useEffect, useState } from "react";
import {
  fetchAllJobApplications,
  getFilterOptions,
} from "../../utils/job_applications_api";
import JobApplicationDashboard from "../../components/job-applications-view-component/job-application-dashboard";

const START_PAGE = 0;
const START_ROWS = 5;
const initialState = {
  rows: START_ROWS,
  page: START_PAGE,
  searchID: null,
  applicant: null,
  jobTitle: null,
  sort: "descending",
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
  const formatJobApplications = (rawJobApplications) =>
    rawJobApplications.map((jobApplication) => {
      return {
        ...jobApplication,
        title: jobApplication.job_posting.title,
      };
    });

  // Used to get job titles on page load
  const fetchFormattedJobApplications = async () => {
    const response = await fetchAllJobApplications(jobApplicationQuery);
    const rawJobApplications = response.jobApplications;
    const totalJobApps = parseInt(response.totalJobApplicationsNumber, 10);

    const formattedJobApplications = formatJobApplications(rawJobApplications);

    return { formattedJobApplications, totalJobApps };
  };

  const fetchFilteredApplications = async (newParams) => {
    const newApplicationQuery = { ...jobApplicationQuery, ...newParams };

    setJobApplicationQuery(newApplicationQuery);

    const response = await fetchAllJobApplications(newApplicationQuery);

    const jobApplicationData = response.jobApplications;
    const totalJobApps = parseInt(response.totalJobApplicationsNumber, 10);

    const formattedJobApplications = formatJobApplications(jobApplicationData);

    setTotalJobApplications(totalJobApps);
    setJobApplications(formattedJobApplications);
  };

  const firstTimeLoad = async () => {
    const data = await getFilterOptions();

    setJobTitles(data.jobTitles);
    setApplicants(data.names);
    setSearchIDs(data.jobPostingIds);

    const jobApplicationData = await fetchFormattedJobApplications(data.jobTitles);

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
