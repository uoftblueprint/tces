import PropTypes from "prop-types";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  Typography,
} from "@mui/material";
import { ButtonL, JobLeadContainer, H3 } from "../index.styles";
import { COMPENSATION_RATES } from "../../../utils/contants";
import styles from "./index.module.css";

function AddApplicationFields({ jobPostData, setJobPostData, isAddEmployer }) {
  return (
    // TODOs
    // 1. get rid of required star beside label names
    // 2. ask about employment type label, really hard to make it the same native transition :skull
    // 3. add required bottom label to additional information and make it aligned w/the textarea
    // 4. change all labels, ids and setJobPostData paramters to match new input types
    <>
      <JobLeadContainer key={jobPostData.id}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <H3>Application form fields</H3>
        </div>

        {/* Name Field */}
        <TextField
          disabled
          fullWidth
          className={styles.dotted}
          sx={{ m: 1, width: "47%" }}
          label="Name"
          value={jobPostData.title}
          helperText={isAddEmployer ? "" : "*Required"}
          required={!isAddEmployer}
          InputLabelProps={{
            required: false,
          }}
        />

        {/* Email Field */}
        <TextField
          disabled
          fullWidth
          className={styles.dotted}
          sx={{ m: 1, width: "47%" }}
          label="Email Address"
          value={jobPostData.employer}
          helperText={isAddEmployer ? "" : "*Required"}
          required={!isAddEmployer}
        />

        {/* Phone Field */}
        <TextField
          disabled
          fullWidth
          className={styles.dotted}
          sx={{ m: 1, width: "47%" }}
          label="Phone"
          value={jobPostData.location}
          helperText={isAddEmployer ? "" : "*Required"}
          required={!isAddEmployer}
          InputLabelProps={{
            required: false,
          }}
        />

        {/* Postal Code Field */}
        <TextField
          disabled
          fullWidth
          className={styles.dotted}
          sx={{ m: 1, width: "47%" }}
          label="Postal Code"
          value={jobPostData.location}
          helperText={isAddEmployer ? "" : "*Required"}
          required={!isAddEmployer}
          InputLabelProps={{
            required: false,
          }}
        />

        {/* Status In Canada Field */}
        <FormControl disabled fullWidth sx={{ m: 1, width: "96%" }}>
          <InputLabel id={`employmentTypeLabel-${jobPostData.id}`}>
            Status In Canada
          </InputLabel>
          <Select
            className={styles.dotted}
            sx={{ textAlign: "left" }}
            labelId={`employmentTypeLabel-${jobPostData.id}`}
            value={jobPostData.employmentType}
            label="Compensation rate"
            required={!isAddEmployer}
          >
            {COMPENSATION_RATES.map((jobType) => (
              <MenuItem key={jobType} value={jobType}>
                {jobType}
              </MenuItem>
            ))}
          </Select>
          {!isAddEmployer && <FormHelperText>*Required</FormHelperText>}
        </FormControl>

        {/* Cover Letter Field */}
        {/* TODO ADD REQUIRED LABEL */}
        <TextField
          disabled
          fullWidth
          className={styles.dotted}
          sx={{ m: 1, width: "96%" }}
          label="Cover Letter"
          multiline
          rows={4}
          value={jobPostData.description}
          InputLabelProps={{ shrink: true, required: false }}
          onChange={(e) =>
            setJobPostData(e.target.value, jobPostData.id, "description")
          }
          required={!isAddEmployer}
        />

        {/* Add this to next job posting page */}
        <Box sx={{ boxSizing: "border-box", margin: "8px" }}>
          <Typography color="#9E9E9E" pb="13px">*Upload Resume</Typography>
          <Container
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
              <IconButton
                aria-label="Example"
                sx={{ backgroundColor: "#E6ECFB" }}
              >
                <UploadFileIcon />
              </IconButton>
            </Container>
            <Typography variant="body1" pb="10px" pt="10px">
              <span className={styles.underline}>Click to upload</span> or drag and drop
            </Typography>
            <Typography variant="body2">SVG, PNG, JPG or GIF (max. 3MB)</Typography>

          </Container>
        </Box>
      </JobLeadContainer>

      {/* Add specific behaviour when design P2 completed */}
      <ButtonL
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        + Add job-specific fields
      </ButtonL>
    </>
  );
}

AddApplicationFields.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  jobPostData: PropTypes.array.isRequired,
  setJobPostData: PropTypes.func.isRequired,
  isAddEmployer: PropTypes.bool,
};

AddApplicationFields.defaultProps = {
  isAddEmployer: false, // or whatever your default value should be
};

export default AddApplicationFields;
