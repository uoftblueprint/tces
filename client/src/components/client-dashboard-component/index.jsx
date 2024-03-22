import { Button, Box, Typography, IconButton } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import FilterCard from "./client-dashboard-filter/FilterCard";
import ClientTable from "./client-dashboard-table/ClientTable";
import ClientDashboardContainer from "./index.styles";
import { formatDateStr } from "../../utils/date";
import { getFilteredClients } from "../../utils/api";
import { cleanStatusString } from "../../utils/users";
import ErrorComponent from "../shared/error-screen-component";
import LoadingScreenComponent from "../shared/loading-screen-component";
import ClientType from "../../prop-types/ClientType";

function ClientDashboardComponent({
  managedClients,
  setManagedClients,
  getUserById,
}) {
  const navigate = useNavigate();

  const [initialLoading, setInitialLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [errorOb, setError] = React.useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [rowCount, setRowCount] = useState(managedClients.length);
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
    if (filterParams.name) queryParams.append("name", filterParams.name);
    if (filterParams.phoneNumber)
      queryParams.append("phone_number", filterParams.phoneNumber);
    if (filterParams.dateUpdatedFrom)
      queryParams.append("date_updated_from", filterParams.dateUpdatedFrom);
    if (filterParams.dateUpdatedUntil)
      queryParams.append("date_updated_to", filterParams.dateUpdatedUntil);
    if (filterParams.dateRegisteredFrom)
      queryParams.append(
        "date_registered_from",
        filterParams.dateRegisteredFrom,
      );
    if (filterParams.dateRegisteredUntil)
      queryParams.append(
        "date_registered_to",
        filterParams.dateRegisteredUntil,
      );
    if (filterParams.owner && filterParams.owner !== -1)
      queryParams.append("owner", filterParams.owner);
    if (filterParams.status.active !== undefined)
      queryParams.append("active", filterParams.status.active);
    if (filterParams.status.rAndI !== undefined)
      queryParams.append("r_and_i", filterParams.status.rAndI);
    if (filterParams.status.closed !== undefined)
      // Assuming closed is a boolean
      queryParams.append("closed", filterParams.status.closed);

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
      const response = await getFilteredClients(queryParams.toString());
      if (response.ok) {
        const clientsData = await response.json();
        const formattedClients = clientsData.data.rows.map((client) => ({
          id: client.id,
          ownerID: client.owner,
          creatorID: client.creator,
          name: client.name,
          phone: client.phone_number,
          email: client.email,
          dateUpdated: formatDateStr(client.date_updated),
          dateAdded: formatDateStr(client.date_added),
          dateClosed: formatDateStr(client.closure_date),
          status: cleanStatusString(client.status),
          statusAt3Months: cleanStatusString(client.status_at_3_months),
          statusAt6Months: cleanStatusString(client.status_at_6_months),
          statusAt9Months: cleanStatusString(client.status_at_9_months),
          statusAt12Months: cleanStatusString(client.status_at_12_months),
          statusAtExit: cleanStatusString(client.status_at_exit),
          jobLeadPlacement: client.job_lead_placement,
        }));
        setOwners(clientsData.uniqueOwners);
        setManagedClients(formattedClients);
        setRowCount(clientsData.data.count);
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

  if (errorOb) return <ErrorComponent message={errorOb.message} />;

  return (
    <ClientDashboardContainer>
      <LoadingScreenComponent isLoading={initialLoading}>
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "20px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton>
                <ArrowBackIcon onClick={() => navigate("/dashboard")} />
              </IconButton>
              <Typography variant="h4" sx={{ ml: 1 }}>
                Clients
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{
                  marginLeft: "auto",
                  marginBottom: "30px",
                  marginRight: "30px",
                  marginTop: "30px",
                  backgroundColor: "white",
                  border: "1px solid #3568E5",
                  color: "#3568E5",
                  "&:hover": {
                    backgroundColor: "#3568E5",
                    color: "white",
                  },
                }}
                startIcon={<DownloadIcon />}
                onClick={() => {}}
              >
                EXPORT CURRENT FILTER VIEW ({rowCount} Clients)
              </Button>
              <Button
                sx={{
                  marginLeft: "auto",
                  marginBottom: "30px",
                  marginTop: "30px",
                  backgroundColor: "#3568E5",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#3568E5",
                    color: "white",
                  },
                }}
                startIcon={<AddIcon />}
                onClick={() => navigate("/clients/add")}
              >
                ADD NEW CLIENT
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gridColumnGap: "30px",
              width: "100%",
            }}
          >
            <FilterCard
              managedClients={managedClients}
              getUserById={getUserById}
              paginationModel={paginationModel}
              handleApplyFilter={handleApplyFilter}
              setPaginationModel={setPaginationModel}
              owners={owners}
            />
            <ClientTable
              clientData={managedClients}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              totalRowCount={rowCount}
              isLoading={loading}
              getUserById={getUserById}
            />
          </Box>
        </Box>
      </LoadingScreenComponent>
    </ClientDashboardContainer>
  );
}

ClientDashboardComponent.propTypes = {
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
  setManagedClients: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
};

export default ClientDashboardComponent;
