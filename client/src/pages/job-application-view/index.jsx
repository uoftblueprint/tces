// import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import DataTable from "../../components/job-applications-view-component/job-application-table-component";
import SortMenu from "../../components/shared/job-applications-sort-component";
import SearchInput from "../../components/job-applications-view-component/search-component";

function JobApplicationView() {
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

  return (
    <Container
      fluid
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Container sx={{ display: "flex", alignItems: "center" }}>
        <SortMenu
          options={options}
          applySort={() => 0}
          sx={{
            alignSelf: "start",
            alignItems: "start",
            justifySelf: "start",
            justifyContent: "start",
          }}
        />

        <Container sx={{ display: "flex", justifyContent: "end" }}>
          <SearchInput options={jobTitles} label="Job Title" />
          <SearchInput options={applicants} label="Applicant" />
          <SearchInput options={["12345"]} label="Search ID#" />
        </Container>
      </Container>
      <Typography sx={{ justifySelf: "left" }}>All Job Applications</Typography>
      <DataTable />
    </Container>
  );
}



export default JobApplicationView;
