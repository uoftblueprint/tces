import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Avatar,
  CardContent,
  Button,
  Typography,
  Divider,
  Select,
  DialogTitle,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
  TextField,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as React from "react";
import JobLeadType from "../../../prop-types/JobLeadType";
import EmployerType from "../../../prop-types/EmployerType";
import { getFilteredClients, getFilteredJobLeads } from "../../../utils/api";
import { formatDateStr } from "../../../utils/date";
import ErrorScreenComponent from "../../shared/error-screen-component";
import debouncer from "../../../utils/debouncer";
import { cleanStatusString } from "../../../utils/users";

function PlacedEntryComponent({
  employer,
  jobLead,
  onAddEntry,
  setComponentType,
}) {
  const [clientValue, setClientValue] = useState(null);
  const [jobLeadValue, setjobLeadValue] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [error, setError] = useState(null);

  const [jobLeadOptions, setJobLeadOptions] = useState([]);
  const [jobLeadOptionsOpen, setJobLeadOptionsOpen] = useState(false);
  const [jobLeadOptionsLoading, setJobLeadsOptionsLoading] = useState(false);

  const [clientOptions, setClientOptions] = useState([]);
  const [clientOptionsOpen, setClientOptionsOpen] = useState(false);
  const [clientOptionsLoading, setClientOptionsLoading] = useState(false);

  const [paginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  const handleJobLeadOptionSearch = async (
    searchQuery,
    pageSize = 10,
    page = 0,
  ) => {
    const queryParams = new URLSearchParams({});
    queryParams.append("searchTitleQuery", searchQuery);
    queryParams.append("page", page);
    queryParams.append("pageSize", pageSize);
    if (employer) {
      queryParams.append("employer", employer.id);
    }
    try {
      const response = await getFilteredJobLeads(queryParams.toString());
      if (response.ok) {
        const jobLeadsData = await response.json();
        const formattedJobLeads = jobLeadsData.data
          .map((jobLeadResponse) => ({
            id: jobLeadResponse.id,
            jobLeadID: jobLeadResponse.id,
            ownerID: jobLeadResponse.owner,
            ownerDetails: jobLeadResponse.owner_details,
            creatorID: jobLeadResponse.creator,
            employerID: jobLeadResponse.employer,
            jobTitle: jobLeadResponse.job_title,
            jobDescription: jobLeadResponse.job_description,
            compensationMax: jobLeadResponse.compensation_max,
            compensationMin: jobLeadResponse.compensation_min,
            hoursPerWeek: jobLeadResponse.hours_per_week,
            noc: jobLeadResponse.national_occupation_code,
            creationDate: formatDateStr(jobLeadResponse.creation_date),
            expirationDate: formatDateStr(jobLeadResponse.expiration_date),
            employmentType: jobLeadResponse.employment_type,
            numOfPostions: jobLeadResponse.num_of_positions,
            clientCount: jobLeadResponse.client_count,
          }))
          .filter(
            (jobLeadOb) =>
              !employer ||
              (jobLeadOb.employerID && jobLeadOb.employerID === employer.id),
          )
          .filter(
            (jobLeadOb) => jobLeadOb.numOfPostions > jobLeadOb.clientCount,
          );
        setJobLeadOptions(formattedJobLeads);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Fetch failed.");
      }
    } catch (err) {
      setError(err);
    }
  };

  const fetchJobLeads = async (inputValue) => {
    try {
      setJobLeadsOptionsLoading(true);
      setJobLeadOptions([]);
      const { pageSize, page } = paginationModel;
      await handleJobLeadOptionSearch(inputValue, pageSize, page);
    } catch (err) {
      setError("Failed to fetch job leads.");
    } finally {
      setJobLeadsOptionsLoading(false);
    }
  };

  const handleClientOptionSearch = async (
    searchQuery,
    pageSize = 10,
    page = 0,
  ) => {
    const queryParams = new URLSearchParams({});
    queryParams.append("name", searchQuery);
    queryParams.append("page", page);
    queryParams.append("pageSize", pageSize);
    try {
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
        setClientOptions(formattedClients);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Fetch failed.");
      }
    } catch (err) {
      setError(err);
    }
  };

  const fetchClients = async (inputValue) => {
    try {
      setClientOptionsLoading(true);
      setClientOptions([]);
      const { pageSize, page } = paginationModel;
      await handleClientOptionSearch(inputValue, pageSize, page);
    } catch (err) {
      setError("Failed to fetch clients.");
    } finally {
      setClientOptionsLoading(false);
    }
  };

  const handleSubmitDirect = () => {
    if (jobLeadValue && clientValue) {
      const newPlacementEntryObject = {
        type: "placement",
        client: clientValue.id,
        job_lead: jobLeadValue.id,
        employer: jobLeadValue.employerID,
      };
      onAddEntry(newPlacementEntryObject);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleConfirmDialog = () => {
    if (openDialog) {
      setClientValue(openDialog);
    }
    setOpenDialog(null);
  };

  const handleClientChange = (e, newValue) => {
    const selectedClient = newValue;
    if (newValue && newValue.jobLeadPlacement !== -1) {
      setOpenDialog(selectedClient); // Open dialog if jobLeadPlacement is defined
    } else {
      setClientValue(selectedClient);
    }
  };

  // to be injected as a prop when it connects to route (to be done in future ticket)
  const isJobLeadPage = false;

  const handleJobLeadChange = (e, newValue) => {
    if (newValue) {
      setjobLeadValue(newValue.id);
    } else {
      setjobLeadValue(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitDirect();
    window.location.reload();
  };

  useEffect(() => {
    if (jobLead) {
      setjobLeadValue(jobLead);

      if (jobLead.numOfPostions <= jobLead.clientCount) {
        setSubmitEnabled(false);
      }
    }
  }, [jobLead]);

  // debouncer to minimize api calls
  const debouncedFetchJobLeads = useCallback(debouncer(fetchJobLeads, 500), []);
  const debouncedFetchClients = useCallback(debouncer(fetchClients, 500), []);

  useEffect(() => {
    debouncedFetchClients("");
    debouncedFetchJobLeads("");
  }, []);

  const jobLeadsFilledMessage =
    "Position Capacity Has Been Filled For This Job Lead";

  if (error) return <ErrorScreenComponent message={error} />;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardContent sx={{ pl: 3, pt: 0 }}>
          <Box sx={{ display: "flex" }}>
            <Box>
              <Avatar
                sx={{
                  bgcolor: "rgba(53, 104, 229, 1)",
                  width: "30px",
                  height: "30px",
                }}
              >
                <CheckCircleIcon sx={{ width: "18px", height: "18px" }} />
              </Avatar>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "16px",
              }}
            >
              <Typography>Placed Job Seeker</Typography>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography sx={{ color: "rgba(117, 117, 117, 1)" }}>
            Select the Client
          </Typography>
          <Autocomplete
            required
            id="client-Options"
            open={clientOptionsOpen}
            onOpen={() => {
              setClientOptionsOpen(true);
            }}
            onClose={() => {
              setClientOptionsOpen(false);
            }}
            onChange={(event, newValue) => {
              handleClientChange(event, newValue);
            }}
            onInputChange={(event, newInputValue) => {
              event.preventDefault();
              debouncedFetchClients(newInputValue);
            }}
            loading={clientOptionsLoading}
            loadingText="Loading..."
            options={clientOptions}
            getOptionLabel={(option) => {
              return option.name;
            }}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line
                {...params}
                variant="outlined"
                sx={{ borderRadius: "10px" }}
                required
              />
            )}
          />
          {jobLead && (
            <>
              <Typography
                sx={{ color: "rgba(117, 117, 117, 1)", marginTop: 1 }}
              >
                Selected Job Lead
              </Typography>

              <TextField
                value={jobLead.jobTitle}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{
                  backgroundColor: "rgba(245, 245, 245, 1)",
                  borderRadius: 1,
                }}
              />
            </>
          )}
          {!jobLead && (
            <>
              <Typography
                sx={{ color: "rgba(117, 117, 117, 1)", marginTop: 1 }}
              >
                Select the Job Lead
              </Typography>
              {!isJobLeadPage ? (
                <Autocomplete
                  required
                  id="jobLead-Options"
                  open={jobLeadOptionsOpen}
                  onOpen={() => {
                    setJobLeadOptionsOpen(true);
                  }}
                  onClose={() => {
                    setJobLeadOptionsOpen(false);
                  }}
                  onChange={(event, newValue) => {
                    handleJobLeadChange(event, newValue);
                  }}
                  onInputChange={(event, newInputValue) => {
                    event.preventDefault();
                    debouncedFetchJobLeads(newInputValue);
                  }}
                  loading={jobLeadOptionsLoading}
                  loadingText="Loading..."
                  options={jobLeadOptions}
                  getOptionLabel={(option) => option.jobTitle}
                  renderInput={(params) => (
                    <TextField
                      // eslint-disable-next-line
                      {...params}
                      variant="outlined"
                      sx={{ borderRadius: "10px" }}
                      required
                    />
                  )}
                />
              ) : (
                <Select
                  fullWidth
                  value={jobLeadValue}
                  onChange={handleJobLeadChange}
                  sx={{ borderRadius: "10px", marginTop: "0px" }}
                  disabled={isJobLeadPage}
                  required
                />
              )}
            </>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setComponentType("default")}
            >
              DISCARD
            </Button>
            <Tooltip title={!submitEnabled ? jobLeadsFilledMessage : ""}>
              <span>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={!submitEnabled}
                >
                  POST
                </Button>
              </span>
            </Tooltip>
          </Box>
        </CardContent>
      </form>
      <Dialog
        open={openDialog !== null}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Placement</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This client has an existing placement. Are you sure you want to
            overwrite it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>

          <Button onClick={handleConfirmDialog} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

PlacedEntryComponent.propTypes = {
  // eslint-disable-next-line react/require-default-props
  employer: EmployerType,
  // eslint-disable-next-line react/require-default-props
  jobLead: JobLeadType,
  setComponentType: PropTypes.func.isRequired,
  onAddEntry: PropTypes.func.isRequired,
};

export default PlacedEntryComponent;
