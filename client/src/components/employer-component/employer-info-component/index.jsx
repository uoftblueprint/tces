import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from "@mui/material/Typography";

import {
  HeaderContainer,
  TopRowContainer,
} from "./index.styles";

function EmployerInfoComponent() {
  return (
  <TopRowContainer>
    <HeaderContainer>
      <Typography
        style={{
          fontFamily: "Arial",
          fontSize: "34px",
          fontWeight: 700,
          lineHeight: "42px",
          letterSpacing: "0.25px",
          textAlign: "left",
        }}
      >
        Shoppers Drug Mart
      </Typography>
      <MoreVertIcon
        onClick={() => {
          console.log("clicked triple vertical dots");
        }}
        sx={{
          color: "gray",
          marginRight: 2,
          marginLeft: 2,
          cursor: "pointer",
        }}
      />
    </HeaderContainer>
    <Typography
      style={{
        fontFamily: "Arial",
        textAlign: "left",
      }}
    >
      Employer
    </Typography>
  </TopRowContainer>
  );
}

export default EmployerInfoComponent;