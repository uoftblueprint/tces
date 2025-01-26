// import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import DataTable from "../job-application-table-component";
import SortMenu from "../../shared/job-applications-sort-component";
import SearchInput from "../search-component";

function JobApplicationDashboard({ jobApplications, filterOptions }) {
  const [sortType, setSortType] = useState("ascending");
  const [selectedFilters, setSelectedFilters] = useState({
    jobTitle: null,
    applicant: null,
    searchID: null,
  });

  const applySort = (newSortType) => {
    setSortType(newSortType);
  };

  const handleFilterChange = (filter, value) => {
    setSelectedFilters({ ...selectedFilters, [filter]: value });
  };

  const isAllEmptyFilters = Object.values(selectedFilters).every(
    (value) => value === "",
  );

  const resetFilters = () => {
    setSelectedFilters({ jobTitle: null, applicant: null, searchID: null });
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
          <SearchInput
            onChange={(e, value) => handleFilterChange("jobTitle", value)}
            options={filterOptions.jobTitles}
            label="Job Title"
            selectedValue={selectedFilters.jobTitle}
          />
          <SearchInput
            onChange={(e, value) => handleFilterChange("applicant", value)}
            options={filterOptions.applicants}
            label="Applicant"
            selectedValue={selectedFilters.applicant}
          />
          <SearchInput
            onChange={(e, value) => handleFilterChange("searchID", value)}
            options={["12345"]}
            label="Search ID#"
            selectedValue={selectedFilters.searchID}
          />
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
        disabled={isAllEmptyFilters}
        onClick={resetFilters}
      >
        Reset All
      </Button>
      <DataTable jobApplications={jobApplications} />
    </Container>
  );
}

export default JobApplicationDashboard;
