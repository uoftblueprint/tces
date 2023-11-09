import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  TextField,
  FormHelperText,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  Container,
  ButtonContainer,
  JobLeadContainer,
  H3,
  H1,
  Body,
  ButtonL,
} from "./index.styles";

function AddJobLead() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [jobLeads, setJobLeads] = useState([
    {
      id: 0,
      employer: "",
      title: "",
      minCompensation: "",
      maxCompensation: "",
      hoursPerWeek: "",
      nationalOC: "",
      description: "",
      creationDate: null,
      expirationDate: null,
      employmentType: "",
    },
  ]);

  const handleAddJobLead = () => {
    const newId = jobLeads.length + 1;
    setJobLeads((prevJobLeads) => [
      ...prevJobLeads,
      {
        id: newId,
        employer: "",
        title: "",
        minCompensation: "",
        maxCompensation: "",
        hoursPerWeek: "",
        nationalOC: "",
        creationDate: null,
        expirationDate: null,
        employmentType: "",
      },
    ]);
  };

  const handleInputChange = (e, id, field) => {
    const newJobLeads = [...jobLeads];
    const index = newJobLeads.findIndex((lead) => lead.id === id);
    if (index !== -1) {
      newJobLeads[index][field] = e;
      setJobLeads(newJobLeads);
    } else {
      console.error(`Invalid id: ${id}`);
    }
  };

  return (
    <Container>
      <H1>Adding a Job Lead</H1>
      <Body>Input information about the job lead.</Body>
      {jobLeads.map((lead) => (
        <JobLeadContainer key={lead.id}>
          <H3>Job Lead</H3>
          <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
            <InputLabel id="demo-simple-select-label">Employer Name</InputLabel>
            <Select
              sx={{ textAlign: "left" }}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={lead.employer}
              label="Employer Name"
              helperText="*Required"
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "employer")
              }
            >
              <MenuItem value="name 1">Name 1</MenuItem>
              <MenuItem value="name 2">Name 2</MenuItem>
              <MenuItem value="name 3">Name 3</MenuItem>
            </Select>
            <FormHelperText>*Required</FormHelperText>
          </FormControl>
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id="outlined-helperText"
            value={lead.title}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "title")
            }
            label="Job Title"
            helperText="*Required"
          />
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Compensation Minimum
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">/hour</InputAdornment>
              }
              label="Compensation Minimum"
              value={lead.minCompensation}
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "minCompensation")
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel htmlFor="outlined-adornment-amount">
              Compensation Maximum
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">/hour</InputAdornment>
              }
              label="Compensation Maximum"
              value={lead.maxCompensation}
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "maxCompensation")
              }
            />
          </FormControl>
          <TextField
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id="outlined-basic"
            label="Hours per week"
            variant="outlined"
            value={lead.hoursPerWeek}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "hoursPerWeek")
            }
          />
          <TextField
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id="outlined-basic"
            label="National Occupation Code"
            variant="outlined"
            value={lead.nationalOC}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "nationalOC")
            }
          />
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id="outlined-multiline-static"
            label="Job Description"
            multiline
            rows={4}
            value={lead.description}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "description")
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Creation Date"
              fullWidth
              sx={{ m: 1, width: "47%" }}
              value={lead.creationDate}
              onChange={(e) => handleInputChange(e, lead.id, "creationDate")}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Expiration Date"
              fullWidth
              sx={{ m: 1, width: "47%" }}
              value={lead.expirationDate}
              onChange={(e) => handleInputChange(e, lead.id, "expirationDate")}
            />
          </LocalizationProvider>
          <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
            <InputLabel id="demo-simple-select-label">
              Employment Type
            </InputLabel>
            <Select
              sx={{ textAlign: "left" }}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={lead.employmentType}
              label="Employment Type"
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "employmentType")
              }
            >
              <MenuItem value="full-time">Full Time</MenuItem>
              <MenuItem value="part-time">Part Time</MenuItem>
              <MenuItem value="contract">Contract</MenuItem>
              <MenuItem value="temporary">Temporary</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
            </Select>
            <FormHelperText>*Required</FormHelperText>
          </FormControl>
        </JobLeadContainer>
      ))}
      <ButtonL onClick={handleAddJobLead}>+ Add Another Job Lead</ButtonL>
      <ButtonContainer>
        <Button
          sx={{ justifySelf: "flex-end" }}
          variant="outlined"
          onClick={handleClickOpen}
        >
          DISCARD
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">ARE YOU SURE?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will lose all your progress and return to the Dashboard.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>CANCEL</Button>
            <Button onClick={handleClose} autoFocus>
              YES, I&apos;M SURE
            </Button>
          </DialogActions>
        </Dialog>
        <div style={{ display: "flex", gap: "16px" }}>
          <Button
            sx={{
              background: "var(--light-action-focus-12-p, rgba(0, 0, 0, 0.12))",
              color: "black",
              ":hover": {
                background:
                  "var(--light-action-focus-12-p, rgba(0, 0, 0, 0.379))",
              },
            }}
            variant="contained"
          >
            BACK
          </Button>
          <Button variant="contained">SUBMIT</Button>
        </div>
      </ButtonContainer>
    </Container>
  );
}

export default AddJobLead;
