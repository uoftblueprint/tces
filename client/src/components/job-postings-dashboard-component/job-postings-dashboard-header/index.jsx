// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import { HeaderContainer } from "../index.styles";

function JobPostingsDashboardHeaderComponent({
  jobPostingsResultsCount,
}) {
  const navigate = useNavigate();


  const handleBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <HeaderContainer>
      <IconButton
        sx={{
          marginRight: 2,
          marginLeft: 2,
        }}
        onClick={handleBackClick}
        size="small"
      >
        <ArrowBackIcon
          sx={{
            color: "gray",
            cursor: "pointer",
          }}
        />
      </IconButton>

      <div>
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "34px",
            fontWeight: "Bold",
            lineHeight: "42px",
            letterSpacing: "0.25px",
            textAlign: "left",
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
            textAlign: "left",
          }}
        >
          {jobPostingsResultsCount}
        </Typography>
      </div>

      <Box sx={{ marginLeft: "auto", display: "flex" }}/>
      
    </HeaderContainer>
  );
}

JobPostingsDashboardHeaderComponent.propTypes = {
  jobPostingsResultsCount: PropTypes.number.isRequired,
};

export default JobPostingsDashboardHeaderComponent;
