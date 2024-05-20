import PropTypes from "prop-types";
import { useState } from "react";
import {
  FormControl,
  IconButton,
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
import DeleteIcon from "@mui/icons-material/Delete";
import { JobLeadContainer, H3 } from "./index.styles";
import { JOB_TYPES } from "../../utils/contants";
import { getFilteredEmployers } from "../../utils/api";
import ErrorScreenComponent from "../shared/error-screen-component";

function JobLeadContent({
  jobLeadData,
  handleInputChange,
  handleDeleteJobLead,
  isAddEmployer,
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.length >= 2) {
      const queryParams = new URLSearchParams();
      queryParams.append("employerName", searchTerm);
      try {
        const response = await getFilteredEmployers(queryParams.toString());
        if (response.ok) {
          const employersData = await response.json();
          const formattedEmployers = employersData.data.map((employer) => ({
            employerID: employer.id,
            name: employer.name,
            creatorID: employer.creator,
            ownerID: employer.owner,
            address: employer.address,
            city: employer.city,
            postalCode: employer.postal_code,
            province: employer.province,
            secondaryAddress: employer.secondary_address,
            secondaryCity: employer.secondary_city,
            secondaryPostalCode: employer.secondary_postal_code,
            secondaryProvince: employer.secondary_province,
            dateAdded: employer.date_added,
            email: employer.email,
            fax: employer.fax,
            legalName: employer.legal_name,
            naicsCode: employer.naics_code,
            phoneNumber: employer.phone_number,
            website: employer.website,
          }));
          setOptions(formattedEmployers);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Fetch failed.");
        }
      } catch (err) {
        setError(err);
      }
    }
  };

  if (error) return <ErrorScreenComponent message={error} />;

  return (
    <>
      {jobLeadData.map((lead, index, array) => (
        <JobLeadContainer key={lead.id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <H3>Job Lead {lead.id + 1}</H3>
            {array.length > 1 && (
              <IconButton
                onClick={() => handleDeleteJobLead(lead.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
          {/* Employer Name Field */}
          {!isAddEmployer && (
            <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
              <Autocomplete
                id={`employer-${lead.id}`}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                onChange={(event, newValue) => {
                  handleInputChange(newValue.employerID, lead.id, "employer");
                }}
                onInputChange={(event, newInputValue) => {
                  handleSearch(newInputValue);
                }}
                options={options}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line
                    {...params}
                    label="Employer Name"
                    variant="outlined"
                  />
                )}
              />
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
            required={!isAddEmployer}
          />

          {/* Compensation Minimum Field */}
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel id={`minCompensationLabel-${lead.id}`}>
              Compensation Minimum*
            </InputLabel>
            <OutlinedInput
              id={`minCompensation-${lead.id}`}
              type="text"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Compensation Minimum*"
              inputProps={{ min: 0 }}
              value={lead.minCompensation}
              onChange={(e) => {
                const { value } = e.target;
                if (/^\d*\.?\d*$/.test(value))
                  handleInputChange(value, lead.id, "minCompensation");
              }}
              required={!isAddEmployer}
            />
          </FormControl>

          {/* Compensation Maximum Field */}
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel id={`maxCompensationLabel-${lead.id}`}>
              Compensation Maximum*
            </InputLabel>
            <OutlinedInput
              id={`maxCompensation-${lead.id}`}
              type="text"
              inputProps={{ min: 0 }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Compensation Maximum*"
              value={lead.maxCompensation}
              onChange={(e) => {
                const { value } = e.target;
                if (/^\d*\.?\d*$/.test(value))
                  handleInputChange(value, lead.id, "maxCompensation");
              }}
              required={!isAddEmployer}
            />
          </FormControl>

          {/* Hours Per Week Field */}
          <TextField
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id={`hoursPerWeek-${lead.id}`}
            type="text"
            label="Hours per week"
            inputProps={{ min: 0 }}
            value={lead.hoursPerWeek}
            onChange={(e) => {
              const { value } = e.target;
              if (/^\d*\.?\d*$/.test(value))
                handleInputChange(value, lead.id, "hoursPerWeek");
            }}
            required={!isAddEmployer}
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
            required={!isAddEmployer}
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
            required={!isAddEmployer}
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
              required={!isAddEmployer}
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
              required={!isAddEmployer}
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
            required={!isAddEmployer}
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
  handleDeleteJobLead: PropTypes.func.isRequired,
  isAddEmployer: PropTypes.bool,
};

JobLeadContent.defaultProps = {
  isAddEmployer: false, // or whatever your default value should be
};

export default JobLeadContent;
