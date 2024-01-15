import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import PropTypes from "prop-types";
import {
  BoxDivider
} from "./index.styles";

function BoxRowComponent({ leftSide, rightSide, copyable }) {
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
          <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
            <Typography variant="body1" align="left">
              {rightSide}
            </Typography>
            {copyable && 
              <ContentCopyIcon 
                sx={{color: "gray", cursor: "pointer",}} 
                align="right" 
                onClick={() => {if (rightSide.props) {navigator.clipboard.writeText(rightSide.props.children) } }}
              />}
          </div>
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
};

BoxRowComponent.defaultProps = {
  rightSide: "",
  copyable: false,
}

export default BoxRowComponent;