import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Avatar,
  CardContent,
  Button,
  Typography,
  Divider,
  Select,
  MenuItem,
  DialogTitle,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
  TextField,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import JobLeadType from "../../../prop-types/JobLeadType";
import ClientType from "../../../prop-types/ClientType";
import EmployerType from "../../../prop-types/EmployerType";

function PlacedEntryComponent({
  employer,
  jobLead,
  onAddEntry,
  setComponentType,
  managedJobLeads,
  managedClients,
}) {
  const [clientValue, setClientValue] = useState(null);
  const [jobLeadValue, setjobLeadValue] = useState(null);
  const [openDialog, setOpenDialog] = useState(null);
  const [submitEnabled, setSubmitEnabled] = useState(true);

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

  const handleClientChange = (e) => {
    const selectedClient = e.target.value;
    if (selectedClient.jobLeadPlacement !== -1) {
      setOpenDialog(selectedClient); // Open dialog if jobLeadPlacement is defined
    } else {
      setClientValue(selectedClient);
    }
  };

  // to be injected as a prop when it connects to route (to be done in future ticket)
  const isJobLeadPage = false;

  const handleJobLeadChange = (e) => {
    setjobLeadValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitDirect();
  };

  useEffect(() => {
    if (jobLead) {
      setjobLeadValue(jobLead);

      if (jobLead.numOfPostions <= jobLead.clientCount) {
        setSubmitEnabled(false);
      }
    }
  }, [jobLead]);

  const jobLeadsFilledMessage =
    "Position Capacity Has Been Filled For This Job Lead";

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
          <Select
            fullWidth
            value={clientValue}
            onChange={handleClientChange}
            sx={{ borderRadius: "10px" }}
            required
          >
            <MenuItem value={null} disabled>
              Select a Client
            </MenuItem>
            {managedClients.map((client) => (
              <MenuItem key={client.id} value={client}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
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
              <Select
                fullWidth
                value={jobLeadValue}
                onChange={handleJobLeadChange}
                sx={{ borderRadius: "10px" }}
                disabled={isJobLeadPage}
                required
              >
                <MenuItem value={null} disabled>
                  Select a Job Lead
                </MenuItem>
                {managedJobLeads
                  .filter(
                    (jobLeadOb) =>
                      !employer ||
                      (jobLeadOb.employerID &&
                        jobLeadOb.employerID === employer.id),
                  )
                  .filter(
                    (jobLeadOb) =>
                      jobLeadOb.numOfPostions > jobLeadOb.clientCount,
                  )
                  .map((jobLeadOb) => (
                    <MenuItem key={jobLeadOb.id} value={jobLeadOb}>
                      {jobLeadOb.jobTitle}
                    </MenuItem>
                  ))}
              </Select>
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
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
};

export default PlacedEntryComponent;
