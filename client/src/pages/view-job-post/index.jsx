/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { useRef, useEffect, useState } from "react";
import './index.css';
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { uploadJobApplication } from "../../utils/job_applications_api";
import { getOneActiveJobPost } from "../../utils/job_posts_api";
import FormSubmissionErrorDialog from "../../components/shared/form-submission-error-dialog";
import { formatLongDate } from "../../utils/date";
import { MainContainer } from "./index.styles";
import SuccessfulFormSubmissionDialog from "../../components/shared/successful-submission-dialog";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

// const StyledContainer = styled(Container)(({ theme }) => ({
//   paddingTop: theme.spacing(4),
//   paddingBottom: theme.spacing(4),
//   marginLeft: theme.spacing(10)
//   // marginLeft: theme.spacing(15),
// }));

function CustomDialog({ open, onClose, title, message }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          borderTop: "10px solid #D32F2F",
          padding: "20px",
          textAlign: "center",
        },
      }}
    >
      <ErrorOutlineIcon
        style={{ fontSize: 40, color: "#D32F2F", margin: "10px auto" }}
      />
      <DialogTitle>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" style={{ textAlign: "center" }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button onClick={onClose} variant="outlined" color="error" fullWidth>
          BACK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ title: "", message: "" });
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
          setDialogData({
            title: "Error",
            message: "Error fetching job posting:",
          });
          setDialogOpen(true);
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

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [isSuccessDialog, setIsSuccessDialog] = useState(false);

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
  // };z

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const formatSalaryRange = (min, max, rateOfPayFrequency) => {
    // Convert to numbers
    const minNum = Number(min);
    const maxNum = Number(max);

    switch (rateOfPayFrequency) {
      case "Annually": {
        const formattedMin = `${Math.floor(minNum / 1000)}K`;
        const formattedMax = `${Math.floor(maxNum / 1000)}K`;

        return `$${formattedMin}/year - $${formattedMax}/year`;
      }
      default:
        return `$${minNum} - $${maxNum} ${rateOfPayFrequency}`;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setDialogData({ title: "Error", message: "Please upload a resume." });
      setDialogOpen(true);
      return;
    }

    if (!recaptchaToken) {
      setDialogData({
        title: "Error",
        message: "Please complete the reCAPTCHA verification.",
      });
      setDialogOpen(true);
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

      setIsSuccessDialog(true);
    } catch (error) {
      setErrorDialogOpen(true);
    }
  };

  return (
    <MainContainer>
      {/* Top Section with Job Title and Company */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
          backgroundColor: "#fff",
          width: "80%",
        }}
      >
        <IconButton
          sx={{ marginRight: "2rem",
            marginLeft: "2rem" }} // Reduced margin
          onClick={() => window.history.back()}
        >
          <ArrowBackIcon />
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
      <Grid container spacing={2} 
        sx={{
          justifyContent: "center",
          width: "90%",
          mx: 'auto'
        }}>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={1}>
            {/* Information Header (Slightly Bigger but Compact) */}
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Information
            </Typography>
            <Divider sx={{ my: 2, borderBottomWidth: 2.5 }} />

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
                    jobPosting.rateOfPayFrequency,
                  ),
                },
                { label: "Job Type", value: jobPosting.jobType },
                {
                  label: "Hours per Week",
                  value: `${jobPosting.hoursPerWeek} hours`,
                },
                {
                  label: "Close Date",
                  value: formatLongDate(jobPosting.closeDate),
                },
              ].map((item, index) => (
                <Box
                  key={item.label}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr", // Slightly more compact column sizing
                    alignItems: "center",
                    py: 1.2, // Reduced padding for compact layout
                    borderBottom: index < 6 ? "1px solid #E0E0E0" : "none",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ ml: 2 }} align="left">
                    {item.label}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ ml: 2 }} align="left">
                    {item.value || "N/A"}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 2, borderBottomWidth: 2.5 }} />

            {/* Description Section */}
            <Typography variant="h5" sx={{ flexGrow: 1, pt: 2 }}>
              Description
            </Typography>
            <Divider sx={{ my: 2, borderBottomWidth: 2.5 }} />

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
        <Grid item xs={12} md={6}>
          {" "}
          {/* Reduced width from md={7} to md={6.5} */}
          <StyledPaper elevation={1} sx={{ p: 2.5 }}>
            {/* Apply for Position Header */}
            <Typography
              gutterBottom
              sx={{ fontSize: "1.6rem", fontWeight: "normal", pb: 2 }}
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
                  helperText="*Required"
                />
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
                      helperText="*Required"
                    />
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
                      helperText="*Required"
                    />
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
                  helperText="*Required"
                />
              </Box>

              <Grid container spacing={2} alignItems="center">
                {/* Status in Canada Dropdown */}
                <Grid item xs={application.statusInCanada === "Other" ? 6 : 12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="status-label">Status in Canada</InputLabel>
                    <Select
                      labelId="status-label"
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
                      variant="outlined"
                      label="Other: Please specify"
                      value={application.otherStatus}
                      onChange={handleInputChange("otherStatus")}
                    />
                  </Grid>
                )}
              </Grid>

              {/* Upload Resume Section */}
              <Box mt={1}>
                <Typography color="#9E9E9E" pb="13px" pt="1.2rem">
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
                      borderColor: "#3568E5",
                    },
                  }}
                >
                  <input {...getInputProps()} />
                  {/* <Box
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
                  </Box> */}
                  <Container sx={{ width: "auto" }}>
                    <IconButton sx={{ backgroundColor: "#E6ECFB" }}>
                      <UploadFileIcon sx={{ color: "#3568E5" }} />
                    </IconButton>
                  </Container>
                  <Typography variant="body1" pb="10px" pt="10px">
                    <span>Click to upload</span>
                    &nbsp;or drag and drop
                  </Typography>
                  <Typography variant="body2">PDF file only</Typography>
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
                  SUBMIT
                </Button>
              </Box>
            </form>
          </StyledPaper>
        </Grid>
      </Grid>
      <FormSubmissionErrorDialog
        open={errorDialogOpen}
        onBack={() => setErrorDialogOpen(false)}
      />
      <CustomDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={dialogData.title}
        message={dialogData.message}
      />
      <SuccessfulFormSubmissionDialog
        open={isSuccessDialog}
        onBack={() => setIsSuccessDialog(false)}
      />
    </MainContainer>
  );
}

export default JobPostingPage;
CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
