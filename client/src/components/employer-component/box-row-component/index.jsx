import * as React from "react";
import { Grid, Typography, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IMaskInput } from "react-imask";

import PropTypes from "prop-types";
import { BoxDivider } from "./index.styles";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(
  { onChange, name, ...other },
  ref
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
  copyable,
  editable,
  setRightSide,
  rightSideWrapper,
  required,
  isPhoneNumber,
}) {
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
          {/* eslint-disable-next-line no-nested-ternary */}
          {editable ? (
            isPhoneNumber ? (
              <TextField
                variant="outlined"
                fullWidth
                value={rightSide}
                onChange={(event) => setRightSide(event.target.value)}
                disabled={!editable}
                required={required}
                InputProps={{
                  inputComponent: TextMaskCustom,
                }}
              />
            ) : (
              <TextField
                variant="outlined"
                fullWidth
                value={rightSide}
                onChange={(event) => setRightSide(event.target.value)}
                disabled={!editable}
                required={required}
              />
            )
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body1" align="left">
                {rightSideWrapper(rightSide)}
              </Typography>
              {copyable && (
                <ContentCopyIcon
                  sx={{ color: "gray", cursor: "pointer" }}
                  align="right"
                  onClick={() => {
                    if (rightSide) {
                      navigator.clipboard.writeText(rightSide);
                    }
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
  copyable: PropTypes.bool,
  editable: PropTypes.bool.isRequired,
  setRightSide: PropTypes.func,
  rightSideWrapper: PropTypes.func,
  required: PropTypes.bool,
  isPhoneNumber: PropTypes.bool,
};

BoxRowComponent.defaultProps = {
  rightSide: "",
  copyable: false,
  setRightSide: () => {},
  rightSideWrapper: (rightSide) => {
    return rightSide;
  },
  required: true,
  isPhoneNumber: false,
};

export default BoxRowComponent;
