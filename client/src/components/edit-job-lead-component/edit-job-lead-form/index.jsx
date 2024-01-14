// eslint-disable-next-line no-unused-vars
import * as React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextareaAutosize,
  IconButton,
  Grid,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  Snackbar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopy from "@mui/icons-material/ContentCopy";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { HeaderContainer } from "../index.styles";
import JobLeadType from "../../../prop-types/JobLeadType";
import { displayCompensationRange } from "../../../utils/jobLeads";
import { formateDateObjToStr } from "../../../utils/date";
import ErrorScreenComponent from "../../shared/error-screen-component";
import { modifyJobLead } from "../../../utils/api";

function EditJobLeadFormComponent({ jobLead, getEmployerById }) {
  const employer = getEmployerById(jobLead.employerID);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorObj, setErrorObj] = React.useState(null);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [jobTitle, setJobTitle] = React.useState(jobLead.jobTitle || "");
  const [minCompensation, setMinCompensation] = React.useState(
    jobLead.compensationMin || NaN,
  );
  const [maxCompensation, setMaxCompensation] = React.useState(
    jobLead.compensationMax || NaN,
  );
  const [employmentType, setEmploymentType] = React.useState(
    jobLead.employmentType || NaN,
  );
  const [hoursPerWeek, setHoursPerWeek] = React.useState(
    jobLead.hoursPerWeek || NaN,
  );
  const [noc, setNoc] = React.useState(jobLead.noc || "");
  const [expirationDate, setExpirationDate] = React.useState(
    dayjs(jobLead.expirationDate) || null,
  );
  const [numberOfPositions, setNumberOfPositions] = React.useState(
    jobLead.numOfPostions || "",
  );
  const [jobDescription, setJobDescription] = React.useState(
    jobLead.jobDescription || "",
  );

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleMinCompensationChange = (event) => {
    let newValue = parseInt(event.target.value, 10);
    if (newValue) {
      if (newValue < 0) {
        newValue = 0;
      }

      setMinCompensation(newValue);
      if (maxCompensation !== "" && newValue > maxCompensation) {
        setMaxCompensation(newValue);
      }
    } else {
      setMinCompensation(null);
    }
  };

  const handleMaxCompensationChange = (event) => {
    let newValue = parseInt(event.target.value, 10);
    if (newValue) {
      if (newValue < 0) {
        newValue = 0;
      }
      setMaxCompensation(newValue);
      if (minCompensation && newValue < minCompensation) {
        setMinCompensation(NaN);
      }
    } else {
      setMaxCompensation(NaN);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const copyCompensationToClipboard = () => {
    const text = displayCompensationRange(
      minCompensation,
      maxCompensation,
      "/hour",
    );
    navigator.clipboard.writeText(text).then(
      () => {
        setSnackbarMessage("Copied to clipboard");
        setSnackbarOpen(true);
      },
      () => {
        setSnackbarMessage("Failed to copy");
        setSnackbarOpen(true);
      },
    );
  };

  const renderViewValue = (typeValue, value, prefix = "", postfix = "") => {
    if (value) {
      return (
        <Typography variant="body1" gutterBottom>
          {prefix}
          {value}
          {postfix}
        </Typography>
      );
    }
    return (
      <Typography sx={{ color: "#B71C1C" }}>Enter {typeValue}...*</Typography>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const modifiedJobLead = {
      jobTitle,
      minCompensation,
      maxCompensation,
      employmentType,
      hoursPerWeek,
      noc,
      expirationDate: expirationDate?.toISOString(),
      numberOfPositions,
      jobDescription,
      jobLeadID: jobLead.jobLeadID,
    };

    try {
      const response = await modifyJobLead(modifiedJobLead);

      if (response.ok) {
        setSnackbarMessage("Job lead updated successfully.");
        setIsEditMode(false);
      } else {
        setSnackbarMessage("Failed to update job lead.");
      }
    } catch (error) {
      setErrorObj(error);
      setSnackbarMessage("An error occurred.");
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

  if (errorObj) return <ErrorScreenComponent message={errorObj.message} />;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "66%",
          borderRadius: 2,
          boxShadow: 3,
          ml: 9,
          mb: 9,
          border: "1px solid #e0e0e0",
        }}
      >
        <form onSubmit={handleSubmit}>
          <HeaderContainer>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Information
            </Typography>
            <IconButton onClick={toggleEditMode} size="small">
              <EditIcon sx={{ color: isEditMode ? "#3568E5" : "inherit" }} />
            </IconButton>
          </HeaderContainer>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2} sx={{ m: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                  Title
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEditMode ? (
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={jobTitle}
                    onChange={(event) => setJobTitle(event.target.value)}
                    disabled={!isEditMode}
                    required
                  />
                ) : (
                  renderViewValue("Title", jobTitle)
                )}
              </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} />
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                  Employer
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Button
                  onClick={() => {}}
                  style={{
                    textDecoration: "underline",
                    color: "#3568E5",
                    textTransform: "none",
                    padding: 0,
                    textAlign: "left",
                    justifyContent: "flex-start",
                  }}
                  required
                >
                  <Typography>{employer.name}</Typography>
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                  Compensation
                </Typography>
              </Grid>

              {isEditMode ? (
                <>
                  <Grid item xs={4.5}>
                    <FormControl fullWidth>
                      <InputLabel
                        id={`minCompensationLabel-${jobLead.jobLeadID}`}
                      >
                        Maximum Compensation
                      </InputLabel>
                      <OutlinedInput
                        id={`maxCompensation-${jobLead.jobLeadID}`}
                        type="number"
                        fullWidth
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">/hours</InputAdornment>
                        }
                        label="Maximum Compensation"
                        value={maxCompensation}
                        onChange={handleMaxCompensationChange}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4.5}>
                    <FormControl fullWidth>
                      <InputLabel
                        id={`minCompensationLabel-${jobLead.jobLeadID}`}
                      >
                        Minimum Compensation
                      </InputLabel>
                      <OutlinedInput
                        id={`minCompensation-${jobLead.jobLeadID}`}
                        type="number"
                        fullWidth
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">/hours</InputAdornment>
                        }
                        label="Minimum Compensation"
                        value={minCompensation}
                        onChange={handleMinCompensationChange}
                        required
                      />
                    </FormControl>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={8} md={7}>
                    {minCompensation && maxCompensation ? (
                      <Typography>
                        {displayCompensationRange(
                          minCompensation,
                          maxCompensation,
                          "/hour",
                        )}
                      </Typography>
                    ) : (
                      renderViewValue("Compensation", null)
                    )}
                  </Grid>
                  <Grid item xs={1} md={2} sx={{ textAlign: "right" }}>
                    {minCompensation && maxCompensation && (
                      <IconButton onClick={copyCompensationToClipboard}>
                        <ContentCopy />
                      </IconButton>
                    )}
                  </Grid>
                </>
              )}
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                  Job Type
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEditMode ? (
                  <FormControl fullWidth>
                    <Select
                      value={employmentType}
                      disabled={!isEditMode}
                      displayEmpty
                      onChange={(event) =>
                        setEmploymentType(event.target.value)
                      }
                      required
                    >
                      <MenuItem value="Full Time">Full Time</MenuItem>
                      <MenuItem value="Part Time">Part Time</MenuItem>
                      <MenuItem value="Casual">Casual</MenuItem>
                      <MenuItem value="On-Call">On-Call</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  renderViewValue("Job Type", employmentType)
                )}
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                  Hours per week
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEditMode ? (
                  <OutlinedInput
                    id={`hoursPerWeek-${jobLead.jobLeadID}`}
                    type="number"
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">hours</InputAdornment>
                    }
                    value={hoursPerWeek}
                    onChange={(event) => {
                      const value = parseInt(event.target.value, 10);
                      if (!value || value >= 0) {
                        setHoursPerWeek(value);
                      }
                    }}
                    required
                  />
                ) : (
                  renderViewValue("Hours per week", hoursPerWeek, "", " hours")
                )}
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                  NOC
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEditMode ? (
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={noc}
                    disabled={!isEditMode}
                    onChange={(event) => setNoc(event.target.value)}
                    required
                  />
                ) : (
                  renderViewValue("NOC", noc)
                )}
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                  Expiration Date
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEditMode ? (
                  <DatePicker
                    label="Date"
                    slotProps={{ textField: { fullWidth: true } }}
                    value={expirationDate}
                    onChange={(newValue) => setExpirationDate(newValue)}
                    renderInput={(params) => (
                      <TextField
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...params}
                        fullWidth
                        disabled={!isEditMode}
                        required
                      />
                    )}
                    required
                  />
                ) : (
                  renderViewValue(
                    "Expiration Date",
                    formateDateObjToStr(expirationDate),
                  )
                )}
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                  # of Positions
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEditMode ? (
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={numberOfPositions}
                    onChange={(e) => setNumberOfPositions(e.target.value)}
                    disabled={!isEditMode}
                    required
                  />
                ) : (
                  renderViewValue("# of Positions", numberOfPositions)
                )}
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                  Job Description
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEditMode ? (
                  <TextareaAutosize
                    minRows={3}
                    value={jobDescription}
                    disabled={!isEditMode}
                    style={{
                      width: "calc(100% - 16px)",
                      fontSize: "1rem",
                      padding: "8px",
                      marginTop: "8px",
                      marginBottom: "8px",
                      borderRadius: "4px",
                      borderColor: "#ced4da",
                    }}
                    onChange={(event) => setJobDescription(event.target.value)}
                    required
                  />
                ) : (
                  renderViewValue("Job Description", jobDescription)
                )}
              </Grid>
            </Grid>

            {isEditMode && (
              <Grid container justifyContent="flex-end">
                <Grid item>
                  {isEditMode && (
                    <Button
                      type="submit"
                      variant="text"
                      color="primary"
                      size="small"
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  )}
                </Grid>
              </Grid>
            )}
          </Stack>
        </form>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </LocalizationProvider>
  );
}

EditJobLeadFormComponent.propTypes = {
  jobLead: JobLeadType.isRequired,
  getEmployerById: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default EditJobLeadFormComponent;
