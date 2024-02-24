import { Grid, Typography, TextField } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import PropTypes from "prop-types";
import { BoxDivider } from "./index.styles";

function BoxRowComponent({
  leftSide,
  rightSide,
  copyable,
  editable,
  setRightSide,
  rightSideWrapper,
  required,
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
          {editable ? (
            <TextField
              variant="outlined"
              fullWidth
              value={rightSide}
              onChange={(event) => setRightSide(event.target.value)}
              disabled={!editable}
              required={required}
            />
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
};

BoxRowComponent.defaultProps = {
  rightSide: "",
  copyable: false,
  setRightSide: () => {},
  rightSideWrapper: (rightSide) => {
    return rightSide;
  },
  required: true,
};

export default BoxRowComponent;
