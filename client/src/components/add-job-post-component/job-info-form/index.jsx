import PropTypes from "prop-types";
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
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { JobLeadContainer, H3 } from "../index.styles";
import { JOB_TYPES, COMPENSATION_RATES } from "../../../utils/contants";
// import ErrorScreenComponent from "../shared/error-screen-component";

function AddJobDetails({
  jobLeadData,
  handleInputChange,
  handleDeleteJobLead,
  isAddEmployer,
}) {
  // const [paginationModel] = React.useState({
  //   pageSize: 10,
  //   page: 0,
  // });

  // const handleSearch = async (searchQuery, pageSize = 10, page = 0) => {
  //   const queryParams = new URLSearchParams();
  //   queryParams.append("employerName", searchQuery);
  //   queryParams.append("page", page);
  //   queryParams.append("pageSize", pageSize);
  //   try {
  //     const response = await getFilteredEmployers(queryParams.toString());
  //     if (response.ok) {
  //       const employersData = await response.json();
  //       const formattedEmployers = employersData.data.map((employer) => ({
  //         employerID: employer.id,
  //         name: employer.name,
  //         creatorID: employer.creator,
  //         ownerID: employer.owner,
  //         address: employer.address,
  //         city: employer.city,
  //         postalCode: employer.postal_code,
  //         province: employer.province,
  //         secondaryAddress: employer.secondary_address,
  //         secondaryCity: employer.secondary_city,
  //         secondaryPostalCode: employer.secondary_postal_code,
  //         secondaryProvince: employer.secondary_province,
  //         dateAdded: employer.date_added,
  //         email: employer.email,
  //         fax: employer.fax,
  //         legalName: employer.legal_name,
  //         naicsCode: employer.naics_code,
  //         phoneNumber: employer.phone_number,
  //         website: employer.website,
  //       }));
  //     } else {
  //       const errorData = await response.json();
  //       setError(errorData.message || "Fetch failed.");
  //     }
  //   } catch (err) {
  //     setError(err);
  //   }
  // };

  // if (error) return <ErrorScreenComponent message={error} />;

  return (
    // TODOs
    // 1. get rid of required star beside label names
    // 2. ask about employment type label, really hard to make it the same native transition :skull
    // 3. add required bottom label to additional information and make it aligned w/the textarea
    // 4. change all labels, ids and handleinputchange paramters to match new input types
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
            <H3>Job Information</H3>
            {array.length > 1 && (
              <IconButton
                onClick={() => handleDeleteJobLead(lead.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>

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

          {/* Employer Name Field */}
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id={`employer-${lead.id}`}
            label="Employer Name"
            value={lead.employer}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "employer")
            }
            helperText={isAddEmployer ? "" : "*Required"}
            required={!isAddEmployer}
          />

          {/* Location Field */}
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id={`location-${lead.id}`}
            label="Location"
            value={lead.location}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "location")
            }
            helperText={isAddEmployer ? "" : "*Required"}
            required={!isAddEmployer}
          />

          {/* Minimum Compensation Field */}
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel id={`minCompensationLabel-${lead.id}`}>
              Minimum Compensation
            </InputLabel>
            <OutlinedInput
              id={`minCompensation-${lead.id}`}
              type="text"
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Minimum Compensation"
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

          {/* Maximum Compensation Field */}
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel id={`maxCompensationLabel-${lead.id}`}>
              Maximum Compensation
            </InputLabel>
            <OutlinedInput
              id={`maxCompensation-${lead.id}`}
              type="text"
              inputProps={{ min: 0 }}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="Maximum Compensation"
              value={lead.maxCompensation}
              onChange={(e) => {
                const { value } = e.target;
                if (/^\d*\.?\d*$/.test(value))
                  handleInputChange(value, lead.id, "maxCompensation");
              }}
              required={!isAddEmployer}
            />
          </FormControl>

          {/* Compensation Rate Field */}
          <FormControl fullWidth sx={{ m: 1, width: "47%" }}>
            <InputLabel id={`employmentTypeLabel-${lead.id}`}>
              Compensation rate
            </InputLabel>
            <Select
              sx={{ textAlign: "left" }}
              labelId={`employmentTypeLabel-${lead.id}`}
              id={`employmentType-${lead.id}`}
              value={lead.employmentType}
              label="Compensation rate"
              onChange={(e) =>
                handleInputChange(e.target.value, lead.id, "employmentType")
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

          {/* Employment Type Field */}
          <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
            <InputLabel>Employment Type</InputLabel>
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

          {/* Additional Information Field */}
          {/* TODO ADD REQUIRED LABEL */}
          <TextField
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id={`description-${lead.id}`}
            label="Additional Information"
            multiline
            rows={4}
            value={lead.description}
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "description")
            }
            required={!isAddEmployer}
          />
        </JobLeadContainer>
      ))}
    </>
  );
}

AddJobDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  jobLeadData: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleDeleteJobLead: PropTypes.func.isRequired,
  isAddEmployer: PropTypes.bool,
};

AddJobDetails.defaultProps = {
  isAddEmployer: false, // or whatever your default value should be
};

export default AddJobDetails;
