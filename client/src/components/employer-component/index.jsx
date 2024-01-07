import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";

import UserType from "../../prop-types/UserType";
import { EmployerContainer, HeaderContainer } from "./index.styles";


function EmployerComponent({ currUser }) {
  return (
    <div>
      <EmployerContainer>
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
        </HeaderContainer>
      </EmployerContainer>

      {currUser.firstName}
    </div>
  );
}

EmployerComponent.propTypes = {
  currUser: UserType.isRequired,
};

export default EmployerComponent;
