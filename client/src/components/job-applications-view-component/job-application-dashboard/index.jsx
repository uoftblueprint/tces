// import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import DataTable from "../job-application-table-component";
import SortMenu from "../../shared/job-applications-sort-component";
import SearchInput from "../search-component";

function JobApplicationDashboard({jobApplications, filterOptions}) {
// Note: API here returns request promise object, NOT json
  // const formatJobPostingMap = async () => {
  //   const request = await getAllJobPosts("");
  //   const data = await request.json();
  //   const jobPostings = data.allJobPosts.data;
  //   const jobPostingsMap = {};

  //   jobPostings.forEach((jobPosting) => {
  //     if (!(jobPosting.id in jobPostingsMap)) {
  //       jobPostingsMap[jobPosting.id] = jobPosting.title;
  //     }
  //   });

  //   return jobPostingsMap;
  // };

  // Note: fetchAllJobApplications api gets response in json, not a promise
  // const fetchJobApplications = async () => {
  //   const response = await fetchAllJobApplications();
  //   const jobPostingMap = await formatJobPostingMap();

  //   const rawJobApplications = response.jobApplications;
  //   const formattedJobApplications = rawJobApplications.map(
  //     (jobApplication) => {
  //       return {
  //         ...jobApplication,
  //         title: jobPostingMap[jobApplication.id],
  //       };
  //     },
  //   );
  //   console.log(formattedJobApplications)
  // setJobApplications(formattedJobApplications);
  // };

  // get job applications, turn into array of objects
  // useEffect(() => {
  //   // fetchJobApplications();
  // }, []);

  // const [jobApplications, setJobApplications] = useState([]);
  const [sortType, setSortType] = useState("ascending");

  const applySort = (newSortType) => {
    setSortType(newSortType);
  };

  if (sortType === "ascending") {
    jobApplications.sort(
      (jobApplication1, jobApplication2) =>
        jobApplication1.createdAt - jobApplication2.createdAt,
    );
  } else {
    jobApplications.sort(
      (jobApplication1, jobApplication2) =>
        jobApplication2.createdAt - jobApplication1.createdAt,
    );
  }

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

  const {jobTitles} = filterOptions;
  const {applicants} = filterOptions;
  const {jobIDs} = filterOptions;

  return (
    <Container
      fluid
      maxWidth={false}
      sx={{
        height: "100%",
        width: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          justifySelf: "start",
          alignSelf: "start",
          fontWeight: 500,
          padding: "5% 0 0 0",
        }}
        variant="h3"
      >
        All Job Applications
      </Typography>

      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5% 0 0 0",
        }}
        disableGutters
      >
        <SortMenu
          options={options}
          applySort={applySort}
          sx={{
            alignSelf: "start",
            alignItems: "start",
            justifySelf: "start",
            justifyContent: "start",
          }}
        />

        <Container
          sx={{
            display: "flex",
            justifyContent: "end",
            margin: "0",
            gap: "35px",
          }}
          disableGutters
        >
          <SearchInput options={jobTitles} label="Job Title" />
          <SearchInput options={applicants} label="Applicant" />
          <SearchInput options={["12345"]} label="Search ID#" />
        </Container>
      </Container>
      <Button
        variant="contained"
        sx={{
          alignSelf: "end",
          borderRadius: "10px",
          marginTop: "20px",
          justifySelf: "stretch",
          height: "38px",
        }}
      >
        Reset All
      </Button>
      <DataTable jobApplications={jobApplications} />
    </Container>
  );
}

export default JobApplicationDashboard;
