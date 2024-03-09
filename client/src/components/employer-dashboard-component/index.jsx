// import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import * as React from "react";
import { Container, DashboardContainer } from "./index.styles";
import EmployerDashboardHeader from "./employer-dashboard-header";
import EmployerDashboardFilter from "./employer-dashboard-filter";
import EmployerDashboardTable from "./employer-dashboard-table";
import EmployerType from "../../prop-types/EmployerType";
import { getFilteredEmployers } from "../../utils/api";
import ErrorComponent from "../shared/error-screen-component";
import LoadingScreenComponent from "../shared/loading-screen-component";

function EmployerDashboardComponent({ employers, setEmployers, getUserById }) {
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  const [rowCount, setRowCount] = React.useState(employers.length);
  const [owners, setOwners] = React.useState([]);
  const [errorOb, setError] = React.useState(null);
  const [parentFilterParams, setParentFilterParams] = React.useState({
    employerName: "",
    phoneNumber: "",
    dateFrom: null,
    dateTo: null,
    ownerId: -1,
    postalCode: "",
  });

  const generateFilterParams = (filterParams, page = null, pageSize = null) => {
    const queryParams = new URLSearchParams({})
    if (pageSize && page){
      queryParams.append("page", page);
      queryParams.append("pageSize", pageSize);
    }
    

    // early return if no filter params are provided
    if (!filterParams) return queryParams;
    // ensure these filter configs are defined before passing in query
    if (filterParams.employerName)
      queryParams.append("employerName", filterParams.employerName);
    if (filterParams.phoneNumber)
      queryParams.append("phoneNumber", filterParams.phoneNumber);
    if (filterParams.dateFrom)
      queryParams.append("startDateAdded", filterParams.dateFrom);
    if (filterParams.dateTo)
      queryParams.append("endDateAdded", filterParams.dateTo);
    if (filterParams.ownerId)
      queryParams.append("ownerId", filterParams.ownerId);
    if (filterParams.postalCode)
      queryParams.append("postalCode", filterParams.postalCode);

    return queryParams
  }

  // helper to generate query params based on pagination model state and filter configs
  const declareFilterEmployerQueryParams = (
    filterParams,
    customPageModel = null,
  ) => {
    let { pageSize, page } = paginationModel;
    if (customPageModel) {
      page = customPageModel.page;
      pageSize = customPageModel.pageSize;      
    }
    return generateFilterParams(filterParams, page, pageSize);
  };

  // function to handle the apply filter button
  const handleApplyFilter = async (filterParams, customPageModel = null) => {
    const queryParams = declareFilterEmployerQueryParams(
      filterParams,
      customPageModel,
    );

    // fetch the data
    try {
      setLoading(true);
      const response = await getFilteredEmployers(queryParams.toString());
      if (response.ok) {
        const employersData = await response.json();
        const formattedEmployers = employersData.data.map((employer) => ({
          employerID: employer.id,
          name: employer.name,
          creatorID: employer.creator,
          ownerID: employer.owner,
          address: employer.address,
          city: employer.city,
          postalCode: employer.postal_code,
          province: employer.province,
          secondaryAddress: employer.secondary_address,
          secondaryCity: employer.secondary_city,
          secondaryPostalCode: employer.secondary_postal_code,
          secondaryProvince: employer.secondary_province,
          dateAdded: employer.date_added,
          email: employer.email,
          fax: employer.fax,
          legalName: employer.legal_name,
          naicsCode: employer.naics_code,
          phoneNumber: employer.phone_number,
          website: employer.website,
        }));
        setOwners(employersData.uniqueOwners);
        setEmployers(formattedEmployers);
        setRowCount(employersData.total);
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
    <Container>
      <LoadingScreenComponent isLoading={initialLoading}>
        <DashboardContainer>
          <EmployerDashboardHeader 
          numEntries={rowCount} 
          generateFilterParams={generateFilterParams}
              filterParams={parentFilterParams}/>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gridColumnGap: "30px",
              height: "fit-content",
              paddingBottom: "16px",
              width: "100%",
            }}
          >
            <EmployerDashboardFilter
              handleApplyFilter={handleApplyFilter}
              paginationModel={paginationModel}
              owners={owners}
              getUserById={getUserById}
              setParentFilterParams={setParentFilterParams}
            />
            <EmployerDashboardTable
              managedEmployers={employers}
              getUserById={getUserById}
              isLoading={loading}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              totalRowCount={rowCount}
            />
          </Box>
        </DashboardContainer>
      </LoadingScreenComponent>
    </Container>
  );
}

EmployerDashboardComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  employers: PropTypes.arrayOf(EmployerType).isRequired,
  setEmployers: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
};

export default EmployerDashboardComponent;
