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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { HeaderContainer } from "../index.styles";
import JobLeadType from "../../../prop-types/JobLeadType";
import EmployerType from "../../../prop-types/EmployerType";

function EditJobLeadFormComponent({ jobLead, employers, getEmployerById }) {
  const employer = getEmployerById(jobLead.employerID);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [jobTitle, setJobTitle] = React.useState(jobLead.jobTitle || "");
  const [employerSelect, setEmployerSelect] = React.useState(
    employer.employerID || "",
  );
  const [compensation, setCompensation] = React.useState(
    jobLead.compensation || "",
  );
  const [employmentType, setEmploymentType] = React.useState(
    jobLead.employmentType || "",
  );
  const [hoursPerWeek, setHoursPerWeek] = React.useState(
    jobLead.hoursPerWeek || "",
  );
  const [noc, setNoc] = React.useState(jobLead.noc || "");
  const [expirationDate, setExpirationDate] = React.useState(
    dayjs(jobLead.expirationDate) || null,
  );
  const [numberOfPositions, setNumberOfPositions] = React.useState(
    jobLead.numberOfPositions || "",
  );
  const [jobDescription, setJobDescription] = React.useState(
    jobLead.jobDescription || "",
  );

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: "66%",
          borderRadius: 2,
          boxShadow: 3,
          ml: 4,
          border: "1px solid #e0e0e0",
        }}
      >
        <HeaderContainer>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Information
          </Typography>
          <IconButton onClick={toggleEditMode} size="small">
            <EditIcon />
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
              <TextField
                variant="outlined"
                fullWidth
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                disabled={!isEditMode}
              />
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
              <FormControl fullWidth>
                <Select
                  value={employerSelect}
                  disabled={!isEditMode}
                  displayEmpty
                  onChange={(event) => setEmployerSelect(event.target.value)}
                >
                  {employers.map((emp) => (
                    <MenuItem key={emp.employerID} value={emp.employerID}>
                      {emp.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                Compensation
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                variant="outlined"
                fullWidth
                value={compensation}
                disabled={!isEditMode}
                onChange={(event) => setCompensation(event.target.value)}
              />
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography sx={{ ml: 2 }} variant="subtitle1" align="left">
                Job Type
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth>
                <Select
                  value={employmentType}
                  disabled={!isEditMode}
                  displayEmpty
                  onChange={(event) => setEmploymentType(event.target.value)}
                >
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Casual">Casual</MenuItem>
                  <MenuItem value="On Call">On Call</MenuItem>
                </Select>
              </FormControl>
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
              <TextField
                variant="outlined"
                fullWidth
                value={hoursPerWeek}
                disabled={!isEditMode}
                onChange={(event) => setHoursPerWeek(event.target.value)}
              />
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
              <TextField
                variant="outlined"
                fullWidth
                value={noc}
                disabled={!isEditMode}
                onChange={(event) => setNoc(event.target.value)}
              />
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
              <DatePicker
                label="Date"
                slotProps={{ textField: { fullWidth: true } }}
                value={expirationDate}
                onChange={(newValue) => setExpirationDate(newValue)}
                renderInput={(params) => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <TextField {...params} fullWidth disabled={!isEditMode} />
                )}
              />
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
              <TextField
                variant="outlined"
                fullWidth
                value={numberOfPositions}
                onChange={(e) => setNumberOfPositions(e.target.value)}
                disabled={!isEditMode}
              />
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
              <TextareaAutosize
                minRows={3}
                placeholder="Job Description"
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
              />
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
                  >
                    Save Changes
                  </Button>
                )}
              </Grid>
            </Grid>
          )}
        </Stack>
      </Box>
    </LocalizationProvider>
  );
}

EditJobLeadFormComponent.propTypes = {
  jobLead: JobLeadType.isRequired,
  getEmployerById: PropTypes.func.isRequired,
  employers: PropTypes.arrayOf(EmployerType).isRequired,
  // eslint-disable-next-line
};

export default EditJobLeadFormComponent;
