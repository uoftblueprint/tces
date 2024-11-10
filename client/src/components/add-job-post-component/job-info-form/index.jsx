import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { JobLeadContainer, H3 } from "../index.styles";
import { JOB_TYPES, COMPENSATION_RATES } from "../../../utils/contants";
// import ErrorScreenComponent from "../shared/error-screen-component";

function AddJobDetails({
  jobPostData,
  handleInputChange,
  isAddEmployer,
}) {
  return (
    // TODOs
    // 1. get rid of required star beside label names
    // 2. ask about employment type label, really hard to make it the same native transition :skull
    // 3. add required bottom label to additional information and make it aligned w/the textarea
    // 4. change all labels, ids and handleinputchange paramters to match new input types
    <JobLeadContainer key={jobPostData.id}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H3>Job Information</H3>
      </div>

      {/* Job Title Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "96%" }}
        id={`title-${jobPostData.id}`}
        label="Job Title"
        value={jobPostData.title}
        onChange={(e) =>
          handleInputChange(e.target.value, jobPostData.id, "title")
        }
        helperText={isAddEmployer ? "" : "*Required"}
        required={!isAddEmployer}
      />

      {/* Employer Name Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "96%" }}
        id={`employer-${jobPostData.id}`}
        label="Employer Name"
        value={jobPostData.employer}
        onChange={(e) =>
          handleInputChange(e.target.value, jobPostData.id, "employer")
        }
        helperText={isAddEmployer ? "" : "*Required"}
        required={!isAddEmployer}
      />

      {/* Location Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "96%" }}
        id={`location-${jobPostData.id}`}
        label="Location"
        value={jobPostData.location}
        onChange={(e) =>
          handleInputChange(e.target.value, jobPostData.id, "location")
        }
        helperText={isAddEmployer ? "" : "*Required"}
        required={!isAddEmployer}
      />

      {/* Minimum Compensation Field */}
      <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
        <InputLabel id={`minCompensationLabel-${jobPostData.id}`}>
          Minimum Compensation
        </InputLabel>
        <OutlinedInput
          id={`minCompensation-${jobPostData.id}`}
          type="text"
          startAdornment={
            <InputAdornment position="start">$</InputAdornment>
          }
          label="Minimum Compensation"
          inputProps={{ min: 0 }}
          value={jobPostData.minCompensation}
          onChange={(e) => {
            const { value } = e.target;
            if (/^\d*\.?\d*$/.test(value))
              handleInputChange(value, jobPostData.id, "minCompensation");
          }}
          required={!isAddEmployer}
        />
      </FormControl>

      {/* Maximum Compensation Field */}
      <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
        <InputLabel id={`maxCompensationLabel-${jobPostData.id}`}>
          Maximum Compensation
        </InputLabel>
        <OutlinedInput
          id={`maxCompensation-${jobPostData.id}`}
          type="text"
          inputProps={{ min: 0 }}
          startAdornment={
            <InputAdornment position="start">$</InputAdornment>
          }
          label="Maximum Compensation"
          value={jobPostData.maxCompensation}
          onChange={(e) => {
            const { value } = e.target;
            if (/^\d*\.?\d*$/.test(value))
              handleInputChange(value, jobPostData.id, "maxCompensation");
          }}
          required={!isAddEmployer}
        />
      </FormControl>

      {/* Compensation Rate Field */}
      <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
        <InputLabel id={`employmentTypeLabel-${jobPostData.id}`}>
          Compensation rate
        </InputLabel>
        <Select
          sx={{ textAlign: "left" }}
          labelId={`employmentTypeLabel-${jobPostData.id}`}
          id={`employmentType-${jobPostData.id}`}
          value={jobPostData.employmentType}
          label="Compensation rate"
          onChange={(e) =>
            handleInputChange(e.target.value, jobPostData.id, "employmentType")
          }
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

      {/* Hours Per Week Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "47%" }}
        id={`hoursPerWeek-${jobPostData.id}`}
        type="text"
        label="Hours per week"
        inputProps={{ min: 0 }}
        value={jobPostData.hoursPerWeek}
        onChange={(e) => {
          const { value } = e.target;
          if (/^\d*\.?\d*$/.test(value))
            handleInputChange(value, jobPostData.id, "hoursPerWeek");
        }}
        required={!isAddEmployer}
      />

      {/* Employment Type Field */}
      <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
        <InputLabel>Employment Type</InputLabel>
        <Select
          sx={{ textAlign: "left" }}
          labelId={`employmentTypeLabel-${jobPostData.id}`}
          id={`employmentType-${jobPostData.id}`}
          value={jobPostData.employmentType}
          label="Employment Type"
          onChange={(e) =>
            handleInputChange(e.target.value, jobPostData.id, "employmentType")
          }
          required={!isAddEmployer}
        >
          {JOB_TYPES.map((jobType) => (
            <MenuItem key={jobType} value={jobType}>
              {jobType}
            </MenuItem>
          ))}
        </Select>
        {!isAddEmployer && <FormHelperText>*Required</FormHelperText>}
      </FormControl>

      {/* Creation Date Picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          id={`creationDate-${jobPostData.id}`}
          label="Creation Date"
          fullWidth
          sx={{ m: 1, width: "47%" }}
          value={jobPostData.creationDate}
          onChange={(newValue) =>
            handleInputChange(newValue, jobPostData.id, "creationDate")
          }
          minDate={dayjs()}
          renderInput={(params) => (
            // eslint-disable-next-line
            <TextField {...params} error={false} helperText="" required />
          )}
          required={!isAddEmployer}
        />
      </LocalizationProvider>

      {/* Expiration Date Picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          id={`expirationDate-${jobPostData.id}`}
          label="Expiration Date"
          fullWidth
          sx={{ m: 1, width: "47%" }}
          value={jobPostData.expirationDate}
          minDate={dayjs()}
          onChange={(newValue) =>
            handleInputChange(newValue, jobPostData.id, "expirationDate")
          }
          renderInput={(params) => (
            // eslint-disable-next-line
            <TextField {...params} error={false} helperText="" required />
          )}
          required={!isAddEmployer}
        />
      </LocalizationProvider>

      {/* Additional Information Field */}
      {/* TODO ADD REQUIRED LABEL */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "96%" }}
        id={`description-${jobPostData.id}`}
        label="Additional Information"
        multiline
        rows={4}
        value={jobPostData.description}
        InputLabelProps={{ shrink: true }}
        onChange={(e) =>
          handleInputChange(e.target.value, jobPostData.id, "description")
        }
        required={!isAddEmployer}
      />
    </JobLeadContainer>
  );
}

AddJobDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  jobPostData: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isAddEmployer: PropTypes.bool,
};

AddJobDetails.defaultProps = {
  isAddEmployer: false, // or whatever your default value should be
};

export default AddJobDetails;
