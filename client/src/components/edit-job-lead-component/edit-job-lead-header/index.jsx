// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

import { HeaderContainer } from "../index.styles";
import JobLeadType from "../../../prop-types/JobLeadType";

function EditJobLeadHeaderComponent({ jobLead }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/job-leads/");
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
          {jobLead.jobTitle}
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
          Job Listing
        </Typography>
      </div>

      <Box sx={{ marginLeft: "auto", display: "flex" }}>
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

EditJobLeadHeaderComponent.propTypes = {
  jobLead: JobLeadType.isRequired,
  // eslint-disable-next-line
};

export default EditJobLeadHeaderComponent;
