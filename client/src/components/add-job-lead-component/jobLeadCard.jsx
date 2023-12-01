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
import { JobLeadContainer, H3 } from "./index.styles";

function JobLeadContent({ employerData, handleInputChange, isAddEmployer }) {
  return (
    <>
      {employerData.map((lead) => (
        <JobLeadContainer key={lead.id}>
          <H3>Job Lead</H3>

          {/* Employer Name Field */}
          <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
            <InputLabel id={`nameLabel-${lead.id}`}>Employer Name</InputLabel>
            <Select
              labelId={`nameLabel-${lead.id}`}
              id={`employer-${lead.id}`}
              value={lead.employer}
              label="Employer Name"
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "employer")
              }
            >
              <MenuItem value="name 1">Name 1</MenuItem>
              <MenuItem value="name 2">Name 2</MenuItem>
              <MenuItem value="name 3">Name 3</MenuItem>
            </Select>
            <FormHelperText>*Required</FormHelperText>
          </FormControl>

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
            helperText="*Required"
          />

          {/* Compensation Minimum Field */}
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel id={`minCompensationLabel-${lead.id}`}>
              Compensation Minimum
            </InputLabel>
            <OutlinedInput
              id={`minCompensation-${lead.id}`}
              type="number"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Compensation Minimum"
              value={lead.minCompensation}
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "minCompensation")
              }
            />
          </FormControl>

          {/* Compensation Maximum Field */}
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel id={`maxCompensationLabel-${lead.id}`}>
              Compensation Maximum
            </InputLabel>
            <OutlinedInput
              id={`maxCompensation-${lead.id}`}
              type="number"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Compensation Maximum"
              value={lead.maxCompensation}
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "maxCompensation")
              }
            />
          </FormControl>

          {/* Hours Per Week Field */}
          <TextField
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id={`hoursPerWeek-${lead.id}`}
            type="number"
            label="Hours per week"
            value={lead.hoursPerWeek}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "hoursPerWeek")
            }
          />

          {/* National Occupation Code Field */}
          <TextField
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id={`nationalOC-${lead.id}`}
            label="National Occupation Code"
            value={lead.nationalOC}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "nationalOC")
            }
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
            helperText="*Required"
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "description")
            }
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
              renderInput={(params) => (
                <TextField {...params} error={false} helperText="" />
              )}
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
              onChange={(newValue) =>
                handleInputChange(newValue, lead.id, "expirationDate")
              }
              renderInput={(params) => (
                <TextField {...params} error={false} helperText="" />
              )}
            />
          </LocalizationProvider>

          {/* Employment Type Field */}
          <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
            <InputLabel id={`employmentTypeLabel-${lead.id}`}>
              Employment Type
            </InputLabel>
            <Select
              labelId={`employmentTypeLabel-${lead.id}`}
              id={`employmentType-${lead.id}`}
              value={lead.employmentType}
              label="Employment Type"
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "employmentType")
              }
            >
              <MenuItem value="full-time">Full Time</MenuItem>
              <MenuItem value="part-time">Part Time</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="on-call">On-Call</MenuItem>
            </Select>
          </FormControl>

          {/* Number of Positions Field */}
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id={`numPositions-${lead.id}`}
            label="Number of Positions"
            type="number"
            value={lead.numPositions}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "numPositions")
            }
            helperText="*Required"
          />
        </JobLeadContainer>
      ))}
    </>
  );
}

JobLeadContent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  employerData: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isAddEmployer: PropTypes.bool.isRequired,
};

export default JobLeadContent;
