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
import { JobLeadContainer, H3 } from "./index.styles";
import EmployerType from "../../prop-types/EmployerType";
import { JOB_TYPES } from "../../utils/contants";

function JobLeadContent({
  jobLeadData,
  handleInputChange,
  isAddEmployer,
  employers,
}) {
  return (
    <>
      {jobLeadData.map((lead) => (
        <JobLeadContainer key={lead.id}>
          <H3>Job Lead {lead.id + 1}</H3>

          {/* Employer Name Field */}
          {!isAddEmployer && (
            <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
              <InputLabel id={`nameLabel-${lead.id}`}>Employer Name</InputLabel>
              <Select
                sx={{ textAlign: "left" }}
                labelId={`nameLabel-${lead.id}`}
                id={`employer-${lead.id}`}
                value={lead.employer}
                label="Employer Name"
                onChange={(e) =>
                  handleInputChange(e.target.value, lead.id, "employer")
                }
                required
              >
                {employers.map((employer) => (
                  <MenuItem
                    key={employer.employerID}
                    value={employer.employerID}
                  >
                    {employer.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>*Required</FormHelperText>
            </FormControl>
          )}

          {/* Job Title Field */}
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id={`title-${lead.id}`}
            label="Job Title"
            value={lead.title}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "title")
            }
            helperText={isAddEmployer ? "" : "*Required"}
            required
          />

          {/* Compensation Minimum Field */}
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel id={`minCompensationLabel-${lead.id}`}>
              Compensation Minimum*
            </InputLabel>
            <OutlinedInput
              id={`minCompensation-${lead.id}`}
              type="number"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Compensation Minimum*"
              inputProps={{ min: 0 }}
              value={lead.minCompensation}
              onChange={(e) => {
                const { value } = e.target;
                if (value >= 0)
                  handleInputChange(value, lead.id, "minCompensation");
              }}
              required
            />
          </FormControl>

          {/* Compensation Maximum Field */}
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel id={`maxCompensationLabel-${lead.id}`}>
              Compensation Maximum*
            </InputLabel>
            <OutlinedInput
              id={`maxCompensation-${lead.id}`}
              type="number"
              inputProps={{ min: 0 }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Compensation Maximum*"
              value={lead.maxCompensation}
              onChange={(e) => {
                const { value } = e.target;
                if (value >= 0)
                  handleInputChange(value, lead.id, "maxCompensation");
              }}
              required
            />
          </FormControl>

          {/* Hours Per Week Field */}
          <TextField
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id={`hoursPerWeek-${lead.id}`}
            type="number"
            label="Hours per week"
            inputProps={{ min: 0 }}
            value={lead.hoursPerWeek}
            onChange={(e) => {
              const { value } = e.target;
              if (value >= 0) handleInputChange(value, lead.id, "hoursPerWeek");
            }}
            required
          />

          {/* National Occupation Code Field */}
          <TextField
            fullWidth
            type="number"
            inputProps={{ min: 0 }}
            sx={{ m: 1, width: "47%" }}
            id={`nationalOC-${lead.id}`}
            label="National Occupation Code"
            value={lead.nationalOC}
            onChange={(e) => {
              const { value } = e.target;
              if (value >= 0) handleInputChange(value, lead.id, "nationalOC");
            }}
            required
          />

          {/* Job Description Field */}
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id={`description-${lead.id}`}
            label="Job Description"
            multiline
            rows={4}
            value={lead.description}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "description")
            }
            required
          />

          {/* Creation Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id={`creationDate-${lead.id}`}
              label="Creation Date"
              fullWidth
              sx={{ m: 1, width: "47%" }}
              value={lead.creationDate}
              onChange={(newValue) =>
                handleInputChange(newValue, lead.id, "creationDate")
              }
              minDate={dayjs()}
              renderInput={(params) => (
                // eslint-disable-next-line
                <TextField {...params} error={false} helperText="" required />
              )}
              required
            />
          </LocalizationProvider>

          {/* Expiration Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              id={`expirationDate-${lead.id}`}
              label="Expiration Date"
              fullWidth
              sx={{ m: 1, width: "47%" }}
              value={lead.expirationDate}
              minDate={dayjs()}
              onChange={(newValue) =>
                handleInputChange(newValue, lead.id, "expirationDate")
              }
              renderInput={(params) => (
                // eslint-disable-next-line
                <TextField {...params} error={false} helperText="" required />
              )}
              required
            />
          </LocalizationProvider>

          {/* Employment Type Field */}
          <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
            <InputLabel id={`employmentTypeLabel-${lead.id}`}>
              Employment Type
            </InputLabel>
            <Select
              sx={{ textAlign: "left" }}
              labelId={`employmentTypeLabel-${lead.id}`}
              id={`employmentType-${lead.id}`}
              value={lead.employmentType}
              label="Employment Type"
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "employmentType")
              }
              required
            >
              {JOB_TYPES.map((jobType) => (
                <MenuItem key={jobType} value={jobType}>
                  {jobType}
                </MenuItem>
              ))}
            </Select>
            {!isAddEmployer && <FormHelperText>*Required</FormHelperText>}
          </FormControl>

          {/* Number of Positions Field */}
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id={`numPositions-${lead.id}`}
            label="Number of Positions"
            type="number"
            inputProps={{ min: 0 }}
            value={lead.numPositions}
            onChange={(e) => {
              const { value } = e.target;
              if (value >= 0) handleInputChange(value, lead.id, "numPositions");
            }}
            helperText={isAddEmployer ? "" : "*Required"}
            required
          />
        </JobLeadContainer>
      ))}
    </>
  );
}

JobLeadContent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  jobLeadData: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isAddEmployer: PropTypes.bool,
  employers: PropTypes.arrayOf(EmployerType).isRequired,
};

JobLeadContent.defaultProps = {
  isAddEmployer: false, // or whatever your default value should be
};

export default JobLeadContent;
