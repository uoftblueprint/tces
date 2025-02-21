import * as React from "react";
import { useState } from "react";
import { Grid, Typography, Select, MenuItem, Box, FormControl, InputLabel } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { IMaskInput } from "react-imask";

import PropTypes from "prop-types";
import { BoxDivider } from "./index.styles";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(
  { onChange, name, ...other },
  ref,
) {
  return (
    <IMaskInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      mask="(#00) 000-0000x0000"
      definitions={{
        "#": /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name, value } })}
      overwrite
    />
  );
});

TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function BoxRowComponent({
  leftSide,
  rightSide,
  downloadable,
  editable,
  setRightSide,
  required,
  options,
}) {
  const [selectedValue, setSelectedValue] = useState(rightSide[0] || "Select");

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1, paddingX: "20px" }}
      >
        <Grid item xs={4} container alignItems="center">
          <span>
            <Typography variant="body1" align="left">
              {leftSide}
            </Typography>
          </span>
        </Grid>
        <Grid item xs={8}>
          {editable ? (
            <FormControl fullWidth>
              <InputLabel id="select-label">{leftSide}</InputLabel>
              <Select
                labelId="select-label"
                variant="outlined"
                fullWidth
                value={selectedValue}
                label={leftSide}
                onChange={(event) => {
                  setRightSide(event.target.value);
                  setSelectedValue(event.target.value);
                  // console.log("Selected value:", event.target.value);
                }}
                required={required}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box
                      sx={{
                        display: "inline-block",
                        border: `1px solid ${option.color}`,
                        borderRadius: "12px",
                        backgroundColor: `rgba(${parseInt(option.color.slice(1, 3), 16)}, ${parseInt(option.color.slice(3, 5), 16)}, ${parseInt(option.color.slice(5, 7), 16)}, 0.1)`,
                        padding: "2px 8px",
                        margin: "4px",
                      }}
                    >
                      {option.value}
                    </Box>
                  </MenuItem>
              ))}
            </Select>
            </FormControl>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
              <Typography variant="body1" align="left">
                {rightSide}
              </Typography>
              {downloadable && (
                <DownloadIcon
                  sx={{ color: "#1565c0", cursor: "pointer" }}
                  align="right"
                  onClick={() => {
                    
                  }}
                />
              )}
            </div>
          )}
        </Grid>
      </Grid>
      <BoxDivider />
    </>
  );
}

BoxRowComponent.propTypes = {
  leftSide: PropTypes.string.isRequired,
  rightSide: PropTypes.string,
  downloadable: PropTypes.bool,
  editable: PropTypes.bool.isRequired,
  setRightSide: PropTypes.func,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

BoxRowComponent.defaultProps = {
  rightSide: "",
  downloadable: false,
  setRightSide: () => {},
  required: true,
};

export default BoxRowComponent;
