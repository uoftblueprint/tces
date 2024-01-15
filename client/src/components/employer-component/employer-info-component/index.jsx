import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import {
  HeaderContainer,
  TopRowContainer,
} from "./index.styles";

function EmployerInfoComponent() {
  return (
  <TopRowContainer style={{display: "flex", justifyContent: "space-between"}}>
    <div>
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
    </div>

    <Card 
    style={{
    width: "15%",
    }}>
    <CardContent style={{
      display: "flex",
      justifyContent: "space-between",
    }}>
      <div style={{width: "50%"}}>
        <Typography
          variant="subtitle1"
          align="left"
          gutterBottom
        >
          Owner
        </Typography>
        <Typography
          variant="body2"
        >
          Owen Perth
        </Typography>
      </div>
      <div style={{width: "50%"}}>
        <Typography
          variant="subtitle1"
          align="left"
          gutterBottom
        >
          Creator
        </Typography>
        
        <Typography
          variant="body2"
        >
          Emily Gale
        </Typography>
      </div>

    </CardContent>
  </Card>
    
  </TopRowContainer>
  );
}

export default EmployerInfoComponent;