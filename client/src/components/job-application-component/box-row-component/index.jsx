import * as React from "react";
import { useState } from "react";
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { IMaskInput } from "react-imask";
import PropTypes from "prop-types";
import { BoxDivider } from "./index.styles";
import ApplicationStatusChipComponent from "../../shared/application-status-chips";

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
  rightSideWrapper,
  downloadable,
  editable,
  setRightSide,
  required,
  options,
  isFirst,
  isLast,
}) {
  const [selectedValue, setSelectedValue] = useState(rightSide[0]);

  return (
    <>
      <Grid
        container
        justifyContent="space-between"
        alignItems={editable ? "flex-start" : "center"}
        sx={{
          my: 2,
          paddingX: "20px",
          mt: isFirst ? 0 : 2,
          mb: isLast ? 0 : 2,
        }}
      >
        <Grid item xs={4} container alignItems="flex-start">
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
                }}
                required={required}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <ApplicationStatusChipComponent status={option.value} />
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
                {rightSideWrapper ? rightSideWrapper(rightSide) : rightSide}
              </Typography>
              {downloadable && (
                <DownloadIcon
                  sx={{ color: "#1565c0", cursor: "pointer" }}
                  align="right"
                  onClick={() => {}}
                />
              )}
            </div>
          )}
        </Grid>
      </Grid>
      {!isLast && <BoxDivider />}
    </>
  );
}

BoxRowComponent.propTypes = {
  leftSide: PropTypes.string.isRequired,
  rightSide: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  rightSideWrapper: PropTypes.func,
  downloadable: PropTypes.bool,
  editable: PropTypes.bool.isRequired,
  setRightSide: PropTypes.func,
  required: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};

BoxRowComponent.defaultProps = {
  rightSide: "",
  rightSideWrapper: null,
  downloadable: false,
  setRightSide: () => {},
  required: true,
  isFirst: false,
  isLast: false,
};

export default BoxRowComponent;
