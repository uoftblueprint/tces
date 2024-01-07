// import * as React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import UserType from "../../prop-types/UserType";
import { EmployerContainer, HeaderContainer, TopRowContainer, ArrowContainer, MainContainer } from "./index.styles";


function EmployerComponent({ currUser }) {

  return (
    <div
    style={{
      display: "inline-flex",
      marginTop: "20px",
    }}
    >
      <ArrowContainer>
        <ArrowBackIcon
          onClick={() => {console.log("clicked back")}}
          sx={{
            color: "gray",
            marginRight: 2,
            marginLeft: 2,
            marginTop: 1,
            cursor: "pointer",
          }}
        />
      </ArrowContainer>
      <MainContainer>
        <EmployerContainer>
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
              }}
            >
              Employer
            </Typography>
          </TopRowContainer>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gridColumnGap: "30px",
              height: 400,
              width: "100%",
            }}
          >
            <Card sx={{ width: 235, height: 175, marginLeft: 2 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  align="left"
                  gutterBottom
                >
                  Name
                </Typography>
                <Typography sx={{ mb: 0.5 }} color="text.secondary">
                  <TextField
                    type="text"
                    value="aaa"
                    onChange={() => {}}
                    size="small"
                    style={{
                      borderWidth: "10px",
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => {}}>
                  Reset Filters
                </Button>
              </CardActions>
            </Card>
          </Box>
        </EmployerContainer>

        {currUser.firstName}
      </MainContainer>
    </div>
  );
}

EmployerComponent.propTypes = {
  currUser: UserType.isRequired,
};

export default EmployerComponent;
