import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import UserType from "../../prop-types/UserType";
import { DashboardContainer } from "./index.styles";
import JobLeadDashboardHeaderComponent from "./job-lead-dashboard-header";
import JobLeadDashboardTableComponent from "./job-lead-dashboard-table";
import JobLeadDashboardFiltersComponent from "./job-lead-dashboard-filters";

function JobLeadDashboardComponent({ managedJobLeads }) {
  const [filteredRows, setFilteredRows] = React.useState(managedJobLeads);

  React.useEffect(() => {
    setFilteredRows(managedJobLeads);
  }, [managedJobLeads]);

  const handleFilter = (filteredJobLeads) => {
    setFilteredRows(filteredJobLeads);
  };

  return (
    <DashboardContainer>
      <JobLeadDashboardHeaderComponent managedJobLeads={filteredRows} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gridColumnGap: "30px",
          width: "100%",
        }}
      >
        <JobLeadDashboardFiltersComponent
          handleFilter={handleFilter}
          managedJobLeads={managedJobLeads}
          filteredJobLeads={filteredRows}
        />
        <JobLeadDashboardTableComponent managedJobLeads={filteredRows} />
      </Box>
    </DashboardContainer>
  );
}

JobLeadDashboardComponent.propTypes = {
  managedJobLeads: PropTypes.arrayOf(UserType).isRequired,
  // eslint-disable-next-line
};

export default JobLeadDashboardComponent;
