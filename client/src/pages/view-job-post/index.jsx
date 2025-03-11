/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { getOneActiveJobPost } from "../../utils/job_posts_api";

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
function JobPostingPage() {
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

  const { jobPostingId } = useParams(); // Get jobPostingId from URL

  // Define the initial state based on the JobPosting model attributes
  const [jobPosting, setJobPosting] = useState({
    id: null,
    title: "",
    employer: "",
    location: "",
    hoursPerWeek: null,
    rateOfPayMin: null,
    rateOfPayMax: null,
    rateOfPayFrequency: "",
    jobType: [],
    closeDate: null,
    jobDescription: "",
    customQuestions: [],
    creator: null,
    state: "Draft",
    createdAt: "",
    updatedAt: "",
    compensation: {
      min: null,
      max: null,
    },
  });

  useEffect(() => {
    const fetchJobPosting = async () => {
      if (jobPostingId) {
        try {
          const response = await getOneActiveJobPost(jobPostingId);
          const jobPostingData = await response.json();
          const data = jobPostingData.jobPost;

          setJobPosting({
            id: data.id,
            title: data.title || "N/A",
            employer: data.employer || "N/A",
            location: data.location || "N/A",
            hoursPerWeek: data.hours_per_week || 0,
            rateOfPayMin: data.rate_of_pay_min || 0,
            rateOfPayMax: data.rate_of_pay_max || 0,
            rateOfPayFrequency: data.rate_of_pay_frequency || "N/A",
            jobType: data.job_type || [],
            closeDate: data.close_date || "N/A",
            jobDescription: data.job_description || "N/A",
            customQuestions: data.custom_questions || [],
            creator: data.creator || null,
            state: data.state || "Draft",
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            compensation: {
              min: data.rate_of_pay_min || 0,
              max: data.rate_of_pay_max || 0,
            },
          });
        } catch (error) {
          console.error("Error fetching job posting:", error);
        }
      }
    };

    fetchJobPosting();
  }, []);

  // return <div>{JSON.stringify(jobPosting, null, 2)}</div>;

  const descriptionRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (descriptionRef.current) {
        // Force a slight delay to ensure DOM updates before checking height
        setTimeout(() => {
          setIsOverflowing(
            descriptionRef.current.scrollHeight >
              descriptionRef.current.clientHeight,
          );
        }, 100);
      }
    };

    checkOverflow(); // Run initially

    // Re-run when window resizes
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [jobPosting.jobDescription, isDescriptionExpanded]); // Runs when description changes or expands

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
  const [, setDropzoneKey] = useState(0);
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
        const progress = prev + 50;
        if (progress >= 100) {
          clearInterval(interval);
        }
        return Math.min(progress, 100);
      });
    }, 500);
  };

  const { getRootProps, getInputProps } = useDropzone({
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
    // Convert to numbers
    const minNum = Number(min);
    const maxNum = Number(max);

    // Format with "K" notation (divide by 1000 and append "K")
    const formattedMin = `${minNum}K`;
    const formattedMax = `${maxNum}K`;

    return `$${formattedMin}/year - $${formattedMax}/year`;
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
          padding: "4px 8px", // Reduced padding
          marginBottom: 1, // Reduced margin
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
            variant="h4" // Smaller font size
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
      <Grid container spacing={1}>
        {/* Left Section - Job Information */}
        <Grid item xs={12} md={5}>
          <StyledPaper elevation={1} sx={{ p: 2, maxHeight: "623px" }}>
            {/* Information Header (Slightly Bigger but Compact) */}
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                pb: 1.5,
                borderBottom: "2px solid #E0E0E0",
                fontSize: "1rem", // Reduced font size
              }}
            >
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
                    display: "grid",
                    gridTemplateColumns: "1fr 1.2fr", // Slightly more compact column sizing
                    alignItems: "center",
                    py: 1.2, // Reduced padding for compact layout
                    borderBottom: index < 6 ? "1px solid #E0E0E0" : "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{
                      color: "#333",
                      fontSize: "0.85rem", // Slightly smaller font
                      textAlign: "left",
                    }}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#666",
                      fontSize: "0.85rem",
                      textAlign: "left",
                    }}
                  >
                    {item.value || "N/A"}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Description Section */}
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                pt: 2,
                pb: 1.5,
                borderBottom: "2px solid #E0E0E0",
                fontSize: "1rem", // Matched font size with "Information"
              }}
            >
              Description
            </Typography>

            <Box
              ref={descriptionRef} // Move ref here
              sx={{
                maxHeight: isDescriptionExpanded ? "200px" : "80px", // Expands but stops at 300px
                overflowY: isDescriptionExpanded ? "auto" : "hidden", // Allows scrolling when expanded
                transition: "max-height 0.3s ease-in-out",
                backgroundColor: "white", // Ensures background extends
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#444",
                  lineHeight: 1.5,
                  fontSize: "0.85rem",
                  whiteSpace: "normal", // Ensure text wraps correctly
                  wordBreak: "break-word", // Prevent horizontal scroll issues
                }}
              >
                {jobPosting.jobDescription}
              </Typography>
            </Box>

            {/* READ MORE Button (Only Shows If Text Overflows) */}
            {isOverflowing && (
              <Button
                variant="text"
                size="small"
                sx={{
                  mt: 0.5,
                  fontWeight: 500,
                  color: "#3f51b5",
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                }}
                onClick={() => {
                  setIsDescriptionExpanded(!isDescriptionExpanded);

                  if (isDescriptionExpanded && descriptionRef.current) {
                    // Reset scroll position when collapsing
                    setTimeout(() => {
                      descriptionRef.current.scrollTop = 0;
                    }, 100);
                  }
                }}
              >
                {isDescriptionExpanded ? "Read Less" : "Read More"}
              </Button>
            )}
          </StyledPaper>
        </Grid>

        {/* Right Section */}
        <Grid item xs={12} md={6.5}>
          {" "}
          {/* Reduced width from md={7} to md={6.5} */}
          <StyledPaper elevation={1} sx={{ p: 2.5 }}>
            {/* Apply for Position Header */}
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ mb: 1.5, fontSize: "0.9rem" }} // Slightly smaller
            >
              Apply for this Position
            </Typography>

            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <Box sx={{ mb: 1 }}>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  value={application.name}
                  onChange={handleInputChange("name")}
                  size="small"
                  InputProps={{
                    sx: { height: "45px", paddingY: "10px" }, // Adjusts height and vertical padding
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "gray", fontSize: "0.7rem", mt: 0.3 }}
                >
                  *Required
                </Typography>
              </Box>

              {/* Phone & Postal Code Fields */}
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 1 }}>
                    <TextField
                      fullWidth
                      required
                      label="Phone"
                      value={application.phone}
                      onChange={handleInputChange("phone")}
                      size="small"
                      InputProps={{
                        sx: { height: "45px", paddingY: "10px" }, // Adjusts height and vertical padding
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "gray", fontSize: "0.7rem", mt: 0.3 }}
                    >
                      *Required
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 1 }}>
                    <TextField
                      fullWidth
                      required
                      label="Postal Code"
                      value={application.postalCode}
                      onChange={handleInputChange("postalCode")}
                      size="small"
                      InputProps={{
                        sx: { height: "45px", paddingY: "10px" }, // Adjusts height and vertical padding
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "gray", fontSize: "0.7rem", mt: 0.3 }}
                    >
                      *Required
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Email Address Field */}
              <Box sx={{ mb: 1 }}>
                <TextField
                  fullWidth
                  required
                  label="Email Address"
                  type="email"
                  value={application.emailAddress}
                  onChange={handleInputChange("emailAddress")}
                  size="small"
                  InputProps={{
                    sx: { height: "45px", paddingY: "10px" }, // Adjusts height and vertical padding
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: "gray", fontSize: "0.7rem", mt: 0.3 }}
                >
                  *Required
                </Typography>
              </Box>

              <Grid container spacing={2} alignItems="center">
                {/* Status in Canada Dropdown */}
                <Grid item xs={application.statusInCanada === "Other" ? 6 : 12}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel id="status-label">Status in Canada</InputLabel>
                    <Select
                      labelId="status-label"
                      value={application.statusInCanada}
                      onChange={handleStatusChange}
                      label="Status in Canada"
                      sx={{
                        height: "50px", // Ensures uniform height
                        display: "flex",
                        alignItems: "center",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "gray",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                      }}
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Other Status Input (Only if "Other" is selected) */}
                {application.statusInCanada === "Other" && (
                  <Grid
                    item
                    xs={6}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      label="Other: Please specify"
                      value={application.otherStatus}
                      onChange={handleInputChange("otherStatus")}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          height: "50px", // Ensures uniform height
                          display: "flex",
                          alignItems: "center", // Centers text vertically
                        },
                        "& .MuiInputBase-input": {
                          paddingY: 0, // Removes unnecessary top/bottom padding
                          display: "flex",
                          alignItems: "center", // Ensures text is centered properly
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "gray",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "black",
                        },
                      }}
                    />
                  </Grid>
                )}
              </Grid>

              {/* Upload Resume Section */}
              <Box mt={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ mb: 0.7, fontSize: "0.9rem" }}
                >
                  *Upload Resume
                </Typography>
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
                    variant="body2"
                    sx={{ fontWeight: 500, color: "#3f51b5", mb: 0.5 }}
                  >
                    Click to upload a file
                  </Typography>
                  <Typography variant="3" sx={{ color: "text.secondary" }}>
                    PDF file only
                  </Typography>
                </Box>
                {file || fileError ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between", // Adjust content alignment
                      mt: 2,
                      p: 1,
                      backgroundColor: fileError ? "#ffebee" : "white", // Light red for errors
                      borderRadius: 1,
                      border: fileError
                        ? "1px solid #f44336"
                        : "1px solid #e0e0e0", // Red border for errors
                      width: "100%", // Take up the full width of the container
                      maxWidth: "100%", // Prevent overflow beyond the parent container
                      boxSizing: "border-box", // Ensure padding doesn't affect width
                    }}
                  >
                    {/* Left Icon */}
                    <Box sx={{ mr: 2 }}>
                      {fileError ? (
                        <Typography variant="body3" color="error.main">
                          <ErrorIcon />
                        </Typography>
                      ) : uploadProgress === 100 ? (
                        <Typography variant="body3" color="success.main">
                          <CheckIcon />
                        </Typography>
                      ) : (
                        <UploadFileIcon color="primary" />
                      )}
                    </Box>

                    {/* Center Content */}
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      {fileError ? (
                        <>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, color: "error.main" }}
                          >
                            Upload failed.
                          </Typography>
                          <Typography
                            variant="body3"
                            sx={{
                              color: "error.main",
                              fontWeight: 600,
                            }}
                          >
                            File too large • Failed
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {file.name}
                          </Typography>
                          <Typography variant="body3" color="textSecondary">
                            {`${formatFileSize(file.size)} • ${
                              uploadProgress === 100
                                ? "Complete"
                                : "Uploading..."
                            }`}
                          </Typography>
                          {!fileError && (
                            <LinearProgress
                              variant="determinate"
                              value={uploadProgress || 0}
                              sx={{ mt: 1, width: "100%" }}
                            />
                          )}
                        </>
                      )}
                    </Box>

                    {/* Right Delete Icon */}
                    <IconButton onClick={handleRemoveFile}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                ) : null}
              </Box>

              {/* Recaptcha */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1.2 }}>
                <ReCAPTCHA
                  sitekey="6LfIPsAqAAAAAL7OYC0zIrYsnD0SNcyYJuPmgnSw"
                  onChange={handleRecaptchaChange}
                />
              </Box>

              {/* Submit Button */}
              <Box sx={{ mt: 1.5, display: "flex", justifyContent: "right" }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  sx={{ width: "90px" }}
                >
                  Submit
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
