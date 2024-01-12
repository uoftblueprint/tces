// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import UserType from "../../../prop-types/UserType";

import { HeaderContainer } from "../index.styles";

function JobLeadDashboardHeaderComponent({ managedJobLeads }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <HeaderContainer>
      <ArrowBackIcon
        onClick={handleBackClick}
        sx={{
          color: "gray",
          marginRight: 2,
          marginLeft: 2,
          cursor: "pointer",
        }}
      />

      <div>
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "34px",
            fontWeight: 500,
            lineHeight: "42px",
            letterSpacing: "0.25px",
            textAlign: "left",
          }}
        >
          Job Leads
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
          {managedJobLeads.length} Job Leads
        </Typography>
      </div>

      <Box sx={{ marginLeft: "auto", display: "flex" }}>
        <Button
          sx={{
            marginLeft: "auto",
            marginBottom: "30px",
            marginRight: "30px",
            marginTop: "30px",
            backgroundColor: "white",
            border: "1px solid #3568E5",
            color: "#3568E5",
            "&:hover": {
              backgroundColor: "#3568E5",
              color: "white",
            },
          }}
          startIcon={<DownloadIcon />}
          onClick={() => {}}
        >
          EXPORT CURRENT FILTER VIEW ({managedJobLeads.length} Job Leads)
        </Button>
        <Button
          sx={{
            marginLeft: "auto",
            marginBottom: "30px",
            marginTop: "30px",
            backgroundColor: "#3568E5",
            color: "white",
            "&:hover": {
              backgroundColor: "#3568E5",
              color: "white",
            },
          }}
          startIcon={<AddIcon />}
          onClick={() => navigate("/job-lead/add")}
        >
          ADD NEW JOB LEAD
        </Button>
      </Box>
    </HeaderContainer>
  );
}

JobLeadDashboardHeaderComponent.propTypes = {
  managedJobLeads: PropTypes.arrayOf(UserType).isRequired,
  // eslint-disable-next-line
};

export default JobLeadDashboardHeaderComponent;
