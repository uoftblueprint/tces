import PropTypes from "prop-types";
import {
  FormControl,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { JobLeadContainer, H3 } from "../index.styles";
import { COMPENSATION_RATES } from "../../../utils/contants";
// import ErrorScreenComponent from "../shared/error-screen-component";

function AddApplicationFields({
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
            <H3>Application form fields</H3>
            {array.length > 1 && (
              <IconButton
                onClick={() => handleDeleteJobLead(lead.id)}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>

          {/* Name Field */}
          <TextField
            disabled
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id={`title-${lead.id}`}
            label="Name"
            value={lead.title}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "title")
            }
            helperText={isAddEmployer ? "" : "*Required"}
            required={!isAddEmployer}
          />

          {/* Email Field */}
          <TextField
            disabled
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id={`employer-${lead.id}`}
            label="Email Address"
            value={lead.employer}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "employer")
            }
            helperText={isAddEmployer ? "" : "*Required"}
            required={!isAddEmployer}
          />

          {/* Location Field */}
          <TextField
            disabled
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id={`location-${lead.id}`}
            label="Location"
            value={lead.location}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "location")
            }
            helperText={isAddEmployer ? "" : "*Required"}
            required={!isAddEmployer}
          />

          {/* Postal Code Field */}
          <TextField
            disabled
            fullWidth
            sx={{ m: 1, width: "47%" }}
            id={`location-${lead.id}`}
            label="Postal Code"
            value={lead.location}
            onChange={(e) =>
              handleInputChange(e.target.value, lead.id, "location")
            }
            helperText={isAddEmployer ? "" : "*Required"}
            required={!isAddEmployer}
          />

          {/* Status In Canada Field */}
          <FormControl disabled fullWidth sx={{ m: 1, width: "96%" }}>
            <InputLabel id={`employmentTypeLabel-${lead.id}`}>
              Status In Canada
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

          {/* Cover Letter Field */}
          {/* TODO ADD REQUIRED LABEL */}
          <TextField
            disabled
            fullWidth
            sx={{ m: 1, width: "96%" }}
            id={`description-${lead.id}`}
            label="Cover Letter"
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

AddApplicationFields.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  jobLeadData: PropTypes.array.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleDeleteJobLead: PropTypes.func.isRequired,
  isAddEmployer: PropTypes.bool,
};

AddApplicationFields.defaultProps = {
  isAddEmployer: false, // or whatever your default value should be
};

export default AddApplicationFields;
