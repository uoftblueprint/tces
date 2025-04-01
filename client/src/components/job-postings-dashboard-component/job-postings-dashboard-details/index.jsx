import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  Box,
  Container,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { JobPostContainer } from "../index.styles";
import EditJobPostingFormComponent from "./editJobPostForm";

function JobDetails({ setJobPostData, setSnackBarMessage }) {
  const location = useLocation();
  const navigate = useNavigate();

  const editMode = location.state?.editMode || false;
  const [isEditMode, setIsEditMode] = useState(editMode);

  const initialJobData = location.state?.jobPostData || {
    title: "",
    employer: "",
    location: "",
    compensation_min: "",
    compensation_max: "",
    job_type: "",
    hours_per_week: "",
    close_date: "",
    job_description: "",
    job_id: "",
  };

  const [jobPostData, setLocalJobPostData] = useState(initialJobData);

  useEffect(() => {
    setJobPostData(jobPostData);
  }, [jobPostData, setJobPostData, setLocalJobPostData]);

  return (
    <JobPostContainer maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => navigate("/all-job-postings")}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ ml: 5 }}>
          <Typography variant="h4" fontWeight="bold" display="inline">
            {jobPostData.title || "Job Title"}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {jobPostData.employer || "Employer Name"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Job ID #{jobPostData.id || "N/A"}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Job Details Section */}
        <Grid item xs={12} md={7}>
          <EditJobPostingFormComponent
            jobPost={jobPostData}
            setJobPost={setLocalJobPostData}
            setSnackBarMessage={setSnackBarMessage}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
        </Grid>

        {/* Application Form Section */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography
              color="#9E9E9E"
              gutterBottom
              sx={{ fontSize: "1.6rem", fontWeight: "normal", pb: 2 }}
            >
              Apply for this Position
            </Typography>
            <TextField
              fullWidth
              label="Name"
              required
              helperText="*Required"
              sx={{ mb: 2 }}
              disabled
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  required
                  sx={{ mb: 2 }}
                  helperText="*Required"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  required
                  sx={{ mb: 2 }}
                  helperText="*Required"
                  disabled
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Email address"
              required
              sx={{ mb: 2 }}
              helperText="*Required"
              disabled
            />
            <FormControl fullWidth disabled>
              <Select defaultValue="" displayEmpty>
                <MenuItem value="">Status in Canada</MenuItem>
                <MenuItem value="Citizen">Citizen</MenuItem>
                <MenuItem value="Permanent Resident">
                  Permanent Resident
                </MenuItem>
                <MenuItem value="Work Permit">Work Permit</MenuItem>
              </Select>
              <FormHelperText>*Required</FormHelperText>
            </FormControl>
            {/* Upload Resume */}
            <Box sx={{ margin: "8px", width: "96%" }}>
              <Typography color="#9E9E9E" pb="13px" pt="1.2rem">
                *Upload Resume
              </Typography>
              <Container
                maxWidth={false}
                sx={{
                  border: "1px dashed #E0E0E0",
                  borderRadius: "15px",
                  color: "#AAAFBA",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "30px 0",
                }}
              >
                <Container sx={{ width: "auto" }}>
                  <IconButton sx={{ backgroundColor: "#E6ECFB" }}>
                    <UploadFileIcon />
                  </IconButton>
                </Container>
                <Typography variant="body1" pb="10px" pt="10px">
                  <span>Click to upload</span>
                  &nbsp;or drag and drop
                </Typography>
                <Typography variant="body2">PDF file only</Typography>
              </Container>
            </Box>
            <Box sx={{ mt: 1.5, display: "flex", justifyContent: "right" }}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ width: "90px" }}
                disabled
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </JobPostContainer>
  );
}

JobDetails.propTypes = {
  setJobPostData: PropTypes.func,
  setSnackBarMessage: PropTypes.func,
};

JobDetails.defaultProps = {
  setJobPostData: () => {},
  setSnackBarMessage: () => {},
};

export default JobDetails;
