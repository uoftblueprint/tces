/* eslint-disable no-nested-ternary */
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Grid,
  FormHelperText,
  LinearProgress,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { DropzoneArea } from "material-ui-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

function JobPostingPage() {
  const jobPosting = {
    title: "Software Engineer",
    employer: "Tech Corp",
    location: "Toronto, ON",
    compensation: { min: 70000, max: 120000, frequency: "yearly" },
    jobType: "Full-time",
    hoursPerWeek: 40,
    closeDate: "2025-01-31",
    description:
      "We are looking for a skilled Software Engineer to join our team.",
  };

  const statusOptions = [
    { value: "citizen", label: "Citizen" },
    { value: "permanent_resident", label: "Permanent Resident" },
    { value: "temporary_work_permit", label: "Temporary Work Permit" },
    { value: "other", label: "Other" },
  ];

  const onSubmit = (application) => {
    console.log("Application submitted:", application);
    alert("Application submitted! Check the console for details.");
  };

  const [application, setApplication] = useState({
    name: "",
    phone: "",
    postalCode: "",
    emailAddress: "",
    statusInCanada: "",
    otherStatus: "",
    coverLetter: "",
  });

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileError, setFileError] = useState("");
  const [dropzoneKey, setDropzoneKey] = useState(0);

  const handleFileChange = (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    const maxSize = 5000000; // 5 MB
    const selectedFile = selectedFiles[0];

    if (selectedFile.size > maxSize) {
      setFileError("Upload failed: file too big");
      setFile(null);
      setUploadProgress(0);
      return;
    }

    setFileError("");
    setFile(selectedFile);
    setUploadProgress(0);

    const uploadFile = async (fileToUpload) => {
      const formData = new FormData();
      formData.append("file", fileToUpload);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Server error");
        }

        console.log("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file", error.message);
        setFileError("Upload failed: network error");
      }
    };

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const progress = prev + 10;
        if (progress >= 100) {
          clearInterval(interval);
          uploadFile(selectedFile);
        }
        return Math.min(progress, 100);
      });
    }, 500);
  };

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1048576).toFixed(1)} MB`;
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setFileError("");
    setDropzoneKey((prevKey) => prevKey + 1);
  };

  const handleInputChange = (field) => (event) => {
    setApplication((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleStatusChange = (event) => {
    setApplication((prev) => ({
      ...prev,
      statusInCanada: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(application);
  };

  const formatSalaryRange = (min, max) => {
    return `$${min.toLocaleString()}/year - $${max.toLocaleString()}/year`;
  };

  return (
    <StyledContainer maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <StyledPaper elevation={2}>
            <Typography variant="h5" gutterBottom>
              Information
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { label: "Title", value: jobPosting.title },
                { label: "Employer", value: jobPosting.employer },
                { label: "Location", value: jobPosting.location },
                {
                  label: "Compensation",
                  value: formatSalaryRange(
                    jobPosting.compensation.min,
                    jobPosting.compensation.max,
                  ),
                },
                { label: "Job Type", value: jobPosting.jobType },
                { label: "Hours per Week", value: jobPosting.hoursPerWeek },
                { label: "Close Date", value: jobPosting.closeDate },
              ].map((item) => (
                <Typography key={item.label} variant="subtitle1">
                  <strong>{item.label}:</strong> {item.value}
                </Typography>
              ))}
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                <strong>Description:</strong>
                <Box sx={{ mt: 1 }}>{jobPosting.description}</Box>
              </Typography>
            </Box>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={7}>
          <StyledPaper elevation={2}>
            <Typography variant="h5" gutterBottom>
              Apply for this Position
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                label="Name"
                value={application.name}
                onChange={handleInputChange("name")}
                margin="normal"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Phone"
                    value={application.phone}
                    onChange={handleInputChange("phone")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Postal Code"
                    value={application.postalCode}
                    onChange={handleInputChange("postalCode")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                required
                label="Email Address"
                type="email"
                value={application.emailAddress}
                onChange={handleInputChange("emailAddress")}
                margin="normal"
              />
              <Grid container spacing={2}>
                <Grid item xs={application.statusInCanada === "other" ? 6 : 12}>
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel>Status in Canada</InputLabel>
                    <Select
                      value={application.statusInCanada}
                      onChange={handleStatusChange}
                      label="Status in Canada"
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                </Grid>
                {application.statusInCanada === "other" && (
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      required
                      label="Other: Please specify"
                      value={application.otherStatus}
                      onChange={handleInputChange("otherStatus")}
                      margin="normal"
                    />
                  </Grid>
                )}
              </Grid>
              <Box
                sx={{
                  maxWidth: 500,
                  margin: "auto",
                  mt: 4,
                  p: 2,
                  border: "1px dashed #ccc",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <DropzoneArea
                  key={dropzoneKey}
                  acceptedFiles={["application/pdf"]}
                  maxFileSize={5000000}
                  onChange={handleFileChange}
                  dropzoneText={
                    <Box textAlign="center">
                      <FileUploadIcon color="primary" fontSize="large" />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="primary"
                      >
                        Click to upload
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        PDF file only
                      </Typography>
                    </Box>
                  }
                  filesLimit={1}
                  showAlerts={false}
                />
                {file && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                      p: 1,
                      border: "1px solid #e0e0e0",
                      borderRadius: 1,
                      backgroundColor: fileError ? "#ffebee" : "#f5f5f5",
                    }}
                  >
                    <Box sx={{ mr: 2 }}>
                      {fileError ? (
                        <ErrorIcon color="error" />
                      ) : uploadProgress === 100 ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <FileUploadIcon color="primary" />
                      )}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {file.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {formatFileSize(file.size)} •{" "}
                        {fileError ||
                          (uploadProgress === 100
                            ? "Complete"
                            : "Uploading...")}
                      </Typography>
                      {!fileError && (
                        <LinearProgress
                          variant="determinate"
                          value={uploadProgress || 0}
                          sx={{ mt: 1 }}
                        />
                      )}
                    </Box>
                    <IconButton onClick={handleRemoveFile}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Box sx={{ mt: 3, textAlign: "right" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Submit Application
                </Button>
              </Box>
            </form>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
}

export default JobPostingPage;
