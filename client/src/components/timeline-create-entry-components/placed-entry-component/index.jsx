import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Avatar,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import JobLeadType from "../../../prop-types/JobLeadType";
import ClientType from "../../../prop-types/ClientType";

function PlacedEntryComponent({
  jobLead,
  onAddEntry,
  setComponentType,
  managedJobLeads,
  managedClients,
}) {
  const [clientValue, setClientValue] = useState(null);
  const [jobLeadValue, setjobLeadValue] = useState(null);
  const [notes, setNotes] = useState("");

  // to be injected as a prop when it connects to route (to be done in future ticket)
  const isJobLeadPage = false;

  const handleClientChange = (e) => {
    setClientValue(e.target.value);
  };

  const handleJobLeadChange = (e) => {
    setjobLeadValue(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobLeadValue && clientValue) {
      const newPlacementEntryObject = {
        type: "placement",
        client: clientValue.id,
        body: notes,
        job_lead: jobLeadValue.id,
        employer: jobLeadValue.employerID,
      };
      onAddEntry(newPlacementEntryObject);
    }
  };

  useEffect(() => {
    if (jobLead) {
      setjobLeadValue(jobLead);
    }
  }, [jobLead]);

  return (
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
        <Typography sx={{ color: "rgba(117, 117, 117, 1)", marginTop: 1 }}>
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
          {managedJobLeads.map((jobLeadOb) => (
            <MenuItem key={jobLeadOb.id} value={jobLeadOb}>
              {jobLeadOb.jobTitle}
            </MenuItem>
          ))}
        </Select>
        <TextField
          fullWidth
          label="Add additional notes"
          margin="normal"
          multiline
          variant="outlined"
          value={notes}
          onChange={handleNoteChange}
        />
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
          <Button variant="contained" type="submit">
            POST
          </Button>
        </Box>
      </CardContent>
    </form>
  );
}

PlacedEntryComponent.propTypes = {
  jobLead: JobLeadType.isRequired,
  setComponentType: PropTypes.func.isRequired,
  onAddEntry: PropTypes.func.isRequired,
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
};

export default PlacedEntryComponent;
