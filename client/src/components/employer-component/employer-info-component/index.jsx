import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import {
  HeaderContainer,
  TopRowContainer,
} from "./index.styles";
import EmployerType from '../../../prop-types/EmployerType';

function EmployerInfoComponent({ employer }) {
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
          {employer.name}
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
          {employer.owner ? employer.owner : ""}
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
          { employer.creator ? employer.creator : "" }
        </Typography>
      </div>

    </CardContent>
  </Card>
    
  </TopRowContainer>
  );
}

EmployerInfoComponent.propTypes = {
  employer: EmployerType.isRequired,
};

export default EmployerInfoComponent;