import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";

function SearchInput({ options, label }) {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

SearchInput.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
};

export default SearchInput;
