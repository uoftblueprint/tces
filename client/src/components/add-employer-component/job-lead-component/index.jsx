import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {
  TextField,
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
  Stack,
  Pagination,
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
/* eslint-disable import/no-cycle */
import AddEmployerInfo from "../employer-contact-component";
import AddCompanyInfo from "../company-info-component";

function AddEmployerJobLead() {
  const [page, setPage] = React.useState(3);
  const [open, setOpen] = React.useState(false);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackButtonClick = () => {
    setPage(2);
  };

  // Initialize state from local storage or use default if not present
  const initialJobLeads = () =>
    JSON.parse(localStorage.getItem("employerJobLeads")) || [
      {
        id: 0,
        jobTitle: "",
        compensation: "",
        hoursPerWeek: "",
        description: "",
        creationDate: null,
        expirationDate: null,
        employmentType: "",
      },
    ];

  const [jobLeads, setJobLeads] = useState(initialJobLeads);

  useEffect(() => {
    // Save state to local storage whenever it changes
    localStorage.setItem("employerJobLeads", JSON.stringify(jobLeads));
  }, [jobLeads]);

  const handleAddJobLead = () => {
    const newId = jobLeads.length + 1;
    setJobLeads((prevJobLeads) => [
      ...prevJobLeads,
      {
        id: newId,
        jobTitle: "",
        compensation: "",
        hoursPerWeek: "",
        description: "",
        creationDate: null,
        expirationDate: null,
        employmentType: "",
      },
    ]);
  };

  const handleInputChange = (input, id, field) => {
    const newJobLeads = [...jobLeads];
    const index = newJobLeads.findIndex((lead) => lead.id === id);
    if (index !== -1) {
      // Ensure that dates are converted to valid Date objects
      newJobLeads[index][field] = input;
      setJobLeads(newJobLeads);
    }
  };

  const handleResetInputs = () => {
    // Clear local storage
    localStorage.removeItem("employerJobLeads");

    // Reset the inputs to initial values
    setJobLeads(initialJobLeads());
  };

  return (
    <>
      {page === 1 && <AddCompanyInfo />}
      {page === 2 && <AddEmployerInfo />}
      {page === 3 && (
        <Container>
          <H1>Adding a new Employer</H1>
          <Body>
            Input information about any job leads associated with the employer.
          </Body>
          {jobLeads.map((lead) => (
            <JobLeadContainer key={lead.id}>
              <H3>Job Lead</H3>
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="jobTitle"
                value={lead.jobTitle}
                onChange={(input) =>
                  handleInputChange(input.target.value, lead.id, "jobTitle")
                }
                label="Job Title"
              />
              <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
                <InputLabel htmlFor="compensation">Compensation</InputLabel>
                <OutlinedInput
                  id="compensation"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">/hour</InputAdornment>
                  }
                  label="Compensation"
                  value={lead.compensation}
                  onChange={(input) =>
                    handleInputChange(
                      input.target.value,
                      lead.id,
                      "compensation",
                    )
                  }
                />
              </FormControl>
              <TextField
                fullWidth
                sx={{ m: 1, width: "47%" }}
                id="hoursPerWeek"
                label="Hours per week"
                variant="outlined"
                value={lead.hoursPerWeek}
                onChange={(input) =>
                  handleInputChange(input.target.value, lead.id, "hoursPerWeek")
                }
              />
              <TextField
                fullWidth
                sx={{ m: 1, width: "96%" }}
                id="description"
                label="Job Description"
                multiline
                rows={4}
                value={lead.description}
                helperText="*Required"
                onChange={(input) =>
                  handleInputChange(input.target.value, lead.id, "description")
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="creationDate"
                  label="Creation Date"
                  fullWidth
                  sx={{ m: 1, width: "47%" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: false,
                      required: true,
                    },
                  }}
                  value={dayjs(lead.creationDate)}
                  helperText="*Required"
                  onChange={(date) =>
                    handleInputChange(date, lead.id, "creationDate")
                  }
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  id="expirationDate"
                  label="Expiration Date"
                  fullWidth
                  sx={{ m: 1, width: "47%" }}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: false,
                    },
                  }}
                  value={dayjs(lead.expirationDate)}
                  helperText="*Required"
                  onChange={(date) =>
                    handleInputChange(date, lead.id, "expirationDate")
                  }
                />
              </LocalizationProvider>
              <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
                <InputLabel id="demo-simple-select-label">
                  Employment Type
                </InputLabel>
                <Select
                  sx={{ textAlign: "left" }}
                  id="employmentType"
                  value={lead.employmentType}
                  label="Employment Type"
                  onChange={(date) =>
                    handleInputChange(date, lead.id, "employmentType")
                  }
                >
                  <MenuItem value="full-time">Full Time</MenuItem>
                  <MenuItem value="part-time">Part Time</MenuItem>
                  <MenuItem value="casual">Casual</MenuItem>
                  <MenuItem value="on-call">On-Call</MenuItem>
                </Select>
              </FormControl>
            </JobLeadContainer>
          ))}
          <ButtonL onClick={handleAddJobLead}>+ Add Another Job Lead</ButtonL>
          <Stack spacing={2}>
            <Pagination
              count={3}
              shape="rounded"
              hidePrevButton
              hideNextButton
              onChange={(event, value) => handlePageChange(event, value)}
              page={page}
              sx={{
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#3568E5",
                  color: "white",
                },
              }}
            />
          </Stack>
          <ButtonContainer>
            <Button
              sx={{ justifySelf: "flex-end" }}
              variant="outlined"
              onClick={handleClickOpen}
            >
              DISCARD
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>ARE YOU SURE?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  You will lose all your progress and return to the Dashboard.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>CANCEL</Button>
                <Button
                  onClick={() => {
                    handleClose();
                    handleResetInputs();
                  }}
                  autoFocus
                >
                  YES, I&apos;M SURE
                </Button>
              </DialogActions>
            </Dialog>
            <div style={{ display: "flex", gap: "16px" }}>
              <Button
                sx={{
                  background:
                    "var(--light-action-focus-12-p, rgba(0, 0, 0, 0.12))",
                  color: "black",
                  ":hover": {
                    background:
                      "var(--light-action-focus-12-p, rgba(0, 0, 0, 0.379))",
                  },
                }}
                variant="contained"
                onClick={handleBackButtonClick}
              >
                BACK
              </Button>
              <Button variant="contained">SUBMIT</Button>
            </div>
          </ButtonContainer>
        </Container>
      )}
    </>
  );
}

export default AddEmployerJobLead;
