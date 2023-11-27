import { useState } from "react";
import PropTypes from "prop-types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

function AddEmployerJobLead({
  onPageChange,
  employerData,
  setEmployerData,
  resetInitialState,
}) {
  AddEmployerJobLead.propTypes = {
    onPageChange: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    employerData: PropTypes.array.isRequired,
    setEmployerData: PropTypes.func.isRequired,
    resetInitialState: PropTypes.func.isRequired,
  };
  const [open, setOpen] = useState(false);

  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackButtonClick = () => {
    onPageChange(2);
  };

  const handleAddJobLead = () => {
    const newId = employerData.length;
    setEmployerData([
      ...employerData,
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
    const updatedJobLeads = employerData.map((lead) =>
      lead.id === id ? { ...lead, [field]: input } : lead,
    );
    setEmployerData(updatedJobLeads);
  };

  const handleResetInputs = () => {
    resetInitialState();
  };

  return (
    <Container>
      <H1>Adding a new Employer</H1>
      <Body>
        Input information about any job leads associated with the employer.
      </Body>
      {employerData.map((lead) => (
        <JobLeadContainer key={lead.id}>
          <H3>Job Lead</H3>
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id={`jobTitle${lead.id}`}
            value={lead.jobTitle}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "jobTitle")
            }
            label="Job Title"
          />
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel id="compendationLabel">Compensation</InputLabel>
            <OutlinedInput
              id={`compensation${lead.id}`}
              type="number"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">/hour</InputAdornment>
              }
              label="Compensation"
              value={lead.compensation}
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "compensation")
              }
            />
          </FormControl>
          <TextField
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id={`hoursPerWeek${lead.id}`}
            type="number"
            label="Hours per week"
            variant="outlined"
            value={lead.hoursPerWeek}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "hoursPerWeek")
            }
          />
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id={`description${lead.id}`}
            label="Job Description"
            multiline
            rows={4}
            value={lead.description}
            helperText="*Required"
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "description")
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id={`creationDate${lead.id}`}
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
              value={lead.creationDate}
              helperText="*Required"
              onChange={(e) => handleInputChange(e, lead.id, "creationDate")}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id={`expirationDate${lead.id}`}
              label="Expiration Date"
              fullWidth
              sx={{ m: 1, width: "47%" }}
              slotProps={{
                textField: {
                  size: "small",
                  error: false,
                },
              }}
              value={lead.expirationDate}
              helperText="*Required"
              onChange={(e) => handleInputChange(e, lead.id, "expirationDate")}
            />
          </LocalizationProvider>
          <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
            <InputLabel id="employmentTypeLabel">Employment Type</InputLabel>
            <Select
              sx={{ textAlign: "left" }}
              labelId="employmentTypeLabel"
              label="Employment Type"
              id={`employmentType${lead.id}`}
              value={lead.employmentType}
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "employmentType")
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
          page={3}
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
              background: "var(--light-action-focus-12-p, rgba(0, 0, 0, 0.12))",
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
  );
}

export default AddEmployerJobLead;
