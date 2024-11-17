import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
} from "@mui/material";
import { ApplyContainer, H3 } from "../index.styles";

function AddApplyInformation({ applyInformation, setApplyInformation }) {
  const handleInputChange = (input, field) => {
    setApplyInformation({ ...applyInformation, [field]: input });
  };

  return (
    <ApplyContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H3>Apply for this Position</H3>
      </div>

      {/* Name Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "96%" }}
        id="name"
        label="Name"
        value={applyInformation.name}
        onChange={(e) => handleInputChange(e.target.value, "name")}
        helperText="*Required"
        required
        InputLabelProps={{ required: false }}
      />

      {/* Phone Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "47%" }}
        id="phone"
        label="Phone"
        value={applyInformation.phone}
        onChange={(e) => handleInputChange(e.target.value, "phone")}
        helperText="*Required"
        required
        InputLabelProps={{ required: false }}
      />

      {/* Postal Code Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "47%" }}
        id="postalCode"
        label="Postal Code"
        value={applyInformation.postalCode}
        onChange={(e) => handleInputChange(e.target.value, "postalCode")}
        helperText="*Required"
        required
        InputLabelProps={{ required: false }}
      />

      {/* Email Address Field */}
      <TextField
        fullWidth
        sx={{ m: 1, width: "96%" }}
        id="emailAddress"
        label="Email Address"
        value={applyInformation.emailAddress}
        onChange={(e) => handleInputChange(e.target.value, "emailAddress")}
        helperText="*Required"
        required
        InputLabelProps={{ required: false }}
      />

      {/* Status In Canada Dropdown */}
      <FormControl fullWidth sx={{ m: 1, width: "96%" }}>
        <InputLabel>Status In Canada</InputLabel>
        <Select
          id="statusInCanada"
          value={applyInformation.statusInCanada}
          onChange={(e) => handleInputChange(e.target.value, "statusInCanada")}
          required
          InputLabelProps={{ required: false }}
        >
          <MenuItem value="Citizen">Citizen</MenuItem>
          <MenuItem value="PR">PR</MenuItem>
          <MenuItem value="Conventional Refugee">Conventional Refugee</MenuItem>
          <MenuItem value="Student Visa">Student Visa</MenuItem>
          <MenuItem value="Open Work">Open Work</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        <FormHelperText>*Required</FormHelperText>
      </FormControl>
    </ApplyContainer>
  );
}

AddApplyInformation.propTypes = {
  applyInformation: PropTypes.object.isRequired,
  setApplyInformation: PropTypes.func.isRequired,
};

export default AddApplyInformation;