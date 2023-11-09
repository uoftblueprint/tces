import { Typography, Grid } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import { TimelineIconContainer, CircleContainer, Line } from "./index.styles";

function JobUpdateCardComponent({
  action,
  adminName,
  userName,
  companyName,
  date,
}) {
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2, paddingX: "20px" }}
    >
      <Grid item xs={9} container alignItems="center">
        <TimelineIconContainer>
          <CircleContainer>
            <StarIcon fontSize="small" />
          </CircleContainer>
          <Line />
        </TimelineIconContainer>

        <span>
          <Typography variant="subtitle1" align="left">
            {adminName} {action}
          </Typography>
          <Typography variant="body2" align="left">
            {userName} at {companyName}
          </Typography>
        </span>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="body2" align="right">
          {date}
        </Typography>
      </Grid>
    </Grid>
  );
}

JobUpdateCardComponent.propTypes = {
  action: PropTypes.string.isRequired,
  adminName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default JobUpdateCardComponent;
