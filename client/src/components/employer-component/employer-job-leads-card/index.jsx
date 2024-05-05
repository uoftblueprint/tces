import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Divider } from "../index.styles";
import EmployerJobLeadsTable from "./employer-job-leads-table";
import { getFilteredJobLeads } from "../../../utils/api";
import { formatDateStr } from "../../../utils/date";
import JobLeadType from "../../../prop-types/JobLeadType";
import ErrorScreenComponent from "../../shared/error-screen-component";

function EmployerJobLeadsCard({
  managedJobLeads,
  setManagedJobLeads,
  employerID,
}) {
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [errorOb, setError] = React.useState(null);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  const [rowCount, setRowCount] = React.useState(managedJobLeads.length);

  const generateFilterParams = (page = null, pageSize = null) => {
    const queryParams = new URLSearchParams({});
    if (pageSize || page) {
      queryParams.append("page", page);
      queryParams.append("pageSize", pageSize);
    }

    queryParams.append("employer", employerID);

    return queryParams;
  };

  // helper to generate query params based on pagination model state and filter configs
  const declareFilterJobLeadsQueryParams = () => {
    const { pageSize, page } = paginationModel;

    return generateFilterParams(page, pageSize);
  };

  // function to handle the apply filter button
  const handleApplyFilter = async () => {
    const queryParams = declareFilterJobLeadsQueryParams();

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
          clientCount: jobLead.client_count,
        }));
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

  React.useEffect(() => {
    handleApplyFilter();
  }, [paginationModel]);

  if (errorOb) return <ErrorScreenComponent message={errorOb} />;

  return (
    <Card
      style={{
        width: "100%",
        borderRadius: 8,
        boxShadow: 3,
        border: "1px solid #e0e0e0",
      }}
      sx={{
        ml: 9,
        mr: 2,
      }}
    >
      <CardContent
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" align="left" gutterBottom>
          Job Leads
        </Typography>
        <IconButton onClick={() => navigate("/job-leads/add")}>
          <AddIcon
            sx={{
              color: "gray",
              cursor: "pointer",
              align: "center",
            }}
          />
        </IconButton>
      </CardContent>
      <Divider />
      <CardContent>
        {!initialLoading ? (
          <EmployerJobLeadsTable
            managedJobLeads={managedJobLeads}
            isLoading={loading}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            totalRowCount={rowCount}
          />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
              width: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </CardContent>
      <CardContent>
        <Button variant="contained" onClick={() => navigate("/job-leads")}>
          VIEW FULL LIST
        </Button>
      </CardContent>
    </Card>
  );
}

EmployerJobLeadsCard.propTypes = {
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  setManagedJobLeads: PropTypes.func.isRequired,
  employerID: PropTypes.string.isRequired,
  // eslint-disable-next-line
};

export default EmployerJobLeadsCard;
