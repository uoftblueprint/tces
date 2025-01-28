/* eslint-disable no-nested-ternary */
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import ReCAPTCHA from "react-google-recaptcha";
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

import { uploadJobApplication } from "../../utils/job_applications_api";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

// eslint-disable-next-line react/prop-types
function JobPostingPage({ jobPosting }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [application, setApplication] = useState({
    name: "",
    phone: "",
    postalCode: "",
    emailAddress: "",
    statusInCanada: "",
    otherStatus: "",
    // customResponses: [],
  });

  const statusOptions = [
    { value: "Citizen", label: "Citizen" },
    { value: "PR", label: "Permanent Resident" },
    { value: "Refugee", label: "Refugee" },
    { value: "Student Visa", label: "Student Visa" },
    { value: "Open Work", label: "Open Work" },
    { value: "Other", label: "Other" },
  ];

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileError, setFileError] = useState("");
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleFileChange = (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      return;
    }

    const maxSize = 5000000; // 5 MB
    const selectedFile = acceptedFiles[0];

    if (selectedFile.size > maxSize) {
      setFileError("Upload failed: file too big");
      setFile(null);
      setUploadProgress(0);
      return;
    }

    setFileError("");
    setFile(selectedFile);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const progress = prev + 10;
        if (progress >= 100) {
          clearInterval(interval);
          console.log("Simulated upload complete for file:", selectedFile.name);
        }
        return Math.min(progress, 100);
      });
    }, 500);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileChange,
    accept: { "application/pdf": [] },
    maxFiles: 1,
  });

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

  // const handleCustomResponseChange = (index, field, value) => {
  //   setApplication((prev) => {
  //     const updatedResponses = [...prev.customResponses];
  //     updatedResponses[index] = {
  //       ...updatedResponses[index],
  //       [field]: value,
  //     };
  //     return { ...prev, customResponses: updatedResponses };
  //   });
  // };

  // const addCustomResponse = () => {
  //   setApplication((prevApp) => ({
  //     ...prevApp,
  //     customResponses: [
  //       ...prevApp.customResponses,
  //       { id: uuidv4(), question: "", answer: "" },
  //     ],
  //   }));
  // };

  // const removeCustomResponse = (index) => {
  //   setApplication((prev) => {
  //     const updatedResponses = prev.customResponses.filter(
  //       (_, i) => i !== index,
  //     );
  //     return { ...prev, customResponses: updatedResponses };
  //   });
  // };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatSalaryRange = (min, max) => {
    return `$${min.toLocaleString()}/year - $${max.toLocaleString()}/year`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please upload a resume.");
      return;
    }

    if (!recaptchaToken) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("job_posting_id", jobPosting.id);
      formData.append("name", application.name);
      formData.append("email", application.emailAddress);
      formData.append("phone", application.phone);
      formData.append("postal_code", application.postalCode);
      formData.append("resume", file);
      formData.append("status_in_canada", application.statusInCanada);
      formData.append("application_status", "New");
      formData.append(
        "custom_responses",
        JSON.stringify(application.customResponses),
      );
      formData.append("token", recaptchaToken);

      const response = await uploadJobApplication(formData, recaptchaToken);

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error.message);
      alert("An error occurred while submitting your application.");
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      {/* Top Section with Job Title and Company */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px 16px", // Reduced padding
          marginBottom: 2, // Reduced margin
          backgroundColor: "#fff",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <IconButton
          sx={{ marginRight: 1 }} // Reduced margin
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20" // Reduced icon size
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </IconButton>

        <Box>
          <Typography
            variant="h5" // Smaller font size
            sx={{ fontWeight: "bold", marginBottom: 0.5 }}
          >
            {jobPosting.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "gray" }}>
            {jobPosting.employer}
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={2}>
        {/* Left Section */}
        <Grid item xs={12} md={5}>
          <StyledPaper elevation={1}>
            <Typography variant="h6" gutterBottom>
              Information
            </Typography>
            <Box sx={{ mt: 1 }}>
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
                {
                  label: "Hours per Week",
                  value: `${jobPosting.hoursPerWeek} hours`,
                },
                {
                  label: "Close Date",
                  value: formatDate(jobPosting.closeDate),
                },
              ].map((item, index) => (
                <Box
                  key={item.label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom:
                      index < 6 ? "1px solid rgba(0, 0, 0, 0.12)" : "none",
                    padding: "4px 0", // Reduced padding
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "rgba(0, 0, 0, 0.87)" }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(0, 0, 0, 0.6)", textAlign: "right" }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              ))}
              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: isDescriptionExpanded ? "none" : 3,
                    overflow: isDescriptionExpanded ? "visible" : "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {jobPosting.description}
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  sx={{ mt: 0.5 }} // Reduced margin
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                >
                  {isDescriptionExpanded ? "Read Less" : "Read More"}
                </Button>
              </Box>
            </Box>
          </StyledPaper>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={7}>
          <StyledPaper elevation={1}>
            <Typography variant="h6" gutterBottom>
              Apply for this Position
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                required
                label="Name"
                value={application.name}
                onChange={handleInputChange("name")}
                margin="dense" // Reduced spacing
                size="small" // Smaller input
              />
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Phone"
                    value={application.phone}
                    onChange={handleInputChange("phone")}
                    margin="dense"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    label="Postal Code"
                    value={application.postalCode}
                    onChange={handleInputChange("postalCode")}
                    margin="dense"
                    size="small"
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
                margin="dense"
                size="small"
              />
              <Grid container spacing={1}>
                <Grid item xs={application.statusInCanada === "Other" ? 6 : 12}>
                  <FormControl fullWidth margin="dense" size="small">
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
                {application.statusInCanada === "Other" && (
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="dense"
                      size="small"
                      label="Please specify"
                      value={application.otherStatus}
                      onChange={handleInputChange("otherStatus")}
                    />
                  </Grid>
                )}
              </Grid>

              <Box
                {...getRootProps()}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  border: "2px dashed #ccc",
                  borderRadius: 2,
                  textAlign: "center",
                  backgroundColor: "white",
                  color: "#666",
                  cursor: "pointer",
                  transition: "border-color 0.3s ease",
                  "&:hover": {
                    borderColor: "#3f51b5",
                  },
                }}
              >
                <input {...getInputProps()} />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: "white",
                    mb: 1,
                  }}
                >
                  <UploadFileIcon sx={{ color: "#3f51b5", fontSize: 32 }} />
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, color: "#3f51b5", mb: 0.5 }}
                >
                  Click to upload a file
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  PDF file only
                </Typography>
              </Box>
              {/* Error Message */}
              {fileError && (
                <Box sx={{ mt: 2, color: "error.main", textAlign: "center" }}>
                  <Typography variant="body2">{fileError}</Typography>
                </Box>
              )}

              {/* Uploaded File Info & Progress Bar */}
              {file && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 2,
                    p: 1,
                    backgroundColor: "white",
                  }}
                >
                  <Box sx={{ mr: 2 }}>
                    {fileError ? (
                      <ErrorIcon color="error" />
                    ) : uploadProgress === 100 ? (
                      <Typography variant="body2" color="success.main">
                        <CheckIcon />
                      </Typography>
                    ) : (
                      <UploadFileIcon color="primary" />
                    )}
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex", // Enable flexbox for alignment
                      flexDirection: "column", // Stack items vertically
                      alignItems: "center", // Center horizontally
                      justifyContent: "center", // Center vertically
                      textAlign: "center", // Center-align text
                    }}
                  >
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {file.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {formatFileSize(file.size)} •{" "}
                      {fileError ||
                        (uploadProgress === 100 ? "Complete" : "Uploading...")}
                    </Typography>
                    {!fileError && (
                      <LinearProgress
                        variant="determinate"
                        value={uploadProgress || 0}
                        sx={{ mt: 1, width: "100%" }} // Full width for the progress bar
                      />
                    )}
                  </Box>

                  <IconButton onClick={handleRemoveFile}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 3,
                  transform: "scale(1.2)",
                  transformOrigin: "center",
                }}
              >
                <ReCAPTCHA
                  sitekey="6LfIPsAqAAAAAL7OYC0zIrYsnD0SNcyYJuPmgnSw"
                  onChange={handleRecaptchaChange}
                />
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{
                    width: "250px",
                  }}
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
