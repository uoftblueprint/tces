import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { UploadFile,ArrowBack} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { JobLeadContainer } from "../index.styles";
import EditJobPostingFormComponent from "./editJobPostForm";

function JobDetails({ setJobPostData,setSnackBarMessage}) {
  const location = useLocation();
  const navigate = useNavigate();
  
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
  }, [jobPostData, setJobPostData,setLocalJobPostData]);



  return (
    <JobLeadContainer maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton onClick={() => navigate("/job-postings")}>
          <ArrowBack/>
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
          
          <EditJobPostingFormComponent jobLead={jobPostData} setSnackBarMessage={setSnackBarMessage}
          />
        </Grid>

        {/* Application Form Section */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Apply for this Position
            </Typography>
            <TextField fullWidth label="Name" required sx={{ mb: 2 }} disabled />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField fullWidth label="Phone" required sx={{ mb: 2 }} disabled />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Postal Code" required sx={{ mb: 2 }} disabled />
              </Grid>
            </Grid>
            <TextField fullWidth label="Email address" required sx={{ mb: 2 }} disabled />
            <Select fullWidth defaultValue="" displayEmpty sx={{ mb: 2 }} disabled>
              <MenuItem value="">Status in Canada</MenuItem>
              <MenuItem value="Citizen">Citizen</MenuItem>
              <MenuItem value="Permanent Resident">Permanent Resident</MenuItem>
              <MenuItem value="Work Permit">Work Permit</MenuItem>
            </Select>
            {/* Upload Resume */}
            <Paper
              sx={{
                border: "2px dashed #B0BEC5",
                textAlign: "center",
                p: 3,
                backgroundColor: "#ECEFF1",
                mb: 2,
                borderRadius: 2,
              }}
            >
              <UploadFile sx={{ fontSize: 40, color: "#607D8B" }} />
              <Typography variant="body2" sx={{ fontWeight: "medium" }}>Click to upload a file</Typography>
              <Typography variant="caption">PDF file only</Typography>
            </Paper>
            <Button variant="contained" color="primary" fullWidth disabled>
              SUBMIT
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </JobLeadContainer>
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
