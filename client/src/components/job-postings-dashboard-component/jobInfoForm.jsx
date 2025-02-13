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
  Autocomplete,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { JobLeadContainer, H3 } from "./index.styles";
import {
  JOB_TYPES_FOR_JOB_POSTS,
  COMPENSATION_RATES_FOR_JOB_POSTS,
} from "../../utils/constants";

function AddJobDetails({ jobPostData, setJobPostData }) {
  const handleInputChange = (input, field) => {
    // Update the specific field in jobPostData
    setJobPostData((prevData) => ({
        ...prevData,
        [field]: input,
      }));
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
          value={jobPostData.title || ""}
          onChange={(e) => handleInputChange(e.target.value, "title")}
          required
          InputLabelProps={{ required: false }}
        />

        {/* Employer Name Field */}
        <TextField
          fullWidth
          sx={{ m: 1, width: "96%" }}
          id="employer"
          label="Employer Name"
          value={jobPostData.employer || ""}
          onChange={(e) => handleInputChange(e.target.value, "employer")}
          required
          InputLabelProps={{ required: false }}
        />

        {/* Location Field */}
        <TextField
          fullWidth
          sx={{ m: 1, width: "96%" }}
          id="location"
          label="Location"
          value={jobPostData.location || ""}
          onChange={(e) => handleInputChange(e.target.value, "location")}
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
            value={jobPostData.rate_of_pay_min || ""}
            onChange={(e) =>
              handleInputChange(e.target.value, "rate_of_pay_min")
            }
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
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Maximum Compensation"
            value={jobPostData.rate_of_pay_max || ""}
            onChange={(e) =>
              handleInputChange(e.target.value, "rate_of_pay_max")
            }
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
            value={jobPostData.rate_of_pay_frequency || ""}
            label="Compensation rate"
            onChange={(e) =>
              handleInputChange(e.target.value, "rate_of_pay_frequency")
            }
            required
            InputLabelProps={{ required: false }}
          >
            {COMPENSATION_RATES_FOR_JOB_POSTS.map((rate) => (
              <MenuItem key={rate} value={rate}>
                {rate}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Hours Per Week Field */}
        <TextField
          fullWidth
          sx={{ m: 1, width: "47%" }}
          id="hoursPerWeek"
          type="number"
          label="Hours per week"
          value={jobPostData.hours_per_week || ""}
          onChange={(e) => handleInputChange(e.target.value, "hours_per_week")}
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
            value={jobPostData.job_type || []}
            filterSelectedOptions
            onChange={(e, value) => handleInputChange(value, "job_type")}
            required
            renderInput={(params) => (
              // eslint-disable-next-line
              <TextField {...params} error={false} helperText="" required />
            )}
          />
        </FormControl>

        {/* Expiration Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            id="expirationDate"
            label="Expiration Date"
            fullWidth
            sx={{ m: 1, width: "47%" }}
            value={dayjs(jobPostData.close_date) || null}
            minDate={dayjs()}
            onChange={(newValue) =>
              handleInputChange(newValue.toISOString(), "close_date")
            }
            renderInput={(params) => (
              // eslint-disable-next-line
              <TextField {...params} error={false} helperText="" required />
            )}
          />
        </LocalizationProvider>

        {/* Description Field */}
        <TextField
          fullWidth
          sx={{ m: 1, width: "96%" }}
          id="job_description"
          label="Description"
          multiline
          rows={4}
          value={jobPostData.job_description || ""}
          onChange={(e) => handleInputChange(e.target.value, "job_description")}
          required
          InputLabelProps={{ shrink: true, required: false }}
        />
      </Container>
    </JobLeadContainer>
  );
}

AddJobDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  jobPostData: PropTypes.object.isRequired, // Changed from array to object
  setJobPostData: PropTypes.func.isRequired,
};

export default AddJobDetails;