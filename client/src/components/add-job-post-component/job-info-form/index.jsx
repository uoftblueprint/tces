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
import { JOB_TYPES, COMPENSATION_RATES } from "../../../utils/constants";

function AddJobDetails({ jobPostData, setJobPostData }) {
  const handleInputChange = (input, field) => {
    setJobPostData({ ...jobPostData, [field]: input });
  };
  return (
    <JobLeadContainer>
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
        id="title"
        label="Job Title"
        value={jobPostData.title}
        onChange={(e) => handleInputChange(e.target.value, "title")}
        helperText="*Required"
        required
        InputLabelProps={{ required: false }}
      />

      {/* Employer Name Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "96%" }}
        id="employer"
        label="Employer Name"
        value={jobPostData.employer}
        onChange={(e) => handleInputChange(e.target.value, "employer")}
        helperText="*Required"
        required
        InputLabelProps={{ required: false }}
      />

      {/* Location Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "96%" }}
        id="location"
        label="Location"
        value={jobPostData.location}
        onChange={(e) => handleInputChange(e.target.value, "location")}
        helperText="*Required"
        required
        InputLabelProps={{ required: false }}
      />

      {/* Minimum Compensation Field */}
      <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
        <InputLabel id="minCompensationLabel">Minimum Compensation</InputLabel>
        <OutlinedInput
          id="minCompensationLabel"
          type="number"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Minimum Compensation"
          inputProps={{ min: 0 }}
          value={jobPostData.minCompensation}
          onChange={(e) => {
            const { value } = e.target;
            if (/^\d*\.?\d*$/.test(value))
              handleInputChange(value, "minCompensation");
          }}
          required
          InputLabelProps={{ required: false }}
        />
      </FormControl>

      {/* Maximum Compensation Field */}
      <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
        <InputLabel id="maxCompensationLabel">Maximum Compensation</InputLabel>
        <OutlinedInput
          id="maxCompensationLabel"
          type="number"
          inputProps={{ min: 0 }}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Maximum Compensation"
          value={jobPostData.maxCompensation}
          onChange={(e) => {
            const { value } = e.target;
            if (/^\d*\.?\d*$/.test(value))
              handleInputChange(value, "maxCompensation");
          }}
          required
          InputLabelProps={{ required: false }}
        />
      </FormControl>

      {/* Compensation Rate Field */}
      <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
        <InputLabel id="compensationRateLabel">Compensation rate</InputLabel>
        <Select
          sx={{ textAlign: "left" }}
          labelId="compensationRateLabel"
          id="compensationRateLabel"
          value={jobPostData.compensationRate}
          label="Compensation rate"
          onChange={(e) =>
            handleInputChange(e.target.value, "compensationRate")
          }
          required
          InputLabelProps={{ required: false }}
        >
          {COMPENSATION_RATES.map((jobType) => (
            <MenuItem key={jobType} value={jobType}>
              {jobType}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>*Required</FormHelperText>
      </FormControl>

      {/* Hours Per Week Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "47%" }}
        id="hoursPerWeek"
        type="number"
        label="Hours per week"
        inputProps={{ min: 0 }}
        value={jobPostData.hoursPerWeek}
        onChange={(e) => {
          const { value } = e.target;
          if (/^\d*\.?\d*$/.test(value))
            handleInputChange(value, "hoursPerWeek");
        }}
        required
        InputLabelProps={{ required: false }}
      />

      {/* Employment Type Field */}
      <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
        <InputLabel>Employment Type</InputLabel>
        <Select
          sx={{ textAlign: "left" }}
          labelId="employmentTypeLabel"
          id="employmentTypeLabel"
          value={jobPostData.employmentType}
          label="Employment Type"
          onChange={(e) => handleInputChange(e.target.value, "employmentType")}
          required
          InputLabelProps={{ required: false }}
        >
          {JOB_TYPES.map((jobType) => (
            <MenuItem key={jobType} value={jobType}>
              {jobType}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>*Required</FormHelperText>
      </FormControl>

      {/* Creation Date Picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          id="expirationDate"
          label="Creation Date"
          fullWidth
          sx={{ m: 1, width: "47%" }}
          value={jobPostData.creationDate}
          disabled
          renderInput={(params) => (
            // eslint-disable-next-line
            <TextField {...params} error={false} helperText="" required />
          )}
          required
          InputLabelProps={{ required: false }}
        />
      </LocalizationProvider>

      {/* Expiration Date Picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          id="expirationDate"
          label="Expiration Date"
          fullWidth
          sx={{ m: 1, width: "47%" }}
          value={jobPostData.expirationDate}
          minDate={dayjs()}
          onChange={(newValue) =>
            handleInputChange(newValue, jobPostData, "expirationDate")
          }
          renderInput={(params) => (
            // eslint-disable-next-line
            <TextField {...params} error={false} helperText="" required />
          )}
          required
          InputLabelProps={{ required: false }}
        />
      </LocalizationProvider>

      {/* Additional Information Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "96%" }}
        id="description"
        label="Description"
        multiline
        rows={4}
        value={jobPostData.additionalInfo}
        InputLabelProps={{ shrink: true, required: false }}
        helperText="*Required"
        onChange={(e) => handleInputChange(e.target.value, "additionalInfo")}
        required
      />
    </JobLeadContainer>
  );
}

AddJobDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  jobPostData: PropTypes.array.isRequired,
  setJobPostData: PropTypes.func.isRequired,
};

export default AddJobDetails;
