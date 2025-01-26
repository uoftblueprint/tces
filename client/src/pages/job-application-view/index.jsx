// import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchAllJobApplications } from "../../utils/job_applications_api";
import { getAllJobPosts } from "../../utils/job_posts_api";
import JobApplicationDashboard from "../../components/job-applications-view-component/job-application-dashboard";

function JobApplicationView() {
  const [jobApplications, setJobApplications] = useState([]);

  // Note: API here returns request promise object, NOT json
  const formatJobPostingMap = async () => {
    const request = await getAllJobPosts("");
    const data = await request.json();
    const jobPostings = data.allJobPosts.data;
    const jobPostingsMap = {};

    jobPostings.forEach((jobPosting) => {
      if (!(jobPosting.id in jobPostingsMap)) {
        jobPostingsMap[jobPosting.id] = jobPosting.title;
      }
    });

    return jobPostingsMap;
  };

  // Note: fetchAllJobApplications api gets response in json, not a promise
  const fetchJobApplications = async () => {
    const response = await fetchAllJobApplications();
    const jobPostingMap = await formatJobPostingMap();

    const rawJobApplications = response.jobApplications;
    const formattedJobApplications = rawJobApplications.map(
      (jobApplication) => {
        return {
          ...jobApplication,
          title: jobPostingMap[jobApplication.id],
          createdAt: new Date(jobApplication.createdAt),
        };
      },
    );
    console.log(formattedJobApplications);
    setJobApplications(formattedJobApplications);
  };

  // get job applications, turn into array of objects
  useEffect(() => {
    fetchJobApplications();
  }, []);

  // for (let i = 0; i < 100; i += 1) {
  //   const titlee = String(i) + "frontend dev";
  //   jobApplications.push({
  //     id: String(i),
  //     title: titlee,
  //     name: "Henrix Bartholomew Dark Shadow",
  //     phone: "1234567890",
  //     email: "hallo",
  //     postal_code: "a1s2d3",
  //     createdAt: new Date("2025-01-26T00:18:25.000Z"),
  //     application_status: "New",
  //     resume: "hello.txt",
  //   });
  // }
  // jobApplications[10].createdAt = new Date("2023-01-01");

  const tempFilterOptions = {
    jobTitles: ["frontend dev", "backend dev"],
    applicants: ["olya jaworsky"],
    jobIDs: ["1", "2", "3"],
  };

  return (
    <JobApplicationDashboard
      jobApplications={jobApplications}
      filterOptions={tempFilterOptions}
    />
  );
}

export default JobApplicationView;
