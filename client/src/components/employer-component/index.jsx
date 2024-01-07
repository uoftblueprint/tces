import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from "@mui/material/Typography";

import UserType from "../../prop-types/UserType";
import { EmployerContainer, HeaderContainer, TopRowContainer } from "./index.styles";


function EmployerComponent({ currUser }) {
  return (
    <div>
      <EmployerContainer>
        <TopRowContainer>
          <HeaderContainer>
            <ArrowBackIcon
              onClick={() => {console.log("clicked back")}}
              sx={{
                color: "gray",
                marginRight: 2,
                marginLeft: 2,
                cursor: "pointer",
              }}
            />
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
              onClick={() => {console.log("clicked triple vertical dots")}}
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
              marginLeft: "57px",
            }}
          >
            Employer
          </Typography>
        </TopRowContainer>
      </EmployerContainer>

      {currUser.firstName}
    </div>
  );
}

EmployerComponent.propTypes = {
  currUser: UserType.isRequired,
};

export default EmployerComponent;
