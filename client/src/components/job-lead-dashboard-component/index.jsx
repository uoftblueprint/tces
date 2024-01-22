import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import JobLeadType from "../../prop-types/JobLeadType";
import { DashboardContainer } from "./index.styles";
import JobLeadDashboardHeaderComponent from "./job-lead-dashboard-header";
import JobLeadDashboardTableComponent from "./job-lead-dashboard-table";
import JobLeadDashboardFiltersComponent from "./job-lead-dashboard-filters";
import ErrorComponent from "../shared/error-screen-component";
import { getFilteredJobLeads } from "../../utils/api";
import { formatDateStr } from "../../utils/date";
import LoadingScreenComponent from "../shared/loading-screen-component";

function JobLeadDashboardComponent({
  managedJobLeads,
  setManagedJobLeads,
  getUserById,
}) {
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [errorOb, setError] = React.useState(null);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  const [rowCount, setRowCount] = React.useState(managedJobLeads.length);
  const [aggregates, setAggregates] = React.useState({
    maxCompensation: 100,
    minCompensation: 0,
    minHoursPerWeek: 0,
    maxHoursPerWeek: 100,
  });
  const [owners, setOwners] = React.useState([]);

  // helper to generate query params based on pagination model state and filter configs
  const declareFilterJobLeadsQueryParams = (
    filterParams,
    customPageModel = null,
  ) => {
    let { pageSize, page } = paginationModel;
    if (customPageModel) {
      page = customPageModel.page;
      pageSize = customPageModel.pageSize;
      setPaginationModel(customPageModel);
    }
    // we initially include pagination model first
    const queryParams = new URLSearchParams({
      pageSize,
      page,
    });

    // early return if no filter params are provided
    if (!filterParams) return queryParams;

    // ensure these filter configs are defined before passing in query
    if (filterParams.searchTitleQuery)
      queryParams.append("searchTitleQuery", filterParams.searchTitleQuery);
    if (filterParams.startDateCreated)
      queryParams.append(
        "startDateCreated",
        filterParams.startDateCreated.toISOString(),
      );
    if (filterParams.endDateCreated)
      queryParams.append(
        "endDateCreated",
        filterParams.endDateCreated.toISOString(),
      );
    if (filterParams.startDateExpired)
      queryParams.append(
        "startDateExpired",
        filterParams.startDateExpired.toISOString(),
      );
    if (filterParams.endDateExpired)
      queryParams.append(
        "endDateExpired",
        filterParams.endDateExpired.toISOString(),
      );
    if (
      filterParams.compensationRange &&
      filterParams.compensationRange[0] &&
      filterParams.compensationRange[1]
    ) {
      queryParams.append("minCompensation", filterParams.compensationRange[0]);
      queryParams.append("maxCompensation", filterParams.compensationRange[1]);
    }
    if (
      filterParams.hoursPerWeekRange &&
      filterParams.hoursPerWeekRange[0] &&
      filterParams.hoursPerWeekRange[1]
    ) {
      queryParams.append("minHoursPerWeek", filterParams.hoursPerWeekRange[0]);
      queryParams.append("maxHoursPerWeek", filterParams.hoursPerWeekRange[1]);
    }
    if (filterParams.ownerId && filterParams.ownerId !== -1)
      queryParams.append("ownerId", filterParams.ownerId);
    if (filterParams.searchNOCQuery)
      queryParams.append("searchNOCQuery", filterParams.searchNOCQuery);
    if (filterParams.jobTypeSelect)
      queryParams.append(
        "jobTypes",
        JSON.stringify(filterParams.jobTypeSelect),
      );

    return queryParams;
  };

  // function to handle the apply filter button
  const handleApplyFilter = async (filterParams, customPageModel = null) => {
    const queryParams = declareFilterJobLeadsQueryParams(
      filterParams,
      customPageModel,
    );

    // fetch the data
    try {
      setLoading(true);
      const response = await getFilteredJobLeads(queryParams.toString());
      if (response.ok) {
        const jobLeadsData = await response.json();
        const formattedJobLeads = jobLeadsData.data.map((jobLead) => ({
          id: jobLead.id,
          jobLeadID: jobLead.id,
          ownerID: jobLead.owner,
          creatorID: jobLead.creator,
          employerID: jobLead.employer,
          jobTitle: jobLead.job_title,
          jobDescription: jobLead.job_description,
          compensationMax: jobLead.compensation_max,
          compensationMin: jobLead.compensation_min,
          hoursPerWeek: jobLead.hours_per_week,
          noc: jobLead.national_occupation_code,
          creationDate: formatDateStr(jobLead.creation_date),
          expirationDate: formatDateStr(jobLead.expiration_date),
          employmentType: jobLead.employment_type,
          numOfPostions: jobLead.num_of_positions,
        }));
        setOwners(jobLeadsData.uniqueOwners);
        setAggregates(jobLeadsData.aggregates);
        setManagedJobLeads(formattedJobLeads);
        setRowCount(jobLeadsData.total);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Fetch failed.");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // triggers on initialization of job leads dashboard screen
  React.useEffect(() => {
    // fetch job leads with default configs
    const initialFetch = async () => {
      await handleApplyFilter(null);
    };
    initialFetch().then(() => setInitialLoading(false));
  }, []);

  // if there is an error render the error screen
  if (errorOb) return <ErrorComponent message={errorOb.message} />;

  return (
    <DashboardContainer>
      <LoadingScreenComponent isLoading={initialLoading}>
        <JobLeadDashboardHeaderComponent jobLeadsResultsCount={rowCount} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gridColumnGap: "30px",
            width: "100%",
          }}
        >
          <JobLeadDashboardFiltersComponent
            managedJobLeads={managedJobLeads}
            getUserById={getUserById}
            paginationModel={paginationModel}
            handleApplyFilter={handleApplyFilter}
            jobLeadAggregates={aggregates}
            setPaginationModel={setPaginationModel}
            owners={owners}
          />
          <JobLeadDashboardTableComponent
            managedJobLeads={managedJobLeads}
            getUserById={getUserById}
            isLoading={loading}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            totalRowCount={rowCount}
          />
        </Box>
      </LoadingScreenComponent>
    </DashboardContainer>
  );
}

JobLeadDashboardComponent.propTypes = {
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  setManagedJobLeads: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default JobLeadDashboardComponent;
