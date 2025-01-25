/* eslint-disable no-nested-ternary */
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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

import { DropzoneArea } from "material-ui-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const uploadJobApplication = () => {};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

function JobPostingPage({ jobPosting }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [application, setApplication] = useState({
    name: "",
    phone: "",
    postalCode: "",
    emailAddress: "",
    statusInCanada: "",
    otherStatus: "",
    customResponses: [],
  });

  const statusOptions = [
    { value: "Citizen", label: "Citizen" },
    { value: "PR", label: "Permanent Resident" },
    { value: "Refugee", label: "Refugee" },
    { value: "Student Visa", label: "Student Visa" },
    { value: "Open Work", label: "Open Work" },
    { value: "Other", label: "Other" },
  ];

  const handleSubmit = async (event, token) => {
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
      formData.append("job_posting_id", "67");
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

  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileError, setFileError] = useState("");
  const [dropzoneKey, setDropzoneKey] = useState(0);
  const [recaptchaToken, setRecaptchaToken] = useState("");

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

  const handleCustomResponseChange = (index, field, value) => {
    setApplication((prev) => {
      const updatedResponses = [...prev.customResponses];
      updatedResponses[index] = {
        ...updatedResponses[index],
        [field]: value,
      };
      return { ...prev, customResponses: updatedResponses };
    });
  };

  const addCustomResponse = () => {
    setApplication((prevApp) => ({
      ...prevApp,
      customResponses: [
        ...prevApp.customResponses,
        { id: uuidv4(), question: "", answer: "" },
      ],
    }));
  };

  const removeCustomResponse = (index) => {
    setApplication((prev) => {
      const updatedResponses = prev.customResponses.filter(
        (_, i) => i !== index,
      );
      return { ...prev, customResponses: updatedResponses };
    });
  };

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

  return (
    <StyledContainer maxWidth="lg">
      {/* Top Section with Job Title and Company */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px 24px",
          marginBottom: 3,
          backgroundColor: "#fff", // White background
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)", // Bottom border to separate
        }}
      >
        {/* Back Button */}
        <IconButton
          sx={{ marginRight: 2 }}
          onClick={() => window.history.back()} // Navigate back
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="24"
            height="24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </IconButton>

        {/* Title and Employer */}
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: 0.5 }}
          >
            {jobPosting.title}
          </Typography>
          <Typography variant="h6" sx={{ color: "gray" }}>
            {jobPosting.employer}
          </Typography>
        </Box>
      </Box>

      {/* Left Section */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <StyledPaper elevation={2} sx={{ padding: 3 }}>
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
                    padding: "8px 0",
                  }}
                >
                  <Typography
                    variant="body1"
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
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", marginBottom: 1 }}
                >
                  Description:
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
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
                  sx={{ mt: 1 }}
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
                <Grid item xs={application.statusInCanada === "Other" ? 6 : 12}>
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
                {application.statusInCanada === "Other" && (
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
              <Box sx={{ mt: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Custom Responses
                </Typography>
                {application.customResponses.map((response, index) => (
                  <Box
                    key={response.id || index}
                    sx={{ display: "flex", gap: 2, mt: 2 }}
                  >
                    <TextField
                      fullWidth
                      required
                      label="Question"
                      value={response.question}
                      onChange={(e) =>
                        handleCustomResponseChange(
                          index,
                          "question",
                          e.target.value,
                        )
                      }
                    />
                    <TextField
                      fullWidth
                      required
                      label="Answer"
                      value={response.answer}
                      onChange={(e) =>
                        handleCustomResponseChange(
                          index,
                          "answer",
                          e.target.value,
                        )
                      }
                    />
                    <IconButton
                      color="error"
                      onClick={() => removeCustomResponse(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="contained"
                  sx={{ mt: 2, width: "100%", textAlign: "center" }}
                  onClick={addCustomResponse}
                >
                  Add Custom Response
                </Button>
              </Box>
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
                  showPreviewsInDropzone={false}
                  onDropRejected={(rejectedFiles) => {
                    if (rejectedFiles.length > 0) {
                      setFileError(
                        "File size exceeds 5 MB. Please upload a smaller file.",
                      );
                    }
                  }}
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
                {fileError && (
                  <Box sx={{ mt: 2, color: "error.main", textAlign: "center" }}>
                    <Typography variant="body2">{fileError}</Typography>
                  </Box>
                )}

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
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    width: "365px",
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
