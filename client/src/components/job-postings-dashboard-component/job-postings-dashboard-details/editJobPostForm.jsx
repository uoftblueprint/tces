// eslint-disable-next-line no-unused-vars
import * as React from "react";
import "./editJobPostForm.css"
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
  IconButton,
  Grid,
  InputAdornment,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useState } from "react";
import { HeaderContainer } from "../index.styles";
import JobLeadType from "../../../prop-types/JobLeadType";
import { formatLongDate } from "../../../utils/date";
import ErrorScreenComponent from "../../shared/error-screen-component";
import { modifyJobPost } from "../../../utils/job_posts_api";
import ConfirmDialog from "../../shared/confirm-dialog-component";
import {
  JOB_TYPES_FOR_JOB_POSTS,
  MAX_JOB_DESCRIPTION_LENGTH,
} from "../../../utils/constants";
import FormSubmissionErrorDialog from "../../shared/form-submission-error-dialog";

function EditJobPostingFormComponent({
  jobPost,
  setJobPost,
  setSnackBarMessage,
  isEditMode,
  setIsEditMode,
}) {
  const [confirmEditDialog, setConfirmEditDialog] = useState(false);
  const [formSubmissionErrorDialog, setFormSubmissionErrorDialog] =
    useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorObj, setErrorObj] = React.useState(null);
  const [shouldSubmit, setShouldSubmit] = React.useState(false);
  const [title, setJobTitle] = React.useState(jobPost.title || "");
  const [employer, setEmployer] = React.useState(jobPost.employer || "");
  const [location, setLocation] = React.useState(jobPost.location || "");
  const [minCompensation, setMinCompensation] = React.useState(
    jobPost.rate_of_pay_max !== undefined &&
      jobPost.rate_of_pay_min !== null &&
      !Number.isNaN(jobPost.rate_of_pay_min)
      ? jobPost.rate_of_pay_min
      : NaN,
  );
  const [maxCompensation, setMaxCompensation] = React.useState(
    jobPost.rate_of_pay_max !== undefined &&
      jobPost.rate_of_pay_max !== null &&
      !Number.isNaN(jobPost.rate_of_pay_max)
      ? jobPost.rate_of_pay_max
      : NaN,
  );

  const [employmentType, setEmploymentType] = React.useState(
    jobPost.job_type || NaN,
  );
  const [hoursPerWeek, setHoursPerWeek] = React.useState(
    jobPost.hours_per_week !== undefined && jobPost.hours_per_week !== null
      ? jobPost.hours_per_week
      : NaN,
  );
  const [expirationDate, setExpirationDate] = React.useState(
    dayjs(jobPost.close_date) || null,
  );
  const [jobDescription, setJobDescription] = React.useState(
    jobPost.job_description || "",
  );
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const handleMinCompensationChange = (event) => {
    const value = event.target.value ? Number(event.target.value) : null;

    setMinCompensation(value);
  };

  const handleMaxCompensationChange = (event) => {
    const value = event.target.value ? Number(event.target.value) : null;

    setMaxCompensation(value);
  };

  const formatSalaryRange = (min, max, rateOfPayFrequency) => {
    // Convert to numbers
    const minNum = Number(min);
    const maxNum = Number(max);

    switch (rateOfPayFrequency) {
      case "Annually": {
        const formattedMin = `${Math.floor(minNum / 1000)}K`;
        const formattedMax = `${Math.floor(maxNum / 1000)}K`;

        return `$${formattedMin} - $${formattedMax}/year`;
      } case "Hourly": {
        return `$${minNum} - $${maxNum}/hour`
      } case "Weekly": {
        return `$${minNum} - $${maxNum}/week`
      }
      default:
        return `$${minNum} - $${maxNum} ${rateOfPayFrequency}`;
    }
  };

  const renderViewValue = (
    typeValue,
    value,
    prefix = "",
    postfix = "",
    forceError = false,
  ) => {
    if (value !== undefined && value !== null && !forceError) {
      console.log(typeValue, value)
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

  const commitEdit = (e) => {
    e.preventDefault();
    setConfirmEditDialog(true);
  };

  const cancelEdit = () => {
    setConfirmEditDialog(false);
  };

  const returnToForm = () => {
    setFormSubmissionErrorDialog(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const modifiedJobPost = {
      title,
      employer,
      location,
      rate_of_pay_min: minCompensation,
      rate_of_pay_max: maxCompensation,
      job_type: employmentType,
      hours_per_week: hoursPerWeek,
      close_date: expirationDate?.toISOString(),
      job_description: jobDescription,
      jobPostID: jobPost.id,
    };

    try {
      const response = await modifyJobPost(modifiedJobPost);
      if (response.ok) {
        setSnackBarMessage("Job posting updated successfully.");
        setIsEditMode(false);
        setJobPost(modifiedJobPost);
      } else {
        setFormSubmissionErrorDialog(true);
        setSnackBarMessage("Failed to update job posting.");
      }
    } catch (error) {
      setErrorObj(error);
      setSnackBarMessage("An error occurred.");
    } finally {
      setIsLoading(false);
      setConfirmEditDialog(false);
    }
  };

  if (errorObj) return <ErrorScreenComponent message={errorObj.message} />;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "90%",
          borderRadius: 2,
          boxShadow: 1,
          ml: 9,
          mb: 2,
          border: "0.5px solid #e0e0e0",
        }}
      >
        <form onSubmit={commitEdit}>
          <HeaderContainer>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Information
            </Typography>
            <IconButton
              type={shouldSubmit ? "submit" : "button"}
              size="small"
              onClick={() => {
                if (isEditMode) {
                  setShouldSubmit(true);
                } else {
                  toggleEditMode();
                  setShouldSubmit(false);
                }
              }}
            >
              <EditIcon sx={{ color: isEditMode ? "#3568E5" : "inherit" }} />
            </IconButton>
          </HeaderContainer>
          <Divider sx={{ m: 2, borderBottomWidth: 2.5 }} />
          <Stack spacing={1} sx={{ m: 2 }}>
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
                    value={title}
                    onChange={(event) => setJobTitle(event.target.value)}
                    disabled={!isEditMode}
                    error={!title}
                    required
                  />
                ) : (
                  renderViewValue("Title", title)
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
                {isEditMode ? (
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={employer}
                    onChange={(event) => setEmployer(event.target.value)}
                    disabled={!isEditMode}
                    error={!employer}
                    required
                  />
                ) : (
                  renderViewValue("Employer", employer)
                )}
              </Grid>
            </Grid>
            <Divider sx={{ my: 4 }} />
            <Grid container alignItems="center">
              <Grid item xs={3}>
                <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                  Location
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEditMode ? (
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    disabled={!isEditMode}
                    error={!location}
                    required
                  />
                ) : (
                  renderViewValue("Location", location)
                )}
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
                  <Grid item sx={{ width: "36%", marginRight: 1 }}>
                    <FormControl fullWidth>
                      <InputLabel id={`minCompensationLabel-${jobPost.id}`}>
                        Minimum Compensation
                      </InputLabel>
                      <OutlinedInput
                        id={`minCompensation-${jobPost.id}`}
                        type="number"
                        fullWidth
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">/hour</InputAdornment>
                        }
                        label="Compensation Minimum"
                        value={minCompensation}
                        onChange={handleMinCompensationChange}
                        error={Number.isNaN(minCompensation)}
                        inputProps={{
                          min: 0,
                          max: maxCompensation,
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item sx={{ width: "1%" }}/>
                  <Grid item sx={{ width: "36%" }}>
                    <FormControl fullWidth>
                      <InputLabel id={`minCompensationLabel-${jobPost.id}`}>
                        Maximum Compensation
                      </InputLabel>
                      <OutlinedInput
                        id={`maxCompensation-${jobPost.id}`}
                        type="number"
                        fullWidth
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">/hour</InputAdornment>
                        }
                        label="Compensation Maximum"
                        value={maxCompensation}
                        onChange={handleMaxCompensationChange}
                        error={Number.isNaN(minCompensation)}
                        inputProps={{
                          min: minCompensation,
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                </>
              ) : (
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <>
                  {minCompensation !== undefined &&
                  maxCompensation !== undefined ? (
                    <Grid item xs={8} md={7}>
                      <Typography>
                        {formatSalaryRange(
                          minCompensation,
                          maxCompensation,
                          jobPost.rate_of_pay_frequency,
                        )}
                      </Typography>
                    </Grid>
                  ) : (
                    renderViewValue("Compensation", null)
                  )}
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
                      error={!employmentType}
                      required
                    >
                      {JOB_TYPES_FOR_JOB_POSTS.map((jobType) => (
                        <MenuItem key={jobType} value={jobType}>
                          {jobType}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  renderViewValue("Job Type", employmentType.join(", "))
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
                    id={`hoursPerWeek-${jobPost.id}`}
                    type="number"
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">hours</InputAdornment>
                    }
                    value={hoursPerWeek}
                    onChange={(event) => {
                      if (/^\d*\.?\d*$/.test(event.target.value)) {
                        setHoursPerWeek(Number(event.target.value));
                      }
                    }}
                    error={!hoursPerWeek}
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
                  Close Date
                </Typography>
              </Grid>
              <Grid item xs={9}>
                {isEditMode ? (
                  <DatePicker
                    // label="Date"
                    slotProps={{ textField: { fullWidth: true } }}
                    value={expirationDate}
                    onChange={(newValue) => setExpirationDate(newValue)}
                    minDate={dayjs()}
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
                    formatLongDate(expirationDate),
                  )
                )}
              </Grid>
            </Grid>
            <Divider sx={{ my: 2, borderBottomWidth: 2.5, pb: 2 }} />
            <Typography variant="h5" sx={{ flexGrow: 1, pt: 2 }}>
              Description
            </Typography>
            <Divider sx={{ my: 2, borderBottomWidth: 2.5 }} />

            {isEditMode ? (
              <TextField
                multiline
                minRows={3}
                value={jobDescription}
                disabled={!isEditMode}
                style={{
                  width: "100%",
                  fontSize: "1rem",
                  marginTop: "8px",
                  marginBottom: "8px",
                  borderRadius: "4px",
                  borderColor: "#ced4da",
                }}
                onChange={(event) => setJobDescription(event.target.value)}
              />
            ) : (
              <>
                {/* Conditionally render the truncated or full job description */}
                <Typography
                  variant="body1"
                  sx={{
                    maxHeight: isDescriptionExpanded ? "none" : "80px", // Control height based on expansion state
                    overflow: isDescriptionExpanded ? "auto" : "hidden", // Allow scrolling when expanded
                    transition: "max-height 0.3s ease", // Smooth transition for height change
                  }}
                >
                  {jobDescription.length > MAX_JOB_DESCRIPTION_LENGTH &&
                  !isDescriptionExpanded
                    ? `${jobDescription.slice(
                        0,
                        MAX_JOB_DESCRIPTION_LENGTH,
                      )}...`
                    : jobDescription}
                </Typography>

                {/* Display the Read More or Read Less link based on the expansion state */}
                {jobDescription.length > MAX_JOB_DESCRIPTION_LENGTH && (
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{
                      cursor: "pointer",
                      marginTop: 1,
                      fontWeight: 500,
                      color: "#3568E5",
                      fontSize: "0.95rem",
                    }}
                    onClick={handleToggleExpand}
                  >
                    {isDescriptionExpanded ? "READ LESS" : "READ MORE"}
                  </Typography>
                )}
              </>
            )}
            {isEditMode && (
              <Grid container justifyContent="flex-end">
                <Grid item>
                  {isEditMode && (
                    <Button
                      type="submit"
                      variant="text"
                      color="primary"
                      size="small"
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
      <ConfirmDialog
        open={confirmEditDialog}
        title="Confirm Edit"
        message="Are you sure you want to save these changes?"
        onConfirm={handleSubmit}
        onCancel={cancelEdit}
      />
      <FormSubmissionErrorDialog
        open={formSubmissionErrorDialog}
        onBack={returnToForm}
      />
    </LocalizationProvider>
  );
}

EditJobPostingFormComponent.propTypes = {
  jobPost: JobLeadType.isRequired,
  setJobPost: PropTypes.func.isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default EditJobPostingFormComponent;
