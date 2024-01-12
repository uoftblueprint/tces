// import * as React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate } from "react-router-dom";

import UserType from "../../prop-types/UserType";
import {
  EmployerContainer,
  ArrowContainer,
  MainContainer,
  Divider,
} from "./index.styles";

import EmployerInfoComponent from "./employer-info-component";

function EmployerComponent({ currUser }) {
  const navigate = useNavigate();

  return (
    <div
    style={{
      marginTop: "20px",
      width: "100%",
    }}
    >
      <div
        style={{
          display: "flex",
          marginRight: "40px",
        }}
      >
        <ArrowContainer>
          <ArrowBackIcon
            onClick={() => {
              navigate("/dashboard");
            }}
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
            <EmployerInfoComponent />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gridColumnGap: "30px",
                height: 400,
                marginTop: "10px",
                width: "100%",
              }}
            >
              <Card 
                style={{
                width: "33%",
                }}>
                <CardContent style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                  <Typography
                    variant="h5"
                    align="left"
                    gutterBottom
                  >
                    Information
                  </Typography>
                  <EditIcon
                  sx={{
                    color: "gray",
                    cursor: "pointer",
                    align: "center",
                  }}
                  />
                </CardContent>
                <Divider />
                <CardContent>
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

              <Card 
                style={{
                width: "33%",
                }}>
                <CardContent style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                  <Typography
                    variant="h5"
                    align="left"
                    gutterBottom
                  >
                    Contacts
                  </Typography>
                  <div className="iconContainer">
                    <EditIcon
                    sx={{
                      color: "gray",
                      cursor: "pointer",
                      align: "center",
                      marginRight: 2,
                    }}
                    />

                    <AddIcon
                    sx={{
                      color: "gray",
                      cursor: "pointer",
                      align: "center",
                    }}
                    />
                  </div>
                </CardContent>
                <Divider />
                <CardContent>
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

              <Card style={{ width: "33%" }} sx={{ height: 800 }}>
                <CardContent>
                  <Typography
                    variant="h5"
                    align="left"
                    gutterBottom
                  >
                    Activity Timeline (placeholder)
                  </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    Placeholder
                  </Typography>
                </CardContent>
              </Card>
            </Box>


            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gridColumnGap: "30px",
                height: 400,
                marginTop: "10px",
                width: "100%",
              }}
            >
              <Card 
                style={{
                width: "66%",
                }}>
                <CardContent style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}>
                  <Typography
                    variant="h5"
                    align="left"
                    gutterBottom
                  >
                    Job Leads
                  </Typography>
                  <EditIcon
                  sx={{
                    color: "gray",
                    cursor: "pointer",
                    align: "center",
                  }}
                  />
                </CardContent>
                <Divider />
                <CardContent>
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
    </div>
  );
}

EmployerComponent.propTypes = {
  currUser: UserType.isRequired,
};

export default EmployerComponent;
