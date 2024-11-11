import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
} from "@mui/material";
import { ButtonL, JobLeadContainer, H3 } from "../index.styles";
import { COMPENSATION_RATES } from "../../../utils/contants";
// import ErrorScreenComponent from "../shared/error-screen-component";

function AddApplicationFields({
  jobPostData,
  setJobPostData,
  isAddEmployer,
}) {
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
          sx={{ m: 1, width: "47%" }}
          id={`title-${jobPostData.id}`}
          label="Name"
          value={jobPostData.title}
          helperText={isAddEmployer ? "" : "*Required"}
          required={!isAddEmployer}
        />

        {/* Email Field */}
        <TextField
          disabled
          fullWidth
          sx={{ m: 1, width: "47%" }}
          id={`employer-${jobPostData.id}`}
          label="Email Address"
          value={jobPostData.employer}
          helperText={isAddEmployer ? "" : "*Required"}
          required={!isAddEmployer}
        />

        {/* Location Field */}
        <TextField
          disabled
          fullWidth
          sx={{ m: 1, width: "47%" }}
          id={`location-${jobPostData.id}`}
          label="Location"
          value={jobPostData.location}
          helperText={isAddEmployer ? "" : "*Required"}
          required={!isAddEmployer}
        />

        {/* Postal Code Field */}
        <TextField
          disabled
          fullWidth
          sx={{ m: 1, width: "47%" }}
          id={`location-${jobPostData.id}`}
          label="Postal Code"
          value={jobPostData.location}
          helperText={isAddEmployer ? "" : "*Required"}
          required={!isAddEmployer}
        />

        {/* Status In Canada Field */}
        <FormControl disabled fullWidth sx={{ m: 1, width: "96%" }}>
          <InputLabel id={`employmentTypeLabel-${jobPostData.id}`}>
            Status In Canada
          </InputLabel>
          <Select
            sx={{ textAlign: "left" }}
            labelId={`employmentTypeLabel-${jobPostData.id}`}
            id={`employmentType-${jobPostData.id}`}
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
          sx={{ m: 1, width: "96%" }}
          id={`description-${jobPostData.id}`}
          label="Cover Letter"
          multiline
          rows={4}
          value={jobPostData.description}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setJobPostData(e.target.value, jobPostData.id, "description")
          }
          required={!isAddEmployer}
        />

        {/* Add this to next job posting page */}
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
