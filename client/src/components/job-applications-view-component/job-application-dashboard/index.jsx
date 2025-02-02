import PropTypes from "prop-types";
import { Button, Container, Typography } from "@mui/material";
import SortMenu from "../../shared/job-applications-sort-component";
import SearchInput from "../search-component";
import JobApplicationsTable from "../job-application-table-component";

function JobApplicationDashboard({
  jobApplications,
  jobApplicationQuery,
  fetchFilteredApplications,
  jobTitles,
  applicants,
  searchIDs,
  totalJobApplicationsNumber,
}) {
  const handleFilterChange = (newFilterQueries) => {
    fetchFilteredApplications({ ...jobApplicationQuery, ...newFilterQueries });
  };

  const isAllEmptyFilters =
    !jobApplicationQuery.jobTitle &&
    !jobApplicationQuery.applicant &&
    !jobApplicationQuery.searchID;

  if (jobApplicationQuery) {
    if (jobApplicationQuery.sort === "ascending") {
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
  }

  const getJobTitleLabels = (option) => jobTitles[option];
  const jobTitleIds = Object.keys(jobTitles);

  return (
    <Container
      fluid
      maxWidth={false}
      sx={{
        height: "100%",
        width: "95%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "100px",
      }}
    >
      <Typography
        sx={{
          justifySelf: "start",
          alignSelf: "start",
          fontWeight: "bold",
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
          applySort={(newSortType) => handleFilterChange({ sort: newSortType })}
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
            width: "60%",
          }}
          disableGutters
        >
          <SearchInput
            onChange={(e, value) =>
              handleFilterChange({ jobTitle: parseInt(value, 10) })
            }
            options={jobTitleIds}
            getOptionLabel={getJobTitleLabels}
            label="Job Title"
            selectedValue={jobApplicationQuery.jobTitle}
          />
          <SearchInput
            onChange={(e, value) => handleFilterChange({ applicant: value })}
            options={applicants}
            label="Applicant"
            selectedValue={jobApplicationQuery.applicant}
          />
          <SearchInput
            onChange={(e, value) =>
              handleFilterChange({ searchID: parseInt(value, 10) })
            }
            options={searchIDs}
            label="Search ID#"
            selectedValue={jobApplicationQuery.searchID}
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
        onClick={() => {
          handleFilterChange({
            searchID: null,
            applicant: null,
            jobTitle: null,
          });
        }}
      >
        Reset All
      </Button>
      <JobApplicationsTable
        jobApplications={jobApplications}
        totalJobApplicationsNumber={totalJobApplicationsNumber}
        handlePageRowChange={handleFilterChange}
        rowsPerPage={jobApplicationQuery.rows}
        page={jobApplicationQuery.page}
      />
    </Container>
  );
}

JobApplicationDashboard.propTypes = {
  jobApplications: PropTypes.object.isRequired,
  jobApplicationQuery: PropTypes.shape({
    rows: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    searchID: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.null,
    ]),
    applicant: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
    jobTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.null]),
    sort: PropTypes.string.isRequired,
  }).isRequired,
  fetchFilteredApplications: PropTypes.func.isRequired,
  jobTitles: PropTypes.arrayOf(PropTypes.number).isRequired,
  applicants: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchIDs: PropTypes.arrayOf(PropTypes.number).isRequired,
  totalJobApplicationsNumber: PropTypes.number.isRequired,
};

export default JobApplicationDashboard;
