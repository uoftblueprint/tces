// import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import JobApplicationDashboard from "../../components/job-applications-view-component/job-application-dashboard";

function JobApplicationView() {
  // const [jobApplications, setJobApplications] = useState([]);
  const jobApplications = [];

  for (let i = 0; i < 100; i += 1) {
    const titlee = String(i) + "frontend dev";
    jobApplications.push({
      id: String(i),
      title: titlee,
      name: "Henrix Bartholomew Dark Shadow",
      phone: "1234567890",
      email: "hallo",
      postal_code: "a1s2d3",
      createdAt: new Date("2025-01-26T00:18:25.000Z"),
      application_status: "New",
      resume: "hello.txt",
    });
  }
  jobApplications[10].createdAt = new Date("2023-01-01");

  const options = [
    {
      label: "Application date: Ascending",
      value: "ascending",
    },
    {
      label: "Application date: descending",
      value: "descending",
    },
  ];

  const jobTitles = ["frontend dev", "backend dev"];
  const applicants = ["olya jaworsky"];
  const jobIDs = ["1", "2", "3"];

  const filterOptions = {
    jobTitles,
    applicants,
    jobIDs,
  };

  return (
    <JobApplicationDashboard
      jobApplications={jobApplications}
      filterOptions={filterOptions}
    />
  );
}

export default JobApplicationView;
