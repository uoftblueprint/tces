import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";

function SearchInput({
  options,
  label,
  onChange,
  selectedValue,
  getOptionLabel,
}) {
  return (
    <Autocomplete
      value={selectedValue}
      onChange={onChange}
      disablePortal
      options={options}
      getOptionLabel={getOptionLabel}
      sx={{ width: 300 }}
      renderInput={(props) => (
        /* eslint-disable react/jsx-props-no-spreading */
        <TextField {...props} size="small" label={label} />
      )}
    />
  );
}

SearchInput.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
  getOptionLabel: PropTypes.func,
};

SearchInput.defaultProps = {
  getOptionLabel: (option) => option,
};

export default SearchInput;
