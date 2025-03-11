// eslint-disable-next-line no-unused-vars
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { HeaderContainer } from "../index.styles";

function JobPostingsDashboardHeaderComponent({ filteredJobPostingsCount }) {
  return (
    <HeaderContainer>
      <div>
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "34px",
            fontWeight: "Bold",
            lineHeight: "42px",
            letterSpacing: "0.25px",
            textAlign: "left",
            marginRight: 40,
            marginLeft: 40,
          }}
        >
          All Job Postings
        </Typography>
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "24px",
            letterSpacing: "0.15px",
            marginBottom: "15px",
            textAlign: "left",
          }}
        >
          {filteredJobPostingsCount} Job{filteredJobPostingsCount !== 1 ? "s" : ""} Found
        </Typography>
      </div>

      <Box sx={{ marginLeft: "auto", display: "flex" }} />
    </HeaderContainer>
  );
}

JobPostingsDashboardHeaderComponent.propTypes = {
  filteredJobPostingsCount: PropTypes.number.isRequired,
};

export default JobPostingsDashboardHeaderComponent;
