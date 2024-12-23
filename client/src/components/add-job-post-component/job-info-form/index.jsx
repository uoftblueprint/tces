import PropTypes from "prop-types";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";
import { JobLeadContainer, H3 } from "../index.styles";
import {
  JOB_TYPES_FOR_JOB_POSTS,
  COMPENSATION_RATES_FOR_JOB_POSTS,
} from "../../../utils/constants";

function AddJobDetails({ jobPostData, setJobPostData }) {
  const handleInputChange = (input, field) => {
    setJobPostData({ ...jobPostData, [field]: input });
  };
  const [compensationBoundary, setCompensationBoundary] = useState(
    jobPostData.rate_of_pay_max,
  );

  const handleCompensationChange = (value) => {
    setCompensationBoundary(value);
  };

  return (
    <JobLeadContainer>
      <H3 style={{ paddingLeft: "2%" }}>Job Information</H3>

      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          paddingLeft: 0,
          alignItems: "top",
          justifyContent: "center",
          flexFlow: "wrap",
        }}
      >
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
          <InputLabel id="minCompensationLabel">
            Minimum Compensation
          </InputLabel>
          <OutlinedInput
            id="minCompensationLabel"
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Minimum Compensation"
            inputProps={{ min: 0, max: compensationBoundary }}
            value={jobPostData.rate_of_pay_min}
            min={1000}
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d*\.?\d*$/.test(value))
                handleInputChange(value, "rate_of_pay_min");
              handleCompensationChange(value);
            }}
            required
            InputLabelProps={{ required: false }}
          />
        </FormControl>

        {/* Maximum Compensation Field */}
        <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
          <InputLabel id="maxCompensationLabel">
            Maximum Compensation
          </InputLabel>
          <OutlinedInput
            id="maxCompensationLabel"
            type="number"
            inputProps={{ min: compensationBoundary }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Maximum Compensation"
            value={jobPostData.rate_of_pay_max}
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d*\.?\d*$/.test(value))
                handleInputChange(value, "rate_of_pay_max");
              handleCompensationChange(value);
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
            value={jobPostData.rate_of_pay_frequency}
            label="Compensation rate"
            onChange={(e) =>
              handleInputChange(e.target.value, "rate_of_pay_frequency")
            }
            required
            InputLabelProps={{ required: false }}
          >
            {COMPENSATION_RATES_FOR_JOB_POSTS.map((jobType) => (
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
          value={jobPostData.hours_per_week}
          onChange={(e) => {
            const { value } = e.target;
            if (/^\d*\.?\d*$/.test(value))
              handleInputChange(value, "hours_per_week");
          }}
          required
          InputLabelProps={{ required: false }}
        />

        {/* Employment Type Field */}
        <FormControl sx={{ m: 1, width: "96%" }}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={JOB_TYPES_FOR_JOB_POSTS}
            getOptionLabel={(option) => option}
            defaultValue={jobPostData.job_type}
            filterSelectedOptions
            onChange={(e, value) => handleInputChange(value, "job_type")}
            required
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Employment Type"
                labelId="employmentTypeLabel"
                id="employmentTypeLabel"
              />
            )}
          />
          <FormHelperText>*Required</FormHelperText>
        </FormControl>

        {/* Creation Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id="creation"
            label="Creation Date"
            fullWidth
            sx={{ m: 1, width: "47%" }}
            value={jobPostData.creation_date}
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
            value={jobPostData.close_date}
            minDate={dayjs()}
            onChange={(newValue) =>
              handleInputChange(newValue, jobPostData, "close_date")
            }
            renderInput={(params) => (
              // eslint-disable-next-line
              <TextField {...params} error={false} helperText="" required />
            )}
            required
            InputLabelProps={{ required: false }}
          />
        </LocalizationProvider>

        {/* Description Field */}
        <TextField
          fullWidth
          sx={{ m: 1, width: "96%" }}
          id="description"
          label="Description"
          multiline
          rows={4}
          value={jobPostData.description}
          InputLabelProps={{ shrink: true, required: false }}
          helperText="*Required"
          onChange={(e) => handleInputChange(e.target.value, "description")}
          required
        />
      </Container>
    </JobLeadContainer>
  );
}

AddJobDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  jobPostData: PropTypes.array.isRequired,
  setJobPostData: PropTypes.func.isRequired,
};

export default AddJobDetails;
