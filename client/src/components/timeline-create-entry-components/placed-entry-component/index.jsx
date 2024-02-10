import { useState } from "react";
import {
  Card,
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

function PlacedEntryComponent() {
  const [clientValue, setClientValue] = useState("Client");
  const [jobLeadValue, setjobLeadValue] = useState("JobLead");
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

  return (
    <Card sx={{ height: 791, width: 391 }}>
      <CardContent>
        <Typography variant="h5">Activity Timeline</Typography>
        <Box sx={{ display: "flex", marginTop: "12px" }}>
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
        >
          <MenuItem value="Client">Client</MenuItem>
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
        >
          <MenuItem value="JobLead">Job Lead</MenuItem>
        </Select>
        <TextField
          fullWidth
          label="Add additional notes"
          margin="normal"
          multiline
          variant="outlined"
          rows={16}
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
          <Button variant="outlined">DISCARD</Button>
          <Button variant="contained">POST</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PlacedEntryComponent;
