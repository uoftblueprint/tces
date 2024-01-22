import PropTypes from "prop-types";
import { IconButton, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HeaderContainer } from "../index.styles";

function EmployerDashboardHeader({ numEntries }) {
  return (
    <HeaderContainer>
      <IconButton
        sx={{
          marginRight: 2,
          marginLeft: 2,
        }}
        // onClick={}
        size="small"
      >
        <ArrowBackIcon
          sx={{
            color: "gray",
            cursor: "pointer",
          }}
        />
      </IconButton>
      <div style={{ flexGrow: 1 }}>
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "34px",
            fontWeight: 500,
            lineHeight: "60px",
            letterSpacing: "0.25px",
            textAlign: "left",
          }}
        >
          All Employers
        </Typography>
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "0px",
            letterSpacing: "0.1px",
            textAlign: "left",
            color: "#00000099",
          }}
        >
          {numEntries} Employers
        </Typography>
      </div>
      <Button
        sx={{
          marginLeft: "auto",
          marginBottom: "30px",
          marginTop: "30px",
          backgroundColor: "#ffffff0",
          color: "#3568E5",
          border: 1,
          "&:hover": {
            backgroundColor: "#3568E5",
            color: "white",
          },
        }}
        startIcon={<AddIcon />}
      >
        EXPORT CURRENT FILTER VIEW ({numEntries} EMPLOYERS)
      </Button>
      <Button
        sx={{
          marginLeft: "16px",
          marginBottom: "30px",
          marginTop: "30px",
          backgroundColor: "#3568E5",
          border: 1,
          color: "white",
          "&:hover": {
            backgroundColor: "white",
            color: "#3568E5",
          },
        }}
        startIcon={<AddIcon />}
      >
        ADD NEW EMPLOYER
      </Button>
    </HeaderContainer>
  );
}

EmployerDashboardHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  numEntries: PropTypes.number.isRequired,
};

export default EmployerDashboardHeader;
