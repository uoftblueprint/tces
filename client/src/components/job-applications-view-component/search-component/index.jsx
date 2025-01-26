import { Autocomplete, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import styled from "styled-components";

const AutocompleteCustomEndAdornment = styled("div")({
  position: "absolute",
  right: "12px",
  top: "55%",
  transform: "translate(0, -50%)",
});

function SearchInput({ options, label, onChange, selectedValue }) {
  return (
    <Autocomplete
      value={selectedValue}
      onChange={onChange}
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(props) => (
        <TextField
          {...props}
          // InputProps={{
          //   sx: { borderRadius: "10px" },
          //   ...props.InputProps,
          //   endAdornment: (
          //     <AutocompleteCustomEndAdornment>
          //       <SearchIcon />
          //     </AutocompleteCustomEndAdornment>
          //   ),
          // }}
          size="small"
          label={label}
        />
      )}
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
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
